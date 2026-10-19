export type TraceField = {
  key: string;
  value: string;
};

export type TraceHop = {
  label: string;
  detail: string;
  payload: TraceField[];
};

export type TraceScenario = {
  id: string;
  label: string;
  hops: TraceHop[];
};

export type ProjectTrace = {
  scenarios: TraceScenario[];
};

export const aimyableTrace: ProjectTrace = {
  scenarios: [
    {
      id: "setup",
      label: "Setup",
      hops: [
        {
          label: "User",
          detail: "A finance user asks the assistant to configure the organization.",
          payload: [
            { key: "event", value: "user_message" },
            { key: "text", value: "Set up this organization" },
          ],
        },
        {
          label: "Supervisor",
          detail:
            "The Vercel AI SDK supervisor uses OpenAI tool-calling and selects setup mode.",
          payload: [
            { key: "tool", value: "select_mode" },
            { key: "mode", value: "setup" },
          ],
        },
        {
          label: "Agent",
          detail:
            "A Gemini and pydantic-ai agent on the WebSocket server plans the setup steps.",
          payload: [
            { key: "agent", value: "pydantic-ai" },
            { key: "model", value: "gemini" },
            { key: "action", value: "plan_setup" },
          ],
        },
        {
          label: "Django",
          detail:
            "The API stores the organization setup so later runs stay scoped to that tenant.",
          payload: [
            { key: "service", value: "django" },
            { key: "write", value: "tenant_config" },
          ],
        },
      ],
    },
    {
      id: "process",
      label: "Process",
      hops: [
        {
          label: "User",
          detail: "A finance user asks Aimy to run an accounts-payable process.",
          payload: [
            { key: "event", value: "user_message" },
            { key: "text", value: "Run the open invoice process" },
          ],
        },
        {
          label: "Supervisor",
          detail:
            "The supervisor selects process mode and hands the run to an execution agent.",
          payload: [
            { key: "tool", value: "select_mode" },
            { key: "mode", value: "process" },
          ],
        },
        {
          label: "Agent",
          detail:
            "Gemini and pydantic-ai plan the steps for the live process on the WebSocket server.",
          payload: [
            { key: "agent", value: "pydantic-ai" },
            { key: "model", value: "gemini" },
            { key: "action", value: "plan_steps" },
          ],
        },
        {
          label: "Desktop",
          detail: "The agent drives the Windows desktop app through the planned steps.",
          payload: [
            { key: "target", value: "windows-desktop" },
            { key: "action", value: "drive_app" },
          ],
        },
        {
          label: "Queue",
          detail:
            "Django schedules the remaining work on SQS, and Lambda runs it outside the request.",
          payload: [
            { key: "queue", value: "sqs" },
            { key: "worker", value: "lambda" },
          ],
        },
      ],
    },
    {
      id: "api",
      label: "API",
      hops: [
        {
          label: "User",
          detail: "A finance user asks the assistant to pull data from a connected app.",
          payload: [
            { key: "event", value: "user_message" },
            { key: "text", value: "Pull the latest vendor bills" },
          ],
        },
        {
          label: "Supervisor",
          detail: "The supervisor selects API mode so the agent calls another product.",
          payload: [
            { key: "tool", value: "select_mode" },
            { key: "mode", value: "api" },
          ],
        },
        {
          label: "App",
          detail: "The agent invokes an email or accounting app through a tool call.",
          payload: [
            { key: "tool", value: "invoke_app" },
            { key: "app", value: "accounting" },
          ],
        },
        {
          label: "Django",
          detail: "The API records the result for that organization.",
          payload: [
            { key: "service", value: "django" },
            { key: "write", value: "api_result" },
          ],
        },
      ],
    },
    {
      id: "support",
      label: "Support",
      hops: [
        {
          label: "User",
          detail: "A finance user asks how to handle an invoice.",
          payload: [
            { key: "event", value: "user_message" },
            { key: "text", value: "How do I code this invoice?" },
          ],
        },
        {
          label: "Supervisor",
          detail: "The supervisor selects support mode instead of starting a process run.",
          payload: [
            { key: "tool", value: "select_mode" },
            { key: "mode", value: "support" },
          ],
        },
        {
          label: "Library",
          detail: "The agent retrieves the answer from the document library.",
          payload: [
            { key: "source", value: "document_library" },
            { key: "action", value: "retrieve" },
          ],
        },
        {
          label: "Aimy",
          detail: "The chat assistant returns that answer in the conversation.",
          payload: [
            { key: "assistant", value: "aimy" },
            { key: "response", value: "grounded_answer" },
          ],
        },
      ],
    },
  ],
};

export const motiveTrace: ProjectTrace = {
  scenarios: [
    {
      id: "speeding",
      label: "Speeding alert",
      hops: [
        {
          label: "Vehicle",
          detail: "A vehicle reports its speed while it is on the road.",
          payload: [
            { key: "source", value: "vehicle" },
            { key: "signal", value: "speed" },
          ],
        },
        {
          label: "Sign model",
          detail: "The camera model reads the posted speed sign.",
          payload: [
            { key: "detector", value: "speed-sign" },
            { key: "signal", value: "detected_limit" },
          ],
        },
        {
          label: "Here Maps",
          detail: "Here Maps supplies the speed limit for that road segment.",
          payload: [
            { key: "provider", value: "here-maps" },
            { key: "signal", value: "posted_limit" },
          ],
        },
        {
          label: "Decision",
          detail:
            "The service compares the vehicle speed with the limit and raises a speeding alert when the vehicle is over it.",
          payload: [
            { key: "alert", value: "speeding" },
            { key: "check", value: "over_posted_limit" },
          ],
        },
        {
          label: "MQTT",
          detail: "An AWS IoT rule matches the alert and publishes it over MQTT.",
          payload: [
            { key: "protocol", value: "mqtt" },
            { key: "rule", value: "speeding-alert" },
          ],
        },
        {
          label: "Kafka",
          detail: "The event is routed onto Kafka so a downstream webhook can process it.",
          payload: [
            { key: "bus", value: "kafka" },
            { key: "sink", value: "webhook" },
          ],
        },
      ],
    },
  ],
};
