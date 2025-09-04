import { useEffect } from "react";
import ScrollLayout from "../components/scrollLayout";
import Script from 'next/script';

export default function ChatPage() {
  //when page loads
  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: 'AW-17476588629/dvfCCM6XlIYbENWovo1B',
        value: 1.0,
        currency: 'INR',
      });
    }
  }, []);
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-YTYS0G2P7L`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YTYS0G2P7L');
        `}
      </Script>
      <ScrollLayout />
    </>);
}
