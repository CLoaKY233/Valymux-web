export const faqs = [
  {
    q: "What is Valymux?",
    a: "Valymux is an LLM gateway, proxy, and observability platform for developers who need one stable way to work across multiple AI providers.",
  },
  {
    q: "Who is it for?",
    a: "AI engineers, backend teams, startups, and anyone tired of rebuilding provider-specific glue code every time the ecosystem changes.",
  },
  {
    q: "What problem does it solve?",
    a: "It solves the integration chaos that comes from juggling multiple providers, different request formats, changing model capabilities, and scattered observability.",
  },
  {
    q: "Is the product ready today?",
    a: "Not yet. We are still building the core backend and product foundation, and the site is here to show progress, invite feedback, and start building an audience early.",
  },
  {
    q: "What makes Valymux different?",
    a: "It is built around three principles: Clarity (every model's capabilities visible in one place, no doc hunting), Speed (Rust-native, no GC overhead, designed to never be your bottleneck), and Security (non-negotiable — encrypted credentials, auditable AGPL code, self-hosted option).",
  },
  {
    q: "How is Valymux different from existing LLM gateways?",
    a: "Most alternatives are either too expensive for startups, have codebases that have raised security concerns, or require significant configuration without telling you what each model actually supports. Valymux is focused on three things: showing you exactly what each model supports so you stop hunting through docs, staying fast by design, and keeping your credentials secure by default.",
  },
  {
    q: "Is Valymux safe to use with production API keys?",
    a: "Provider keys are encrypted at rest with AES-256-GCM. Virtual keys are stored as SHA-256 hashes — the raw key is shown once on creation, never stored. Logs never contain secrets. The crypto code is AGPL and fully auditable. If you need stricter control, self-host — your keys never leave your infrastructure.",
  },
  {
    q: "What providers are supported first?",
    a: "OpenAI and Anthropic are the first provider paths in the codebase, with a design that can expand beyond them.",
  },
  {
    q: "Is it open source?",
    a: "Yes, completely. GitHub: github.com/cloaky233/Valymux",
  },
  {
    q: "Will the core be free?",
    a: "We want to keep as much of the value as possible free, especially the parts developers need most.",
  },
  {
    q: "What is the MVP timeline?",
    a: "We are targeting Q2 2026.",
  },
  {
    q: "Can I give feedback now?",
    a: "Yes — that is exactly what we want. We are building this for developers, and the best feedback comes early.",
  },
];
