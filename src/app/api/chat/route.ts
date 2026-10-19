import { readFileSync } from "node:fs";
import { isInScope, REFUSAL } from "@/lib/ask-scope";
import { systemPrompt } from "@/lib/dossier";
import {
  HIRING_FIT_REMINDER,
  isHiringFitQuestion,
  sanitizeHiringReply,
  stripHiringSectionTemplate,
} from "@/lib/hiring-fit";
import { normalizeAssistantMarkdown } from "@/lib/normalize-markdown";

const MAX_MESSAGES = 8;
const MAX_CHARS = 1500;
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 20;

const recentHits = new Map<string, number[]>();

function envFromFile(name: string) {
  let file = "";
  try {
    file = readFileSync(".env.local", "utf8");
  } catch {
    return null;
  }

  for (const line of file.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.startsWith(`${name}=`)) continue;
    return trimmed
      .slice(name.length + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");
  }
  return null;
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function limited(ip: string) {
  const now = Date.now();
  const hits = (recentHits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) {
    recentHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  recentHits.set(ip, hits);
  return false;
}

function readMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object" || !("messages" in body)) return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages)) return null;

  const cleaned: ChatMessage[] = [];
  for (const message of messages.slice(-MAX_MESSAGES)) {
    if (!message || typeof message !== "object") return null;
    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CHARS);
    if (!text) return null;
    cleaned.push({ role, content: text });
  }
  return cleaned;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json(
      { error: "Too many questions. Wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = readMessages(body);
  const latest = messages?.at(-1);
  if (!messages || !latest || latest.role !== "user") {
    return Response.json({ error: "Send a question to continue." }, { status: 400 });
  }

  const earlier = messages.slice(0, -1).flatMap((message) =>
    message.role === "user" ? [message.content] : [],
  );
  if (!isInScope(latest.content, earlier)) {
    return Response.json({ reply: REFUSAL });
  }

  const fileKey = envFromFile("OPENAI_API_KEY");
  const apiKey =
    fileKey !== null ? fileKey : process.env.OPENAI_API_KEY?.trim() || "";
  if (!apiKey) {
    return Response.json(
      {
        error: "Add your OpenAI API key to .env.local as OPENAI_API_KEY.",
      },
      { status: 503 },
    );
  }

  const fileModel = envFromFile("OPENAI_MODEL");
  const model =
    (fileModel !== null && fileModel) || process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

  const hiringFit = isHiringFitQuestion(latest.content, earlier);
  const openAiMessages: { role: "system" | "user" | "assistant"; content: string }[] = [
    { role: "system", content: systemPrompt() },
  ];
  if (hiringFit) {
    openAiMessages.push({ role: "system", content: HIRING_FIT_REMINDER });
  }
  openAiMessages.push(...messages);

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: hiringFit ? 0.2 : 0.3,
        max_tokens: 450,
        messages: openAiMessages,
      }),
    });
  } catch {
    return Response.json(
      { error: "The assistant could not reach OpenAI. Try again in a moment." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const status = response.status === 401 ? 401 : 502;
    const error =
      response.status === 401
        ? "OpenAI rejected the API key. Check OPENAI_API_KEY in .env.local."
        : "The assistant could not answer just now. Try again in a moment.";
    return Response.json({ error }, { status });
  }

  const payload = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  let reply = payload.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    return Response.json(
      { error: "The assistant returned an empty answer. Try again." },
      { status: 502 },
    );
  }

  if (hiringFit) {
    reply = sanitizeHiringReply(reply);
    reply = normalizeAssistantMarkdown(reply, { formatHiringSections: true });
  } else {
    reply = stripHiringSectionTemplate(reply);
    reply = normalizeAssistantMarkdown(reply);
  }

  return Response.json({ reply });
}
