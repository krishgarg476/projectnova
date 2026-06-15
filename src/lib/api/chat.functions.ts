import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import catalog from "@/lib/data/productCatalog.json";
import { purchaseHistory } from "@/lib/data/purchaseHistory";

const chatInputSchema = z.object({
  message: z.string(),
  history: z.array(z.object({
    role: z.enum(["user", "ai"]),
    text: z.string(),
  })).optional(),
  dietary: z.array(z.string()).optional(),
  familyContext: z.string().optional(),
  brandPreferences: z.record(z.number()).optional(),
});

const CATEGORY_TAXONOMY = [
  "Emergency", "Beverages", "Electronics", "Dairy", "Bakery", "Pantry",
  "Produce", "Staples", "Wellness", "Pharmacy", "Household", "Snacks",
  "Frozen", "Quick Meals",
];

interface ChatAIResponse {
  reply: string;
  suggestProducts: boolean;
  categories: string[];
  keywords: string[];
  urgency: "low" | "medium" | "high";
}

// --- FALLBACK: keyword-based intent extraction when AI is unavailable ---
function fallbackExtract(message: string): ChatAIResponse {
  const q = message.toLowerCase();

  // Situation patterns with replies and keyword/category mappings
  const patterns: { test: RegExp; reply: string; categories: string[]; keywords: string[]; urgency: "low" | "medium" | "high" }[] = [
    {
      test: /maggi|noodles|cooking|instant noodle/,
      reply: "Got it! Here's what you'll need to make Maggi:",
      categories: ["Quick Meals", "Produce", "Pantry"],
      keywords: ["maggi", "noodles", "onion", "tomato", "masala", "cooking"],
      urgency: "low",
    },
    {
      test: /sick|fever|unwell|cold|cough|pain|headache|flu|cramp/,
      reply: "Sorry to hear that! Here are some wellness essentials to help you feel better:",
      categories: ["Wellness", "Pharmacy", "Household"],
      keywords: ["ors", "paracetamol", "fever", "cold", "vicks", "tissues", "sick"],
      urgency: "high",
    },
    {
      test: /friend|guest|party|host|coming over|arriving|celebrate/,
      reply: "Guests coming? Let me get you sorted with party essentials! 🎉",
      categories: ["Snacks", "Beverages", "Frozen"],
      keywords: ["chips", "snacks", "party", "cola", "cold drinks", "guests", "namkeen", "ice cream"],
      urgency: "low",
    },
    {
      test: /week|restock|groceries|grocery|household restock|monthly/,
      reply: "Here's a full household restock for your family of 4 — includes everyday essentials:",
      categories: ["Dairy", "Staples", "Produce", "Pantry", "Bakery"],
      keywords: ["milk", "rice", "dal", "bread", "eggs", "vegetables", "salt", "breakfast"],
      urgency: "low",
    },
    {
      test: /power.?cut|outage|blackout|electricity|fridge dying/,
      reply: "Power cut emergency! Here are essentials to get you through the outage:",
      categories: ["Emergency", "Electronics"],
      keywords: ["torch", "power bank", "battery", "fan", "candles", "water", "power cut"],
      urgency: "high",
    },
    {
      test: /baby|infant|diaper|formula/,
      reply: "Baby essentials coming right up — I've prioritized the urgent items:",
      categories: ["Household", "Pharmacy"],
      keywords: ["diapers", "baby", "wipes", "formula", "infant"],
      urgency: "high",
    },
    {
      test: /snack|hungry|munch|tea.?time|kids.*snack|school/,
      reply: "Snack time! Here are some quick bites for you:",
      categories: ["Snacks", "Beverages"],
      keywords: ["chips", "snacks", "namkeen", "biscuits", "juice", "cold drink"],
      urgency: "low",
    },
    {
      test: /breakfast|morning|toast/,
      reply: "Setting up your morning essentials! ☀️",
      categories: ["Dairy", "Bakery"],
      keywords: ["bread", "milk", "eggs", "butter", "breakfast"],
      urgency: "low",
    },
    {
      test: /clean|hygiene|sanitize|handwash|soap/,
      reply: "Here are hygiene and household cleaning essentials:",
      categories: ["Household"],
      keywords: ["handwash", "soap", "hygiene", "toothpaste", "tissues", "cleaning"],
      urgency: "low",
    },
    {
      test: /water|thirsty|drink|hydration/,
      reply: "Stay hydrated! Here's what I found:",
      categories: ["Beverages"],
      keywords: ["water", "juice", "cola", "hydration"],
      urgency: "low",
    },
  ];

  // Check if it's a thank you / acknowledgment
  if (/thank|thanks|ok|great|perfect|awesome|got it|cool/i.test(q)) {
    return {
      reply: "You're welcome! Let me know if you need anything else 😊",
      suggestProducts: false,
      categories: [],
      keywords: [],
      urgency: "low",
    };
  }

  // Check if it's a greeting
  if (/^(hi|hello|hey|hola|namaste)/i.test(q.trim())) {
    return {
      reply: "Hey Krish! 👋 What can I help you with today? Just describe what you need or your situation!",
      suggestProducts: false,
      categories: [],
      keywords: [],
      urgency: "low",
    };
  }

  for (const p of patterns) {
    if (p.test.test(q)) {
      return {
        reply: p.reply,
        suggestProducts: true,
        categories: p.categories,
        keywords: p.keywords,
        urgency: p.urgency,
      };
    }
  }

  // Default: try to match any catalog keywords from the message
  const allKeywords = (catalog as any[]).flatMap((p) => p.keywords || []);
  const matchedKws = allKeywords.filter((kw: string) => q.includes(kw.toLowerCase()));

  if (matchedKws.length > 0) {
    return {
      reply: "Here's what I found for you:",
      suggestProducts: true,
      categories: [],
      keywords: matchedKws.slice(0, 6),
      urgency: "low",
    };
  }

  return {
    reply: "I can help with that! Could you tell me more about your situation? For example: 'making dinner tonight', 'feeling sick', or 'friends coming over'.",
    suggestProducts: false,
    categories: [],
    keywords: [],
    urgency: "low",
  };
}

// Stage 1: AI generates a conversational reply + intent extraction in one call
async function chatWithAI(
  message: string,
  history: { role: string; text: string }[],
  familyContext: string,
  dietary: string[],
  brandPreferences: Record<string, number>
): Promise<ChatAIResponse> {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  const conversationHistory = history
    .slice(-6)
    .map((h) => `${h.role === "user" ? "Customer" : "Assistant"}: ${h.text}`)
    .join("\n");

  const dietaryStr = dietary && dietary.length > 0 ? `Dietary Preferences: ${dietary.join(", ")}` : "";
  const brands = Object.keys(brandPreferences).length ? brandPreferences : purchaseHistory.brandCounts;
  const brandStr = Object.entries(brands).map(([b, c]) => `${b} (${c} orders)`).join(", ");

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `You are "Now AI", a smart shopping assistant for Amazon Now (instant delivery in India).
${familyContext ? `Family Context: ${familyContext}` : ""}
${dietaryStr}
Favorite brands: ${brandStr}

Recent conversation:
${conversationHistory}

Customer's new message: "${message}"

Respond naturally like a helpful WhatsApp shopping assistant. Be warm, brief (1-2 sentences), and proactive.
- If they describe a situation (e.g. "friends coming over", "feeling sick", "making maggi"), suggest relevant products.
- If they ask a question or just chat, reply helpfully — set suggestProducts to false if no products are needed.
- If they say thanks or confirm, acknowledge warmly — set suggestProducts to false.
- Reference their family context when relevant (e.g. "lactose-free option for your sibling").
- Pick categories ONLY from: ${CATEGORY_TAXONOMY.join(", ")}.
- Give 3-6 specific everyday Indian grocery/household item keywords relevant to their need.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reply: { type: Type.STRING, description: "Conversational reply to the customer, 1-2 sentences" },
          suggestProducts: { type: Type.BOOLEAN, description: "Whether to suggest products with this reply" },
          categories: { type: Type.ARRAY, items: { type: Type.STRING }, description: "1-3 relevant categories from the taxonomy" },
          keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-6 product keywords" },
          urgency: { type: Type.STRING, description: "low, medium, or high" },
        },
        required: ["reply", "suggestProducts", "categories", "keywords", "urgency"],
      },
    },
  });

  const parsed = JSON.parse(response.text || "{}");
  return {
    reply: parsed.reply || "I'm here to help! What do you need?",
    suggestProducts: parsed.suggestProducts ?? true,
    categories: parsed.categories || [],
    keywords: parsed.keywords || [],
    urgency: parsed.urgency || "medium",
  };
}

// Stage 2: Product resolution from local catalog (same logic as agent.functions.ts)
function resolveProducts(
  categories: string[],
  keywords: string[],
  dietary: string[],
  brandPreferences: Record<string, number>
) {
  const cats = categories.map((c) => c.toLowerCase());
  const kws = keywords.map((k) => k.toLowerCase());

  const CATEGORY_RANK_WEIGHT = [3, 2, 1];

  const scored = (catalog as any[]).map((product) => {
    const categoryLower = product.category.toLowerCase();
    const categoryRank = cats.findIndex(
      (c) => c === categoryLower || categoryLower.includes(c) || c.includes(categoryLower)
    );

    const haystack = [product.name, product.category, product.brand, ...(product.keywords || [])]
      .join(" ")
      .toLowerCase();
    let keywordScore = 0;
    for (const kw of kws) {
      if (kw && haystack.includes(kw)) keywordScore += 2;
    }

    let matchScore = keywordScore;
    if (categoryRank !== -1 && (categoryRank < 2 || keywordScore > 0)) {
      matchScore += CATEGORY_RANK_WEIGHT[categoryRank] ?? 1;
    }

    const userBrands = Object.keys(brandPreferences).length ? brandPreferences : purchaseHistory.brandCounts;
    const brandBoost = Math.min(1, (userBrands[product.brand] || 0) / 4);
    return { product, matchScore, total: matchScore + brandBoost };
  });

  const candidates = scored.filter((c) => c.matchScore > 0);

  const vegOnly = dietary.includes("Vegetarian");
  const eligible = vegOnly ? candidates.filter((c) => c.product.is_vegetarian) : candidates;

  eligible.sort((a, b) => b.total - a.total);

  const selected = eligible.slice(0, 6);

  return selected.map(({ product }) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.original_price || undefined,
    imageKeyword: product.image_keyword,
    category: product.category,
    brand: product.brand,
    etaMinutes: product.eta_minutes,
  }));
}

export const chatMessageFn = createServerFn({ method: "POST" })
  .inputValidator((data) => chatInputSchema.parse(data))
  .handler(async ({ data }) => {
    let aiResponse: ChatAIResponse;
    let usedFallback = false;

    try {
      aiResponse = await chatWithAI(
        data.message,
        data.history || [],
        data.familyContext || "",
        data.dietary || [],
        data.brandPreferences || {}
      );
    } catch (error: any) {
      // Fallback to local keyword matching when AI is unavailable (rate limit, network, etc.)
      console.warn("AI chat failed, using fallback:", error.message || error);
      aiResponse = fallbackExtract(data.message);
      usedFallback = true;
    }

    let products: any[] = [];
    if (aiResponse.suggestProducts && aiResponse.keywords.length > 0) {
      products = resolveProducts(
        aiResponse.categories,
        aiResponse.keywords,
        data.dietary || [],
        data.brandPreferences || {}
      );
    }

    return {
      reply: aiResponse.reply,
      products,
      urgency: aiResponse.urgency,
      usedFallback,
    };
  });
