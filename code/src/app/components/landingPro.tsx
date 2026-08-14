"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { techItems } from "../offerings/icons";
import { techDomains, businessDomains } from "../domains/constants";
import {
  hero,
  stats,
  programmes,
  journey,
  facilitators,
  deliveryModel,
  zeroProducts,
  devTools,
  otherWork,
  services,
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
  { label: "AI Training", href: "#training" },
  { label: "Products", href: "#products" },
  { label: "Work", href: "#work" },
  { label: "Contact", chat: true },
];

export default function LandingPro() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
              <span className="text-[24px] md:text-[26px] font-[700] text-deep-mocha leading-none tracking-[-0.01em]">
                smallTech
              </span>
              <span className="text-[11px] md:text-[12px] font-[300] text-redwood leading-none tracking-[0.18em] uppercase mt-1">
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
                  className="relative text-[15px] font-[400] text-liver-brown hover:text-expresso transition-colors cursor-pointer
                    after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1.5px] after:rounded-full after:bg-redwood
                    after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative text-[15px] font-[400] text-liver-brown hover:text-expresso transition-colors
                    after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1.5px] after:rounded-full after:bg-redwood
                    after:origin-left after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden ml-auto grid place-items-center w-10 h-10 rounded-full border border-redwood/25 text-expresso cursor-pointer"
          >
            <span className="relative block w-[18px] h-[12px]">
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[5px] h-[1.5px] w-full rounded-full bg-current transition-all duration-200 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full rounded-full bg-current transition-all duration-300 ${
                  menuOpen ? "top-[5px] -rotate-45" : "top-[10px]"
                }`}
              />
            </span>
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="px-[6%] pb-5 flex flex-col gap-1">
            {NAV.map((item) =>
              item.chat ? (
                <button
                  key={item.label}
                  onClick={() => {
                    setMenuOpen(false);
                    openChat();
                  }}
                  className="text-left text-[16px] font-[400] text-liver-brown py-2.5 border-b border-redwood/10 cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[16px] font-[400] text-liver-brown py-2.5 border-b border-redwood/10"
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
            <p className="text-redwood text-[12px] font-[600] tracking-[3px] uppercase mb-4">
              {hero.eyebrow}
            </p>
            <h1 className="text-[40px] sm:text-[52px] md:text-[58px] font-[600] leading-[1.05] text-deep-mocha mb-5">
              {hero.titleLead}{" "}
              <span className="bg-[linear-gradient(90deg,#8D5B4C,#B8887A)] bg-clip-text text-transparent">
                {hero.titleAccent}
              </span>
            </h1>
            <p className="text-[17px] md:text-lg font-[300] text-liver-brown max-w-xl mb-8">
              {hero.body}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a
                href={mailto("AI Training enquiry")}
                className="rounded-full bg-expresso text-seashell-pink text-[15px] font-[500] px-6 py-3 shadow-[0_3px_8px_0_rgba(0,0,0,0.25)] hover:opacity-90 transition"
              >
                Explore AI Training
              </a>
              <a
                href="#products"
                className="rounded-full border border-brown/40 text-brown text-[15px] font-[400] px-6 py-3 hover:bg-white/40 transition"
              >
                See the Zer0 suite
              </a>
            </div>
            <div className="flex flex-wrap gap-2">
              {hero.pills.map((p) => (
                <span
                  key={p}
                  className="bg-white/50 border border-brown/15 text-liver-brown text-[13px] font-[400] px-4 py-1.5 rounded-full"
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

        {/* ===== PROOF STRIP ===== */}
        <section className="pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-[20px] bg-white/50 border border-white/60 px-5 py-6 text-center flex flex-col justify-center"
              >
                <p className="text-expresso text-[28px] md:text-[34px] font-[600] leading-none">
                  {s.value}
                </p>
                <p className="text-liver-brown text-[13px] font-[300] mt-2">{s.label}</p>
              </div>
            ))}
          </div>
          <p className="text-liver-brown/80 text-[13px] font-[300] text-center mt-4">
            Delivered for enterprise and government — including UP Police Technical Services and a
            Warburg Pincus leadership cohort with its portfolio companies.
          </p>
        </section>

        {/* ===== AI TRAINING ===== */}
        <section id="training" className="py-16">
          <div className="rounded-[28px] p-7 md:p-12 bg-[linear-gradient(135deg,#6A534D_0%,#5C4742_100%)] shadow-[0_3px_24px_0_rgba(0,0,0,0.18)]">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-9">
              <div>
                <span className="inline-block bg-almond-silk text-expresso text-[12px] font-[600] tracking-wide px-3 py-1 rounded-full mb-3">
                  AI Training · Enterprise
                </span>
                <h2 className="text-seashell-pink text-[30px] md:text-[38px] font-[600] leading-tight">
                  Agentic AI is the new delegation
                </h2>
              </div>
              <p className="text-almond-silk font-[300] md:max-w-sm">
                Your leaders already run multi-agent systems — they are called teams. You brief them,
                set the gates, verify the outcomes. We extend that craft to software.
              </p>
            </div>

            {/* Programme cards — flagship spans the row, the other three fill the next */}
            <div className="grid md:grid-cols-3 gap-4">
              {programmes.map((p) => (
                <div
                  key={p.title}
                  className={`rounded-[20px] p-6 flex flex-col ${
                    p.flagship
                      ? "bg-[linear-gradient(to_bottom,#F2E3E1_0%,#DBC2BD_100%)] md:col-span-3"
                      : "bg-white/[0.06] border border-cream/15"
                  }`}
                >
                  <span
                    className={`text-[11px] font-[600] tracking-[1.5px] uppercase mb-2 ${
                      p.flagship ? "text-redwood" : "text-almond-silk"
                    }`}
                  >
                    {p.kicker}
                  </span>
                  <h3
                    className={`text-[21px] font-[600] mb-1 ${
                      p.flagship ? "text-expresso" : "text-seashell-pink"
                    }`}
                  >
                    {p.title}
                  </h3>
                  <p
                    className={`text-[13px] font-[500] mb-1 ${
                      p.flagship ? "text-redwood" : "text-almond-silk"
                    }`}
                  >
                    {p.format}
                  </p>
                  <p
                    className={`text-[12px] font-[300] mb-3 ${
                      p.flagship ? "text-liver-brown" : "text-almond-silk"
                    }`}
                  >
                    {p.audience}
                  </p>
                  <p
                    className={`text-[14px] font-[300] mb-4 ${
                      p.flagship ? "text-liver-brown" : "text-almond-silk"
                    }`}
                  >
                    {p.blurb}
                  </p>
                  <ul
                    className={`mt-auto space-y-1.5 ${
                      p.flagship ? "sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0" : ""
                    }`}
                  >
                    {p.outcomes.map((o) => (
                      <li
                        key={o}
                        className={`text-[13px] font-[300] flex gap-2 ${
                          p.flagship ? "text-liver-brown sm:py-0.5" : "text-almond-silk"
                        }`}
                      >
                        <span className="text-rose font-[600]">›</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* The 12-week journey */}
            <div className="mt-6 rounded-[20px] p-6 md:p-7 bg-white/[0.05] border border-cream/15">
              <h3 className="text-seashell-pink text-[17px] font-[500] mb-1">
                The AI-Native Leader — what ships, week by week
              </h3>
              <p className="text-almond-silk text-[13px] font-[300] mb-5">
                One Friday afternoon at a time: two hours in the boardroom on the business of AI,
                two hours in the lab building. Every leader ends each sprint with working software.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {journey.map((j) => (
                  <div
                    key={j.when}
                    className="rounded-[14px] bg-white/[0.06] border border-cream/10 p-4 flex flex-col"
                  >
                    <span className="text-almond-silk text-[11px] font-[600] tracking-[1.5px] uppercase mb-1.5">
                      {j.when}
                    </span>
                    <strong className="text-seashell-pink text-[14px] font-[600] leading-snug mb-1">
                      {j.title}
                    </strong>
                    <span className="text-almond-silk text-[12px] font-[300]">{j.ships}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Between the sessions */}
            <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {deliveryModel.map((d) => (
                <div
                  key={d.title}
                  className="rounded-[16px] bg-white/[0.05] border border-cream/15 p-5"
                >
                  <strong className="block text-seashell-pink text-[14px] font-[600] mb-1.5">
                    {d.title}
                  </strong>
                  <span className="text-almond-silk text-[12px] font-[300]">{d.blurb}</span>
                </div>
              ))}
            </div>

            {/* Facilitators — progressive disclosure */}
            <Facilitators />

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={mailto("AI Training enquiry")}
                className="shrink-0 whitespace-nowrap rounded-full bg-seashell-pink text-expresso text-[15px] font-[500] px-6 py-3 hover:bg-white transition"
              >
                Talk to us about a cohort
              </a>
              <p className="text-almond-silk text-[13px] font-[300]">
                Every engagement starts with a one-day taster for your leadership — the room builds a
                working agent before you commit to anything.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PRODUCTS — ZER0 SUITE ===== */}
        <section id="products" className="py-16">
          <SectionHead
            eyebrow="The Zer0 suite"
            title="AI agents small businesses can actually run"
            sub="The same agents we run ourselves — deployed and tuned to your business, no AI team required."
          />
          <div className="grid md:grid-cols-4 md:auto-rows-[1fr] gap-4">
            {/* flagship tile — spans the three rows the smaller tiles occupy */}
            <FeatureTile product={zeroProducts[0]} />
            {zeroProducts.slice(1).map((p) => (
              <SmallTile key={p.title} product={p} className="md:col-span-2" />
            ))}
          </div>

          {/* Dev tools */}
          <h3 className="text-redwood text-[13px] font-[600] tracking-[2px] uppercase mt-12 mb-4">
            How we build — given away
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {devTools.map((p) => (
              <SmallTile key={p.title} product={p} />
            ))}
          </div>
        </section>

        {/* ===== WORK ===== */}
        <section id="work" className="py-16">
          <SectionHead
            eyebrow="Portfolio"
            title="Platforms, products and client work"
            sub="Civic tech, fintech and the tooling behind our own delivery."
          />
          <div className="grid md:grid-cols-2 gap-4">
            {otherWork.map((p, i) => (
              <SmallTile
                key={p.title}
                product={p}
                /* odd count: let the trailing tile fill the row */
                className={i === otherWork.length - 1 && otherWork.length % 2 ? "md:col-span-2" : ""}
              />
            ))}
          </div>

          {/* ===== BRANDS MARQUEE ===== */}
          <div className="mt-12">
            <h3 className="text-expresso font-[500]">Brands</h3>
            <p className="text-liver-brown font-[300] mt-1 mb-6">
              Organisations we have delivered for, and brands our team has built at
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

        {/* ===== SERVICES ===== */}
        <section id="services" className="py-16">
          <SectionHead
            eyebrow="What we do"
            title="Builders who train builders"
            sub="Four practices, one operating philosophy — everything we teach, we ship."
          />
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-[20px] p-6 bg-white/50 border border-white/60 hover:bg-white/70 transition"
              >
                <strong className="block text-expresso text-[18px] font-[600] mb-2">{s.title}</strong>
                <span className="text-liver-brown text-[14px] font-[300]">{s.blurb}</span>
              </div>
            ))}
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

        {/* ===== DOMAINS ===== */}
        <section id="domains" className="py-16">
          <SectionHead
            eyebrow="Reach"
            title="Domains we work across"
            sub="Deep expertise across technology and business workflows."
          />
          <div className="grid md:grid-cols-2 gap-8">
            <DomainGroup label="Tech Domains" items={techDomains.flat()} />
            <DomainGroup label="Business Workflows" items={businessDomains.flat()} />
          </div>
        </section>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-redwood/10 mt-8">
        <div className="max-w-[1200px] mx-auto px-[4%] py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[14px] font-[300] text-deep-mocha">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="logo" width={0} height={0} sizes="36px" className="h-7 w-auto object-contain" />
            <span className="font-[500]">smallTech</span>
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
 * Facilitator credentials. The generic summary is always visible; names, roles
 * and bios are revealed only on request.
 */
function Facilitators() {
  const [shown, setShown] = useState(false);

  return (
    <div className="mt-4 rounded-[20px] p-6 md:p-7 bg-white/[0.05] border border-cream/15">
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <h3 className="text-seashell-pink text-[17px] font-[500] mb-1.5">
            Senior practitioners only
          </h3>
          <p className="text-almond-silk text-[13px] font-[300]">{facilitators.summary}</p>
        </div>
        <button
          onClick={() => setShown((v) => !v)}
          aria-expanded={shown}
          className="shrink-0 self-start md:self-auto rounded-full border border-cream/35 text-seashell-pink text-[14px] font-[400] px-5 py-2.5 hover:bg-white/10 transition cursor-pointer"
        >
          {shown ? "Hide the team" : "Meet the facilitators"}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ${
          shown ? "max-h-[1400px] opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid sm:grid-cols-2 gap-3">
          {facilitators.people.map((p) => (
            <div key={p.name} className="rounded-[16px] bg-white/[0.06] border border-cream/10 p-5 flex gap-4">
              <span className="shrink-0 grid place-items-center w-11 h-11 rounded-full bg-almond-silk text-expresso text-[15px] font-[600]">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <strong className="block text-seashell-pink text-[15px] font-[600] leading-tight">
                  {p.name}
                </strong>
                <span className="block text-almond-silk text-[11px] font-[600] tracking-[1.2px] uppercase mt-0.5 mb-1.5">
                  {p.role}
                </span>
                <span className="text-almond-silk text-[12px] font-[300]">{p.bio}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-almond-silk text-[12px] font-[300] mt-4">
          Our facilitators have shipped and built at —{" "}
          <span className="text-almond-silk">{facilitators.employers.join(" · ")}</span>
        </p>
      </div>
    </div>
  );
}

function FeatureTile({ product }: { product: Product }) {
  return (
    <div className="md:col-span-2 md:row-span-3 rounded-[24px] p-7 flex flex-col justify-between bg-[linear-gradient(150deg,#6A534D_0%,#5C4742_100%)] shadow-[0_3px_18px_0_rgba(0,0,0,0.18)]">
      <div>
        <p className="text-almond-silk text-[11px] font-[600] tracking-[2px] uppercase mb-4">
          {product.tag}
        </p>
        <Image
          src={product.image}
          alt={product.title}
          width={72}
          height={72}
          className="object-contain opacity-90 mb-4"
        />
        <h3 className="text-seashell-pink text-[26px] font-[600] mb-1">{product.title}</h3>
        <p className="text-almond-silk text-[14px] font-[400] mb-3">{product.role}</p>
        <p className="text-almond-silk text-[15px] font-[300]">{product.description}</p>
        {product.points && (
          <ul className="mt-5 space-y-2 border-t border-cream/15 pt-5">
            {product.points.map((pt) => (
              <li key={pt} className="text-almond-silk text-[14px] font-[300] flex gap-2.5">
                <span className="text-rose font-[600]">›</span>
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
          className="group inline-flex items-center gap-2 rounded-full bg-seashell-pink text-expresso text-[15px] font-[500] px-6 py-3 hover:bg-white transition"
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
    <div className={`rounded-[24px] p-6 flex items-start gap-5 bg-[linear-gradient(to_bottom,#F2E3E1_0%,#DBC2BD_100%)] shadow-[0_3px_20px_0_rgba(0,0,0,0.15)] ${className}`}>
      <Image
        src={product.image}
        alt={product.title}
        width={64}
        height={64}
        className="object-contain opacity-70 shrink-0"
      />
      <div className="flex flex-col">
        <h3 className="text-expresso text-[20px] font-[600] leading-tight">{product.title}</h3>
        <p className="text-redwood text-[13px] font-[500] mb-1.5">{product.role}</p>
        <p className="text-liver-brown text-[14px] font-[300] mb-3">{product.description}</p>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="text-expresso text-[14px] font-[500] hover:underline"
          >
            {product.cta} →
          </a>
          {product.altUrl && (
            <a
              href={product.altUrl}
              target="_blank"
              rel="noreferrer"
              className="text-redwood text-[14px] font-[400] hover:underline"
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
      <p className="text-redwood text-[12px] font-[600] tracking-[3px] uppercase mb-2">{eyebrow}</p>
      <h2 className="text-deep-mocha text-[30px] md:text-[36px] font-[600] leading-tight">{title}</h2>
      <p className="text-liver-brown text-[16px] md:text-[17px] font-[300] mt-1">{sub}</p>
    </div>
  );
}

function DomainGroup({ label, items }: { label: string; items: { src: string; title: string; subtitle: string }[] }) {
  return (
    <div>
      <h3 className="text-redwood text-[13px] font-[600] tracking-[2px] uppercase mb-4">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((d) => (
          <div key={d.title} className="rounded-[16px] p-4 bg-white/50 border border-white/60 flex items-center gap-4">
            <Image
              src={asset(d.src)}
              alt={d.title}
              width={40}
              height={40}
              className="object-contain opacity-80 shrink-0"
            />
            <div>
              <strong className="block text-expresso text-[16px] font-[600]">{d.title}</strong>
              <span className="text-liver-brown text-[12px] font-[300]">{d.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
