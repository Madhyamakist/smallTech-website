import type { Metadata } from "next";
import LandingPro from "../components/landingPro";

/*
 * Legacy route retained so existing inbound links and search results keep
 * resolving. The site is now a single page, so this serves the same content and
 * canonicalises to the root URL rather than competing with it.
 */
export const metadata: Metadata = {
  title: "smallTech | AI Training & AI Agents for Business",
  description: "smallTech is an AI-native studio: practitioner-led agentic AI training for enterprise and government leadership, and the Zer0 agent suite for small businesses. 700+ professionals trained.",
  alternates: {
    canonical: "https://smalltech.in",
  },
};

export default function PortfolioPage() {
  return <LandingPro />;
}
