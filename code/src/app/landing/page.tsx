import type { Metadata } from "next";
import LandingPro from "../components/landingPro";

export const metadata: Metadata = {
  title: "smallTech | AI Training & AI Agents for Business",
  description: "smallTech is an AI-native studio: practitioner-led agentic AI training for enterprise and government leadership, and the Zer0 agent suite for small businesses. 700+ professionals trained.",
  alternates: {
    canonical: "https://smalltech.in",
  },
  openGraph: {
    title: "smallTech | AI Training & AI Agents for Business",
    description: "smallTech is an AI-native studio: practitioner-led agentic AI training for enterprise and government leadership, and the Zer0 agent suite for small businesses. 700+ professionals trained.",
    url: "https://smalltech.in",
    siteName: "SmallTech",
    images: [
      {
        url: "https://smalltech.in/logo.png",
        alt: "SmallTech Logo",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function LandingPage() {
  return <LandingPro />;
}
