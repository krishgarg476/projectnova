import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import catalog from "@/lib/data/productCatalog.json";
import { keywordForName } from "@/lib/catalog";

const inputSchema = z.object({
  text: z.string().optional(),
  image: z.string().optional(), // base64
});

interface ExtractedItem {
  name: string;
  qty: number;
  unit: string;
}

export const processWhatsAppMessageFn = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const parts: any[] = [];
    if (data.image) {
      const b64 = data.image.includes(",") ? data.image.split(",")[1] : data.image;
      const mime = data.image.includes(",") ? data.image.split(",")[0].split(":")[1].split(";")[0] : "image/jpeg";
      parts.push({
        inlineData: {
          data: b64,
          mimeType: mime
        }
      });
    }
    
    if (data.text) {
      parts.push(data.text);
    }

    const prompt = `You are a shopping assistant helping an Indian user.
They forwarded you a message or image (like a recipe screenshot, a handwritten list, or a voice-to-text message).
Extract the grocery/household items they need to buy. Output exactly the item names and quantities.

Return a JSON object with a list of "items".`;

    parts.push(prompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: parts,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Item name (e.g. Basmati Rice)" },
                  qty: { type: Type.NUMBER, description: "Quantity required" },
                  unit: { type: Type.STRING, description: "Unit (e.g. kg, g, pack, pcs)" }
                },
                required: ["name", "qty", "unit"]
              }
            }
          },
          required: ["items"]
        }
      }
    });

    const cleanText = (response.text || "{}").replace(/```json/gi, "").replace(/```/g, "").trim();
    const output = JSON.parse(cleanText) as { items: ExtractedItem[] };
    
    const cartItems = [];
    let formattedText = "Got it! Here's your cart:\\n";
    let totalEstimate = 0;

    for (const ing of (output.items || [])) {
      const lowerName = ing.name.toLowerCase();
      const matchedProduct = (catalog as any[]).find(p => 
        lowerName.includes(p.name.toLowerCase()) || 
        p.keywords?.some((k: string) => lowerName.includes(k))
      );
      
      if (matchedProduct) {
        cartItems.push({
          id: matchedProduct.id, // Store catalog ID to keep payload small
          name: matchedProduct.name,
          price: matchedProduct.price,
          qty: 1, // Assume 1 standard pack for simplicity
          img: matchedProduct.image_keyword,
        });
        formattedText += `✅ ${matchedProduct.name} - ₹${matchedProduct.price}\\n`;
        totalEstimate += matchedProduct.price;
      } else {
        const estPrice = Math.max(20, Math.round(ing.qty * 1.5));
        cartItems.push({
          id: "ghost_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
          name: ing.name,
          price: estPrice,
          qty: 1,
          img: keywordForName(ing.name),
        });
        formattedText += `✅ ${ing.name} (${ing.qty}${ing.unit}) - ₹${estPrice} (est.)\\n`;
        totalEstimate += estPrice;
      }
    }

    formattedText += `\\nTotal Estimate: ₹${totalEstimate}\\n`;
    
    // Create a compact payload for the deep link
    // Only storing essential data. 
    // Format: [[id, name, price, qty, img], ...]
    const compactPayload = cartItems.map(c => [c.id, c.name, c.price, c.qty, c.img]);
    const b64Payload = Buffer.from(JSON.stringify(compactPayload)).toString('base64');
    
    // For a real deployment, it would be https://app.now.com/shared?p=...
    const deepLink = `/shared?p=${encodeURIComponent(b64Payload)}`;
    
    formattedText += `👉 Tap to open your cart instantly:\\n${deepLink}`;

    return {
      textReply: formattedText,
      payload: b64Payload,
    };
  });
