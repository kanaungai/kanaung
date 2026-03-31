import { base44 } from "@/api/base44Client";
import { generateReply } from "@/data/showroomData";

const FUNCTION_NAME = "showroomAssistantChat";
const HISTORY_LIMIT = 8;

function normalizeFunctionResult(result) {
  const data = result?.data ?? result;

  if (!data || typeof data.content !== "string") {
    throw new Error("Invalid function response");
  }

  return {
    content: data.content,
    signals: Array.isArray(data.signals) ? data.signals.filter(Boolean) : [],
    escalate: Boolean(data.escalate),
    matchedModels: Array.isArray(data.matchedModels) ? data.matchedModels : [],
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
    const result = await base44.functions.invoke(FUNCTION_NAME, {
      message,
      context,
      inventory,
      showroom,
      kb,
      conversationHistory: toConversationHistory(messages),
    });

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
