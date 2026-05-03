import { generateReply } from "@/data/showroomData";

const ASSISTANT_ENDPOINT = "/api/showroom-assistant-chat";
const HISTORY_LIMIT = 8;

function normalizeFunctionResult(result) {
  const data = result?.data ?? result;

  if (!data || typeof data.content !== "string") {
    throw new Error("Invalid function response");
  }

  return {
    content: data.content,
    signals: Array.isArray(data.signals) ? data.signals.filter((signal) => typeof signal === "string") : [],
    escalate: Boolean(data.escalate),
    matchedModels: Array.isArray(data.matchedModels)
      ? data.matchedModels.filter((model) => typeof model === "string")
      : [],
  };
}

function toConversationHistory(messages) {
  return messages
    .filter((message) => message.role === "customer" || message.role === "ai")
    .slice(-HISTORY_LIMIT)
    .map((message) => ({
      role: message.role === "ai" ? "assistant" : "user",
      content: message.content,
    }));
}

export async function requestShowroomAssistantReply({
  message,
  context,
  inventory,
  showroom,
  kb,
  messages,
}) {
  try {
    const response = await fetch(ASSISTANT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        context,
        inventory,
        showroom,
        kb,
        conversationHistory: toConversationHistory(messages),
      }),
    });

    if (!response.ok) {
      throw new Error(`Assistant request failed with status ${response.status}`);
    }

    const result = await response.json();
    return normalizeFunctionResult(result);
  } catch (error) {
    const fallback = generateReply(message, context, inventory, showroom, kb);

    return {
      ...fallback,
      signals: [...(fallback.signals || []), "Backend fallback"],
      escalate: fallback.escalate ?? true,
      error,
    };
  }
}
