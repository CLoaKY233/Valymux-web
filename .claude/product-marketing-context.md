# Product Marketing Context

*Last updated: 2026-03-26*

## Brand Pillars

**Clarity · Speed · Security** — in that order. These are not features. They are the principles we will never trade away.

| Pillar | What it means | Why it's non-negotiable |
|--------|--------------|------------------------|
| **Clarity** | One place to see every model, every parameter, every provider. No doc hunting. Configure visually, copy to code. | The #1 pain: "What does this model support again?" Bedrock model names, Anthropic thinking limits, OpenAI tool schemas — none of it should live in your head. |
| **Speed** | Rust-native. No GC pauses. Microsecond overhead by design. | A proxy that adds perceptible latency is worse than no proxy. We designed against this from day one. |
| **Security** | Credentials encrypted, auditable AGPL code, self-hosted option. Informed by supply chain incidents in the ecosystem. | Trust is the product. If we can't protect your API keys, nothing else matters. |

---

## Product Overview

**One-liner:** The LLM gateway that tells you exactly what each model supports — so you ship instead of reading docs.

**Previous one-liner (too generic):** "A Rust-powered LLM gateway that gives developers a single, secure API to route requests across any AI provider."

**What it does:** Valymux sits between your application and AI providers (OpenAI, Anthropic, etc.), providing:
- Unified API endpoint (OpenAI-compatible `/v1/chat/completions`)
- Intelligent request routing between providers
- Production-grade observability (Prometheus metrics, request tracing, latency tracking)
- Secure credential management (encryption at rest, virtual API keys, secret redaction from logs)
- Request validation, rate limiting, and cost tracking

**Product category:** Infrastructure/API Gateway for AI

**Product type:** Open source SaaS-ready backend / Self-hosted infrastructure

**Business model:** Open source (AGPL) core; potential value-add: managed hosting, advanced observability features, enterprise support

---

## Target Audience

**Primary persona:** Founding AI engineer at an early-stage startup (5–50 people). The person deciding which LLMs to call, which libraries to use, and how to wire it all together. They feel the pain directly.

**Target companies:**
- Early-stage AI startups (5–50 people) building multi-provider applications
- Mid-stage startups scaling AI features who hit provider fragmentation walls
- Developer teams tired of maintaining custom proxy/routing code

**Not yet:** Enterprise (they need different sales motion, different features). Bifrost targets enterprise at $40k/year. We don't. That's deliberate.

**Decision-makers:**
- Founding AI engineer (primary — feels the pain, wants the solution, can self-adopt)
- Backend/Platform engineers (implementation champion)
- Startup CTO/founder (approves the tool if it saves engineering time)

**Primary use case:** Centralizing access to multiple LLM providers into one stable API, reducing integration complexity and risk.

**Jobs to be done:**
- Avoid lock-in to a single LLM provider (API availability risk)
- Standardize how we call different LLM APIs (reduce glue code, speed up feature delivery)
- Understand what's happening with our LLM API calls (cost, latency, errors) for optimization and debugging

**Use cases:**
- Startups building with multiple models (e.g., GPT-4 + Claude + open source) and need to swap them without code changes
- Cost-conscious teams that route expensive requests to cheaper providers based on task complexity
- Teams managing internal AI platforms that need audit trails and request logging
- Companies evaluating multiple provider integrations before committing

---

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| **Backend/Platform Engineer** | Code quality, operational simplicity, reliability | Managing multiple SDK/API patterns, debugging cross-provider issues, vendor lock-in | One clean API, observability to see what's broken, Rust = fewer runtime surprises |
| **Startup Founder/CTO** | Speed to market, cost control, risk mitigation | Choosing the right AI provider, switching providers mid-flight costs time, security concerns | Stay flexible, control costs, move fast without rewrites |
| **Enterprise Infra/DevOps Lead** | Security, auditability, compliance, self-hosting | Vendor dependencies, data residency, secrets management | Self-hostable, auditable code, secure credential handling, AGPL transparency |
| **ML/AI Product Lead** | Experimentation velocity, cost, quality | Testing different models, comparing outputs, cost per inference spirals | Route requests intelligently, A/B test providers, track metrics |

---

## Problems & Pain Points

**Core problem:** Developers building with LLMs face fragmentation—each provider has a different API, SDKs, authentication pattern, and security model. Integrating multiple providers means managing multiple SDKs, credential stores, and observability systems. One provider outage breaks everything.

**Why alternatives fall short:**
- **LiteLLM (Python):** Widespread use has made it a supply chain risk (see recent incidents); dynamic imports and PyPI dependency chain create vulnerability surface. Not designed for production observability.
- **Built-in provider switching logic:** Scattered across app code; difficult to audit, test, and modify. Tight coupling to provider APIs.
- **Manual proxy setup:** Developers roll their own Nginx/HAProxy logic; reinventing auth, rate limiting, and logging for each project.
- **Single-provider frameworks:** Anthropic's SDK, OpenAI Python client—forces you to choose upfront.

**What it costs them:**
- Time: Days of SDK integration, credential management, error handling per provider
- Money: Provider lock-in, inability to migrate when costs spike or alternatives emerge
- Reliability: Outages at one provider cascade to the entire application
- Visibility: No single pane of glass for LLM request metrics; debugging is slow and painful

**Emotional tension:**
- Fear: "What if my chosen provider shuts down or changes pricing?"
- Frustration: "Why do I have to write integration code for every LLM provider?"
- Overwhelm: "There are 50 LLM providers now. Which one should I bet on?"
- Anxiety: "Are my API keys stored securely? Can someone exfiltrate them?"

---

## Competitive Landscape

**Direct Competitors:**
- **Bifrost (Maxim AI):** Self-hosted alternative, but priced for enterprise (~$40k/year). Feature-overwhelming for small teams. Reported issues: state sync bugs across multiple instances (cache doesn't propagate without restart), slow log loading, complex setup. The price alone kills it for startups.
- **LiteLLM (Python library):** Widely used but codebase quality is low. Supply chain attack in March 2026 showed how a compromised Python dependency can silently exfiltrate credentials. No proper observability. Not designed for self-hosted production.
- **Langfuse:** Excellent observability but doesn't handle routing/credential management. Complementary, not competitive.
- **Built-in provider SDKs:** No multi-provider support. Tight coupling means rewrites on every provider change.

**Why they fall short:**
- Bifrost: Right concept, wrong price, wrong complexity for early startups
- LiteLLM: Security liability, low-quality codebase, no clear production path
- SDKs: Provider lock-in, scattered credentials, no unified visibility

**Do not name competitors directly on the website.** Reference them as "existing alternatives" or describe their patterns without naming them.

---

## Differentiation

**Key differentiators:**
1. **Rust-based, production-hardened:** Memory-safe by design; no garbage collection; no dynamic code execution risks. Incident-resistant.
2. **Built-in observability:** Request tracing, Prometheus metrics, latency/error tracking out of the box. No separate tool required.
3. **Secure by default:** Encryption at rest, virtual API keys, secret redaction, credential isolation. Designed after learning from supply chain attacks.
4. **OpenAI-compatible API:** Drop-in replacement; zero rewrite needed. Works with any OpenAI SDK.
5. **Open source + auditable:** AGPL license; security-conscious users can review every line. No surprise backdoors.
6. **Self-hostable:** Deploy on your own infrastructure; no vendor lock-in, no external API calls to proprietary services.

**How we do it differently:**
- Valymux is written in Rust, not Python. This means:
  - Memory safety eliminates entire categories of vulnerabilities (buffer overflows, use-after-free)
  - No dynamic code execution (no .pth hooks, no runtime imports that can be compromised)
  - Fast (compiled, no GC pauses), reliable (explicit error handling), and auditable
- Observability is built in, not bolted on. Every request is traced and metered.
- Security is designed for threat models informed by recent incidents (LiteLLM supply chain attack, etc.).

**Why customers choose us:**
- Developers: "I can integrate Valymux in one afternoon with one API call."
- Founders: "We stay flexible. If OpenAI gets expensive, we route to Claude in minutes."
- Infra teams: "It's self-hosted, auditable, and secure by design."
- Cost-conscious orgs: "We can A/B test providers and optimize spend without touching app code."

---

## Objections

| Objection | Response |
|-----------|----------|
| "Why not just use LiteLLM? It's simpler." | LiteLLM is easy to integrate but comes with supply chain risk (see the recent attack); it's not designed for production observability or self-hosting. Valymux is built for reliability and transparency. You're not paying for simplicity; you're paying for safety and control. |
| "We're already heavily invested in a single provider (OpenAI)." | Fair. Valymux shines when you want to experiment with alternatives or hedge provider risk. Even with OpenAI, Valymux gives you observability and credential isolation you don't get otherwise. Start small. |
| "Doesn't this add latency?" | Valymux is written in Rust and adds ~5ms of overhead (proxy processing, routing decision). Most requests to LLMs are >1s (network + inference), so the overhead is negligible. You'll save more time debugging provider issues than you lose to proxy latency. |
| "Self-hosting sounds complex." | We provide Docker images and Helm charts. If you can run a database, you can run Valymux. Most customers use it as a single, isolated container in their VPC. |
| "Isn't observability just for debugging?" | Observability is also for cost optimization. You can see which models are slowest, which providers have the highest error rates, and optimize spend accordingly. That ROI often pays for Valymux in minutes. |

**Anti-persona:**
- Solo developers building a simple chatbot with a single provider API (you don't need this complexity yet)
- Organizations fully committed to a single provider with no multi-provider strategy
- Teams that can't run Docker/self-hosted infrastructure (but we're exploring managed options)

---

## Switching Dynamics (Jobs to be Done: Four Forces)

**Push (what frustrates them about current state):**
- Multiple SDKs to manage, different error handling patterns, different rate limit models
- No visibility into which provider is failing or why
- Credentials scattered across environment files, CI/CD secrets, application code
- Each provider change requires code review + deployment

**Pull (what attracts them to Valymux):**
- One API; multiple providers accessible without code changes
- Request metrics and tracing visible in seconds
- Unified credential management with audit trails
- OpenAI-compatible; uses existing client libraries
- Open source; can audit and modify if needed

**Habit (what keeps them stuck with current approach):**
- "It works. Why fix it?"
- Team inertia; existing code is already written with provider SDKs
- Fear of adding a new dependency / proxy layer
- Low urgency (until a provider outage hits or costs spike)

**Anxiety (worries about switching):**
- "What if the proxy adds latency?"
- "Is Valymux secure? How do I know?"
- "Will this break our existing integrations?"
- "What if Valymux stops being maintained?"

---

## Customer Language

**How they describe the problem:**
- "We're using OpenAI today but want to avoid lock-in."
- "Managing multiple AI APIs is a nightmare."
- "We need to see what's happening with our LLM calls."
- "Every provider has a different way to call it. We keep rewriting integration code."
- "Our ops team won't let us store API keys in the app. We need a credential proxy."
- "The LiteLLM supply chain attack scared us. We need something we can audit."

**How they describe us (once positioned correctly):**
- "Valymux is our unified interface to all AI providers."
- "It's like an API gateway but for LLMs."
- "We switched to Valymux so we could experiment with different models without rewrites."
- "The observability alone saved us thousands in wasted API calls."
- "It's Rust-based so I trust it more than Python libraries for this."

**Words to use:**
- Production-grade
- Secure by design
- Observable
- Flexible / Flexible infrastructure
- Incident-resistant (learned from LiteLLM)
- Auditable
- Control (as in: stay in control)
- Unified
- Zero lock-in

**Words to avoid:**
- "Lightweight proxy" (undersells it)
- "Replacement for LiteLLM" (defensive, creates comparison mindset)
- "AI gateway" alone (too generic, doesn't signal security angle)
- "One simple API" (not credible at the enterprise level where we're strongest)

**Glossary:**

| Term | Meaning |
|------|---------|
| Virtual API key | A key Valymux generates for you to use in your application; the real provider API keys are stored separately in Valymux. Allows you to rotate/revoke without touching your code. |
| Provider routing | Logic that decides which LLM provider (OpenAI, Anthropic, etc.) receives a given request based on rules. |
| Observability | Request-level tracing, metrics (latency, error rate, cost), and logging. Answers "what happened with my LLM calls?" |
| Credential isolation | Provider API keys are encrypted at rest and separated from application code. |
| Self-hosting | Running Valymux on your own infrastructure (your VPC/cluster) rather than a managed service. |

---

## Brand Voice

**Brand references:** Zed editor + SurrealDB. Both Rust-based. Both opinionated. Both beautiful without being flashy. Both speak to engineers, not marketing departments. That's the aesthetic.

**Tone:** Direct, precise, confident. We don't hedge. We don't use "simple" as a filler word. We say what a thing does and why it matters.

**Style:** Matter-of-fact. Show the problem. Show the solution. Show the code. Admit what's not built yet. No puffery. No enterprise buzzwords.

**Personality:**
- **Precise:** We say AES-256-GCM, not "encrypted." We say SHA-256 hash, not "secure."
- **Honest:** We're early. We say so. MVP not ready. We say that too.
- **Security-first:** We don't shy away from talking about supply chain risk. We chose Rust specifically.
- **Feedback-driven:** We don't pretend to know what to build. We ask and we listen.

**Words to use:** Clarity · Precise · Auditable · Self-hostable · No doc hunting · Rust-native · Feedback-driven

**Words to avoid:** "Simple" (generic) · "Powerful" (filler) · "Enterprise-grade" (implies wrong audience) · "AI stack" (overused) · "Unlock" (consultant-speak)

---

## Proof Points

**Metrics to develop:**
- Latency overhead (target: <10ms typical)
- Uptime / reliability (target: 99.9%+)
- Security audit results (if we conduct them)
- Cost savings from provider routing / A/B testing (if customers share)

**Current proof points:**
- Open source on GitHub (auditability)
- Rust + AGPL (security + transparency)
- Feature completeness (request tracing, rate limiting, credential mgmt working today)
- Recent commits and active maintenance

**Testimonials to seek:**
- Early adopters / design partners who switched from LiteLLM or hand-rolled solutions
- Quotes on time saved, visibility gained, flexibility achieved

**Value themes:**

| Theme | Proof |
|-------|-------|
| Production reliability | Built in Rust (memory-safe, no GC pauses); request tracing and metrics built-in; handles multi-provider failover |
| Security by design | Learned from supply chain incidents (LiteLLM); encryption at rest, credential isolation, AGPL transparency, self-hostable |
| Developer velocity | OpenAI-compatible API (zero rewrite); multi-provider support (feature flag, no code changes); observability (debug faster) |
| Cost control | Request routing (choose cheaper provider per request); metrics (see waste); A/B testing support (optimize spend) |
| No lock-in | Self-hostable, open source, portable credentials via virtual API keys |

---

## Goals

**Business goal:** Establish Valymux as the production-grade, security-first LLM gateway for teams building with multiple providers.

**Conversion action:** Get developers to:
1. Star the repo (signals interest, builds credibility)
2. Self-host or try a managed instance (gets real feedback)
3. Integrate into a production service (validates product-market fit)

**Current metrics (as of 2026-03-26):**
- 5 GitHub stars (very early)
- No user feedback yet
- MVP complete (HTTP proxy, observability, credential mgmt in place)

**Key milestones to hit:**
- 50+ GitHub stars (signals traction)
- First 5 production users with feedback
- Security audit or third-party review (proof of security)
- Managed hosting option (reduce friction for cloud-native teams)

---

## Strategic Context: The LiteLLM Incident Opportunity

The March 2026 LiteLLM supply chain attack (Trivy compromise → backdoored PyPI packages → credential theft) is a watershed moment. Developers are now asking: "How do I know my LLM infrastructure is safe?"

**How to use this in positioning (without being exploitative):**
- Lead with "We learned from how this happened" rather than "LiteLLM is bad"
- Highlight Rust's inherent properties (memory safety, no .pth hooks, no dynamic code execution)
- Show we've thought about threat models: encryption at rest, credential isolation, AGPL transparency
- Position as: "Built from the ground up with production incidents in mind"
- Link to an article or post about supply chain attack surface area in LLM infrastructure

**Talking points:**
- "No dependency on supply chains we don't control" (single binary, minimal dependencies)
- "You can audit every line" (AGPL)
- "Secrets don't flow through untrusted code" (credential isolation)
- "Self-hosted option means no external vendors" (if needed)

This isn't fear-mongering; it's acknowledging a real risk and showing how our design mitigates it.
