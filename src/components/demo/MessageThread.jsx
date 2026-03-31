import React, { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import AIStatusBar from "./AIStatusBar";

export default function MessageThread({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto px-6 py-6 space-y-1"
      style={{ background: "hsl(220 22% 97%)" }}
    >
      {messages.map((msg, i) => (
        <React.Fragment key={msg.id}>
          <MessageBubble message={msg} />
          {msg.signals && (
            <AIStatusBar signals={msg.signals} escalated={msg.escalated} align={msg.role === "ai" ? "left" : "right"} />
          )}
        </React.Fragment>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}