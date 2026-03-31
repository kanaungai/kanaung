import React, { useState, useEffect, useRef, useCallback } from "react";
import { requestShowroomAssistantReply } from "@/api/showroomAssistant";
import { INITIAL_MESSAGES, AUTO_MESSAGES } from "../../data/showroomData";
import ConversationHeader from "./ConversationHeader";
import MessageThread from "./MessageThread";
import DraftComposer from "./DraftComposer";

export default function ConversationPanel({ context, inventory, showroom, kb }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [draft, setDraft] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState("");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoIndexRef = useRef(0);
  const autoTimerRef = useRef(null);

  const handleCustomerSend = useCallback(async (text) => {
    if (!text.trim()) return;

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
    setDraft(null);
    setGenerationError("");
    setIsGenerating(true);

    const reply = await requestShowroomAssistantReply({
      message: text,
      context,
      inventory,
      showroom,
      kb,
      messages: nextMessages,
    });

    setDraft({ ...reply, id: Date.now() + 1 });
    setIsGenerating(false);
    setGenerationError(reply.error ? "Using local fallback because the backend function is unavailable." : "");

    // Auto-play: after draft is set, auto-send it and queue next message
    if (autoIndexRef.current > 0) {
      setTimeout(() => {
        setDraft((d) => {
          if (!d) return null;
          setMessages((prev) => [
            ...prev,
            { id: d.id, role: "ai", content: d.content, time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), signals: d.signals || [] },
          ]);
          return null;
        });
        // Queue next customer message
        if (autoIndexRef.current < AUTO_MESSAGES.length) {
          autoTimerRef.current = setTimeout(() => {
            const nextMsg = AUTO_MESSAGES[autoIndexRef.current];
            autoIndexRef.current += 1;
            handleCustomerSend(nextMsg);
          }, 1500 + Math.random() * 1000);
        } else {
          setIsAutoPlaying(false);
        }
      }, 800);
    }
  }, [context, inventory, showroom, kb, messages]);

  const handleSendDraft = () => {
    if (!draft) return;
    const aiMsg = {
      id: draft.id,
      role: "ai",
      content: draft.content,
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      signals: draft.signals || [],
    };
    setMessages((prev) => [...prev, aiMsg]);
    setDraft(null);
  };

  const handleAutoPlay = () => {
    if (isAutoPlaying) {
      clearTimeout(autoTimerRef.current);
      setIsAutoPlaying(false);
      autoIndexRef.current = 0;
      return;
    }
    setIsAutoPlaying(true);
    autoIndexRef.current = 1;
    handleCustomerSend(AUTO_MESSAGES[0]);
  };

  const handleEscalate = () => {
    const escalateMsg = {
      id: Date.now(),
      role: "system",
      content: "Conversation escalated to sales team.",
      time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, escalateMsg]);
    setDraft(null);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "white" }}>
      <ConversationHeader context={context} />
      <MessageThread messages={messages} />
      <DraftComposer
        draft={draft}
        setDraft={setDraft}
        onSend={handleSendDraft}
        onEscalate={handleEscalate}
        onCustomerSend={handleCustomerSend}
        context={context}
        isGenerating={isGenerating}
        generationError={generationError}
        isAutoPlaying={isAutoPlaying}
        onAutoPlay={handleAutoPlay}
      />
    </div>
  );
}