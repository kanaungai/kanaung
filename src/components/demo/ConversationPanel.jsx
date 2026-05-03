import React, { useState, useRef } from "react";
import { Send, Loader2 } from "lucide-react";
import { requestShowroomAssistantReply } from "@/api/showroomAssistant";
import { INITIAL_MESSAGES } from "../../data/showroomData";
import ConversationHeader from "./ConversationHeader";
import MessageThread from "./MessageThread";

export default function ConversationPanel({ context, inventory, showroom, kb }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [isGenerating, setIsGenerating] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isGenerating) return;
    setInput("");

    const customerMsg = {
      id: Date.now(),
      role: "customer",
      name: "Ko Aung Kyaw",
      content: text,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      channel: "Messenger",
    };

    const nextMessages = [...messages, customerMsg];
    setMessages(nextMessages);
    setIsGenerating(true);

    const reply = await requestShowroomAssistantReply({
      message: text,
      context,
      inventory,
      showroom,
      kb,
      messages: nextMessages,
    });

    const aiMsg = {
      id: Date.now() + 1,
      role: "ai",
      content: reply.content,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      signals: reply.signals || [],
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsGenerating(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "white" }}>
      <ConversationHeader />
      <MessageThread messages={messages} isGenerating={isGenerating} />
      <div
        className="flex-shrink-0 border-t px-3 sm:px-4 py-3"
        style={{ borderColor: "hsl(220 16% 89%)", background: "white" }}
      >
        <p className="text-[9px] font-bold tracking-[0.1em] uppercase text-muted-foreground mb-2">
          Simulate Customer Message
        </p>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isGenerating ? "AI is responding..." : "Type a customer message and press Enter…"}
            disabled={isGenerating}
            className="min-w-0 flex-1 text-[12px] bg-secondary/50 border rounded-lg px-3 py-2 focus:outline-none focus:ring-1 transition-all disabled:opacity-50"
            style={{ borderColor: "hsl(220 16% 88%)", color: "hsl(220 18% 18%)" }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors disabled:opacity-40"
            style={{ background: "hsl(220 25% 11%)", color: "white" }}
          >
            {isGenerating ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
