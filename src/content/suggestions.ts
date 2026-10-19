export type Suggestion = {
  label: string;
  featured?: boolean;
  tags: string[];
};

export const suggestions: Suggestion[] = [
  { label: "Why should I hire Jawad?", tags: ["hire", "general", "strengths"] },
  { label: "What's his current role?", tags: ["role", "aimyable", "current"] },
  { label: "How many years of experience?", tags: ["experience", "years", "timeline"] },
  {
    label: "Career timeline",
    featured: true,
    tags: ["timeline", "career", "experience", "educative", "motive", "aimyable"],
  },
  { label: "Tech stack", featured: true, tags: ["stack", "skills", "python", "aws", "django"] },
  { label: "Key metrics", featured: true, tags: ["metrics", "impact", "outcomes"] },
  { label: "Education", featured: true, tags: ["education", "nust", "degree"] },
  {
    label: "CI/CD and deployment experience",
    tags: ["cicd", "deploy", "codepipeline", "codebuild", "cdk", "ecs", "staging", "production"],
  },
  {
    label: "Tell me about Aimyable",
    tags: ["aimyable", "aimy", "agent", "llm", "rpa", "django", "voice"],
  },
  {
    label: "What did he build at Motive?",
    tags: ["motive", "speed", "kafka", "mqtt", "terraform", "fleet"],
  },
  {
    label: "AI and agent experience",
    tags: ["ai", "llm", "agent", "openai", "gemini", "rag", "pydantic"],
  },
  {
    label: "Cloud and AWS experience",
    tags: ["aws", "cloud", "lambda", "sqs", "terraform", "iot", "infrastructure"],
  },
  {
    label: "How well does he fit an AI engineer role?",
    tags: ["hire", "fit", "ai", "engineer", "role"],
  },
  {
    label: "Strongest projects to discuss",
    tags: ["projects", "portfolio", "work", "aimyable", "educative"],
  },
  {
    label: "Backend and API experience",
    tags: ["backend", "django", "rails", "api", "graphql", "websocket"],
  },
  {
    label: "Testing and quality practices",
    tags: ["testing", "pytest", "rspec", "cypress", "selenium", "quality"],
  },
  {
    label: "How can I contact him?",
    tags: ["contact", "email", "linkedin", "resume", "hire"],
  },
];

export const starterSuggestions = suggestions.filter(
  (item) =>
    item.label === "Why should I hire Jawad?" ||
    item.label === "What's his current role?" ||
    item.label === "How many years of experience?" ||
    item.featured,
);

export const suggestionLabels = suggestions.map((item) => item.label);
