import React from "react";
import { User } from "lucide-react";

export default function MessageBubble({ message }) {
  const isCustomer = message.role === "customer";

  return (
    <div className={`flex items-end gap-2.5 mb-3 ${isCustomer ? "justify-start" : "justify-end"}`}>
      {isCustomer && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-0.5"
          style={{ background: "hsl(220 16% 91%)" }}
        >
          <User className="w-3 h-3 text-muted-foreground" />
        </div>
      )}

      <div className="flex flex-col gap-1 max-w-[68%]">
        <div
          className="px-4 py-3 rounded-2xl text-[13.5px] leading-[1.65]"
          style={
            isCustomer
              ? {
                  background: "white",
                  border: "1px solid hsl(220 16% 89%)",
                  color: "hsl(220 18% 18%)",
                  borderRadius: "18px 18px 18px 4px",
                  boxShadow: "0 1px 3px hsl(220 16% 88% / 0.5)",
                }
              : {
                  background: "hsl(220 25% 12%)",
                  color: "rgba(255,255,255,0.88)",
                  borderRadius: "18px 18px 4px 18px",
                  boxShadow: "0 2px 8px hsl(220 25% 10% / 0.15)",
                }
          }
        >
          {message.text}
        </div>
        <span
          className={`text-[10px] text-muted-foreground/50 px-1 ${isCustomer ? "text-left" : "text-right"}`}
        >
          {message.time}
        </span>
      </div>

      {!isCustomer && (
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mb-5"
          style={{ background: "hsl(220 25% 12%)" }}
        >
          <img
            src="https://media.base44.com/images/public/69cae07a199d96c3df465260/783d22566_2.png"
            alt="AI"
            className="w-4 h-4 object-contain"
            style={{ filter: "brightness(0) invert(1) opacity(0.85)" }}
          />
        </div>
      )}
    </div>
  );
}