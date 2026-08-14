// Landing page content. Copy lives here; layout lives in components/landingPro.tsx.
//
// Positioning: one unified "AI-Native" message.
//   · AI Training  -> enterprise & government leadership (where the proof is)
//   · Products & solutions -> SMBs first, enterprises welcome
//
// Disclosure rules agreed with the founder:
//   · Named clients limited to UP Police and Warburg Pincus (+ its portfolio companies).
//   · No named testimonials, no per-participant pricing.
//   · Facilitator identities sit behind progressive disclosure (see `facilitators`).

/* ------------------------------------------------------------------ hero */

export const hero = {
  eyebrow: "AI-Native by practice",
  titleLead: "We are AI-Native.",
  titleAccent: "Now you can be too.",
  body:
    "We build and run agentic software every day — then we teach your people to do the same. " +
    "Enterprise leadership programmes that end in working agents, and a product suite that puts " +
    "the same capability within reach of a small business.",
  pills: ["Agentic AI Training", "AI Agents & Automation", "Forward-Deployed Engineering"],
};

export const stats: { value: string; label: string }[] = [
  { value: "700+", label: "Professionals trained" },
  { value: "30+", label: "CXOs, MDs & HODs" },
  { value: "10+", label: "Enterprise & government orgs" },
  { value: "2\u00d7", label: "Government engagements, one ongoing" },
];

/* ------------------------------------------------------- ai training */

export interface Programme {
  kicker: string;
  title: string;
  format: string;
  audience: string;
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
    audience: "Business & functional leadership",
    blurb:
      "Every leader builds and runs their own multi-agent AI chief of staff — and writes an AI " +
      "adoption roadmap for their function. No code required.",
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
    format: "120 minutes · on site · demonstration-led",
    audience: "Business & functional leaders — no laptops needed",
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
    format: "Three tiers · from one day to multi-week",
    audience: "Engineering & data teams",
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
    format: "One day · on site or remote · small teams",
    audience: "Founders and small-business teams",
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

/** The 12-week journey — the spine of the flagship programme. */
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

/** What happens between sessions — the delivery model that makes cohorts stick. */
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

/* --------------------------------------------------- products & work */

export interface Product {
  image: string;
  title: string;
  role: string;
  tag: string;
  description: string;
  cta: string;
  url: string;
  /** Optional bullets — rendered on the large flagship tile. */
  points?: string[];
  /** Secondary link, e.g. a live demo alongside source. */
  altCta?: string;
  altUrl?: string;
}

/** The Zer0 product line — agents we build, run and sell. SMB-first. */
export const zeroProducts: Product[] = [
  {
    image: "/robot.svg",
    title: "Zer0 Sales Agent",
    role: "Autonomous top-of-funnel",
    tag: "Flagship · Zer0",
    description:
      "A multi-tenant sales agent that runs cold prospecting through to first positive reply without human intervention — discover, research, qualify, outreach. Configured from a dashboard.",
    cta: "Visit Zer0",
    url: "https://zero.smalltech.in",
    points: [
      "Finds and researches prospects on its own",
      "Qualifies against your ideal-customer profile",
      "Writes and sends outreach, then follows up",
      "Hands you the conversation once it turns warm",
    ],
  },
  {
    image: "/email.png",
    title: "Zer0 Inbox Agent",
    role: "Inbox triage you can audit",
    tag: "Zer0 · Open Source",
    description:
      "Categorises every thread, collapses hundreds of them into ~30 decisions, and shows exactly why each call was made. Never deletes anything; nothing acts without your approval.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/zero-inbox-agent",
  },
  {
    image: "/security.png",
    title: "Vanguard by Zer0",
    role: "AI-first security audits",
    tag: "Zer0",
    description:
      "Authorised website and application auditing with approval gates, evidence capture, immutable audit logs and professional reports. Safe-by-policy: passive checks only.",
    cta: "Learn more",
    url: "https://github.com/smallTechOrg/ai-security-agency",
  },
  {
    image: "/ai.png",
    title: "Zer0 Data Analyst",
    role: "Your data, asked in English",
    tag: "Zer0 · Live demo",
    description:
      "Upload a spreadsheet and ask questions in plain English. A reasoning loop over pandas returns explainable answers with inline charts — and shows every step it took.",
    cta: "Try the live demo",
    url: "https://data-analysis-agent-870371939888.us-central1.run.app/app/",
    altCta: "Source",
    altUrl: "https://github.com/smallTechOrg/data-analysis-agent",
  },
];

/** Open-source developer tooling — how we build AI-natively, given away. */
export const devTools: Product[] = [
  {
    image: "/draw.png",
    title: "zero-shot-harness",
    role: "Spec-first build harness",
    tag: "Open Source · Dev Tools",
    description:
      "Give it a one-line idea, walk away with a working, tested, phased project. Three skills — build, fix, sync — with the spec as the source of truth and a human gate at every phase. No default stack.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/zero-shot-harness",
  },
  {
    image: "/python.png",
    title: "zero-shot boilerplate",
    role: "Agent starting point",
    tag: "Open Source",
    description:
      "A spec-first baseline agent — FastAPI, LangGraph, provider-agnostic LLM — with the spec templates and sub-agent team already wired in. Tests pass out of the box.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/zero-shot-claude-boilerplate",
  },
];

/** Platforms and client work beyond the Zer0 line. */
export const otherWork: Product[] = [
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
    tag: "Open Source · Internal",
    description:
      "The self-hosted milestone tracker behind our own workshops — participants join with a name, facilitators watch the whole room live, with a built-in help desk.",
    cta: "View on GitHub",
    url: "https://github.com/smallTechOrg/workshop-helmsman",
  },
  {
    image: "/marketplace.png",
    title: "FinWerse",
    role: "MVP build & tech mentorship",
    tag: "Startup Advisory",
    description:
      "AI-powered scores for every listed stock across four dimensions and three timeframes. We build the MVP and mentor the team. MeitY-funded.",
    cta: "Visit site",
    url: "https://finwerse.com",
  },
];

/* ------------------------------------------------------------ services */

export const services: { title: string; blurb: string }[] = [
  {
    title: "AI Training",
    blurb:
      "Hands-on upskilling for leadership and engineering teams — GenAI foundations through to multi-agent architectures.",
  },
  {
    title: "Enterprise AI Transformation",
    blurb:
      "Forward-deployed engineers shipping production agents inside your organisation, alongside your people.",
  },
  {
    title: "Agents & Automation for SMBs",
    blurb:
      "The Zer0 suite, deployed and tuned to your business — sales, inbox, support and analysis, without an AI team of your own.",
  },
  {
    title: "Startup Advisory",
    blurb:
      "Tech incubation and MVP delivery across Civic Tech, FinTech and AI — including mentorship for funded teams.",
  },
];
