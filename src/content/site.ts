import { aimyableTrace, motiveTrace, type ProjectTrace } from "@/content/traces";

export type Role = {
  title: string;
  company: string;
  location: string;
  dates: string;
  bullets: string[];
};

export type Project = {
  name: string;
  summary: string;
  details: string;
  stack: string[];
  href?: string;
  linkLabel?: string;
  trace?: ProjectTrace;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export const profile = {
  name: "Jawad Bukhari",
  role: "Sr. Software Engineer & Sr. AI Engineer",
  focus: "Agentic AI, LLMs, RAG",
  headline: "I build AI systems that do more than generate text.",
  summary:
    "I design and ship intelligent applications, reliable backend services, and cloud infrastructure that turns ideas into working products.",
  email: "syedjawadbukhari5@gmail.com",
  phoneDisplay: "+92 306 7935420",
  phoneTel: "+923067935420",
  github: "https://github.com/jawadalishah5",
  githubLabel: "github.com/jawadalishah5",
  linkedin: "https://www.linkedin.com/in/jawad-bukhari-66b021181/",
  linkedinLabel: "linkedin.com/in/jawad-bukhari-66b021181",
  resumePath: "/resume.pdf",
  resumeFilename: "Jawad_Bukhari_Resume.pdf",
  profileImage: "/profile.jpg",
  brandLabel: "askJawad",
};

export const nav = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export const experience: Role[] = [
  {
    title: "Sr. Software Engineer",
    company: "Aimyable",
    location: "Dover, DE (remote)",
    dates: "Feb 2025 – Present",
    bullets: [
      "Built and shipped multi-agent LLM systems for a production accounts payable and RPA platform used by finance teams.",
      "Built Aimy, the product’s chat assistant, along with a GPT-Live voice agent and a HeyGen AI avatar. OpenAI tool-calling through the Vercel AI SDK selects setup, process, API, or support mode.",
      "Implemented Gemini and pydantic-ai execution agents in the WebSocket server to plan steps, drive Windows desktop RPA, invoke email and accounting apps, and retrieve answers from the document library during live process runs.",
      "Owned AWS CI/CD (CodePipeline, CodeBuild, CDK, and ECS) for Next.js, Django, and the WebSocket worker, including staging validation and manual production approval gates.",
      "Built Django scheduling with AWS SQS and Lambda to run asynchronous tasks triggered by AI agents.",
      "Implemented Django-tenants and queues so multiple organizations can run AI-driven processes independently without deadlocks.",
      "Integrated Windows permission flows for automated signed updates, notifications, and secure token retrieval from the Django backend.",
    ],
  },
  {
    title: "Software Engineer L4",
    company: "Motive (formerly KeepTruckin)",
    location: "Lahore, Pakistan (remote)",
    dates: "Jun 2025 – Feb 2026",
    bullets: [
      "Improved production vehicle speeding detection by increasing the accuracy and reliability of safety alerts, using Here Maps data and AI-based speed sign detection.",
      "Built MQTT to Kafka alert routing with AWS IoT rules so downstream webhooks could process events in real time.",
      "Deployed and operated regional AWS services for EU and North America, contributing Terraform changes for consistent rollouts.",
      "Resolved performance bottlenecks and kept data updates continuous so detection stayed accurate.",
    ],
  },
  {
    title: "Backend Engineer",
    company: "CodeNinja (contracted to 3E)",
    location: "Lahore, Pakistan (remote)",
    dates: "Mar 2025 – Jun 2025",
    bullets: [
      "Built backend APIs for an internal AI tool at 3E that retrieves relevant resources for customer support.",
      "Integrated services with AI models and maintained data-pipeline evaluation paths so retrieval and response quality stayed consistent.",
    ],
  },
  {
    title: "Software Engineer",
    company: "InfoStack",
    location: "Lahore, Pakistan",
    dates: "Nov 2024 – Feb 2025",
    bullets: [
      "Developed and maintained the mCards application in Ruby on Rails, including the admin dashboard and sponsor-bank features that put custom offers on user-issued cards.",
    ],
  },
  {
    title: "Project Developer → Technical Lead",
    company: "Educative, Inc.",
    location: "Lahore, Pakistan",
    dates: "Jun 2021 – Sep 2024",
    bullets: [
      "Developed Docker environments for interactive widgets on Educative’s standalone projects, using Flask to manage sessions and Redis to keep learner progress.",
      "Implemented automated testing with PyTest, Selenium, and Cypress, and as technical lead reviewed code against team practices.",
      "Worked with external stakeholders on requirements and brought automated testing pipelines into the development lifecycle.",
    ],
  },
];

export const projects: Project[] = [
  {
    name: "Aimyable",
    href: "https://app.aimyable.com/",
    linkLabel: "app.aimyable.com",
    summary:
      "A production accounts payable and RPA platform used by finance teams, with multi-agent LLM systems in the product.",
    details:
      "I built Aimy, the chat assistant, along with a GPT-Live voice agent and a HeyGen AI avatar. OpenAI tool-calling selects setup, process, API, or support mode, and Gemini plus pydantic-ai agents plan steps, drive Windows desktop RPA, and pull answers from the document library during live runs.",
    stack: [
      "OpenAI",
      "Vercel AI SDK",
      "Gemini",
      "pydantic-ai",
      "Django",
      "Next.js",
      "AWS",
    ],
    trace: aimyableTrace,
  },
  {
    name: "Motive · speed sign detection",
    href: "https://helpcenter.gomotive.com/hc/en-us/articles/30942636130077-Speeding",
    linkLabel: "Motive · Speeding (product docs)",
    summary:
      "Production fleet safety alerts that combine map data, detected speed limits, and vehicle telemetry so fleets can catch speeding events reliably.",
    details:
      "At Motive I worked on speeding detection in production: improving accuracy and reliability of alerts using Here Maps data and AI-based speed sign detection, alongside real-time alert routing on AWS.",
    stack: [
      "Here Maps",
      "Computer vision",
      "MQTT",
      "Kafka",
      "AWS IoT",
      "Terraform",
      "Go",
    ],
    trace: motiveTrace,
  },
  {
    name: "After School Life",
    href: "https://afterschoollife.herokuapp.com/",
    linkLabel: "afterschoollife.herokuapp.com",
    summary:
      "A site for a Santa Clara County nonprofit that runs after-school programs across multiple locations.",
    details:
      "Handled course cataloging, scheduling, and registration, with RSpec and Capybara coverage for authentication and payment flows.",
    stack: [
      "Ruby on Rails",
      "Next.js",
      "Material UI",
      "PostgreSQL",
      "GraphQL",
      "Devise",
      "AWS S3",
      "Vercel",
      "RSpec",
    ],
  },
  {
    name: "E-commerce microservices",
    href: "https://www.educative.io/projects/unleashing-djangos-power-building-agile-microservice",
    linkLabel: "Educative · Django microservices",
    summary:
      "RESTful Django microservices for core commerce capabilities and communication between services.",
    details:
      "Added OAuth2 authentication and an administrative analytics dashboard for monitoring.",
    stack: ["Python", "Django", "Docker", "OAuth2", "REST APIs", "SQLite"],
  },
  {
    name: "Real-time chat",
    href: "https://www.educative.io/projects/build-a-chat-room-application-using-actioncable-in-ruby-on-rails",
    linkLabel: "Educative · ActionCable chat",
    summary:
      "A high-concurrency chat platform using ActionCable and Redis WebSockets for live message broadcasting.",
    details:
      "Unit and integration tests covered live channels and sessions with RSpec and Capybara, including checks against simulated user load.",
    stack: [
      "Ruby on Rails",
      "ActionCable",
      "Redis",
      "GraphQL",
      "OAuth",
      "ActiveJob",
      "RSpec",
    ],
  },
  {
    name: "Serverless Rails on AWS",
    href: "https://www.educative.io/projects/deploying-a-ruby-on-rails-application-on-aws-using-sam",
    linkLabel: "Educative · Rails on AWS SAM",
    summary:
      "An interactive Cloud and DevOps project that walks through deploying a Rails e-learning app with AWS SAM.",
    details:
      "Automated tests validated Lambda data processing and API Gateway integration, with Postman performance checks and distributed tracing.",
    stack: [
      "AWS SAM",
      "Lambda",
      "API Gateway",
      "S3",
      "EC2",
      "Ruby on Rails",
      "Postman",
      "RSpec",
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "AI systems",
    items: [
      "OpenAI",
      "GPT-Live",
      "Gemini",
      "pydantic-ai",
      "Vercel AI SDK",
      "LLM routing",
      "RAG",
      "OpenAPI integrations",
    ],
  },
  {
    label: "Backend",
    items: [
      "Python",
      "Go",
      "Ruby",
      "Django",
      "Ruby on Rails",
      "FastAPI",
      "Flask",
      "REST APIs",
      "GraphQL",
      "WebSockets",
    ],
  },
  {
    label: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Material UI"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "Redis", "Firebase", "SQL"],
  },
  {
    label: "Cloud and infrastructure",
    items: [
      "AWS Lambda",
      "SQS",
      "S3",
      "EC2",
      "CodePipeline",
      "CodeBuild",
      "CDK",
      "ECS",
      "AWS IoT",
      "Terraform",
      "Docker",
      "Kubernetes",
      "Kafka",
      "CI/CD",
    ],
  },
  {
    label: "Testing",
    items: ["PyTest", "RSpec", "Selenium", "Cypress", "Capybara"],
  },
];

export const education = {
  school: "National University of Sciences and Technology (NUST)",
  location: "Islamabad, Pakistan",
  degree: "Bachelor of Engineering, Software Engineering",
  dates: "2017 – 2021",
};
