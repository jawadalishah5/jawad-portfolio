"use client";

import { useEffect, useRef, useState } from "react";
import { MarkdownReply } from "@/components/MarkdownReply";
import { SuggestionChips } from "@/components/SuggestionChips";
import { starterSuggestions } from "@/content/suggestions";
import { pickFollowUpSuggestions } from "@/lib/follow-up-suggestions";
import { BrandMark } from "@/components/BrandMark";
import { SiteHeader } from "@/components/SiteHeader";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function AskChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [messages, pending]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;

    const history = [...messages, { role: "user" as const, content }];
    setMessages(history);
    setDraft("");
    setError("");
    setPending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });
      const payload = (await response.json()) as { reply?: string; error?: string };
      if (!response.ok || !payload.reply) {
        setError(payload.error || "The assistant could not answer just now.");
        return;
      }
      setMessages((current) => [...current, { role: "assistant", content: payload.reply! }]);
    } catch {
      setError("The assistant could not be reached. Check that the dev server is running.");
    } finally {
      setPending(false);
      fieldRef.current?.focus();
    }
  }

  const empty = messages.length === 0;
  const askedLabels = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content);

  return (
    <div className="flex h-dvh flex-col">
      <SiteHeader variant="ask" />

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-5">
        {empty ? (
          <div className="my-auto py-16">
            <BrandMark size="md" />
            <h1 className="mt-4 max-w-xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              <span className="block">Ask about the work, or whether he fits a role,</span>
              <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 text-[0.92em] font-normal text-muted sm:text-[0.88em]">
                or view
                <Link
                  href="/portfolio"
                  className="inline-flex items-center rounded-full border border-accent bg-accent/15 px-4 py-1.5 text-base font-medium text-accent transition-colors hover:bg-accent hover:text-background sm:text-lg"
                >
                  Portfolio
                </Link>
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Questions stay on Jawad Bukhari’s background, projects, and hiring fit.
            </p>
            <SuggestionChips
              items={starterSuggestions}
              onSend={send}
              disabled={pending}
              className="mt-8"
            />
          </div>
        ) : (
          <ol className="flex flex-col gap-6 py-8">
            {messages.map((message, index) => {
              const isLatestAssistant =
                message.role === "assistant" &&
                index === messages.length - 1 &&
                !pending;
              const userQuestion =
                message.role === "assistant"
                  ? messages
                      .slice(0, index)
                      .reverse()
                      .find((entry) => entry.role === "user")?.content ?? ""
                  : "";
              const followUps =
                isLatestAssistant
                  ? pickFollowUpSuggestions({
                      userQuestion,
                      assistantReply: message.content,
                      askedLabels,
                    })
                  : [];

              return (
                <li
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "flex justify-end"
                      : "flex w-full flex-col items-start gap-3"
                  }
                >
                  {message.role === "user" ? (
                    <div className="max-w-[85%] rounded-2xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed">
                      {message.content}
                    </div>
                  ) : (
                    <>
                      <MarkdownReply content={message.content} />
                      {isLatestAssistant ? (
                        <SuggestionChips
                          items={followUps}
                          onSend={send}
                          disabled={pending}
                        />
                      ) : null}
                    </>
                  )}
                </li>
              );
            })}
            {pending ? (
              <li className="font-mono text-xs tracking-[0.14em] text-muted uppercase">
                Thinking
              </li>
            ) : null}
            <div ref={bottomRef} />
          </ol>
        )}
      </div>

      <div className="border-t border-border">
        <form
          className="mx-auto w-full max-w-3xl px-5 py-4"
          onSubmit={(event) => {
            event.preventDefault();
            void send(draft);
          }}
        >
          {error ? <p className="mb-3 text-sm text-accent">{error}</p> : null}
          <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface px-3 py-2">
            <label className="sr-only" htmlFor="question">
              Ask about Jawad
            </label>
            <textarea
              id="question"
              ref={fieldRef}
              value={draft}
              rows={1}
              placeholder="Ask about Jawad’s work or a role you want to hire for"
              className="max-h-40 min-h-11 flex-1 resize-none bg-transparent py-2 text-sm outline-none placeholder:text-muted"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  void send(draft);
                }
              }}
            />
            <button
              type="submit"
              disabled={pending || draft.trim().length === 0}
              className="inline-flex h-9 shrink-0 items-center rounded-full bg-accent px-4 text-sm font-medium text-background disabled:opacity-40"
            >
              Send
            </button>
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted">
            Other topics are declined before any model call.
          </p>
        </form>
      </div>
    </div>
  );
}
