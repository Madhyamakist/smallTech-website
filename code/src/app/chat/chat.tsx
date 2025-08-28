"use client";
import { useChat } from "../hooks/useChat";

export default function Chat() {
  const {
    chatBoxText,
    messages,
    input,
    isClient,
    sendMessage,
    setInput,
  } = useChat();

  return (
    <div className="flex flex-col w-full px-4 py-6 relative min-h-screen">
      <h2 className="mb-2 text-start">Meet Our AI Agent</h2>
      <p className="mb-6 text-start">
        Talk to our smart assistant to explore services
      </p>


      <div className="flex flex-col text-xs items-center justify-center text-cream w-full mt-4 text-center font-thin">
        <p className="w-50">contact@madhyamakist.com</p>
        <p className="w-50 mt-5">© 2025 Madhyamakist Pvt. Ltd. All rights reserved.</p>
      </div>

      <div
        ref={chatBoxText}
        className="flex flex-col overflow-y-auto space-y-3 pb-4 ml-10"
        style={{
          flexGrow: 1,
          maxHeight: "calc(100vh - 220px)",
        }}

      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] px-3 py-2 rounded-lg ${msg.sender === "You"
              ? "bg-brown self-end text-cinereous font-semibold"
              : "bg-cinereous self-start text-brown font-semibold"
              }`}
          >
            {msg.text}
          </div>
        ))}
      </div>


      {isClient && (
        <form
          onSubmit={sendMessage}
           className="mt-auto"
        >
          <div className="flex items-center bg-rose rounded-xl border border-black px-3 py-2 shadow-md">
            <input
              type="text"
              className="flex-1 text-brown placeholder-brown bg-transparent outline-none"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
            <button
              type="submit"
              className="text-brown font-semibold ml-2 hover:text-cinereous transition"
            >
              Send
            </button>
          </div>
        </form>
      )}
      {/* {isClient && (
        <form
          onSubmit={sendMessage}
          className="flex border border-2 border-black items-center w-full max-w-md bg-rose rounded-xl px-3 py-2"
        >
          <input
            type="text"
            className="flex-1 text-brown placeholder-brown outline-none "
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button
            type="submit"
            className=" rounded-full text-brown hover:bg-cinereous transition"
          >
            Send
          </button>
        </form>
      )} */}

    </div>
  );
}
