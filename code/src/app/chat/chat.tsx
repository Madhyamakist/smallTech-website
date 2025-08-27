"use client";

import { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const chatboxRef = useRef<HTMLDivElement>(null);
  const sessionId = useRef<string>(crypto.randomUUID());

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const userMsg = input.trim();
    if (!userMsg) return;

    setMessages((prev) => [...prev, { sender: "You", text: userMsg }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMsg, session_id: sessionId.current }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: data.success ? "Bot" : "Error", text: data.success ? data.response : data.error || "Something went wrong." }
      ]);
    } catch {
      setMessages((prev) => [...prev, { sender: "Error", text: "Network or server issue." }]);
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="mb-4">Chat with LLM</h2>

      <div
        ref={chatboxRef}
        className=" bg-gray-50 p-4 h-100 w-full max-w-md rounded overflow-y-auto"
      >
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex w-full max-w-md mt-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 p-2 rounded-l"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700">
          Send
        </button>
      </form>
    </div>
  );
}
