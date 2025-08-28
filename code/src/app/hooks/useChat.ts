import { useState, useEffect, useRef } from "react";

export interface Message {
    sender: string;
    text: string;
}

export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isClient, setIsClient] = useState(false);
    const chatBoxText = useRef<HTMLDivElement>(null);
    const sessionId = useRef<string>("");

    // useEffect to set the client flag true after mount.
    useEffect(() => {
        setIsClient(true);
        sessionId.current = crypto.randomUUID();
    }, []);

    // Function to handle sending a message to the backend server.
    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        const userMsg = input.trim();
        if (!userMsg) return;

        // Adding user's message to the message list immediately.
        setMessages((prev) => [...prev, { sender: "You", text: userMsg }]);
        setInput("");

        try {
            // Sending message to backend API via POST.
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input: userMsg, session_id: sessionId.current }),
            });
            const data = await res.json();

            // Add bot's response
            setMessages((prev) => [
                ...prev,
                {
                    sender: data.success ? "Bot" : "Error",
                    text: data.success ? data.response : data.error || "Something went wrong.",
                },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                { sender: "Error", text: "Network or server issue." },
            ]);
        }
    };

    // useEffect to auto-scroll chatbox to the bottom when messages change.
    useEffect(() => {
        if (chatBoxText.current) {
            chatBoxText.current.scrollTop = chatBoxText.current.scrollHeight;
        }
    }, [messages]);

    return {
        chatBoxText,
        messages,
        input,
        isClient,
        sendMessage,
        setInput,
    };
}
