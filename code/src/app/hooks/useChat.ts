import { useState, useEffect, useRef } from "react";

export interface Message {
    sender: string;
    text: string;
}

interface HistoryItem {
    type: "human" | "ai";
    content: string;
}

// toggle mocks ON/OFF (true = use mock data, false = call API)
const USE_MOCKS = false;
const REQUEST_TIMEOUT = 20 * 1000; // 20 seconds
// Session storage config
const SESSION_KEY = "chat_session";
const SESSION_TTL = 1000 * 60 * 30; // 30 minutes

// load session with expiry
function loadSession(): string {
    try {
        const stored = localStorage.getItem(SESSION_KEY);
        if (stored) {
            const { id, expiry } = JSON.parse(stored);
            if (Date.now() < expiry) {
                return id;
            }
        }
    } catch (e) {
        console.warn("Failed to parse stored session:", e);
    }
    // generate new if expired or not found
    const newId = crypto.randomUUID();
    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ id: newId, expiry: Date.now() + SESSION_TTL })
    );
    return newId;
}
export function useChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isClient, setIsClient] = useState(false);
    const [isBotProcessing, setisBotProcessing] = useState(false);
    const chatBoxText = useRef<HTMLDivElement>(null);
    const sessionId = useRef<string>("");

    // simple mock data
    const mockHistory: { session_id: string; history: HistoryItem[] } = {
        session_id: "mock-session-123",
        history: [
            { type: "ai", content: "👋 Hi, I'm your AI assistant. How can I help?" },
            { type: "human", content: "What services do you provide?" },
            { type: "ai", content: "We provide IT solutions, cloud setup, and more." },
        ],
    };

    const mockBotResponse = (input: string) => ({
        success: true,
        response: `(mock) You said: "${input}"`,
    });

    // initialize session & load history
    useEffect(() => {
        setIsClient(true);

        const init = async () => {
            try {
                if (USE_MOCKS) {
                    sessionId.current = mockHistory.session_id;
                    setMessages(
                        mockHistory.history.map((h) => ({
                            sender: h.type === "human" ? "You" : "Bot",
                            text: h.content,
                        }))
                    );
                    return;
                }

                //real api call
                const saved = loadSession();
                sessionId.current = saved;

                const url = `${process.env.NEXT_PUBLIC_API_URL}/history?session_id=${saved}`;
                const res = await fetch(url, { method: "GET" });
                const data = await res.json();

                if (res.status === 200 || res.status === 201) {
                    setMessages(
                        (data.history as HistoryItem[]).map((h) => ({
                            sender: h.type === "human" ? "You" : "Bot",
                            text: h.content,
                        }))
                    );
                } else {
                    console.error("Unexpected status from /history", res.status, data);
                }
            } catch (err) {
                console.error("Failed to initialize chat history", err);
            }
        };

        init();
    }, []);

    // send message
    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prevent sending if already waiting for a response
  if (isBotProcessing) return;
  
        const userMsg = input.trim();
        if (!userMsg) return;

        setMessages((prev) => [...prev, { sender: "You", text: userMsg }]);
        setInput("");
        // Show typing indicator
        setisBotProcessing(true);
        try {
            if (USE_MOCKS) {
                const data = mockBotResponse(userMsg);
                setisBotProcessing(false);
                setMessages((prev) => [...prev, { sender: "Bot", text: data.response }]);
                return;
            }
            //real api call
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    input: userMsg,
                    session_id: sessionId.current,
                }),
                signal: controller.signal,
            });
            clearTimeout(timeout);

            const data = await res.json();
            // Hide typing indicator
            setisBotProcessing(false);

            setMessages((prev) => [
                ...prev,
                {
                    sender: data.success ? "Bot" : "Error",
                    text: data.success ? data.response : data.error || "Something went wrong.",
                },
            ]);
        } catch (err) {
            // Hide typing indicator
            setisBotProcessing(false);
            const errorMsg =
                (err as Error).name === "AbortError"
                    ? "Request timed out. Please try again."
                    : "Network or server issue.";
            setMessages((prev) => [...prev, { sender: "Error", text: errorMsg }]);
        }
    };

    // useEffect to auto-scroll chatbox to the bottom when messages change.
    useEffect(() => {
        if (chatBoxText.current) {
            chatBoxText.current.scrollTop = chatBoxText.current.scrollHeight;
        }
    }, [messages,isBotProcessing]);

    return {
        chatBoxText,
        messages,
        input,
        isClient,
        isBotProcessing,
        sendMessage,
        setInput,
    };
}
