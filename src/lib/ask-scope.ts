import { suggestionLabels } from "@/content/suggestions";

export const REFUSAL =
  "I only answer questions about Jawad Bukhari: his work, his background, or how closely he fits a role you want to hire for.";

const starters = new Set(suggestionLabels.map((label) => label.toLowerCase()));

const personOrHiring =
  /\b(jawad|bukhari|he|his|him|hire|hiring|hired|candidate|fit|resume|résumé|cv)\b/i;

const work =
  /\b(experience|background|career|timeline|role|job|work|project|stack|skill|skills|education|metric|metrics|nust|aimyable|aimy|motive|keeptruckin|educative|codeninja|infostack|mcards|rag|llm|agent|agents)\b/i;

const tech =
  /\b(aws|amazon web|cloud|gcp|azure|terraform|kubernetes|docker|django|flask|rails|ruby|python|typescript|javascript|react|next\.?js|openai|gemini|kafka|mqtt|ci\/cd|cicd|devops|lambda|redis|postgres|graphql|cdk|ecs|sqs)\b/i;

const experienceDepth =
  /\b(how many years|years of experience|how much experience|experience (in|with|using|on))\b/i;

const hiring =
  /\b(hire|hiring|hired|candidate|fit|recruit|contract|freelance|job description|job posting|we are looking|we're looking|this role|the role|how well|good fit)\b/i;

const jobPosting =
  /\b(requirements|responsibilities|qualifications|must have|nice to have|years of experience|full[- ]time|senior|staff|engineer role)\b/i;

const offTopic =
  /\b(poem|lyrics|joke|recipe|weather|horoscope|bitcoin|crypto|stock price|homework|translate this|essay|short story|song)\b/i

const jailbreak =
  /ignore (all |any )?(previous|prior|above)|system prompt|you are now|jailbreak|developer mode/i;

const followUp =
  /^(tell me more\.?|more\.?|go on\.?|expand\.?|why\??|when\??|where\??|what about .+|how about .+|and (his|the) .+)$/i;

function onTopic(message: string) {
  const text = message.trim();
  if (!text || jailbreak.test(text)) return false;
  if (starters.has(text.toLowerCase())) return true;
  if (offTopic.test(text) && !hiring.test(text)) return false;
  if (hiring.test(text)) return true;
  if (jobPosting.test(text) && text.length > 120) return true;
  if (experienceDepth.test(text) && (personOrHiring.test(text) || work.test(text) || tech.test(text))) {
    return true;
  }
  if (tech.test(text) && /\b(experience|skill|skills|background|work|know|used|using)\b/i.test(text)) {
    return true;
  }
  return personOrHiring.test(text) || work.test(text) || tech.test(text);
}

export function isInScope(message: string, earlierUserMessages: string[] = []) {
  if (onTopic(message)) return true;
  const continued = earlierUserMessages.some((earlier) => onTopic(earlier));
  return continued && followUp.test(message.trim());
}
