import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { t as createServerRpc } from "./createServerRpc-BWrlMzYt.mjs";
import { t as productCatalog_default } from "./productCatalog-BzTMCepi.mjs";
import { t as purchaseHistory } from "./purchaseHistory-CKismEig.mjs";
import { n as objectType, r as stringType, t as arrayType } from "../_libs/zod.mjs";
import { n as Type, t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agent.functions-ONGg1PbP.js
var inputSchema = objectType({
	query: stringType(),
	dietary: arrayType(stringType()).optional()
});
var CATEGORY_TAXONOMY = [
	"Emergency",
	"Beverages",
	"Electronics",
	"Dairy",
	"Bakery",
	"Pantry",
	"Produce",
	"Staples",
	"Wellness",
	"Pharmacy",
	"Household",
	"Snacks",
	"Frozen",
	"Quick Meals"
];
async function extractIntent(query) {
	const response = await new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }).models.generateContent({
		model: "gemini-3.5-flash",
		contents: `Situation (Indian household): "${query}"
Pick 1-3 categories ONLY from this list: ${CATEGORY_TAXONOMY.join(", ")}.
Give 3-6 specific everyday Indian grocery/household item keywords (e.g. chips, namkeen, milk, noodles, paracetamol) relevant to the situation. No alcohol. Also give urgency (low/medium/high) and estimated_items (3-8).`,
		config: {
			responseMimeType: "application/json",
			responseSchema: {
				type: Type.OBJECT,
				properties: {
					categories: {
						type: Type.ARRAY,
						items: { type: Type.STRING },
						description: "1-3 categories, must be from the given list"
					},
					keywords: {
						type: Type.ARRAY,
						items: { type: Type.STRING },
						description: "3-6 specific everyday item names"
					},
					urgency: {
						type: Type.STRING,
						description: "low, medium, or high"
					},
					estimated_items: {
						type: Type.NUMBER,
						description: "expected cart size, 3-8"
					}
				},
				required: [
					"categories",
					"keywords",
					"urgency",
					"estimated_items"
				]
			}
		}
	});
	const parsed = JSON.parse(response.text || "{}");
	return {
		categories: parsed.categories || [],
		keywords: parsed.keywords || [],
		urgency: parsed.urgency || "medium",
		estimated_items: parsed.estimated_items || 5
	};
}
function resolveCart(intent, dietary) {
	const categories = intent.categories.map((c) => c.toLowerCase());
	const keywords = intent.keywords.map((k) => k.toLowerCase());
	const CATEGORY_RANK_WEIGHT = [
		3,
		2,
		1
	];
	const candidates = productCatalog_default.map((product) => {
		const categoryLower = product.category.toLowerCase();
		const categoryRank = categories.findIndex((c) => c === categoryLower || categoryLower.includes(c) || c.includes(categoryLower));
		const haystack = [
			product.name,
			product.category,
			product.brand,
			...product.keywords || []
		].join(" ").toLowerCase();
		let keywordScore = 0;
		for (const kw of keywords) if (kw && haystack.includes(kw)) keywordScore += 2;
		let matchScore = keywordScore;
		if (categoryRank !== -1 && (categoryRank < 2 || keywordScore > 0)) matchScore += CATEGORY_RANK_WEIGHT[categoryRank] ?? 1;
		const brandBoost = Math.min(1, (purchaseHistory.brandCounts[product.brand] || 0) / 4);
		return {
			product,
			matchScore,
			total: matchScore + brandBoost
		};
	}).filter((c) => c.matchScore > 0);
	const vegOnly = dietary.includes("Vegetarian");
	const dietaryExcluded = vegOnly ? candidates.filter((c) => !c.product.is_vegetarian) : [];
	const eligible = vegOnly ? candidates.filter((c) => c.product.is_vegetarian) : candidates;
	eligible.sort((a, b) => b.total - a.total);
	const itemCount = Math.max(3, Math.min(8, Math.round(intent.estimated_items) || 5));
	const selected = eligible.slice(0, itemCount);
	const skippedCandidates = eligible.slice(itemCount, itemCount + 3);
	const urgencyLevel = intent.urgency === "high" ? "high" : "normal";
	const items = selected.map(({ product, total }) => {
		const discountPercent = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : 0;
		const isHealthCategory = [
			"Pharmacy",
			"Wellness",
			"Emergency"
		].includes(product.category);
		const fromHistory = (purchaseHistory.brandCounts[product.brand] || 0) > 0;
		const agentSource = isHealthCategory ? "health" : fromHistory ? "context" : "speed";
		const reasoning = fromHistory ? `Matches your situation, and ${product.brand} is a brand you order often.` : `Matches your situation — relevant ${product.category.toLowerCase()} item.`;
		return {
			id: product.id,
			name: product.name,
			category: product.category,
			price: product.price,
			original_price: product.original_price,
			image_keyword: product.image_keyword,
			is_vegetarian: product.is_vegetarian,
			is_eco: product.is_eco,
			eta_minutes: product.eta_minutes,
			brand: product.brand,
			quantity: 1,
			reasoning,
			agentSource,
			discountPercent,
			relevanceScore: Math.min(100, Math.round(total * 15)),
			...urgencyLevel === "high" && isHealthCategory ? { crisisReason: "Prioritized due to the urgency of your situation." } : {}
		};
	});
	const skipped = [...skippedCandidates.map(({ product }) => ({
		id: product.id,
		name: product.name,
		reasoning: "Matched your situation but ranked lower than the picks above.",
		price: product.price,
		image_keyword: product.image_keyword
	})), ...dietaryExcluded.slice(0, 2).map(({ product }) => ({
		id: product.id,
		name: product.name,
		reasoning: "Excluded — doesn't match your Vegetarian preference.",
		price: product.price,
		image_keyword: product.image_keyword
	}))];
	const avgEta = items.length ? Math.round(items.reduce((s, i) => s + i.eta_minutes, 0) / items.length) : 0;
	const historyMatches = items.filter((i) => i.agentSource === "context").length;
	return {
		urgency: urgencyLevel,
		verdicts: {
			speed: `Selected ${items.length} item(s) with an average delivery of ${avgEta} min for your ${intent.urgency} urgency request.`,
			context: `Matched your situation to ${intent.categories.join(", ") || "general"}${historyMatches ? `, prioritizing ${historyMatches} item(s) from brands you order often` : ""}.`,
			health: vegOnly ? `Applied your Vegetarian preference — excluded ${dietaryExcluded.length} non-matching item(s).` : `No dietary restrictions applied to this cart.`
		},
		items,
		skipped
	};
}
var generateCartFn_createServerFn_handler = createServerRpc({
	id: "795a9d86443c6458c525f1171550f3b4804028944c119172bd216b69ef108a64",
	name: "generateCartFn",
	filename: "src/lib/api/agent.functions.ts"
}, (opts) => generateCartFn.__executeServer(opts));
var generateCartFn = createServerFn({ method: "POST" }).inputValidator((data) => inputSchema.parse(data)).handler(generateCartFn_createServerFn_handler, async ({ data }) => {
	return resolveCart(await extractIntent(data.query), data.dietary || []);
});
//#endregion
export { generateCartFn_createServerFn_handler };
