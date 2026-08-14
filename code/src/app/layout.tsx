import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NetworkStatusBanner from "./components/common/networkStatus";
import Script from "next/script";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "smallTech | AI Training & AI Agents for Business",
  description: "smallTech is an AI-native studio: practitioner-led agentic AI training for enterprise and government leadership, and the Zer0 agent suite for small businesses. 700+ professionals trained.",
  keywords: ["AI training", "agentic AI training", "corporate AI training India", "AI training for executives", "multi-agent systems", "AI agents for small business", "Claude Code training", "enterprise AI transformation", "AI adoption roadmap", "Zer0", "smallTech"],
  robots: "index, follow",
  alternates: {
    canonical: "https://smalltech.in",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
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
  twitter: {
    card: "summary_large_image",
    title: "smallTech | AI Training & AI Agents for Business",
    description: "smallTech is an AI-native studio: practitioner-led agentic AI training for enterprise and government leadership, and the Zer0 agent suite for small businesses. 700+ professionals trained.",
    images: ["https://smalltech.in/logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "SmallTech",
  "url": "https://smalltech.in",
  "logo": "https://smalltech.in/logo.png",
  "description": "smallTech is an AI-native studio: practitioner-led agentic AI training for enterprise and government leadership, and the Zer0 agent suite for small businesses. 700+ professionals trained.",
  "sameAs": ["https://github.com/smallTechOrg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YTYS0G2P7L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YTYS0G2P7L');
          `}
        </Script>
        {/* Google Ads Conversion Tracking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17476588629"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17476588629'); 
          `}
        </Script>
      </head>
      <body
        className={`${montserrat.variable} antialiased min-h-screen flex flex-col`}
      >
        <NetworkStatusBanner />

        <main className="flex-1">{children} </main>

      </body>
    </html>
  );
}
