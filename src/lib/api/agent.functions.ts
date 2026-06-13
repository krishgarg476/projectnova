import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Define the input for our server function
const inputSchema = z.object({
  query: z.string(),
  userContext: z.object({
    dietary: z.array(z.string()).optional(),
    family: z.array(z.any()).optional(),
    patterns: z.string().optional()
  }).optional()
});

export const generateCartFn = createServerFn({ method: "POST" })
  .validator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

    const { query, userContext } = data;
    
    // --- STEP 1: INTENT PARSER ---
    // We ask Gemini to parse the implicit needs from the user's query.
    const parserPrompt = `You are an e-commerce intent parser.
    User query: "${query}"
    Context: ${JSON.stringify(userContext || {})}
    
    Identify the urgency and the broad categories of items the user needs.`;

    const parserResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: parserPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            urgency: { type: Type.STRING, description: "One of: normal, high, critical" },
            search_categories: { type: Type.ARRAY, items: { type: Type.STRING }, description: "e.g. 'Emergency', 'Snacks', 'Beverages'" },
            crisis_type: { type: Type.STRING, description: "e.g. power_cut, medical, null if none" }
          },
          required: ["urgency", "search_categories"]
        }
      }
    });

    const parsedIntent = JSON.parse(parserResponse.text || "{}");
    const urgency = parsedIntent.urgency || "normal";
    
    // --- STEP 2: RETRIEVER ---
    // We fetch products from the DB. In a real app with millions of products, 
    // we would use pgvector or full-text search here based on parsedIntent.search_categories.
    // For our hackathon catalog of ~30 items, we fetch all active products.
    const { data: allProducts, error } = await supabase.from("products").select("*");
    
    if (error) throw new Error("Database fetch failed: " + error.message);

    // --- STEP 3: THE CURATOR (AI COUNCIL) ---
    // Now we pass the retrieved products and the parsed intent to the Curator to make final decisions.
    const curatorPrompt = `You are the Now AI Council, consisting of three agents: Speed, Context, and Health.
    User Query: "${query}"
    Parsed Intent: ${JSON.stringify(parsedIntent)}
    User Context (Dietary, Family, Patterns): ${JSON.stringify(userContext || {})}
    
    Available Catalog:
    ${JSON.stringify(allProducts, null, 2)}
    
    Task:
    1. Select the absolute best items to form a complete cart for the user's situation.
    2. Ensure dietary restrictions are strictly followed.
    3. Select 1-3 items that you explicitly CONSIDERED but SKIPPED, and explain why.
    4. Provide a 1-sentence verdict for each agent (Speed, Context, Health).
    
    Return the output in the strict JSON format requested.`;

    const curatorResponse = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: curatorPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdicts: {
              type: Type.OBJECT,
              properties: {
                speed: { type: Type.STRING },
                context: { type: Type.STRING },
                health: { type: Type.STRING }
              },
              required: ["speed", "context", "health"]
            },
            cart_items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  reasoning: { type: Type.STRING }
                },
                required: ["id", "reasoning"]
              }
            },
            skipped_items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  reasoning: { type: Type.STRING }
                },
                required: ["id", "reasoning"]
              }
            }
          },
          required: ["verdicts", "cart_items", "skipped_items"]
        }
      }
    });

    const curatedData = JSON.parse(curatorResponse.text || "{}");
    
    // Map the selected IDs back to the full product objects
    const finalCartItems = (curatedData.cart_items || []).map((ci: any) => {
      const product = allProducts?.find(p => p.id === ci.id || p.product_id === ci.id);
      return { ...product, id: product?.id, reasoning: ci.reasoning, quantity: 1, agentSource: "context" };
    }).filter(p => p.name);

    const finalSkippedItems = (curatedData.skipped_items || []).map((si: any) => {
      const product = allProducts?.find(p => p.id === si.id || p.product_id === si.id);
      return { ...product, id: product?.id, reasoning: si.reasoning };
    }).filter(p => p.name);

    return {
      urgency,
      verdicts: curatedData.verdicts,
      items: finalCartItems,
      skipped: finalSkippedItems
    };
  });
