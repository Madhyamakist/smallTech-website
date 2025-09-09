import { useState, useEffect, useRef } from "react";

export interface Message {
    sender: string;
    text: string;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatBoxText = useRef<HTMLDivElement>(null);
    const sessionId = useRef<string>("");

    // useEffect to set the client flag true after mount.
    useEffect(() => {
        setIsClient(true);
        sessionId.current = crypto.randomUUID();
        // Initial bot welcome
        setMessages([
            {
                sender: "Bot",
                text: "Hi, Welcome to smallTech 👋. I'm here to help with any IT-related questions or concerns you might bring. What brings you to our website today?",
            },
        ]);
    }, []);

    // Function to handle sending a message to the backend server.
    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent sending if already waiting for a response
  if (isTyping) return;
  
        const userMsg = input.trim();
        if (!userMsg) return;

        // Adding user's message to the message list immediately.
        setMessages((prev) => [...prev, { sender: "You", text: userMsg }]);
        setInput("");
        // Show typing indicator
        setIsTyping(true);
        try {

            // Timeout/abort a fetch
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 10000); // 10 sec timeout

            // Sending message to backend API via POST.
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: userMsg, session_id: sessionId.current }),
                signal: controller.signal,
            });
            clearTimeout(timeout);
            const data = await res.json();
            // Hide typing indicator
            setIsTyping(false);

            // Add bot's response
            setMessages((prev) => [
                ...prev,
                {
                    sender: data.success ? "Bot" : "Error",
                    text: data.success ? data.response : data.error || "Something went wrong.",
                },
            ]);
        } catch (err) {
            // Hide typing indicator
            setIsTyping(false);
            const errorMsg =
                (err as Error).name === "AbortError"
                    ? "Request timed out. Please try again."
                    : "Network or server issue.";
            setMessages((prev) => [
                ...prev,
                { sender: "Error", text: errorMsg },
            ]);
        }
    };

    // useEffect to auto-scroll chatbox to the bottom when messages change.
    useEffect(() => {
        if (chatBoxText.current) {
            chatBoxText.current.scrollTop = chatBoxText.current.scrollHeight;
        }
    }, [messages,isTyping]);

    return {
        chatBoxText,
        messages,
        input,
        isClient,
        isTyping,
        sendMessage,
        setInput,
    };
}
