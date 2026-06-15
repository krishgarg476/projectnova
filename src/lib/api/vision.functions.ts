import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import catalog from "@/lib/data/productCatalog.json";

const inputSchema = z.object({
  base64Image: z.string(),
});

interface NoticedItem {
  t: string;
  category: string;
  add: boolean;
}

interface ResultItem {
  id: string;
  name: string;
  price: number;
  imageKeyword: string;
  reasoning: string;
}

export const processImageFn = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
    
    // Strip out the data URL prefix if present (e.g. "data:image/jpeg;base64,")
    const base64Str = data.base64Image.includes("base64,") 
      ? data.base64Image.split("base64,")[1] 
      : data.base64Image;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        "You are an AI fridge/pantry scanner. Look at the image and identify 3-5 basic grocery or household items that appear to be missing, running low, or logically should be restocked. Provide what you noticed and broad categories.",
        {
          inlineData: {
            data: base64Str,
            mimeType: "image/jpeg"
          }
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            noticed: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  t: { type: Type.STRING, description: "Observation, e.g. 'Milk carton is empty' or 'No fresh vegetables visible'" },
                  category: { type: Type.STRING, description: "e.g. Dairy, Produce, Bakery, Snacks" },
                  add: { type: Type.BOOLEAN, description: "always true if it's missing" }
                },
                required: ["t", "category", "add"]
              }
            }
          },
          required: ["noticed"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    const noticed: NoticedItem[] = parsed.noticed || [];

    const results: ResultItem[] = [];
    
    // Attempt to match the AI's noticed categories to our catalog items
    for (const n of noticed) {
      if (n.add) {
        let bestMatch = null;
        let bestScore = 0;

        for (const c of (catalog as any[])) {
          if (results.some(r => r.id === c.id)) continue; // Skip already added items

          let score = 0;
          const aiCat = n.category.toLowerCase();
          const aiText = n.t.toLowerCase();
          const catLower = c.category.toLowerCase();

          if (aiCat.includes(catLower) || catLower.includes(aiCat)) score += 2;
          
          c.keywords?.forEach((k: string) => {
            const kLower = k.toLowerCase();
            if (aiCat.includes(kLower) || aiText.includes(kLower)) score += 3;
            if (c.name.toLowerCase().includes(aiText) || aiText.includes(c.name.toLowerCase())) score += 5;
          });

          if (score > bestScore) {
            bestScore = score;
            bestMatch = c;
          }
        }

        if (bestMatch) {
          results.push({
            id: bestMatch.id,
            name: bestMatch.name,
            price: bestMatch.price,
            imageKeyword: bestMatch.image_keyword,
            reasoning: n.t
          });
        }
      }
    }

    // If we didn't find enough matches, fallback to default items
    if (results.length === 0) {
      noticed.push({ t: "Couldn't see clearly, suggesting essentials.", category: "Dairy", add: true });
      results.push({
        id: catalog[0].id, name: catalog[0].name, price: catalog[0].price, imageKeyword: catalog[0].image_keyword, reasoning: "Essential restock"
      });
    }

    return { noticed, results };
  });
