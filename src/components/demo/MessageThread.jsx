import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageThread({ messages, isGenerating }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isGenerating && (
        <div className="flex items-start gap-2">
          <div
            className="rounded-2xl px-4 py-2.5 text-[13px]"
            style={{
              background: "hsl(220 18% 96%)",
              border: "1px solid hsl(220 16% 90%)",
              borderRadius: "16px 16px 16px 4px",
              color: "hsl(220 12% 54%)",
            }}
          >
            <span className="inline-flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: "300ms" }} />
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}