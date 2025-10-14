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
  title: "SmallTech",
  description: "Tailored tech solutions for your business.",
  openGraph: {
    title: 'SmallTech',
    description: 'Tailored tech solutions for your business.',
    url: 'https://smalltech.in',
    siteName: 'SmallTech',
    images: [
      {
        url: 'https://smalltech.in/logo.png',
        alt: 'SmallTech Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
