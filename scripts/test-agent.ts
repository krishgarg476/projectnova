import { GoogleGenAI, Type } from "@google/genai";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  try {
    const query = "guests arriving, lactose free kid";
    console.log("Parsing intent...");
    const parserResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are an intent parser. Query: ${query}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            urgency: { type: Type.STRING },
            search_categories: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["urgency", "search_categories"]
        }
      }
    });

    const parsedIntent = JSON.parse(parserResponse.text || "{}");
    console.log("Parsed Intent:", parsedIntent);

    console.log("Fetching DB...");
    const { data: allProducts, error } = await supabase.from("products").select("*");
    if (error) throw error;
    console.log(`Fetched ${allProducts?.length} products`);

    console.log("Curating...");
    const curatorResponse = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `You are AI council. Select items for query: ${query}. Catalog: ${JSON.stringify(allProducts?.slice(0, 5))}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verdicts: {
              type: Type.OBJECT,
              properties: { speed: { type: Type.STRING }, context: { type: Type.STRING }, health: { type: Type.STRING } }
            },
            cart_items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, reasoning: { type: Type.STRING } } } },
            skipped_items: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { id: { type: Type.STRING }, reasoning: { type: Type.STRING } } } }
          }
        }
      }
    });

    console.log("Curated Data:", JSON.parse(curatorResponse.text() || "{}"));
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
