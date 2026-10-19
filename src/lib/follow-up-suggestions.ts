import { suggestions, type Suggestion } from "@/content/suggestions";

const STOP = new Set([
  "the",
  "and",
  "for",
  "his",
  "her",
  "with",
  "about",
  "what",
  "does",
  "have",
  "from",
  "that",
  "this",
  "jawad",
  "bukhari",
]);

function tokens(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9+/]+/)
    .filter((word) => word.length > 2 && !STOP.has(word));
}

function haystack(userQuestion: string, assistantReply: string) {
  return `${userQuestion}\n${assistantReply}`.toLowerCase();
}

function scoreSuggestion(
  item: Suggestion,
  text: string,
  userQuestion: string,
  asked: Set<string>,
) {
  if (asked.has(item.label.toLowerCase())) return -1;

  const user = userQuestion.toLowerCase();
  if (user === item.label.toLowerCase()) return -1;

  let score = 0;
  for (const tag of item.tags) {
    if (text.includes(tag)) score += 3;
  }

  for (const word of tokens(item.label)) {
    if (text.includes(word)) score += 1;
  }

  if (item.label === "CI/CD and deployment experience") {
    if (/cicd|ci\/cd|codepipeline|codebuild|deploy|staging|production|ecs|cdk/.test(text)) {
      score -= 4;
    }
  }

  if (item.label === "Tell me about Aimyable" && /aimyable|aimy/.test(user)) score -= 3;
  if (item.label === "What did he build at Motive?" && /motive|keeptruckin/.test(user)) {
    score -= 3;
  }
  if (item.label === "Career timeline" && /timeline|career/.test(user)) score -= 3;
  if (item.label === "Tech stack" && /stack|skills/.test(user)) score -= 3;
  if (item.label === "Education" && /education|nust/.test(user)) score -= 3;
  if (item.label === "Key metrics" && /metric/.test(user)) score -= 3;
  if (item.label === "What's his current role?" && /current role|present/.test(user)) {
    score -= 3;
  }

  return score;
}

export function pickFollowUpSuggestions({
  userQuestion,
  assistantReply,
  askedLabels,
  limit = 3,
}: {
  userQuestion: string;
  assistantReply: string;
  askedLabels: string[];
  limit?: number;
}): Suggestion[] {
  const asked = new Set(askedLabels.map((label) => label.toLowerCase()));
  const text = haystack(userQuestion, assistantReply);

  const ranked = suggestions
    .map((item) => ({
      item,
      score: scoreSuggestion(item, text, userQuestion, asked),
    }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => b.score - a.score);

  const chosen: Suggestion[] = [];
  const usedTags = new Set<string>();

  for (const entry of ranked) {
    if (chosen.length >= limit) break;
    const overlap = entry.item.tags.some((tag) => usedTags.has(tag));
    if (overlap && entry.score < 4) continue;
    chosen.push(entry.item);
    for (const tag of entry.item.tags) usedTags.add(tag);
  }

  if (chosen.length < limit) {
    for (const item of suggestions) {
      if (chosen.length >= limit) break;
      if (asked.has(item.label.toLowerCase())) continue;
      if (userQuestion.toLowerCase() === item.label.toLowerCase()) continue;
      if (chosen.some((pick) => pick.label === item.label)) continue;
      chosen.push(item);
    }
  }

  return chosen.slice(0, limit);
}
