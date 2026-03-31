export const INITIAL_CONTEXT = {
  business: {
    name: "Golden Star Motors",
    industry: "Car Showroom",
    location: "Yangon, Myanmar",
    channels: ["Web", "Messenger", "Viber"],
    language: "burmese", // "burmese" | "bilingual"
  },
  knowledge: {
    hours: "Mon – Sat, 9:00 AM – 6:00 PM",
    models: "Toyota, Honda, Nissan, Suzuki",
    financing: "20% down payment, 12–48 month installments",
    delivery: "Within Yangon (1–3 days)",
    warranty: "1-year standard manufacturer warranty",
    bulk: "Negotiable pricing for fleet / bulk orders",
    test_drive: "Available by appointment, Mon–Sat",
  },
  rules: {
    language_first: true,       // Burmese-first replies
    concise: true,              // Keep responses concise
    no_invent: true,            // Don't invent unavailable models
    escalate_discounts: true,   // Escalate discount negotiations
    escalate_complaints: true,  // Escalate complaints
  },
};

export const INITIAL_MESSAGES = [
  {
    id: 1,
    role: "customer",
    name: "Ko Aung Kyaw",
    content: "မင်္ဂလာပါ။ Toyota Hilux ရဲ့ ဈေးနှုန်း ဘယ်လောက်ကျလဲ?",
    time: "10:42 AM",
    channel: "Messenger",
  },
  {
    id: 2,
    role: "ai",
    content:
      "မင်္ဂလာပါ! Golden Star Motors မှ ကြိုဆိုပါတယ်။\n\nToyota Hilux ဈေးနှုန်းမှာ model ပေါ် မူတည်ပြီး ကွာခြားပါတယ်။\n\n• Hilux Single Cab — ကျပ် ၅၅ သိန်းမှ\n• Hilux Double Cab — ကျပ် ၇၂ သိန်းမှ\n\nကျွန်တော်တို့ Installment plan လည်း ရရှိနိုင်ပါတယ် — ၂၀% down payment, ၁၂ မှ ၄၈ လ ကြာ ပေးချေနိုင်ပါတယ်။\n\nTest drive ချိန်းဆိုလိုပါသလား?",
    time: "10:43 AM",
    signals: ["Using pricing policy", "Installment policy applied"],
  },
  {
    id: 3,
    role: "customer",
    name: "Ko Aung Kyaw",
    content: "Installment plan အကြောင်း ပိုပြောပြပါ",
    time: "10:44 AM",
    channel: "Messenger",
  },
  {
    id: 4,
    role: "ai",
    content:
      "Installment အသေးစိတ် —\n\n• Down payment: ကားဈေးနှုန်း၏ ၂၀%\n• ကြာချိန်: ၁၂ လ / ၂၄ လ / ၃၆ လ / ၄၈ လ ရွေးချယ်နိုင်\n• အတိုးနှုန်း: Finance company ပေါ်မူတည်ပြီး ကွာခြားနိုင်\n\nကျွန်တော်တို့ sales team မှ သင့်အတွက် customized quote ပြုလုပ်ပေးနိုင်ပါတယ်။ ဘယ် model ကို ဝယ်ယူချင်ပါသလဲ?",
    time: "10:44 AM",
    signals: ["Installment policy applied"],
  },
];

// Generates a contextual AI reply based on current context
export function generateReply(userMessage, context) {
  const msg = userMessage.toLowerCase();

  if (msg.includes("ဈေး") || msg.includes("price") || msg.includes("ဘယ်လောက်")) {
    return {
      content: `${context.knowledge.models} မော်ဒယ်များ ရရှိနိုင်ပါတယ်။\n\nဈေးနှုန်း အသေးစိတ်အတွက် showroom သို့ လာရောက်ကြည့်ရှုနိုင်သည် သို့မဟုတ် ကျွန်တော်တို့ sales team ဆက်သွယ်ပေးမည်။\n\n${
        context.knowledge.financing
          ? `💳 Installment: ${context.knowledge.financing}`
          : ""
      }`,
      signals: ["Using pricing policy", "Installment policy applied"],
    };
  }

  if (msg.includes("အချိန်") || msg.includes("ဖွင့်") || msg.includes("hour") || msg.includes("open")) {
    return {
      content: `ကျွန်တော်တို့ showroom ဖွင့်ချိန် —\n\n🕘 ${context.knowledge.hours}\n\nTest drive ချိန်းဆိုလိုပါက ကြိုတင်ဆက်သွယ်ပေးပါ။`,
      signals: ["Using showroom hours"],
    };
  }

  if (msg.includes("model") || msg.includes("မော်ဒယ်") || msg.includes("ကား")) {
    return {
      content: `လက်ရှိ ရရှိနိုင်သော မော်ဒယ်များ —\n\n🚗 ${context.knowledge.models.split(", ").join("\n🚗 ")}\n\nကြည့်ရှုလိုသော မော်ဒယ် ရှိပါသလား? Test drive စီစဉ်ပေးနိုင်ပါတယ်။`,
      signals: ["Using product catalog"],
    };
  }

  if (msg.includes("install") || msg.includes("ဆေး") || msg.includes("ပေး") || msg.includes("financing")) {
    return {
      content: `💳 Installment အသေးစိတ် —\n\n${context.knowledge.financing}\n\nသင့်အတွက် customized quote ထုတ်ပေးနိုင်ပါတယ်။ ဘယ် model ဝယ်ချင်ပါသလဲ?`,
      signals: ["Installment policy applied"],
    };
  }

  if (msg.includes("delivery") || msg.includes("ပို့") || msg.includes("deliver")) {
    return {
      content: `🚚 Delivery — ${context.knowledge.delivery}\n\nOrder confirm ပြီးနောက် ၁–၃ ရက်အတွင်း ပို့ဆောင်ပေးနိုင်ပါတယ်။`,
      signals: ["Using delivery policy"],
    };
  }

  if (msg.includes("discount") || msg.includes("လျော့") || msg.includes("cheap")) {
    return {
      content: `လျော့ဈေး သို့မဟုတ် special offer အတွက် ကျွန်တော်တို့ sales team မှ တိုက်ရိုက်ဆက်သွယ်ပေးပါ့မယ်။\n\nFleet / bulk order ဆိုပါက negotiable ဖြစ်ပါတယ်။`,
      signals: ["Escalating: discount request"],
      escalate: true,
    };
  }

  if (msg.includes("test drive") || msg.includes("test") || msg.includes("drive")) {
    return {
      content: `Test drive — ${context.knowledge.test_drive}\n\nကြိုတင်ချိန်းဆိုရန် ကျွန်တော်တို့ team ဆက်သွယ်ပေးပါ့မယ်။ ဘယ် model ကို drive ကြည့်ချင်ပါသလဲ?`,
      signals: ["Using test drive policy"],
    };
  }

  return {
    content: `${context.business.name} မှ ကြိုဆိုပါတယ်။ ဘယ် model အကြောင်း သိချင်ပါသလဲ? ဈေးနှုန်း၊ financing၊ test drive — ဘာမဆို ကူညီပေးနိုင်ပါတယ်။`,
    signals: [],
  };
}