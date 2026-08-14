// Landing page content. Copy lives here; layout lives in components/landingPro.tsx.
//
// Positioning: one unified "AI-Native" message across three practices —
// AI Training, AI Consulting and Applied AI — carried by a collective that
// builds and runs its own agentic software.
//
// Disclosure rules agreed with the founder:
//   · Named clients limited to UP Police and Warburg Pincus (+ its portfolio companies).
//   · No named testimonials, no per-participant pricing.
//   · Facilitator identities sit behind progressive disclosure (see `facilitators`).

/* ------------------------------------------------------------------ hero */

export const hero = {
  eyebrow: "AI-Native by practice",
  titleLead: "Changing how the world",
  titleAccent: "works.",
  body:
    "We are a collective of engineers, designers and thinkers who believe that AI can be and should be used for good. " +
    "We do not only build and scale agentic software " +
    "but we also aim to do so equitably and sustainably.",
  pills: ["AI Training", "AI Consulting", "Applied AI"],
};

export const stats: { value: string; label: string }[] = [
  { value: "700+", label: "Professionals trained" },
  { value: "30+", label: "CXOs, MDs & HODs" },
  { value: "10+", label: "Enterprise & Gov Orgs" },
  { value: "5+", label: "AI Agents Deployed" },
];

/* --------------------------------------------------------------- practices */

export const services: { title: string; blurb: string }[] = [
  {
    title: "AI Training",
    blurb:
      "Hands-on upskilling for leadership and engineering teams — GenAI foundations through to multi-agent architectures.",
  },
  {
    title: "AI Consulting",
    blurb:
      "Where AI actually pays back: use-case discovery, adoption roadmaps, build-vs-buy, governance and the economics of running it.",
  },
  {
    title: "Applied AI",
    blurb:
      "Forward-deployed engineers shipping production agents inside your organisation, alongside your people.",
  },
  {
    title: "Startup Advisory",
    blurb:
      "Tech incubation and MVP delivery across Civic Tech, FinTech and AI — including mentorship for funded teams.",
  },
];

/** The collective's reason for building — kept from the original site. */
export const ethos =
  "We help leaders and tech orgs navigate the tumultous waters of AI adoption.";

/* ------------------------------------------------------------- ai training */

export interface Programme {
  kicker: string;
  title: string;
  format: string;
  blurb: string;
  outcomes: string[];
  flagship?: boolean;
  /** Drafted without source material — review before publishing. */
  draft?: boolean;
}

export const programmes: Programme[] = [
  {
    kicker: "Flagship · Executive",
    title: "The AI-Native Leader",
    format: "12 weeks · hybrid · cohort of 20–25",
    blurb:
      "Every leader builds and runs their own multi-agent AI chief of staff — and writes an AI " +
      "adoption roadmap for their function.",
    outcomes: [
      "A personal SuperAgent, built two weeks at a time",
      "Working prototypes to real business problems, not proposals",
      "Governance, data safety and token economics, installed as instinct",
      "A per-function AI adoption roadmap, authored by each leader",
    ],
    flagship: true,
  },
  {
    kicker: "Taster · Executive",
    title: "The Executive AI Masterclass",
    format: "120 minutes · on site",
    blurb:
      "The room picks an agent; we specify and build it live while covering the tools your leaders " +
      "already have licences for.",
    outcomes: [
      "Copilot vs Claude vs Gemini vs ChatGPT, compared on identical work",
      "An executive prompt library, reusable on Monday",
      "A data analyst on demand — spreadsheets interrogated in plain English",
      "A custom agent, specified and running inside the session",
    ],
  },
  {
    kicker: "Hands-on · Engineering",
    title: "Engineering Tracks",
    format: "Three tiers · one day to multi-week",
    blurb:
      "The builder path, run by the engineers who ship our own agents — from AI literacy to " +
      "multi-agent systems in production.",
    outcomes: [
      "AI Literacy — how LLMs work, prompting and context design",
      "Agentic AI & Claude Code — tool use, MCP, RAG, spec-driven delivery",
      "Multi-Agent in Production — orchestration, cost, observability, security",
    ],
  },
  {
    kicker: "Compact · Small business",
    title: "AI-Native in a Day",
    format: "One day · on site or remote",
    blurb:
      "The essentials of running a business AI-natively — the tools, the workflows worth " +
      "automating first, and one agent live in your stack by the end of the day.",
    outcomes: [
      "An audit of where AI actually pays back in your business",
      "Everyday workflows rebuilt around AI tools",
      "One Zer0 agent deployed and running on your real work",
    ],
    draft: true,
  },
];

/** The 12-week journey — revealed on request, not shown by default. */
export const journey: { when: string; title: string; ships: string }[] = [
  { when: "W1", title: "Foundations", ships: "Your AI, live on your phone" },
  { when: "W2–3", title: "Communication Agent", ships: "Drafts and answers in your voice" },
  { when: "W4–5", title: "Inbox Agent", ships: "Triage, priorities, drafted replies" },
  { when: "W6–7", title: "Meetings Agent", ships: "Prep, red flags, follow-ups" },
  { when: "W8–9", title: "Knowledge Agent", ships: "Your documents, answered with citations" },
  { when: "W10", title: "Hackathon", ships: "Team prototypes on real problems" },
  { when: "W11", title: "Assembly", ships: "Four agents become one SuperAgent" },
  { when: "W12", title: "Demo Day", ships: "Roadmaps presented · certification" },
];

/** What happens between sessions — revealed on request. */
export const deliveryModel: { title: string; blurb: string }[] = [
  {
    title: "Field assignments",
    blurb: "Run the sprint's agent on live work — real inbox, real meetings — and bring wins and friction back to the room.",
  },
  {
    title: "A tracked cohort",
    blurb: "Progress, usage and blockers logged in a shared tracker. We follow up before the next session; nobody arrives stuck.",
  },
  {
    title: "A direct line",
    blurb: "A support channel to the facilitation team between sessions, with office hours on request. Answers in hours.",
  },
  {
    title: "Peer review",
    blurb: "Leaders demo to each other every sprint. The cohort learns from twenty-five builds, not one.",
  },
];

/**
 * Facilitator credentials. `summary` is always visible; the named cards are
 * revealed only when a visitor opens the facilitators disclosure.
 */
export const facilitators = {
  summary:
    "Four practice heads averaging 14 years each across engineering, revenue strategy and data — " +
    "all still shipping. No career trainers in the room.",
  employers: [
    "Microsoft", "Mastercard", "Swiggy", "Loblaws Canada", "MediBuddy", "OLX", "Tesco", "Danaher",
  ],
  people: [
    {
      name: "Sai Krishna Vennamaneni",
      role: "Founder & CTO",
      bio: "15 years in distributed systems, simulation research and product engineering. Ex-Swiggy, Loblaw Digital, MediBuddy. NIT Allahabad.",
    },
    {
      name: "Jay Puranik",
      role: "Business Practice Head",
      bio: "15 years in revenue growth and strategy across Fortune 500 companies. Grew Danaher medical devices $6B → $12B across ME, LATAM, SEA and ANZ. IIM Calcutta.",
    },
    {
      name: "Rachit Verma",
      role: "Data Practice Head",
      bio: "15 years turning data into ROI. Ex-Mastercard, OLX, Tesco, dunnhumby. Two-time patent inventor across retail, banking and e-commerce.",
    },
    {
      name: "Tamoghna Biswas",
      role: "AI Practice Head",
      bio: "11 years in engineering; built Azure cloud commerce platforms at Microsoft. IIT Roorkee.",
    },
  ],
};

/* ------------------------------------------------------------- our products */

export interface Product {
  image: string;
  title: string;
  role: string;
  /** Short pill shown on the tile — the only segmentation we do. */
  tag: string;
  description: string;
  cta: string;
  url: string;
  /** Secondary link, e.g. a live demo alongside source. */
  altCta?: string;
  altUrl?: string;
  /** Optional bullets — rendered on the large flagship tile. */
  points?: string[];
  flagship?: boolean;
}

/**
 * One portfolio. We do not separate "platforms" from "agents" — everything here
 * is an AI-native product we build and run; the tag is the only distinction.
 */
export const products: Product[] = [
  {
    image: "/robot.svg",
    title: "Zer0 Sales Agent",
    role: "Autonomous top-of-funnel",
    tag: "Zer0",
    description:
      "A multi-tenant sales agent that runs cold prospecting through to first positive reply without human intervention — discover, research, qualify, outreach.",
    cta: "Visit Zer0",
    url: "https://zero.smalltech.in",
    points: [
      "Finds and researches prospects on its own",
      "Qualifies against your ideal-customer profile",
      "Writes and sends outreach, then follows up",
      "Hands you the conversation once it turns warm",
    ],
    flagship: true,
  },
  {
    image: "/draw.png",
    title: "zero-shot-harness",
    role: "Installable skills for Claude & Hermes",
    tag: "Open Source",
    description:
      "Three agent skills — build, fix and sync — installed straight into Claude Code or Hermes. Give it a one-line idea and walk away with a working, tested, phased project, spec-first with a human gate at every phase.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/zero-shot-harness",
  },
  {
    image: "/local.png",
    title: "#local",
    role: "Location-based community platform",
    tag: "Civic Tech",
    description:
      "The fastest way to report potholes, illegal dumping, broken lights and other civic issues directly to your local government.",
    cta: "Download",
    url: "https://local.smalltech.in",
  },
  {
    image: "/workshop.svg",
    title: "Workshop Helmsman",
    role: "Live cohort tracking",
    tag: "Open Source",
    description:
      "The self-hosted milestone tracker behind our own workshops — participants join with a name, facilitators watch the whole room live.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/workshop-helmsman",
  },
  {
    image: "/ai.png",
    title: "Zer0 Data Analyst",
    role: "Your data, asked in English",
    tag: "Zer0 · Live demo",
    description:
      "Upload a spreadsheet and ask questions in plain English. A reasoning loop over pandas returns explainable answers with inline charts.",
    cta: "Try the live demo",
    url: "https://data-analysis-agent-870371939888.us-central1.run.app/app/",
    altCta: "Source",
    altUrl: "https://github.com/smallTechOrg/data-analysis-agent",
  },
  {
    image: "/email.png",
    title: "Zer0 Inbox Agent",
    role: "Inbox triage you can audit",
    tag: "Zer0",
    description:
      "Categorises every thread, collapses hundreds of them into ~30 decisions, and shows exactly why each call was made. Never deletes anything.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/zero-inbox-agent",
  },
  {
    image: "/security.png",
    title: "Vanguard by Zer0",
    role: "AI-first security audits",
    tag: "Zer0",
    description:
      "Authorised website and application auditing with approval gates, evidence capture, immutable audit logs and professional reports.",
    cta: "Learn more",
    url: "https://github.com/smallTechOrg/ai-security-agency",
  },
  {
    image: "/python.png",
    title: "zero-shot boilerplate",
    role: "Agent starting point",
    tag: "Open Source",
    description:
      "A spec-first baseline agent — FastAPI, LangGraph, provider-agnostic LLM — with spec templates and the sub-agent team already wired in.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/zero-shot-claude-boilerplate",
  },
  {
    image: "/marketplace.png",
    title: "FinWerse",
    role: "MVP build & tech mentorship",
    tag: "FinTech",
    description:
      "AI-powered scores for every listed stock across four dimensions and three timeframes. We build the MVP and mentor the team. MeitY-funded.",
    cta: "Visit site",
    url: "https://finwerse.com",
  },
];
