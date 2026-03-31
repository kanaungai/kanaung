// ─── Business Identity ─────────────────────────────────────────────────────────
export const INITIAL_CONTEXT = {
  business: {
    name: "Golden Star Motors",
    industry: "Car Showroom",
    location: "Yangon, Myanmar",
    channels: ["Web", "Messenger", "Viber"],
    language: "burmese",
  },
};

// ─── Structured Showroom Data (Part 1) ────────────────────────────────────────
// Factual, editable data the AI uses as source of truth
export const INITIAL_SHOWROOM = {
  hours: "Mon – Sat, 9:00 AM – 6:00 PM",
  delivery: "Within Yangon 1–3 days. Upcountry available, contact sales for rates.",
  test_drive: "Available by appointment, Mon–Sat. Call or message to book.",
  warranty: "1-year standard manufacturer warranty on all models.",
  bulk_policy: "Fleet / bulk orders of 3+ units qualify for negotiated pricing.",
  branches: [
    { name: "Yangon Showroom", address: "No. 12, Pyay Road, Kamayut Tsp, Yangon", phone: "09-456-789-000" },
    { name: "Mandalay Branch", address: "No. 45, 78th Street, Chan Aye Thar Zan, Mandalay", phone: "09-456-789-111" },
  ],
};

// ─── Knowledge Base (Part 2) ──────────────────────────────────────────────────
// Reasoning, policy, tone — NOT structured facts
export const INITIAL_KB = {
  tone: "Friendly, professional, concise. Use Burmese if customer writes in Burmese. Never be pushy.",
  sales_policy: "Always quote cash price first. Mention installment only if customer asks. Never promise final pricing — direct to sales team for confirmed quotes.",
  escalation_rules: "Escalate to human agent if: customer asks for discount, complains, requests fleet pricing, wants upcountry logistics, or asks something AI cannot answer confidently.",
  dos: "Greet warmly. Confirm stock before quoting. Offer test drive proactively. Mention low stock urgency if qty < 2.",
  donts: "Do not invent specs or prices. Do not confirm delivery dates with certainty. Do not make promises the sales team hasn't approved.",
  faqs: "Q: Can I negotiate the price? A: Pricing is set, but fleet orders are negotiable — our sales team will assist.\nQ: Is there a warranty? A: Yes, 1-year manufacturer warranty on all models.\nQ: Can you deliver outside Yangon? A: Yes, upcountry delivery is available — contact our team for rates.",
};

// ─── Inventory ────────────────────────────────────────────────────────────────
export const INITIAL_INVENTORY = [
  {
    id: "1",
    brand: "Toyota",
    model: "Hilux",
    variant: "Single Cab 2.4L MT",
    body_type: "Pickup",
    cash_price: "55,000,000",
    installment_available: true,
    down_payment_pct: 20,
    monthly_term: "12 / 24 / 36 / 48 months",
    stock_status: "in_stock",
    quantity: 4,
    test_drive: true,
    notes: "Workhorse pickup. Most popular fleet choice.",
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Hilux",
    variant: "Double Cab 2.8L AT 4x4",
    body_type: "Pickup",
    cash_price: "72,000,000",
    installment_available: true,
    down_payment_pct: 20,
    monthly_term: "12 / 24 / 36 / 48 months",
    stock_status: "low_stock",
    quantity: 1,
    test_drive: true,
    notes: "Premium trim. Limited units available.",
  },
  {
    id: "3",
    brand: "Toyota",
    model: "Fortuner",
    variant: "2.7L AT 4x2",
    body_type: "SUV",
    cash_price: "95,000,000",
    installment_available: true,
    down_payment_pct: 25,
    monthly_term: "24 / 36 / 48 months",
    stock_status: "in_stock",
    quantity: 2,
    test_drive: true,
    notes: "Family SUV. High demand model.",
  },
  {
    id: "4",
    brand: "Honda",
    model: "HR-V",
    variant: "1.5L e:HEV Hybrid",
    body_type: "Crossover",
    cash_price: "85,000,000",
    installment_available: true,
    down_payment_pct: 20,
    monthly_term: "24 / 36 months",
    stock_status: "preorder",
    quantity: 0,
    test_drive: false,
    notes: "Hybrid model. Pre-order deposit required.",
  },
  {
    id: "5",
    brand: "Nissan",
    model: "Navara",
    variant: "2.5L AT 4x4 Pro-4X",
    body_type: "Pickup",
    cash_price: "68,000,000",
    installment_available: true,
    down_payment_pct: 20,
    monthly_term: "12 / 24 / 36 months",
    stock_status: "out_of_stock",
    quantity: 0,
    test_drive: false,
    notes: "Currently out of stock. Restock expected next month.",
  },
];

// ─── Seed conversation ────────────────────────────────────────────────────────
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
      "မင်္ဂလာပါ! Golden Star Motors မှ ကြိုဆိုပါတယ်။\n\nToyota Hilux မော်ဒယ် ၂ မျိုး ရရှိနိုင်ပါတယ် —\n\n🚗 Single Cab 2.4L MT — ကျပ် ၅၅,၀၀၀,၀၀၀ (In Stock)\n🚗 Double Cab 2.8L AT 4x4 — ကျပ် ၇၂,၀၀၀,၀၀၀ (Low Stock — ၁ စီးသာ ကျန်)\n\n💳 Installment: ၂၀% down payment, ၁၂–၄၈ လ ကြာ ပေးချေနိုင်\n\nTest drive ချိန်းဆိုလိုပါသလား?",
    time: "10:43 AM",
    signals: ["Live inventory", "Installment policy"],
  },
  {
    id: 3,
    role: "customer",
    name: "Ko Aung Kyaw",
    content: "Double Cab အတွက် installment အသေးစိတ် ပြောပြပါ",
    time: "10:44 AM",
    channel: "Messenger",
  },
  {
    id: 4,
    role: "ai",
    content:
      "Toyota Hilux Double Cab 2.8L AT 4x4 — Installment Plan\n\n• ကားဈေး: ကျပ် ၇၂,၀၀၀,၀၀၀\n• Down payment (20%): ကျပ် ၁၄,၄၀၀,၀၀၀\n• ကြာချိန်: ၁၂ / ၂၄ / ၃၆ / ၄၈ လ ရွေးချယ်နိုင်\n\n⚠️ ဒီ model လက်ရှိ ၁ စီးသာ ကျန်တော့ပါတယ်။ မြန်မြန် ဆက်သွယ်ပေးပါ။",
    time: "10:45 AM",
    signals: ["Live inventory", "Installment policy", "Low stock alert"],
  },
];

// ─── Auto-play simulation messages ───────────────────────────────────────────
export const AUTO_MESSAGES = [
  "မင်္ဂလာပါ။ Toyota Fortuner ရဲ့ ဈေးနှုန်း ဘယ်လောက်ကျလဲ?",
  "Installment နဲ့ ဝယ်လို့ရမလား?",
  "Down payment ဘယ်လောက်ပေးရမလဲ?",
  "Test drive လုပ်လို့ရမလား?",
  "ဆိုင်ဖွင့်ချိန် ဘယ်အချိန်ကနေ ဘယ်အချိန်ထိလဲ?",
  "Yangon ပြင်ပကို delivery ရနိုင်မလား?",
  "ဈေးနှုန်းလျှော့ပေးနိုင်မလား?",
];

// ─── AI Reply Engine ──────────────────────────────────────────────────────────
// Uses inventory (structured facts) + showroom (operational facts) + kb (policy/tone)

function stockLabel(status) {
  switch (status) {
    case "in_stock": return "✅ In Stock";
    case "low_stock": return "⚠️ Low Stock";
    case "out_of_stock": return "❌ Out of Stock";
    case "preorder": return "🔔 Pre-order";
    default: return status;
  }
}

function findMatchingCars(msg, inventory) {
  const lower = msg.toLowerCase();
  return inventory.filter((car) => {
    const haystack = `${car.brand} ${car.model} ${car.variant} ${car.body_type}`.toLowerCase();
    return lower.split(/\s+/).some((w) => w.length > 2 && haystack.includes(w));
  });
}

function buildCarBlock(car) {
  const stock =
    car.stock_status === "out_of_stock" ? "❌ Out of Stock" :
    car.stock_status === "low_stock" ? `⚠️ Low Stock (${car.quantity} remaining)` :
    car.stock_status === "preorder" ? "🔔 Pre-order only" :
    `✅ In Stock (${car.quantity} units)`;

  const priceStr = car.cash_price ? `ကျပ် ${car.cash_price}` : "Sales team ကို ဆက်သွယ်ပေးပါ";
  let block = `🚗 ${car.brand} ${car.model} ${car.variant}\n   ${priceStr} · ${stock}`;

  if (car.installment_available && car.stock_status !== "out_of_stock") {
    block += `\n   💳 ${car.down_payment_pct}% down · ${car.monthly_term}`;
  }
  if (car.test_drive && car.stock_status !== "out_of_stock") {
    block += `\n   🔑 Test drive available`;
  }
  if (car.notes) block += `\n   📝 ${car.notes}`;
  return block;
}

// Check if escalation is needed based on KB rules
function shouldEscalate(msg, kb) {
  const triggers = ["discount", "လျော့", "cheap", "ထိုးပေး", "complain", "တိုင်ကြား", "fleet", "bulk", "upcountry", "မန္တလေး"];
  return triggers.some((t) => msg.toLowerCase().includes(t));
}

export function generateReply(userMessage, context, inventory, showroom, kb) {
  const msg = userMessage.toLowerCase();
  const inv = inventory || [];
  const sr = showroom || {};
  const policy = kb || {};

  // ── Escalation check (KB rules) ──
  if (shouldEscalate(msg, policy)) {
    return {
      content: `ဒီကိစ္စအတွက် ကျွန်တော်တို့ sales team မှ တိုက်ရိုက် ဆက်သွယ်ပေးပါ့မယ်။\n\n${sr.branches?.[0] ? `📍 ${sr.branches[0].name}: ${sr.branches[0].phone}` : ""}`,
      signals: ["Escalating to sales team"],
      escalate: true,
    };
  }

  // ── Hours (showroom structured data) ──
  if (msg.includes("အချိန်") || msg.includes("ဖွင့်") || msg.includes("hour") || msg.includes("open")) {
    return {
      content: `🕘 ဖွင့်ချိန် — ${sr.hours || "Mon–Sat 9AM–6PM"}\n\nTest drive ချိန်းဆိုလိုပါက ဆက်သွယ်ပေးပါ။`,
      signals: ["Showroom hours"],
    };
  }

  // ── Delivery (showroom structured data) ──
  if (msg.includes("delivery") || msg.includes("ပို့") || msg.includes("deliver")) {
    return {
      content: `🚚 Delivery — ${sr.delivery || "Yangon 1–3 days"}`,
      signals: ["Delivery policy"],
    };
  }

  // ── Test drive (showroom + inventory) ──
  if (msg.includes("test drive") || (msg.includes("test") && msg.includes("drive"))) {
    const available = inv.filter((c) => c.test_drive && c.stock_status !== "out_of_stock");
    const modelList = available.length > 0
      ? available.map((c) => `• ${c.brand} ${c.model} ${c.variant}`).join("\n")
      : "မည်သည့် model မဆို";
    return {
      content: `🔑 Test Drive — ${sr.test_drive || "By appointment, Mon–Sat"}\n\nTest drive ကြည့်ရှုနိုင်သော models —\n${modelList}\n\nချိန်းဆိုရန် ကျွန်တော်တို့ team ဆက်သွယ်ပေးပါ့မယ်။`,
      signals: ["Test drive policy", "Live inventory"],
    };
  }

  // ── Branch / location ──
  if (msg.includes("branch") || msg.includes("location") || msg.includes("address") || msg.includes("ဆိုင်") || msg.includes("နေရာ")) {
    const branchLines = (sr.branches || []).map((b) => `📍 ${b.name}\n   ${b.address}\n   📞 ${b.phone}`).join("\n\n");
    return {
      content: branchLines || "Branch info ကို sales team မှ ဆက်သွယ်ပေးပါ့မယ်။",
      signals: ["Branch details"],
    };
  }

  // ── Specific model match (inventory structured data) ──
  const matched = findMatchingCars(msg, inv);

  if (matched.length === 1) {
    const car = matched[0];
    if (car.stock_status === "out_of_stock") {
      return {
        content: `${car.brand} ${car.model} ${car.variant} —\n\n❌ Stock မရှိပါ။\n\n${car.notes ? `📝 ${car.notes}\n\n` : ""}Stock ပြန်ရောက်သောအခါ အကြောင်းကြားပေးနိုင်ပါတယ်။`,
        signals: ["Live inventory", "Out of stock"],
      };
    }
    return {
      content: buildCarBlock(car) + `\n\nပိုသေချာသော quote အတွက် ကျွန်တော်တို့ sales team ဆက်သွယ်ပေးနိုင်ပါတယ်။`,
      signals: ["Live inventory", car.installment_available ? "Installment policy" : null].filter(Boolean),
    };
  }

  if (matched.length > 1) {
    const lines = matched.map(buildCarBlock).join("\n\n");
    return {
      content: `ရှာတွေ့သော မော်ဒယ်များ —\n\n${lines}\n\nတစ်ခုခုကို ပိုသိချင်ပါသလား?`,
      signals: ["Live inventory"],
    };
  }

  // ── General model/price list ──
  if (msg.includes("model") || msg.includes("မော်ဒယ်") || msg.includes("ကား") || msg.includes("list") || msg.includes("ဘာ") || msg.includes("ဈေး") || msg.includes("price") || msg.includes("ဘယ်လောက်")) {
    const available = inv.filter((c) => c.stock_status !== "out_of_stock");
    if (available.length === 0) {
      return { content: "လက်ရှိ ရောင်းချနိုင်သော ကားများ မရှိသေးပါ။", signals: ["Live inventory"] };
    }
    const lines = available.map((c) => `🚗 ${c.brand} ${c.model} ${c.variant} — ${c.cash_price ? `ကျပ် ${c.cash_price}` : "Contact sales"} · ${stockLabel(c.stock_status)}`).join("\n");
    return {
      content: `လက်ရှိ ရရှိနိုင်သော ကားများ —\n\n${lines}\n\nမည်သည့် model ကို ပိုသိချင်ပါသလဲ?`,
      signals: ["Live inventory"],
    };
  }

  // ── Fallback ──
  return {
    content: `${context.business.name} မှ ကြိုဆိုပါတယ်။\n\nToyota, Honda, Nissan မော်ဒယ်များ ရရှိနိုင်ပါတယ်။ ဘယ် model အကြောင်း သိချင်ပါသလဲ?`,
    signals: [],
  };
}