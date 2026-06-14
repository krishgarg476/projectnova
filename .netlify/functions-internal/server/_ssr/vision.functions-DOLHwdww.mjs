import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { t as createServerRpc } from "./createServerRpc-BWrlMzYt.mjs";
import { t as productCatalog_default } from "./productCatalog-BzTMCepi.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { n as Type, t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vision.functions-DOLHwdww.js
var inputSchema = objectType({ base64Image: stringType() });
var processImageFn_createServerFn_handler = createServerRpc({
	id: "46dedc7adf69af42a94c1891de95fe897d68bca2ad872d5ba30a55831ac24d9e",
	name: "processImageFn",
	filename: "src/lib/api/vision.functions.ts"
}, (opts) => processImageFn.__executeServer(opts));
var processImageFn = createServerFn({ method: "POST" }).inputValidator((data) => inputSchema.parse(data)).handler(processImageFn_createServerFn_handler, async ({ data }) => {
	const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
	const base64Str = data.base64Image.includes("base64,") ? data.base64Image.split("base64,")[1] : data.base64Image;
	const response = await ai.models.generateContent({
		model: "gemini-3.5-flash",
		contents: ["You are an AI fridge/pantry scanner. Look at the image and identify 3-5 basic grocery or household items that appear to be missing, running low, or logically should be restocked. Provide what you noticed and broad categories.", { inlineData: {
			data: base64Str,
			mimeType: "image/jpeg"
		} }],
		config: {
			responseMimeType: "application/json",
			responseSchema: {
				type: Type.OBJECT,
				properties: { noticed: {
					type: Type.ARRAY,
					items: {
						type: Type.OBJECT,
						properties: {
							t: {
								type: Type.STRING,
								description: "Observation, e.g. 'Milk carton is empty' or 'No fresh vegetables visible'"
							},
							category: {
								type: Type.STRING,
								description: "e.g. Dairy, Produce, Bakery, Snacks"
							},
							add: {
								type: Type.BOOLEAN,
								description: "always true if it's missing"
							}
						},
						required: [
							"t",
							"category",
							"add"
						]
					}
				} },
				required: ["noticed"]
			}
		}
	});
	const noticed = JSON.parse(response.text || "{}").noticed || [];
	const results = [];
	for (const n of noticed) if (n.add) {
		let bestMatch = null;
		let bestScore = 0;
		for (const c of productCatalog_default) {
			if (results.some((r) => r.id === c.id)) continue;
			let score = 0;
			const aiCat = n.category.toLowerCase();
			const aiText = n.t.toLowerCase();
			const catLower = c.category.toLowerCase();
			if (aiCat.includes(catLower) || catLower.includes(aiCat)) score += 2;
			c.keywords?.forEach((k) => {
				const kLower = k.toLowerCase();
				if (aiCat.includes(kLower) || aiText.includes(kLower)) score += 3;
				if (c.name.toLowerCase().includes(aiText) || aiText.includes(c.name.toLowerCase())) score += 5;
			});
			if (score > bestScore) {
				bestScore = score;
				bestMatch = c;
			}
		}
		if (bestMatch) results.push({
			id: bestMatch.id,
			name: bestMatch.name,
			price: bestMatch.price,
			imageKeyword: bestMatch.image_keyword,
			reasoning: n.t
		});
	}
	if (results.length === 0) {
		noticed.push({
			t: "Couldn't see clearly, suggesting essentials.",
			category: "Dairy",
			add: true
		});
		results.push({
			id: productCatalog_default[0].id,
			name: productCatalog_default[0].name,
			price: productCatalog_default[0].price,
			imageKeyword: productCatalog_default[0].image_keyword,
			reasoning: "Essential restock"
		});
	}
	return {
		noticed,
		results
	};
});
//#endregion
export { processImageFn_createServerFn_handler };
