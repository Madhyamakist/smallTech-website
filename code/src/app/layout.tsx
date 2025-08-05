import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/core/header";
import Footer from "./components/core/footer";
import NetworkStatusBanner from "./components/common/networkStatus";


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmallTech",
  description: "A frontend boilerplate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased min-h-screen flex flex-col`}
      >
        <NetworkStatusBanner />
        <Header />
        <main className="flex-1">{children} </main>
        <Footer />
      </body>
    </html>
  );
}
