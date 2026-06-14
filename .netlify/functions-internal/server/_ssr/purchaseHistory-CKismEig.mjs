//#region node_modules/.nitro/vite/services/ssr/assets/purchaseHistory-CKismEig.js
var purchaseHistory = {
	brandCounts: {
		"Amul": 12,
		"Tata Sampann": 4,
		"Daawat": 2,
		"Lay's": 5,
		"Coca-Cola": 3,
		"Colgate": 6,
		"Dettol": 2,
		"Haldiram's": 3
	},
	predictedRestocks: [
		{
			id: "d1",
			name: "Amul Toned Milk 1L",
			imageKeyword: "milk-carton",
			category: "Dairy",
			price: 64,
			reasoning: "Milk usually finishes today based on your 3-day pattern.",
			confidence: 94
		},
		{
			id: "d3",
			name: "Tata Salt 1kg",
			imageKeyword: "salt-bag",
			category: "Pantry",
			price: 28,
			reasoning: "You're due for a salt restock — last bought 3 weeks ago.",
			confidence: 81
		},
		{
			id: "d8",
			name: "Fresh Mixed Vegetables 2kg",
			imageKeyword: "mixed-vegetables",
			category: "Produce",
			price: 280,
			reasoning: "Matches your twice-weekly vegetable restock pattern.",
			confidence: 87
		}
	]
};
//#endregion
export { purchaseHistory as t };
