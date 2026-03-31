/**
 * Base44 backend function template for `showroomAssistantChat`.
 *
 * Deploy this in Base44 as a server-side function named `showroomAssistantChat`
 * and store `DEEPSEEK_API_KEY` in Base44 secrets, not in the frontend repo.
 */

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";
const DEFAULT_MODEL = "deepseek-chat";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function compactInventory(inventory: Array<Record<string, unknown>> = []) {
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

function buildSystemPrompt({
  context,
  showroom,
  kb,
}: {
  context?: Record<string, unknown>;
  showroom?: Record<string, unknown>;
  kb?: Record<string, unknown>;
}) {
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

function buildUserPrompt({
  inventory,
  message,
}: {
  inventory?: Array<Record<string, unknown>>;
  message: string;
}) {
  return [
    "Inventory:",
    JSON.stringify(compactInventory(inventory), null, 2),
    "",
    `Customer message: ${message}`,
    "",
    "Return a JSON object with this exact shape:",
    '{"content":"string","signals":["string"],"escalate":true,"matchedModels":["string"]}',
  ].join("\n");
}

function safeFallback(showroom?: Record<string, unknown>) {
  const primaryBranch = Array.isArray(showroom?.branches) ? showroom?.branches?.[0] : null;

  return {
    content: primaryBranch
      ? `I’m handing this to our sales team for a confirmed answer.\n\n${primaryBranch.name}: ${primaryBranch.phone}`
      : "I’m handing this to our sales team for a confirmed answer.",
    signals: ["Escalating to sales team"],
    escalate: true,
    matchedModels: [],
  };
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  const apiKey = Deno.env.get("DEEPSEEK_API_KEY");
  if (!apiKey) {
    return json({ error: "Missing DEEPSEEK_API_KEY secret" }, 500);
  }

  try {
    const body = await req.json();
    if (!isObject(body) || typeof body.message !== "string" || !body.message.trim()) {
      return json({ error: "Invalid request payload" }, 400);
    }

    const payload = {
      model: DEFAULT_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: buildSystemPrompt({
            context: isObject(body.context) ? body.context : {},
            showroom: isObject(body.showroom) ? body.showroom : {},
            kb: isObject(body.kb) ? body.kb : {},
          }),
        },
        ...((Array.isArray(body.conversationHistory) ? body.conversationHistory : []).filter(
          (item) => isObject(item) && typeof item.role === "string" && typeof item.content === "string",
        ) as Array<{ role: string; content: string }>),
        {
          role: "user",
          content: buildUserPrompt({
            inventory: Array.isArray(body.inventory) ? body.inventory.filter(isObject) : [],
            message: body.message,
          }),
        },
      ],
    };

    const response = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return json(safeFallback(isObject(body.showroom) ? body.showroom : undefined), 200);
    }

    const data = await response.json();
    const rawContent = data?.choices?.[0]?.message?.content;
    if (typeof rawContent !== "string") {
      return json(safeFallback(isObject(body.showroom) ? body.showroom : undefined), 200);
    }

    const parsed = JSON.parse(rawContent);
    if (!isObject(parsed) || typeof parsed.content !== "string") {
      return json(safeFallback(isObject(body.showroom) ? body.showroom : undefined), 200);
    }

    return json({
      content: parsed.content,
      signals: Array.isArray(parsed.signals) ? parsed.signals.filter((item) => typeof item === "string") : [],
      escalate: Boolean(parsed.escalate),
      matchedModels: Array.isArray(parsed.matchedModels)
        ? parsed.matchedModels.filter((item) => typeof item === "string")
        : [],
    });
  } catch (_error) {
    return json(safeFallback(), 200);
  }
});
