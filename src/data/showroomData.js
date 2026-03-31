// ─── Business Context ────────────────────────────────────────────────────────
export const INITIAL_CONTEXT = {
  business: {
    name: "Golden Star Motors",
    industry: "Car Showroom",
    location: "Yangon, Myanmar",
    channels: ["Web", "Messenger", "Viber"],
    language: "burmese",
  },
  knowledge: {
    hours: "Mon – Sat, 9:00 AM – 6:00 PM",
    delivery: "Within Yangon (1–3 days)",
    warranty: "1-year standard manufacturer warranty",
    bulk: "Negotiable pricing for fleet / bulk orders",
    test_drive: "Available by appointment, Mon–Sat",
  },
  rules: {
    language_first: true,
    concise: true,
    no_invent: true,
    escalate_discounts: true,
    escalate_complaints: true,
  },
};

// ─── Inventory ────────────────────────────────────────────────────────────────
// Single source of truth for all car models. AI reads directly from this.
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
    monthly_note: "Rate depends on finance company",
    stock_status: "in_stock",
    quantity: 4,
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
    monthly_note: "Rate depends on finance company",
    stock_status: "low_stock",
    quantity: 1,
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
    monthly_note: "Rate depends on finance company",
    stock_status: "in_stock",
    quantity: 2,
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
    monthly_note: "Rate depends on finance company",
    stock_status: "preorder",
    quantity: 0,
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
    monthly_note: "Rate depends on finance company",
    stock_status: "out_of_stock",
    quantity: 0,
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
    signals: ["Using live inventory", "Installment policy applied"],
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
      "Toyota Hilux Double Cab 2.8L AT 4x4 — Installment Plan\n\n• ကားဈေး: ကျပ် ၇၂,၀၀၀,၀၀၀\n• Down payment (20%): ကျပ် ၁၄,၄၀၀,၀၀၀\n• ကြာချိန်: ၁၂ / ၂၄ / ၃၆ / ၄၈ လ ရွေးချယ်နိုင်\n• Rate: Finance company ပေါ်မူတည်ပြီး ကွာခြားနိုင်\n\n⚠️ ဒီ model လက်ရှိ ၁ စီးသာ ကျန်တော့ပါတယ်။ မြန်မြန် ဆက်သွယ်ပေးပါ။",
    time: "10:45 AM",
    signals: ["Using live inventory", "Installment policy applied", "Low stock alert"],
  },
];

// ─── AI Reply Engine ──────────────────────────────────────────────────────────
function formatPrice(price) {
  return `ကျပ် ${price}`;
}

function stockLabel(status) {
  switch (status) {
    case "in_stock": return "✅ In Stock";
    case "low_stock": return "⚠️ Low Stock";
    case "out_of_stock": return "❌ Out of Stock";
    case "preorder": return "🔔 Pre-order";
    default: return status;
  }
}

// Find inventory matches by brand/model keywords
function findMatchingCars(msg, inventory) {
  const lower = msg.toLowerCase();
  return inventory.filter((car) => {
    const haystack = `${car.brand} ${car.model} ${car.variant} ${car.body_type}`.toLowerCase();
    const words = lower.split(/\s+/);
    return words.some((w) => w.length > 2 && haystack.includes(w));
  });
}

function buildCarLine(car) {
  const stock = car.stock_status === "out_of_stock"
    ? "❌ Out of Stock"
    : car.stock_status === "low_stock"
    ? `⚠️ Low Stock (${car.quantity} remaining)`
    : car.stock_status === "preorder"
    ? "🔔 Pre-order only"
    : `✅ In Stock (${car.quantity} units)`;

  const priceStr = car.cash_price
    ? `ကျပ် ${car.cash_price}`
    : "Sales team ကို ဆက်သွယ်ပေးပါ";

  let line = `🚗 ${car.brand} ${car.model} ${car.variant}\n   ${priceStr} · ${stock}`;

  if (car.installment_available && car.stock_status !== "out_of_stock") {
    line += `\n   💳 ${car.down_payment_pct}% down · ${car.monthly_term}`;
  }
  if (car.notes) line += `\n   📝 ${car.notes}`;

  return line;
}

export function generateReply(userMessage, context, inventory) {
  const msg = userMessage.toLowerCase();
  const inv = inventory || [];

  // ── Discount / negotiation ──
  if (msg.includes("discount") || msg.includes("လျော့") || msg.includes("cheap") || msg.includes("ထိုးပေး")) {
    return {
      content: `လျော့ဈေး / special offer အတွက် ကျွန်တော်တို့ sales team မှ တိုက်ရိုက်ဆက်သွယ်ပေးပါ့မယ်။\n\nFleet / bulk order ဆိုပါက negotiable ဖြစ်ပါတယ်။`,
      signals: ["Escalating: discount request"],
      escalate: true,
    };
  }

  // ── Hours ──
  if (msg.includes("အချိန်") || msg.includes("ဖွင့်") || msg.includes("hour") || msg.includes("open")) {
    return {
      content: `ကျွန်တော်တို့ showroom ဖွင့်ချိန် —\n\n🕘 ${context.knowledge.hours}\n\nTest drive ချိန်းဆိုလိုပါက ကြိုတင်ဆက်သွယ်ပေးပါ။`,
      signals: ["Using showroom hours"],
    };
  }

  // ── Delivery ──
  if (msg.includes("delivery") || msg.includes("ပို့") || msg.includes("deliver")) {
    return {
      content: `🚚 Delivery — ${context.knowledge.delivery}\n\nOrder confirm ပြီးနောက် ၁–၃ ရက်အတွင်း ပို့ဆောင်ပေးနိုင်ပါတယ်။`,
      signals: ["Using delivery policy"],
    };
  }

  // ── Test drive ──
  if (msg.includes("test drive") || (msg.includes("test") && msg.includes("drive"))) {
    return {
      content: `Test drive — ${context.knowledge.test_drive}\n\nကြိုတင်ချိန်းဆိုရန် ကျွန်တော်တို့ team ဆက်သွယ်ပေးပါ့မယ်။ ဘယ် model ကို drive ကြည့်ချင်ပါသလဲ?`,
      signals: ["Using test drive policy"],
    };
  }

  // ── Specific model enquiry ──
  const matched = findMatchingCars(msg, inv);

  if (matched.length === 1) {
    const car = matched[0];
    if (car.stock_status === "out_of_stock") {
      return {
        content: `${car.brand} ${car.model} ${car.variant} —\n\n❌ လက်ရှိ Stock မရှိပါ။\n\n${car.notes ? `📝 ${car.notes}\n\n` : ""}Stock ပြန်ရောက်သောအခါ အကြောင်းကြားပေးနိုင်ပါတယ်။ ဆက်သွယ်ပေးပါ။`,
        signals: ["Using live inventory", "Out of stock"],
      };
    }

    const lines = [buildCarLine(car)];
    if (msg.includes("ဈေး") || msg.includes("price") || msg.includes("ဘယ်လောက်") || msg.includes("install") || msg.includes("financing")) {
      return {
        content: lines.join("\n\n") + `\n\nပိုသေချာသော quote အတွက် ကျွန်တော်တို့ sales team ဆက်သွယ်ပေးနိုင်ပါတယ်။`,
        signals: ["Using live inventory", car.installment_available ? "Installment policy applied" : null].filter(Boolean),
      };
    }
    return {
      content: lines.join("\n\n") + `\n\nဘာ ထပ်သိချင်ပါသလဲ?`,
      signals: ["Using live inventory"],
    };
  }

  if (matched.length > 1) {
    const lines = matched.map(buildCarLine).join("\n\n");
    return {
      content: `ရှာတွေ့သော မော်ဒယ်များ —\n\n${lines}\n\nတစ်ခုခုကို ပိုသိချင်ပါသလား?`,
      signals: ["Using live inventory"],
    };
  }

  // ── General inventory / "ဘာ model ရှိလဲ" ──
  if (msg.includes("model") || msg.includes("မော်ဒယ်") || msg.includes("ကား") || msg.includes("list") || msg.includes("ဘာ")) {
    const available = inv.filter((c) => c.stock_status !== "out_of_stock");
    if (available.length === 0) {
      return {
        content: "လက်ရှိ ရောင်းချနိုင်သော ကားများ မရှိသေးပါ။ မကြာမီ ထပ်ဖြည့်ပေးပါ့မည်။",
        signals: ["Using live inventory"],
      };
    }
    const lines = available.map((c) => `🚗 ${c.brand} ${c.model} ${c.variant} — ${c.cash_price ? `ကျပ် ${c.cash_price}` : "Contact sales"} · ${stockLabel(c.stock_status)}`).join("\n");
    return {
      content: `လက်ရှိ ရရှိနိုင်သော ကားများ —\n\n${lines}\n\nမည်သည့် model ကို ပိုသိချင်ပါသလဲ?`,
      signals: ["Using live inventory"],
    };
  }

  // ── Price generic ──
  if (msg.includes("ဈေး") || msg.includes("price") || msg.includes("ဘယ်လောက်")) {
    const available = inv.filter((c) => c.stock_status !== "out_of_stock" && c.cash_price);
    const lines = available.map((c) => `🚗 ${c.brand} ${c.model} ${c.variant} — ကျပ် ${c.cash_price}`).join("\n");
    return {
      content: `ရရှိနိုင်သော ကားဈေးနှုန်းများ —\n\n${lines || "Sales team ကို ဆက်သွယ်ပေးပါ"}\n\nတစ်ခုခုကို ပိုသိချင်ပါသလား?`,
      signals: ["Using live inventory"],
    };
  }

  return {
    content: `${context.business.name} မှ ကြိုဆိုပါတယ်။\n\nToyota, Honda, Nissan မော်ဒယ်များ ရရှိနိုင်ပါတယ်။ ဘယ် model အကြောင်း သိချင်ပါသလဲ?`,
    signals: [],
  };
}