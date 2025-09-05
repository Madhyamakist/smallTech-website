import { useEffect } from "react";
import ScrollLayout from "../components/scrollLayout";

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
      <ScrollLayout />
    );
}
