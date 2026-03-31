import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bot, User, Send, Zap, BookOpen, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SCENARIOS = [
  {
    id: "machinery",
    label: "Machinery Dealer",
    business: "Golden Star Machinery",
    businessMM: "ရွှေကြယ် စက်ပစ္စည်း",
    greeting: "မင်္ဂလာပါ! ရွှေကြယ် စက်ပစ္စည်းမှ ကြိုဆိုပါတယ်။ ဘာအကူအညီ ပေးရမလဲ?",
    suggestions: ["ဈေးနှုန်း ဘယ်လောက်ကျလဲ", "ဆိုင်ဘယ်မှာရှိလဲ", "ဘယ်အချိန်ဖွင့်လဲ", "ပို့ဆောင်ပေးလား"],
    kb: {
      "ဈေးနှုန်း": "Mini Excavator — ကျပ် ၂၅၀ သိန်းမှ\nWheel Loader — ကျပ် ၃၈၀ သိန်းမှ\nGenerator Set — ကျပ် ၈၅ သိန်းမှ\n\nModel နံပါတ်ပြောပြပေးရင် အတိအကျ ဈေးနှုန်း ပြောပေးပါ့မယ်။",
      "ဆိုင်": "📍 အမှတ် ၁၂၃၊ ပြည်လမ်း၊ မရမ်းကုန်းမြို့နယ်၊ ရန်ကုန်\n\nGoogle Maps တွင် 'Golden Star Machinery Yangon' ဟု ရှာနိုင်ပါတယ်။",
      "အချိန်": "🕘 တနင်္လာ–စနေ: နံနက် ၉:၀၀ – ညနေ ၅:၃၀\n🔴 တနင်္ဂနွေ: ပိတ်",
      "ပို့": "ရန်ကုန်တွင်း ပို့ဆောင်ခ အခမဲ့ပါ။ ရန်ကုန်ပြင်ပ မြို့များကိုလည်း ပို့ဆောင်ပေးနိုင်ပါတယ် — မြို့ပြောပြပေးပါ။",
    },
  },
  {
    id: "restaurant",
    label: "Restaurant",
    business: "Shwe Mandalay Restaurant",
    businessMM: "ရွှေမန္တလေး စားသောက်ဆိုင်",
    greeting: "မင်္ဂလာပါ! ရွှေမန္တလေး စားသောက်ဆိုင်မှ ကြိုဆိုပါတယ်။ ဘာကူညီပေးရမလဲ?",
    suggestions: ["Menu ဘာရှိလဲ", "Table ကြိုချိန်းလို့ရလား", "ဘယ်မှာတည်ရှိလဲ", "ဖွင့်ချိန် ဘယ်အချိန်"],
    kb: {
      "menu": "🍛 မိုးကောင်း ကြက်သားဟင်း — ၈,၀၀၀ ကျပ်\n🍖 Grilled ဝက်သားဟင်း — ၁၂,၀၀၀ ကျပ်\n🐟 ငါးကြော် — ၉,၀၀၀ ကျပ်\n🥗 ဟင်းသီးဟင်းရွက် Salad — ၅,၀၀၀ ကျပ်",
      "table": "Table ကြိုချိန်းနိုင်ပါတယ်။ ဘယ်နေ့၊ ဘယ်အချိန်၊ လူဦးရေ ဘယ်နှစ်ယောက် ပြောပြပေးပါ။",
      "တည်ရှိ": "📍 ဗိုလ်တထောင်မြို့နယ်၊ ရန်ကုန်\nအဓိကလမ်းမကြီး ဘေးတွင် ရှိပါတယ်။",
      "ဖွင့်": "🕙 နေ့တိုင်း နံနက် ၁၀:၀၀ – ည ၁၀:၀၀\nသောကြာနေ့ ၊ စနေနေ့ — ည ၁၁:၀၀ ထိ ဖွင့်ပါတယ်။",
    },
  },
  {
    id: "clinic",
    label: "Clinic",
    business: "City Health Clinic",
    businessMM: "စီးတီး ကျန်းမာရေးဆေးခန်း",
    greeting: "မင်္ဂလာပါ! စီးတီး ကျန်းမာရေးဆေးခန်းမှ ကြိုဆိုပါတယ်။ ဘာကူညီပေးရမလဲ?",
    suggestions: ["ဆရာဝန်နှင့် ချိန်းဆိုလို့ရလား", "ဖွင့်ချိန် ဘယ်အချိန်", "ဆေးခန်း နေရာ ဘယ်မှာ", "ဆေးကုသခ ဘယ်လောက်ကျ"],
    kb: {
      "ချိန်း": "ဆရာဝန်နှင့် ချိန်းဆိုနိုင်ပါတယ်။ ဘယ်ဆရာဝန်ကို ကြည့်ချင်ပါသလဲ? ရက်နှင့် အချိန် ပြောပြပေးပါ။",
      "ဖွင့်": "🕗 တနင်္လာ–စနေ: နံနက် ၇:၀၀ – ည ၈:၀၀\n🕙 တနင်္ဂနွေ: နံနက် ၉:၀၀ – နေ့လည် ၁:၀၀\n\nEmergency အတွက် ၂၄ နာရီ ဖုန်း ၀၉-၁၁၁-၂၂၂-၃၃၃",
      "နေရာ": "📍 ကမာရွတ်မြို့နယ်၊ ရန်ကုန်\nYangon General Hospital မှ ၅ မိနစ် အကွာတွင် ရှိပါတယ်။",
      "ဆေးကုသ": "General Consultation — ၁၅,၀၀၀ ကျပ်\nSpecialist — ၂၅,၀၀၀ – ၅၀,၀၀၀ ကျပ်\nLab Tests — ၅,၀၀၀ မှ စတင်ပါတယ်။",
    },
  },
  {
    id: "realestate",
    label: "Real Estate",
    business: "Yangon Property Group",
    businessMM: "ရန်ကုန် အိမ်ခြံမြေ ကုမ္ပဏီ",
    greeting: "မင်္ဂလာပါ! ရန်ကုန် အိမ်ခြံမြေ ကုမ္ပဏီမှ ကြိုဆိုပါတယ်။ ဘာကူညီပေးရမလဲ?",
    suggestions: ["အိမ်ငှားလိုသည်", "ကွန်ဒိုဝယ်ချင်တယ်", "မြေကွက်ရောင်းသလား", "ဈေးနှုန်းစာရင်း ကြည့်ချင်တယ်"],
    kb: {
      "ငှား": "လောလောဆယ် ရှိသော ငှားရမ်းအိမ်များ —\n🏠 Condo (Yankin) — $/350 per month\n🏠 Apartment (Hledan) — $/180 per month\n🏡 House (Thanlyin) — $/400 per month",
      "ကွန်ဒို": "ကွန်ဒိုအသစ်များ —\n🏢 Star City — $80,000 မှ\n🏢 The Peak — $120,000 မှ\nPlot size, floor ပြောပြပေးပါ — အသေးစိတ် ပြောပေးပါ့မယ်။",
      "မြေ": "မြေကွက် ရှိပါတယ်။ မည်သည့် မြို့နယ်ကို ဝယ်ချင်ပါသလဲ? ဧကနှင့် ဘတ်ဂျက် ပြောပြပေးပါ။",
      "ဈေးနှုန်း": "ဈေးနှုန်း list အပြည့်အစုံ ကြည့်ရန် ကျွန်တော်တို့ sales team ဆက်သွယ်ပေးမည် — 09-888-777-666",
    },
  },
];

const FALLBACK = "ဒီမေးခွန်းအတွက် ကျွန်တော်တို့ team ဆက်သွယ်ပေးပါ့မယ်။ ☎️ 09-123-456-789";

function findReply(kb, input) {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(kb)) {
    if (lower.includes(key.toLowerCase())) return val;
  }
  return FALLBACK;
}

function TypingDots() {
  return (
    <div className="flex gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="bg-secondary rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1.5">
        {[0, 150, 300].map((d) => (
          <span key={d} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: `${d}ms` }} />
        ))}
      </div>
    </div>
  );
}

export default function Demo() {
  const [scenarioId, setScenarioId] = useState("machinery");
  const [messages, setMessages] = useState(() => {
    const s = SCENARIOS[0];
    return [{ role: "bot", content: s.greeting }];
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const switchScenario = (id) => {
    const s = SCENARIOS.find((x) => x.id === id);
    setScenarioId(id);
    setMessages([{ role: "bot", content: s.greeting }]);
    setInput("");
    setTyping(false);
  };

  const send = (text) => {
    const t = text.trim();
    if (!t || typing) return;
    setMessages((p) => [...p, { role: "user", content: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = findReply(scenario.kb, t);
      setMessages((p) => [...p, { role: "bot", content: reply }]);
      setTyping(false);
    }, 900 + Math.random() * 600);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="border-b border-foreground/[0.07] px-6 py-4 flex items-center gap-4 bg-background/80 backdrop-blur-xl sticky top-0 z-20">
        <Link to="/" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-[13px] font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>
        <div className="w-px h-4 bg-foreground/10" />
        <span className="font-sora font-semibold text-[15px] tracking-[-0.01em] text-foreground">
          kanaung<span className="text-primary font-bold">.</span>
          <span className="text-muted-foreground font-normal ml-2 text-[13px]">Interactive Demo</span>
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-10">
        {/* Scenario tabs */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => switchScenario(s.id)}
              className={`px-4 py-2 rounded-full text-[12px] font-semibold transition-all duration-200 ${
                scenarioId === s.id
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-secondary text-muted-foreground hover:text-foreground border border-foreground/[0.07]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Chat window */}
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{scenario.business}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Powered by Kanaung AI
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[360px] overflow-y-auto p-5 space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === "bot"
                        ? "bg-secondary text-foreground rounded-tl-md"
                        : "bg-primary text-primary-foreground rounded-tr-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && <TypingDots />}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {scenario.suggestions.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={typing}
                className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-5 pb-5 pt-2">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="မေးခွန်းရိုက်ထည့်ပါ..."
                disabled={typing}
                className="flex-1 bg-secondary/60 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-40 flex-shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          Responses are simulated · Switch scenarios using the tabs above
        </p>
      </div>
    </div>
  );
}