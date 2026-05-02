const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const DEFAULT_MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

function isObject(value) {
  return typeof value === "object" && value !== null;
}

function compactInventory(inventory = []) {
  return inventory.map((car) => ({
    brand: car.brand,
    model: car.model,
    variant: car.variant,
    body_type: car.body_type,
    cash_price: car.cash_price,
    installment_available: car.installment_available,
    down_payment_pct: car.down_payment_pct,
    monthly_term: car.monthly_term,
    stock_status: car.stock_status,
    quantity: car.quantity,
    test_drive: car.test_drive,
    notes: car.notes,
  }));
}

function buildSystemPrompt({ context, showroom, kb }) {
  return [
    "You are the AI sales assistant for a showroom.",
    "Answer using only the provided business context and structured data.",
    "If information is missing, say you do not have that information and escalate to a human.",
    "Do not invent prices, availability, specifications, delivery dates, or promotions.",
    "Use Burmese when the customer writes in Burmese. Otherwise reply in English.",
    "Always be concise, helpful, and sales-safe.",
    "If the customer asks for discounts, fleet pricing, complaints, logistics outside standard policy, or anything unclear, escalate to a human.",
    "",
    "Business context:",
    JSON.stringify(context ?? {}, null, 2),
    "",
    "Showroom facts:",
    JSON.stringify(showroom ?? {}, null, 2),
    "",
    "Behavioral policy:",
    JSON.stringify(kb ?? {}, null, 2),
  ].join("\n");
}

function buildUserPrompt({ inventory, message }) {
  return [
    "Inventory:",
    JSON.stringify(compactInventory(inventory), null, 2),
    "",
    `Customer message: ${message}`,
    "",
    "Return a JSON object with this exact shape:",
    '{"content":"string","signals":["string"],"escalate":false,"matchedModels":["string"]}',
  ].join("\n");
}

function safeFallback(showroom) {
  const primaryBranch = Array.isArray(showroom?.branches) ? showroom.branches[0] : null;

  return {
    content: primaryBranch
      ? `I'm handing this to our sales team for a confirmed answer.\n\n${primaryBranch.name}: ${primaryBranch.phone}`
      : "I'm handing this to our sales team for a confirmed answer.",
    signals: ["Escalating to sales team"],
    escalate: true,
    matchedModels: [],
  };
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .filter((message) => (
      isObject(message)
      && (message.role === "user" || message.role === "assistant")
      && typeof message.content === "string"
    ))
    .slice(-8);
}

function sendJson(res, status, data) {
  res.status(status).json(data);
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 204, {});
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return sendJson(res, 405, { error: "Method not allowed" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return sendJson(res, 500, { error: "Missing DEEPSEEK_API_KEY server environment variable" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch {
      return sendJson(res, 400, { error: "Invalid JSON payload" });
    }
  }

  if (!isObject(body) || typeof body.message !== "string" || !body.message.trim()) {
    return sendJson(res, 400, { error: "Invalid request payload" });
  }

  const context = isObject(body.context) ? body.context : {};
  const showroom = isObject(body.showroom) ? body.showroom : {};
  const kb = isObject(body.kb) ? body.kb : {};
  const inventory = Array.isArray(body.inventory) ? body.inventory.filter(isObject) : [];

  const payload = {
    model: DEFAULT_MODEL,
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: buildSystemPrompt({ context, showroom, kb }),
      },
      ...normalizeHistory(body.conversationHistory),
      {
        role: "user",
        content: buildUserPrompt({ inventory, message: body.message.trim() }),
      },
    ],
  };

  try {
    const response = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepSeek error:", response.status, errorText);
      return sendJson(res, 200, safeFallback(showroom));
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (typeof rawContent !== "string") {
      return sendJson(res, 200, safeFallback(showroom));
    }

    const parsed = JSON.parse(rawContent);
    if (!isObject(parsed) || typeof parsed.content !== "string") {
      return sendJson(res, 200, safeFallback(showroom));
    }

    return sendJson(res, 200, {
      content: parsed.content,
      signals: Array.isArray(parsed.signals) ? parsed.signals.filter((signal) => typeof signal === "string") : [],
      escalate: Boolean(parsed.escalate),
      matchedModels: Array.isArray(parsed.matchedModels)
        ? parsed.matchedModels.filter((model) => typeof model === "string")
        : [],
    });
  } catch (error) {
    console.error("Showroom assistant error:", error);
    return sendJson(res, 200, safeFallback(showroom));
  }
}
