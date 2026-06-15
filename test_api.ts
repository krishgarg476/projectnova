import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  const parts = [];
  const prompt = `You are a shopping assistant helping an Indian user.
They forwarded you a message or image (like a recipe screenshot, a handwritten list, or a voice-to-text message).
Extract the grocery/household items they need to buy. Output exactly the item names and quantities.

Return a JSON object with a list of "items".`;

  parts.push(prompt);
  parts.push("I need to buy 2kg rice and 1 maggi pack");

  console.log("Sending request to Gemini...");
  try {
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

    console.log("Response:", response.text);
  } catch (e) {
    console.error("ERROR:", e);
  }
}

test();
