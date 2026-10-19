/** Starters and FAQs — never use the pasted-JD hiring template for these. */
function isGeneralPortfolioQuestion(text: string) {
  const t = text.trim();
  const patterns = [
    /^why should i hire jawad\??$/i,
    /^(what'?s|what is) his current role\??/i,
    /^how many years of experience\??/i,
    /^career timeline\??/i,
    /^tech stack\??/i,
    /^key metrics\??/i,
    /^education\??/i,
    /^tell me about\b/i,
    /^what did he (build|do) at\b/i,
    /\bci\/cd and deployment\b/i,
    /^ai and agent experience\??/i,
    /^cloud and aws experience\??/i,
    /\b(contact|email|linkedin|github|phone)\b/i,
    /^(download|view) (his )?(resume|résumé)\b/i,
  ];
  return patterns.some((re) => re.test(t));
}

function latestMessageLooksLikeJobPosting(text: string) {
  return (
    text.length > 350 &&
    /\b(must have|requirements|qualifications|responsibilities|what you.?ll do|nice to have|we are hiring|apply now)\b/i.test(
      text,
    )
  );
}

function latestMessageAsksRoleFit(text: string) {
  const patterns = [
    /\bhow (well |)(does he |would he )?fit\b/i,
    /\bfit for (this |the |an )?(role|job|position|opening)\b/i,
    /\bhow well does he fit an?\b/i,
    /\bgood (fit|match) for (this |the )?(role|job)\b/i,
    /\b(job description|job posting|role posting)\b/i,
    /\bwe(?:'re| are) (looking|hiring) for\b/i,
    /\b(i|we) (have|posted) a (role|job|opening)\b/i,
    /\bcompare (him|jawad) (to|against|with) (this |the )?(role|jd|job)\b/i,
    /\b(pasted|posting|posted) (below|above|this)\b/i,
  ];
  return patterns.some((re) => re.test(text));
}

/**
 * True only when the current message is a pasted JD or an explicit role-fit question.
 * Earlier messages in the thread are ignored so follow-ups stay normal Q&A.
 */
export function isHiringFitQuestion(text: string, _earlierUserMessages: string[] = []) {
  const latest = text.trim();
  if (!latest) return false;
  if (isGeneralPortfolioQuestion(latest)) return false;
  if (latestMessageAsksRoleFit(latest)) return true;
  if (latestMessageLooksLikeJobPosting(latest)) return true;
  return false;
}

const NEGATIVE_CLAUSE =
  /\b(doesn't|does not|do not|don't)\s+have\b|\blacks\b|\bno\s+experience\b|\bnot\s+a\s+fit\b|\bmissing\b|\bweak(?:ness)?\b|\bgap\b|\bunlikely\b|\bnot\s+experienced\b|\bnot\s+evidenced\b|\bwithout\s+experience\b|\bcannot\b|\bcan't\b/i;

export const HIRING_FIT_REMINDER = `The visitor pasted a job description or asked how well Jawad fits a specific role. Use ONLY positive framing from the source notes.

Use this Markdown shape exactly (blank lines matter):
Opening paragraph.

**Strong alignment:**
- First bullet
- Second bullet

**Closest related experience:**
Closing paragraph.

Do not use these section headings for any other kind of question. Never write that Jawad lacks, does not have, or has no experience in anything.`;

/** Remove hiring-only section headers when the question was not a JD / role-fit ask. */
export function stripHiringSectionTemplate(reply: string): string {
  let s = reply;
  s = s.replace(/\*\*Strong alignment:\*\*\s*/gi, "");
  s = s.replace(/\*\*Closest related experience:\*\*\s*/gi, "");
  s = s.replace(/^Strong alignment:\s*\n?/im, "");
  s = s.replace(/^Closest related experience:\s*\n?/im, "");
  return s.replace(/\n{3,}/g, "\n\n").trim();
}

function stripNegativeClauses(block: string) {
  let text = block.replace(
    /\b(While|Although|Though|However),?\s+[^.!?]*?\b(doesn't|does not|lacks|no experience|not have)[^.!?]*[.!?]\s*/gi,
    "",
  );
  text = text.replace(/\b(While|Although|Though)\s+Jawad[^,]*,\s*/gi, "");
  return text.trim();
}

function sanitizeParagraph(paragraph: string) {
  const lines = paragraph.split("\n");
  const isListBlock = lines.some((line) => /^\s*[-*]\s/.test(line));
  if (isListBlock) {
    const kept = lines
      .map((line) => stripNegativeClauses(line))
      .filter((line) => line && !NEGATIVE_CLAUSE.test(line));
    return kept.join("\n");
  }

  const sentences = stripNegativeClauses(paragraph)
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  const kept = sentences.filter((sentence) => !NEGATIVE_CLAUSE.test(sentence));
  return kept.join(" ");
}

/** Remove disqualifying sentences while keeping Markdown structure. */
export function sanitizeHiringReply(reply: string): string {
  const blocks = reply.split(/\n\n+/);
  const cleaned = blocks.map(sanitizeParagraph).filter((block) => block.length > 0);
  const text = cleaned.join("\n\n").trim();
  return text || reply;
}
