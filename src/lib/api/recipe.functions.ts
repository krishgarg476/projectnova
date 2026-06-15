import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import catalog from "@/lib/data/productCatalog.json";
import recipes from "@/lib/data/recipes.json";
import { keywordForName } from "@/lib/catalog";

const inputSchema = z.object({
  meal: z.string(),
  people: z.number().default(4),
  dietary: z.array(z.string()).optional(),
  fridgeInventory: z.array(z.string()).optional(),
  favoriteBrands: z.array(z.any()).optional(),
});

interface RecipeOutput {
  ingredients: {
    name: string;
    qty: number;
    unit: string;
    reasoning: string;
  }[];
  cookTime: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

async function extractRecipeIngredients(
  meal: string,
  people: number,
  fridgeInventory: string[],
  favoriteBrands: any[]
): Promise<RecipeOutput> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  // Check if we have a pre-mapped culturally accurate recipe
  const matchedRecipe = recipes.find(r => r.name.toLowerCase().includes(meal.toLowerCase()) || meal.toLowerCase().includes(r.name.toLowerCase()));
  
  const contextBlock = matchedRecipe ? `
We have a culturally accurate pre-mapped recipe for this:
Recipe: ${matchedRecipe.name}
Base for ${matchedRecipe.basePeople} people:
Ingredients: ${JSON.stringify(matchedRecipe.ingredients)}
Base Cook Time: ${matchedRecipe.cookTime}
Difficulty: ${matchedRecipe.difficulty}
Please use this as the foundation and scale it appropriately for ${people} people.
` : `Please construct a culturally accurate Indian recipe.`;

  const brandNames = favoriteBrands.filter(b => b.prioritize).map(b => b.name).join(", ");
  const fridgeContext = fridgeInventory.length > 0 ? `The user already has the following in their fridge/pantry (Fridge Whisperer history): ${fridgeInventory.join(", ")}. EXCLUDE these from the shopping list.` : "";

  const prompt = `You are an Indian recipe analyst. Given this meal and number of people, return exact ingredient names + quantities. Output JSON.
  
Meal: "${meal}"
People: ${people}

${contextBlock}
${fridgeContext}
The user prefers these brands: ${brandNames}. Where applicable, mention the brand in the ingredient name (e.g. "Aashirvaad Whole Wheat Atta" instead of just "Atta").

Return the scaled ingredients needed to cook this meal.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          ingredients: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Exact ingredient name, including brand if applicable" },
                qty: { type: Type.NUMBER, description: "Quantity needed" },
                unit: { type: Type.STRING, description: "Unit (e.g. g, ml, pcs)" },
                reasoning: { type: Type.STRING, description: "Why this was added and how much is needed" }
              },
              required: ["name", "qty", "unit", "reasoning"]
            }
          },
          cookTime: { type: Type.STRING, description: "Total cook-time estimate (e.g. '45 mins')" },
          difficulty: { type: Type.STRING, description: "Difficulty badge: 'Easy', 'Medium', or 'Hard'" }
        },
        required: ["ingredients", "cookTime", "difficulty"]
      }
    }
  });

  const cleanText = (response.text || "{}").replace(/```json/gi, "").replace(/```/g, "").trim();
  return JSON.parse(cleanText) as RecipeOutput;
}

function resolveRecipeCart(output: RecipeOutput, people: number, dietary: string[]) {
  const items = [];
  const skipped = [];
  
  for (const ing of output.ingredients) {
    // Attempt to map to catalog
    const lowerName = ing.name.toLowerCase();
    const matchedProduct = (catalog as any[]).find(p => 
      lowerName.includes(p.brand?.toLowerCase() || "xxxxx") ||
      lowerName.includes(p.name.toLowerCase()) || 
      p.keywords?.some((k: string) => lowerName.includes(k))
    );
    
    if (matchedProduct) {
      // Scale price roughly based on standard pack vs needed qty
      // For simplicity, we just use the catalog price and quantity 1 if it's a standard pack
      items.push({
        id: matchedProduct.id + "_" + Date.now() + Math.random(),
        name: matchedProduct.name,
        category: matchedProduct.category,
        price: matchedProduct.price,
        original_price: matchedProduct.original_price,
        image_keyword: matchedProduct.image_keyword,
        is_vegetarian: matchedProduct.is_vegetarian,
        is_eco: matchedProduct.is_eco,
        eta_minutes: matchedProduct.eta_minutes || 15,
        brand: matchedProduct.brand,
        quantity: 1, // Buying 1 pack that satisfies the req
        reasoning: `${ing.reasoning} (${ing.qty}${ing.unit} needed)`,
        agentSource: "context",
        discountPercent: matchedProduct.original_price ? Math.round((1 - matchedProduct.price / matchedProduct.original_price) * 100) : 0,
        relevanceScore: 98,
      });
    } else {
      // Dynamic ghost product for items not in catalog
      items.push({
        id: "ghost_" + Date.now() + Math.random(),
        name: ing.name,
        category: "Grocery",
        price: Math.max(20, Math.round(ing.qty * 0.5)), // Mock price logic
        image_keyword: keywordForName(ing.name),
        is_vegetarian: true,
        is_eco: false,
        eta_minutes: 15,
        quantity: 1,
        reasoning: `${ing.reasoning} (${ing.qty}${ing.unit} needed)`,
        agentSource: "context",
        discountPercent: 0,
        relevanceScore: 90,
      });
    }
  }

  // Filter dietary if needed
  const vegOnly = dietary.includes("Vegetarian");
  const finalItems = vegOnly ? items.filter(i => i.is_vegetarian !== false) : items;
  const dietaryExcluded = vegOnly ? items.filter(i => i.is_vegetarian === false) : [];

  for (const ex of dietaryExcluded) {
    skipped.push({
      id: ex.id,
      name: ex.name,
      reasoning: "Excluded — doesn't match your Vegetarian preference.",
      price: ex.price,
      image_keyword: ex.image_keyword,
    });
  }

  const verdicts = {
    speed: `Ingredients mapped. Standard delivery in ~15 mins.`,
    context: `Calculated exact ingredient quantities to serve ${people} people.`,
    health: vegOnly ? `Applied Vegetarian preference.` : `No dietary restrictions applied.`
  };

  return { 
    urgency: "normal", 
    verdicts, 
    items: finalItems, 
    skipped,
    recipeMeta: {
      cookTime: output.cookTime,
      difficulty: output.difficulty
    }
  };
}

export const generateRecipeCartFn = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const output = await extractRecipeIngredients(
      data.meal, 
      data.people, 
      data.fridgeInventory || [], 
      data.favoriteBrands || []
    );
    return resolveRecipeCart(output, data.people, data.dietary || []);
  });
