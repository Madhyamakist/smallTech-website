"use client";

import { useState, useEffect, useId, type ReactNode } from "react";
import Image from "next/image";
import { techItems } from "../offerings/icons";
import {
  hero,
  stats,
  services,
  ethos,
  programmes,
  journey,
  facilitators,
  deliveryModel,
  products,
  type Product,
} from "../landing/content";
import EmbedScript from "./embedScript";

/* normalise "./foo.png" | "foo.png" -> "/foo.png" */
const asset = (s: string) => "/" + s.replace(/^\.?\//, "");

const clients = [
  { name: "UP Police", logo: "/up police.png", url: "https://www.linkedin.com/posts/madhyamakist_what-does-real-sovereign-ai-mean-for-india-ugcPost-7462018105133940736-wDwl", w: 90, h: 90 },
  { name: "MeitY", logo: "/meity.png", url: "", w: 190, h: 62 },
  { name: "Baamboojah", logo: "/baamboojah-logo.svg", url: "https://baamboojah.com", w: 90, h: 90 },
  { name: "Canvs", logo: "/canvs.svg", url: "", w: 180, h: 43 },
  { name: "Swiggy", logo: "/swiggy.png", url: "", w: 90, h: 90 },
  { name: "MediBuddy", logo: "/medibuddy.png", url: "", w: 90, h: 90 },
  { name: "Super Procure", logo: "/super procure.png", url: "", w: 200, h: 80 },
  { name: "Loblaws", logo: "/loblaws.svg", url: "", w: 200, h: 36 },
  { name: "Digital Futurists", logo: "/df.png", url: "", w: 170, h: 48 },
  { name: "Avanse", logo: "/avanse-logo.svg", url: "", w: 170, h: 45 },
  { name: "TruHome", logo: "/truhome-logo.svg", url: "", w: 140, h: 70 },
  { name: "Ebco", logo: "/ebco.png", url: "", w: 120, h: 70 },
  { name: "Warburg Pincus", logo: "/Warburg-pincus.png", url: "", w: 160, h: 89 },
  { name: "Parksons", logo: "/Parksons-logo-1.png", url: "", w: 200, h: 46 },
];

const mailto = (subject: string) =>
  `mailto:contact@smalltech.in?subject=${encodeURIComponent(subject)}`;

/* Open Zero chat widget if present, else fall back to email */
const openChat = () => {
  const container = document.querySelector("[data-embed-container]") as HTMLElement | null;
  const launcher = container?.querySelector('button, a, [role="button"]') as HTMLElement | null;
  if (launcher || container) {
    (launcher || container)!.click();
  } else {
    window.open("mailto:contact@smalltech.in");
  }
};

const NAV: { label: string; href?: string; chat?: boolean }[] = [
  { label: "What we do", href: "#services" },
  { label: "Portfolio", href: "#products" },
  { label: "AI Training", href: "#training" },
  { label: "Contact", chat: true },
];

export default function LandingPro() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Zero chat agent widget */}
      <EmbedScript />

      {/* ===== HEADER ===== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-seashell-pink/80 border-b border-redwood/15 shadow-[0_8px_30px_-12px_rgba(90,42,39,0.35)]"
            : "backdrop-blur-md bg-seashell-pink/40 border-b border-transparent"
        }`}
      >
        <div
          className={`max-w-[1200px] mx-auto flex items-center justify-between px-[4%] transition-all duration-300 ${
            scrolled ? "py-2.5" : "py-4"
          }`}
        >
          {/* Brand */}
          <a href="#home" className="group flex items-center gap-3 shrink-0">
            <Image
              src="/logo.png"
              alt="SmallTech Logo"
              width={0}
              height={0}
              sizes="64px"
              priority
              className={`w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                scrolled ? "h-9" : "h-11"
              }`}
            />
            <span className="flex flex-col leading-none">
              <span className="text-[24px] md:text-[26px] font-[800] text-deep-mocha leading-none tracking-[-0.01em]">
                smallTech
              </span>
              <span className="text-[11px] md:text-[12px] font-[400] text-redwood leading-none tracking-[0.18em] uppercase mt-1">
                replicable success
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-9 ml-auto pl-12">
            {NAV.map((item) =>
              item.chat ? (
                <button
                  key={item.label}
                  onClick={openChat}
                  className="relative text-[15px] font-[500] text-liver-brown hover:text-expresso transition-colors cursor-pointer
                    after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1.5px] after:rounded-full after:bg-redwood
                    after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-[15px] font-[500] text-liver-brown hover:text-expresso transition-colors
                    after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1.5px] after:rounded-full after:bg-redwood
                    after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-[4%]">
        {/* ===== HERO ===== */}
        <section id="home" className="grid md:grid-cols-2 gap-8 items-center pt-12 md:pt-16 pb-10">
          <div className="flex flex-col">
            <p className="text-redwood text-[12px] font-[700] tracking-[3px] uppercase mb-4">
              {hero.eyebrow}
            </p>
            <h1 className="text-[40px] sm:text-[52px] md:text-[58px] font-[700] leading-[1.05] text-deep-mocha mb-5">
              {hero.titleLead}{" "}
              <span className="bg-[linear-gradient(90deg,#8D5B4C,#B8887A)] bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>
            <p className="text-[17px] md:text-lg font-[400] text-liver-brown max-w-xl mb-8">
              {hero.body}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href="#training"
                className="rounded-full bg-expresso text-seashell-pink text-[15px] font-[600] px-6 py-3 shadow-[0_3px_8px_0_rgba(0,0,0,0.25)] hover:opacity-90 transition"
              >
                Explore AI Training
              </a>
              <a
                href="#products"
                className="rounded-full border border-brown/40 text-brown text-[15px] font-[500] px-6 py-3 hover:bg-white/40 transition"
              >
                See our portfolio
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {hero.pills.map((p) => (
                <span
                  key={p}
                  className="bg-white/50 border border-brown/15 text-liver-brown text-[13px] font-[500] px-4 py-1.5 rounded-full"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* GLOBE — clipped: the spin animation's bounding box grows by √2 as it
              rotates, which otherwise pushes the page wider than the viewport.
              The artwork is a circle on transparent corners, so nothing shows. */}
          <div className="relative flex items-center justify-center md:justify-end overflow-hidden">
            <Image
              src="/globe.png"
              width={560}
              height={560}
              alt="globe"
              priority
              className="w-[260px] md:w-full md:max-w-[480px] animate-spin [animation-duration:26s] [animation-timing-function:linear]"
            />
          </div>
        </section>

        {/* ===== PROOF + BRANDS ===== */}
        <section className="pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[20px] bg-white/50 border border-white/60 px-5 py-6 text-center flex flex-col justify-center"
              >
                <p className="text-expresso text-[28px] md:text-[34px] font-[700] leading-none">
                  {s.value}
                </p>
                <p className="text-liver-brown text-[13px] font-[400] mt-2">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-expresso text-[20px] font-[600]">Brands</h2>
            <p className="text-liver-brown font-[400] mt-1 mb-6">
              Organisations we have worked with
            </p>
            <div className="flex flex-col gap-3">
              {[clients, [...clients].reverse()].map((row, rowIdx) => (
                <div key={rowIdx} className="brands-row relative overflow-hidden h-[90px] md:h-[110px]">
                  <div
                    className={`absolute flex top-0 left-0 ${
                      rowIdx === 0 ? "animate-marquee" : "animate-marquee-reverse"
                    }`}
                    style={{ width: "max-content", willChange: "transform", transform: "translateZ(0)" }}
                  >
                    {Array.from({ length: 10 }, () => row).flat().map((c, i) => {
                      const logo = (
                        <Image
                          src={c.logo}
                          alt={c.name}
                          width={c.w}
                          height={c.h}
                          style={{ width: c.w, height: c.h }}
                          className="object-contain shrink-0"
                          loading="eager"
                        />
                      );
                      const cls = "flex items-center justify-center w-[160px] md:w-[240px] shrink-0 px-2";
                      /* duplicated for the marquee loop — hide clones from a11y and search */
                      const clone = i >= row.length;
                      return c.url ? (
                        <a
                          key={i}
                          href={c.url}
                          target="_blank"
                          rel="noreferrer"
                          className={cls}
                          aria-hidden={clone}
                          tabIndex={clone ? -1 : undefined}
                        >
                          {logo}
                        </a>
                      ) : (
                        <span key={i} className={cls} aria-hidden={clone}>
                          {logo}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== WHAT WE DO ===== */}
        <section id="services" className="py-16">
          <SectionHead
            eyebrow="What we do"
            title="Operationalising Agentic AI for you"
            sub={ethos}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-[20px] p-6 bg-white/50 border border-white/60 hover:bg-white/70 transition"
              >
                <strong className="block text-expresso text-[18px] font-[700] mb-2">{s.title}</strong>
                <span className="text-liver-brown text-[14px] font-[400]">{s.blurb}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== PRODUCTS ===== */}
        <section id="products" className="py-16">
          <SectionHead
            eyebrow="Our Portfolio"
            title="AI-native products we build and run"
            sub="Everything we ship, from autonomous agents to civic platforms — the same practice we teach."
          />
          <div className="grid md:grid-cols-4 md:auto-rows-[1fr] gap-4">
            {products.map((p) =>
              p.flagship ? (
                <FeatureTile key={p.title} product={p} />
              ) : (
                <SmallTile key={p.title} product={p} className="md:col-span-2" />
              )
            )}
          </div>
        </section>

        {/* ===== AI TRAINING ===== */}
        <section id="training" className="py-16">
          <div className="surface-inverse rounded-[28px] p-7 md:p-12 shadow-[0_18px_50px_-20px_rgba(45,25,22,0.55)]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-9">
              <div>
                <span className="inline-block bg-almond-silk text-expresso text-[12px] font-[700] tracking-wide px-3 py-1 rounded-full mb-3">
                  AI Training
                </span>
                <h2 className="text-seashell-pink text-[30px] md:text-[38px] font-[700] leading-tight">
                  Agentic AI is the new delegation
                </h2>
              </div>
              <p className="text-almond-silk font-[400] md:max-w-sm">
                Your leaders already run multi-agent systems — they are called teams. You brief them,
                set the gates, verify the outcomes. We extend that craft to software.
              </p>
            </div>

            {/* Programmes — headline only; detail on request.
                3 columns so the flagship spans a row and the other three fill the next. */}
            <div className="grid md:grid-cols-3 gap-4">
              {programmes.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-[20px] p-6 flex flex-col ${
                    p.flagship
                      ? "bg-[linear-gradient(to_bottom,#F2E3E1_0%,#DBC2BD_100%)] md:col-span-3"
                      : "surface-inset-interactive"
                  }`}
                >
                  <span
                    className={`text-[11px] font-[700] tracking-[1.5px] uppercase mb-2 ${
                      p.flagship ? "text-redwood" : "text-ember"
                    }`}
                  >
                    {p.kicker}
                  </span>
                  <h3
                    className={`text-[21px] font-[700] mb-1 ${
                      p.flagship ? "text-expresso" : "text-seashell-pink"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`text-[13px] font-[600] mb-3 ${
                      p.flagship ? "text-redwood" : "text-ember"
                    }`}
                  >
                    {p.format}
                  </p>
                  <p
                    className={`text-[14px] font-[400] ${
                      p.flagship ? "text-liver-brown" : "text-almond-silk"
                    }`}
                  >
                    {p.blurb}
                  </p>

                  <Reveal
                    label="What you get"
                    tone={p.flagship ? "light" : "dark"}
                    className="mt-auto pt-4"
                  >
                    <ul
                      className={`space-y-1.5 pb-1 ${
                        p.flagship ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0" : ""
                      }`}
                    >
                      {p.outcomes.map((o) => (
                        <li
                          key={o}
                          className={`text-[13px] font-[400] flex gap-2 ${
                            p.flagship ? "text-liver-brown sm:py-0.5" : "text-almond-silk"
                          }`}
                        >
                          <span className="text-ember font-[700]">›</span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </div>
              ))}
            </div>

            {/* Everything else, folded away */}
            <div className="mt-4 grid md:grid-cols-3 gap-4">
              <Panel title="The 12-week journey" hint="What ships, week by week">
                <div className="grid grid-cols-2 gap-2.5 pt-4">
                  {journey.map((j) => (
                    <div key={j.when} className="rounded-[12px] surface-inset-quiet p-3">
                      <span className="block text-ember text-[10px] font-[700] tracking-[1.5px] uppercase mb-1">
                        {j.when}
                      </span>
                      <strong className="block text-seashell-pink text-[13px] font-[700] leading-snug">
                        {j.title}
                      </strong>
                      <span className="text-almond-silk text-[11px] font-[400]">{j.ships}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Between the Fridays" hint="How the cohort stays on track">
                <div className="flex flex-col gap-2.5 pt-4">
                  {deliveryModel.map((d) => (
                    <div key={d.title} className="rounded-[12px] surface-inset-quiet p-3.5">
                      <strong className="block text-seashell-pink text-[13px] font-[700] mb-1">
                        {d.title}
                      </strong>
                      <span className="text-almond-silk text-[12px] font-[400]">{d.blurb}</span>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Senior practitioners only" hint="Who actually runs the room">
                <div className="flex flex-col gap-2.5 pt-4">
                  <p className="text-almond-silk text-[12px] font-[400]">{facilitators.summary}</p>
                  {facilitators.people.map((p) => (
                    <div key={p.name} className="rounded-[12px] surface-inset-quiet p-3.5 flex gap-3">
                      <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-almond-silk text-expresso text-[13px] font-[700]">
                        {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                      <div>
                        <strong className="block text-seashell-pink text-[13px] font-[700] leading-tight">
                          {p.name}
                        </strong>
                        <span className="block text-ember text-[10px] font-[700] tracking-[1.2px] uppercase mt-0.5 mb-1">
                          {p.role}
                        </span>
                        <span className="text-almond-silk text-[11px] font-[400]">{p.bio}</span>
                      </div>
                    </div>
                  ))}
                  <p className="text-almond-silk text-[11px] font-[400] mt-1">
                    Shipped and built at — {facilitators.employers.join(" · ")}
                  </p>
                </div>
              </Panel>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={mailto("AI Training enquiry")}
                className="shrink-0 whitespace-nowrap rounded-full bg-seashell-pink text-expresso text-[15px] font-[600] px-6 py-3 hover:bg-white transition"
              >
                Talk to us about a cohort
              </a>
              <p className="text-almond-silk text-[13px] font-[400]">
                Every engagement starts with a one-day taster for your leadership — the room builds a
                working agent before you commit to anything.
              </p>
            </div>
          </div>
        </section>

        {/* ===== TECHNOLOGIES ===== */}
        <section id="tech" className="py-16">
          <SectionHead
            eyebrow="Stack"
            title="Technologies we support"
            sub="Integrate AI across your existing tech stack."
          />
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-3">
            {techItems.map((icon) => (
              <div
                key={icon.src}
                className="aspect-square rounded-[16px] bg-white/45 border border-white/60 grid place-items-center hover:bg-white/70 transition"
              >
                <Image
                  src={asset(icon.src)}
                  alt={icon.alt}
                  width={42}
                  height={42}
                  className="object-contain opacity-80"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-redwood/10 mt-8">
        <div className="max-w-[1200px] mx-auto px-[4%] py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] font-[400] text-deep-mocha">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={0} height={0} sizes="36px" className="h-7 w-auto object-contain" />
            <span className="font-[600]">smallTech</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/smallTechOrg" target="_blank" rel="noreferrer" className="hover:underline">
              github
            </a>
            <a href="mailto:contact@smalltech.in" className="hover:underline">
              mail
            </a>
            <span className="text-expresso">© 2026 madhyamakist pvt ltd</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------ partials */

/**
 * Inline "show more" used inside a card. Animates on grid-template-rows so the
 * panel eases to its natural height without hard-coding a max-height.
 */
function Reveal({
  label,
  children,
  tone = "dark",
  className = "",
}: {
  label: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const colour = tone === "light" ? "text-redwood" : "text-almond-silk";

  return (
    <div className={className}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className={`group inline-flex items-center gap-1.5 text-[13px] font-[600] cursor-pointer ${colour} hover:opacity-80 transition-opacity`}
      >
        {label}
        <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>⌄</span>
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

/** A foldable panel on the dark training card. Collapsed by default. */
function Panel({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="rounded-[20px] surface-inset p-5 md:p-6 self-start w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full text-left cursor-pointer group"
      >
        <span className="flex items-start justify-between gap-3">
          <span className="text-seashell-pink text-[16px] font-[600] leading-snug">{title}</span>
          <span
            className={`shrink-0 grid place-items-center w-6 h-6 rounded-full border border-cream/30 text-almond-silk text-[12px] transition-transform duration-300 ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden
          >
            +
          </span>
        </span>
        <span className="block text-almond-silk text-[12px] font-[400] mt-1.5">{hint}</span>
      </button>
      <div
        id={id}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function TagPill({ tag, tone }: { tag: string; tone: "dark" | "light" }) {
  return (
    <span
      className={`inline-block text-[10px] font-[700] tracking-[1.5px] uppercase px-2.5 py-1 rounded-full ${
        tone === "dark"
          ? "bg-white/10 text-ember border border-cream/25"
          : "bg-expresso/10 text-redwood border border-redwood/20"
      }`}
    >
      {tag}
    </span>
  );
}

function FeatureTile({ product }: { product: Product }) {
  return (
    <div className="md:col-span-2 md:row-span-2 surface-inverse-accent rounded-[24px] p-7 flex flex-col justify-between shadow-[0_18px_45px_-20px_rgba(45,25,22,0.55)]">
      <div>
        <TagPill tag={product.tag} tone="dark" />
        <Image
          src={product.image}
          alt={product.title}
          width={72}
          height={72}
          /* the icon artwork is stroked in espresso — invert it so it reads on the dark tile */
          className="object-contain mb-4 mt-5 opacity-85 [filter:brightness(0)_invert(1)]"
        />
        <h3 className="text-seashell-pink text-[26px] font-[700] mb-1">{product.title}</h3>
        <p className="text-almond-silk text-[14px] font-[500] mb-3">{product.role}</p>
        <p className="text-almond-silk text-[15px] font-[400]">{product.description}</p>
        {product.points && (
          <ul className="mt-5 space-y-2 border-t border-cream/15 pt-5">
            {product.points.map((pt) => (
              <li key={pt} className="text-almond-silk text-[14px] font-[400] flex gap-2.5">
                <span className="text-ember font-[700]">›</span>
                {pt}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6">
        <a
          href={product.url}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full bg-seashell-pink text-expresso text-[15px] font-[600] px-6 py-3 hover:bg-white transition"
        >
          {product.cta}
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </div>
  );
}

function SmallTile({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <div
      className={`rounded-[24px] p-6 flex items-start gap-5 bg-[linear-gradient(to_bottom,#F2E3E1_0%,#DBC2BD_100%)] shadow-[0_3px_20px_0_rgba(0,0,0,0.15)] ${className}`}
    >
      <Image
        src={product.image}
        alt={product.title}
        width={56}
        height={56}
        className="object-contain opacity-70 shrink-0 mt-1"
      />
      <div className="flex flex-col">
        <div className="mb-2">
          <TagPill tag={product.tag} tone="light" />
        </div>
        <h3 className="text-expresso text-[19px] font-[700] leading-tight">{product.title}</h3>
        <p className="text-redwood text-[13px] font-[600] mb-1.5">{product.role}</p>
        <p className="text-liver-brown text-[14px] font-[400] mb-3">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-4">
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="text-expresso text-[14px] font-[600] hover:underline"
          >
            {product.cta} →
          </a>
          {product.altUrl && (
            <a
              href={product.altUrl}
              target="_blank"
              rel="noreferrer"
              className="text-redwood text-[14px] font-[500] hover:underline"
            >
              {product.altCta}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mb-8">
      <p className="text-redwood text-[12px] font-[700] tracking-[3px] uppercase mb-2">{eyebrow}</p>
      <h2 className="text-deep-mocha text-[30px] md:text-[36px] font-[700] leading-tight">{title}</h2>
      <p className="text-liver-brown text-[16px] md:text-[17px] font-[400] mt-1">{sub}</p>
    </div>
  );
}
