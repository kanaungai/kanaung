import React, { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BUSINESS_NAME = "Golden Star Machinery";
const BUSINESS_NAME_MM = "ရွှေကြယ် စက်ပစ္စည်း";

const KNOWLEDGE_BASE = {
  "ဒီပစ္စည်း ဘယ်လောက်ကျလဲ": `ကျွန်တော်တို့ ${BUSINESS_NAME_MM} မှာ စက်ပစ္စည်းအမျိုးအစားပေါ် မူတည်ပြီး ဈေးနှုန်း ကွာခြားပါတယ်။\n\n• Mini Excavator — ကျပ် ၂၅၀ သိန်းမှ စတင်\n• Wheel Loader — ကျပ် ၃၈၀ သိန်းမှ စတင်\n• Generator Set — ကျပ် ၈၅ သိန်းမှ စတင်\n\nအသေးစိတ် ဈေးနှုန်းအတွက် model နံပါတ်ပြောပြပေးပါ။`,
  "ဆိုင်ဘယ်မှာရှိလဲ": `${BUSINESS_NAME_MM} ရုံးခန်းနှင့် ပြခန်းလိပ်စာ —\n\n📍 အမှတ် ၁၂၃၊ ပြည်လမ်း၊ မရမ်းကုန်းမြို့နယ်၊ ရန်ကုန်\n\nGoogle Maps တွင် "Golden Star Machinery Yangon" ဟု ရှာနိုင်ပါတယ်။`,
  "ဘယ်အချိန်ဖွင့်လဲ": `ဖွင့်ချိန် —\n\n🕘 တနင်္လာ - စနေ: နံနက် ၉:၀၀ မှ ညနေ ၅:၃၀ ထိ\n🕘 တနင်္ဂနွေ: ပိတ်ပါတယ်\n\nအထူးချိန်းဆိုမှုအတွက် ကြိုတင်ဖုန်းဆက်နိုင်ပါတယ်။`,
  "ဒီ model ရှိသေးလား": "ဘယ် model ကို ရည်ရွယ်ပါသလဲ? Model နံပါတ် သို့မဟုတ် စက်အမျိုးအစား ပြောပြပေးရင် stock စစ်ပေးပါ့မယ်။",
  "ပို့ဆောင်ပေးလား": "ရန်ကုန်တွင်း ပို့ဆောင်ခ အခမဲ့ ပေးပါတယ်။ ရန်ကုန်ပြင်ပ မြို့များအတွက်လည်း ပို့ဆောင်ပေးနိုင်ပါတယ် — ပို့ဆောင်ခ သီးသန့်တွက်ပေးပါ့မယ်။ ပို့ချင်တဲ့ မြို့ ပြောပြပေးပါ။",
  "ဖုန်းနံပါတ်ပေးပါ": `${BUSINESS_NAME_MM} ဆက်သွယ်ရန် —\n\n📞 ဖုန်း: 09-123-456-789\n📞 Viber: 09-123-456-789\n💬 Facebook: fb.com/GoldenStarMachinery\n\nရုံးချိန်အတွင်း ဆက်သွယ်ပေးပါ။`,
};

const FALLBACK_RESPONSE = "ဒီမေးခွန်းအတွက် အတိအကျပြန်ဖြေပေးဖို့ ကျွန်တော်တို့အဖွဲ့ကို ဆက်သွယ်ပေးပါမယ်။ ဖုန်းနံပါတ် သို့မဟုတ် Viber နံပါတ် ချန်ထားနိုင်ပါတယ်။ 📞 09-123-456-789";

const SUGGESTED_QUESTIONS = [
  "ဒီပစ္စည်း ဘယ်လောက်ကျလဲ",
  "ဆိုင်ဘယ်မှာရှိလဲ",
  "ဘယ်အချိန်ဖွင့်လဲ",
  "ဒီ model ရှိသေးလား",
  "ပို့ဆောင်ပေးလား",
  "ဖုန်းနံပါတ်ပေးပါ",
];

function findBestMatch(input) {
  const normalized = input.trim();
  // Exact match
  if (KNOWLEDGE_BASE[normalized]) return KNOWLEDGE_BASE[normalized];
  // Partial match
  for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
    if (normalized.includes(key) || key.includes(normalized)) return value;
  }
  // Keyword matching
  const keywords = {
    "ဈေး": KNOWLEDGE_BASE["ဒီပစ္စည်း ဘယ်လောက်ကျလဲ"],
    "လောက်": KNOWLEDGE_BASE["ဒီပစ္စည်း ဘယ်လောက်ကျလဲ"],
    "လိပ်စာ": KNOWLEDGE_BASE["ဆိုင်ဘယ်မှာရှိလဲ"],
    "နေရာ": KNOWLEDGE_BASE["ဆိုင်ဘယ်မှာရှိလဲ"],
    "အချိန်": KNOWLEDGE_BASE["ဘယ်အချိန်ဖွင့်လဲ"],
    "ဖွင့်": KNOWLEDGE_BASE["ဘယ်အချိန်ဖွင့်လဲ"],
    "model": KNOWLEDGE_BASE["ဒီ model ရှိသေးလား"],
    "ပို့": KNOWLEDGE_BASE["ပို့ဆောင်ပေးလား"],
    "delivery": KNOWLEDGE_BASE["ပို့ဆောင်ပေးလား"],
    "ဖုန်း": KNOWLEDGE_BASE["ဖုန်းနံပါတ်ပေးပါ"],
    "ဆက်သွယ်": KNOWLEDGE_BASE["ဖုန်းနံပါတ်ပေးပါ"],
    "viber": KNOWLEDGE_BASE["ဖုန်းနံပါတ်ပေးပါ"],
  };
  for (const [keyword, response] of Object.entries(keywords)) {
    if (normalized.toLowerCase().includes(keyword)) return response;
  }
  return FALLBACK_RESPONSE;
}

function MessageBubble({ message, isLast }) {
  const isBot = message.role === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-2.5 ${isBot ? "justify-start" : "justify-end"}`}
    >
      {isBot && (
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Bot className="w-3.5 h-3.5 text-primary" />
        </div>
      )}
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
          isBot
            ? "bg-secondary text-foreground rounded-tl-md"
            : "bg-primary text-primary-foreground rounded-tr-md"
        }`}
      >
        {message.content}
      </div>
      {!isBot && (
        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      )}
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-2.5"
    >
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </motion.div>
  );
}

export default function ChatDemo() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content: `မင်္ဂလာပါ! ${BUSINESS_NAME_MM} မှ ကြိုဆိုပါတယ်။ ကျွန်တော် Kanaung AI assistant ဖြစ်ပါတယ်။ ဘာအကူအညီ ပေးရမလဲ?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) return;

      setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
      setInput("");
      setIsTyping(true);

      const delay = 800 + Math.random() * 800;
      setTimeout(() => {
        const response = findBestMatch(trimmed);
        setMessages((prev) => [...prev, { role: "bot", content: response }]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="demo" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-xs font-medium text-primary mb-5">
            <Sparkles className="w-3 h-3" />
            Interactive demo
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            See Kanaung in action
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            This demo simulates a Kanaung AI assistant for a machinery dealership
            in Yangon. Ask questions in Burmese.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-2xl mx-auto"
        >
          {/* Chat window */}
          <div className="rounded-2xl border border-border bg-card shadow-xl shadow-primary/[0.04] overflow-hidden">
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">
                  {BUSINESS_NAME}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Powered by Kanaung AI
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[380px] md:h-[420px] overflow-y-auto p-5 space-y-4 scroll-smooth">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <MessageBubble
                    key={i}
                    message={msg}
                    isLast={i === messages.length - 1}
                  />
                ))}
              </AnimatePresence>
              <AnimatePresence>{isTyping && <TypingIndicator />}</AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            <div className="px-5 pb-3">
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    disabled={isTyping}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-5 pb-5 pt-2">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="မေးခွန်းရိုက်ထည့်ပါ..."
                  disabled={isTyping}
                  className="flex-1 bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Demo: AI assistant for {BUSINESS_NAME} · Responses are simulated
          </p>
        </motion.div>
      </div>
    </section>
  );
}