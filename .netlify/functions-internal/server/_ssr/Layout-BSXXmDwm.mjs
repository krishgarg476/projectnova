import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate, i as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as productCatalog_default } from "./productCatalog-BzTMCepi.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { F as ChevronDown, I as Check, b as Menu, c as ShoppingCart, d as Search, g as Minus, i as TriangleAlert, n as X, o as Star, p as Plus, x as MapPin } from "../_libs/lucide-react.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-OzPDDHx1.js
var GENERIC_REVIEWS = [
	{
		name: "Anjali V.",
		rating: 5,
		text: "Quality product, delivered fast. Exactly as described.",
		date: "2 weeks ago"
	},
	{
		name: "Rahul M.",
		rating: 4,
		text: "Good value for money. Packaging could be better but contents are fine.",
		date: "1 month ago"
	},
	{
		name: "Sneha P.",
		rating: 5,
		text: "Repurchasing — this is a household staple for us now.",
		date: "3 weeks ago"
	}
];
var CATALOG = {
	d1: {
		description: "Replenish lost electrolytes quickly with WHO-recommended oral rehydration salts. Each sachet mixes with 200ml water for instant relief during dehydration, fever, or heat exhaustion. Pack of 10 individually sealed sachets for hygiene and portability.",
		reviews: [
			{
				name: "Dr. Mehta",
				rating: 5,
				text: "Recommend to all my patients for mild dehydration. Reliable formulation.",
				date: "1 week ago"
			},
			{
				name: "Priya K.",
				rating: 5,
				text: "Saved us during a stomach bug — kids tolerated the orange flavour well.",
				date: "3 weeks ago"
			},
			{
				name: "Vikram S.",
				rating: 4,
				text: "Works as expected. Wish there were more flavour options.",
				date: "2 months ago"
			}
		],
		bundlePartners: [
			"Electrolyte Drink",
			"Digital Thermometer",
			"Paracetamol 500mg"
		]
	},
	d2: {
		description: "Long-grain basmati rice aged for 12 months for the perfect aroma and non-sticky cooked texture. Sourced from the foothills of the Himalayas, ideal for biryani, pulao, and everyday meals. Resealable 5kg pack keeps grains fresh.",
		reviews: [
			{
				name: "Anu G.",
				rating: 5,
				text: "Grains separate beautifully — restaurant-quality biryani at home.",
				date: "1 week ago"
			},
			{
				name: "Karan P.",
				rating: 5,
				text: "5kg lasts our family of 4 nearly a month. Great price.",
				date: "2 weeks ago"
			},
			{
				name: "Meera R.",
				rating: 4,
				text: "Good rice, but I prefer a slightly stronger aroma.",
				date: "1 month ago"
			}
		],
		bundlePartners: ["Tata Sampann Toor Dal 1kg", "Cooking Oil 1L"]
	},
	d3: {
		description: "20,000 mAh dual-port power bank with PD 22.5W fast charging. Charges a phone fully 4-5 times. LED indicator shows remaining capacity. Compact and travel-friendly with airline-safe lithium cells.",
		reviews: [
			{
				name: "Aditya N.",
				rating: 5,
				text: "Fast charging actually works — full phone charge in under an hour.",
				date: "5 days ago"
			},
			{
				name: "Riya T.",
				rating: 4,
				text: "Heavier than expected but capacity is genuine.",
				date: "2 weeks ago"
			},
			{
				name: "Sahil B.",
				rating: 5,
				text: "Got me through a 14-hour blackout last week. Worth every rupee.",
				date: "1 month ago"
			}
		]
	},
	d4: {
		description: "BPA-free stainless steel insulated lunch box set with three compartments. Keeps food warm for 4-6 hours or cool for 8 hours. Leak-proof silicone seal, includes carry bag and reusable cutlery.",
		reviews: [{
			name: "Pooja M.",
			rating: 5,
			text: "Coffee was still hot when I opened it at 2 PM. Brilliant.",
			date: "1 week ago"
		}, {
			name: "Naveen L.",
			rating: 4,
			text: "Sturdy build but the cutlery feels lightweight.",
			date: "3 weeks ago"
		}]
	},
	d5: {
		description: "Set of 12 long-burning emergency candles, each lasting 6-8 hours. Dripless, smokeless paraffin wax in a stable jar base. Essential for power cuts, religious occasions, or ambiance.",
		reviews: [{
			name: "Kavya D.",
			rating: 5,
			text: "Used during our 5-hour power cut — clean burn, no soot.",
			date: "2 weeks ago"
		}, {
			name: "Manish J.",
			rating: 4,
			text: "Good value. Wish the jars were a bit taller.",
			date: "1 month ago"
		}],
		bundlePartners: ["LED Rechargeable Torch", "Matchbox (10-pack)"]
	},
	d6: {
		description: "30 individually sealed instant coffee sachets in rich Colombian roast. Just add hot water for cafe-style coffee in seconds. Perfect for office, travel, or quick morning fix.",
		reviews: [{
			name: "Suresh T.",
			rating: 4,
			text: "Better than expected for instant. Smooth, not bitter.",
			date: "1 week ago"
		}, {
			name: "Ira K.",
			rating: 5,
			text: "Lifesaver for early morning shifts.",
			date: "3 weeks ago"
		}],
		bundlePartners: ["Amul Toned Milk 1L", "Britannia Marie Biscuits"]
	},
	d7: {
		description: "Hand-picked, unpolished toor dal rich in protein and fibre. Tata Sampann ensures higher protein content than regular polished dal. Cooks evenly in a pressure cooker in 15 minutes.",
		reviews: [{
			name: "Lakshmi V.",
			rating: 5,
			text: "Cooks faster than my old brand and tastes more wholesome.",
			date: "2 weeks ago"
		}, {
			name: "Anil P.",
			rating: 5,
			text: "My grandmother approved — that's the highest praise.",
			date: "1 month ago"
		}],
		bundlePartners: ["Premium Basmati Rice 5kg", "Cooking Oil 1L"]
	},
	d8: {
		description: "Three-pack of Colgate MaxFresh with cooling crystals for long-lasting fresh breath. Fluoride formula fights cavities. Each tube is 150g — a 3-month supply for one person.",
		reviews: [{
			name: "Tarun S.",
			rating: 5,
			text: "Tingling sensation lasts hours. Family favourite.",
			date: "1 week ago"
		}, {
			name: "Renu A.",
			rating: 4,
			text: "Standard Colgate quality, good bulk deal.",
			date: "2 weeks ago"
		}],
		bundlePartners: ["Bamboo Toothbrush (2-pack)", "Dental Floss"]
	},
	d9: {
		description: "Two-pack of soft whole wheat bread baked fresh daily. 100% whole grain, no maida, with added fibre. Stays fresh for 4 days when stored properly.",
		reviews: [{
			name: "Geeta H.",
			rating: 5,
			text: "Soft texture, perfect for toast or sandwiches.",
			date: "3 days ago"
		}, {
			name: "Rohan B.",
			rating: 4,
			text: "Tastes genuinely whole-wheat, not bleached.",
			date: "1 week ago"
		}],
		bundlePartners: ["Amul Butter 500g", "Mixed Fruit Jam"]
	},
	d10: {
		description: "Classic Amul salted butter, churned from fresh cream. Spreads easily, perfect for breakfast toast, parathas, or baking. 500g pack stays fresh for 6 months when refrigerated.",
		reviews: [{
			name: "Sundar M.",
			rating: 5,
			text: "Nothing beats Amul butter on hot toast. Timeless.",
			date: "1 week ago"
		}, {
			name: "Niharika D.",
			rating: 4,
			text: "Slightly saltier than I prefer but quality is consistent.",
			date: "1 month ago"
		}],
		bundlePartners: ["Whole Wheat Bread (2-pack)", "Mixed Fruit Jam"]
	},
	d11: {
		description: "Maggi's iconic Hot & Sweet tomato chilli sauce in a family 1kg bottle. Perfect dip for snacks, base for noodle dishes, or condiment for sandwiches. Made with real tomatoes and a balanced kick.",
		reviews: [{
			name: "Pranav K.",
			rating: 5,
			text: "Childhood in a bottle. Goes with literally everything.",
			date: "2 weeks ago"
		}, {
			name: "Aarti R.",
			rating: 4,
			text: "1kg is huge — get the smaller one if you live alone.",
			date: "1 month ago"
		}]
	},
	d12: {
		description: "Two-pack of Dettol pH-balanced handwash with antibacterial protection. Kills 99.9% germs while being gentle on skin. 750ml bottles with pump dispensers — ideal for kitchen and bathroom.",
		reviews: [{
			name: "Dr. Singh",
			rating: 5,
			text: "Recommend this in my clinic. Reliable antibacterial action.",
			date: "1 week ago"
		}, {
			name: "Mona V.",
			rating: 5,
			text: "Doesn't dry out my hands like generic handwashes.",
			date: "2 weeks ago"
		}],
		bundlePartners: ["Dettol Liquid Soap", "Tissue Box (200 pulls)"]
	},
	c1: {
		description: "Comprehensive 50-item first aid kit including bandages, antiseptic wipes, scissors, thermometer, and emergency contact card. Compact zippered case fits in any household drawer or car.",
		reviews: [{
			name: "Capt. Mehra",
			rating: 5,
			text: "Better stocked than most office kits. Recommended.",
			date: "1 week ago"
		}, {
			name: "Sunita K.",
			rating: 4,
			text: "Solid kit — wish it included more burn-care supplies.",
			date: "3 weeks ago"
		}]
	},
	c2: {
		description: "Powerful 1000-lumen LED rechargeable torch with 3 brightness modes and SOS strobe. USB-C charges in 2 hours, runs up to 12 hours on low. Waterproof aluminium body — essential for outages and emergencies.",
		reviews: [{
			name: "Vinay G.",
			rating: 5,
			text: "Genuinely bright. Used it through a 6-hour outage last month.",
			date: "2 weeks ago"
		}, {
			name: "Anita J.",
			rating: 5,
			text: "Solid build, USB-C charging is a thoughtful touch.",
			date: "1 month ago"
		}],
		bundlePartners: ["Emergency Candle Pack (12)", "Power Bank 20,000 mAh"]
	},
	c3: {
		description: "Pack of four 2L Bisleri bottles of purified mineral water. ISI-certified, sealed for hygiene. Essential backup during outages, parties, or as everyday drinking water.",
		reviews: [{
			name: "Ravi M.",
			rating: 5,
			text: "Always good to keep a 4-pack at home for emergencies.",
			date: "1 week ago"
		}, {
			name: "Pallavi N.",
			rating: 4,
			text: "Standard Bisleri quality. Heavy but reliable.",
			date: "2 weeks ago"
		}]
	},
	c4: {
		description: "Battery-powered USB-rechargeable table fan with 3 speeds. Runs up to 8 hours on a single charge. Quiet operation, lightweight, perfect for power cuts and travel.",
		reviews: [{
			name: "Imran S.",
			rating: 5,
			text: "Lifesaver during the summer power cuts in Kota.",
			date: "3 weeks ago"
		}, {
			name: "Divya P.",
			rating: 4,
			text: "Battery life is real. Wish it oscillated though.",
			date: "1 month ago"
		}]
	},
	c5: {
		description: "Five ready-to-eat heat-and-serve Indian meals — dal makhani, rajma chawal, chana masala, aloo paratha, and pulao. Each pouch is 300g, 18-month shelf life, no preservatives.",
		reviews: [{
			name: "Sameer T.",
			rating: 4,
			text: "Genuinely tasty for ready-to-eat. The dal makhani is impressive.",
			date: "1 week ago"
		}, {
			name: "Rekha B.",
			rating: 5,
			text: "Saved many late nights when cooking wasn't an option.",
			date: "3 weeks ago"
		}]
	},
	c6: {
		description: "20,000 mAh power bank with quick charge and pass-through charging. Charges most phones 5+ times. Built-in flashlight and digital battery display. Cabin-baggage approved.",
		reviews: [{
			name: "Aditya R.",
			rating: 5,
			text: "Lasted through a 36-hour trip without needing a wall socket.",
			date: "2 weeks ago"
		}, {
			name: "Naina K.",
			rating: 4,
			text: "Heavy but justified for the capacity.",
			date: "1 month ago"
		}]
	}
};
function metaFor(id, name) {
	if (CATALOG[id]) return CATALOG[id];
	return {
		description: `${name || "This product"} is a quality everyday essential, sourced and packaged for freshness. Arrives sealed and ready to use, with full quality assurance from Now's curated supplier network.`,
		reviews: GENERIC_REVIEWS
	};
}
var BUNDLE_MAP = [
	{
		match: "bread",
		partners: [
			"Amul Butter 500g",
			"Mixed Fruit Jam",
			"Farm Eggs (12-pack)"
		]
	},
	{
		match: "maggi",
		partners: [
			"Onion 1kg",
			"Tomato 500g",
			"Extra Masala Sachet"
		]
	},
	{
		match: "noodles",
		partners: [
			"Onion 1kg",
			"Tomato 500g",
			"Extra Masala Sachet"
		]
	},
	{
		match: "milk",
		partners: [
			"Tea Bags (100)",
			"Sugar 1kg",
			"Britannia Marie Biscuits"
		]
	},
	{
		match: "ors",
		partners: ["Electrolyte Drink", "Digital Thermometer"]
	},
	{
		match: "rice",
		partners: ["Tata Sampann Toor Dal 1kg", "Cooking Oil 1L"]
	},
	{
		match: "diaper",
		partners: ["Baby Wipes (3-pack)", "Diaper Rash Cream"]
	},
	{
		match: "torch",
		partners: ["AA Batteries (4-pack)", "Power Bank 20,000 mAh"]
	}
];
function bundlesFor(name) {
	const lower = name.toLowerCase();
	for (const b of BUNDLE_MAP) if (lower.includes(b.match)) return b.partners;
	return [];
}
function keywordForName(name) {
	return name.toLowerCase().replace(/\([^)]*\)/g, "").replace(/\d+/g, "").replace(/[^a-z\s]/g, "").trim().split(/\s+/).slice(0, 3).join("-") || "product";
}
var NUMBER_WORDS = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
	ten: 10
};
function toNumber(s) {
	return NUMBER_WORDS[s.toLowerCase()] ?? parseInt(s, 10);
}
var NUM = "(\\d+|one|two|three|four|five|six|seven|eight|nine|ten)";
var FREQUENCY_RULES = [
	{
		regex: /(?:every\s+)?\b(?:alternate|alternative|other)\b\s+days?/i,
		days: 2,
		label: "Every alternate day"
	},
	{
		regex: new RegExp(`(?:every\\s+)?\\b${NUM}\\b\\s+days?`, "i"),
		days: (m) => toNumber(m[1]),
		label: (m) => `Every ${toNumber(m[1])} days`
	},
	{
		regex: /\bfortnightly\b|(?:every\s+)?\bfortnight\b|(?:every\s+)?\b(?:other|alternate|2|two)\b\s+weeks?|\bbi-?weekly\b/i,
		days: 14,
		label: "Every 2 weeks"
	},
	{
		regex: new RegExp(`(?:every\\s+)?\\b${NUM}\\b\\s+weeks?`, "i"),
		days: (m) => toNumber(m[1]) * 7,
		label: (m) => `Every ${toNumber(m[1])} weeks`
	},
	{
		regex: /(in\s+)?(the\s+)?first week of (?:every|each)?\s*month/i,
		days: 30,
		label: "Monthly (first week)"
	},
	{
		regex: /twice a month|twice monthly/i,
		days: 15,
		label: "Twice a month"
	},
	{
		regex: /every month|monthly|once a month/i,
		days: 30,
		label: "Monthly"
	},
	{
		regex: /twice a week|twice weekly/i,
		days: 3,
		label: "Twice a week"
	},
	{
		regex: /every\s*day|daily|everyday|once a day/i,
		days: 1,
		label: "Daily"
	},
	{
		regex: /every week|weekly|once a week/i,
		days: 7,
		label: "Weekly"
	}
];
var FILLER_PATTERNS = [
	/^i'?d like to have\b/i,
	/^i would like to have\b/i,
	/^remind me to (add|order|buy|get)\b/i,
	/^(please\s+)?(add|order|buy|get)\b/i,
	/\bordered\b/i,
	/^to\s+/i,
	/\b(in|for|on)\s*$/i
];
function parseRecurringInput(raw) {
	const text = raw.trim();
	let rest = text;
	let frequencyDays = 7;
	let frequencyLabel = "Weekly";
	for (const rule of FREQUENCY_RULES) {
		const m = rest.match(rule.regex);
		if (m) {
			frequencyDays = typeof rule.days === "function" ? rule.days(m) : rule.days;
			frequencyLabel = typeof rule.label === "function" ? rule.label(m) : rule.label;
			rest = rest.replace(m[0], " ");
			break;
		}
	}
	for (const pattern of FILLER_PATTERNS) rest = rest.replace(pattern, " ");
	rest = rest.replace(/[.,!]+$/g, "").replace(/\s{2,}/g, " ").trim().replace(/^(a|an|the)\s+/i, "").trim();
	const cleaned = rest || text;
	return {
		itemName: cleaned.charAt(0).toUpperCase() + cleaned.slice(1),
		frequencyDays,
		frequencyLabel
	};
}
function getDueStatus(nextDueDate) {
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	const due = new Date(nextDueDate);
	due.setHours(0, 0, 0, 0);
	const daysUntil = Math.round((due.getTime() - today.getTime()) / 864e5);
	if (daysUntil < 0) return {
		status: "overdue",
		daysUntil
	};
	if (daysUntil === 0) return {
		status: "due-today",
		daysUntil
	};
	return {
		status: "upcoming",
		daysUntil
	};
}
function addDays(base, days) {
	const d = new Date(base);
	d.setDate(d.getDate() + days);
	return d.toISOString().slice(0, 10);
}
function mk(o) {
	const discount = o.originalPrice ? Math.round((o.originalPrice - o.price) / o.originalPrice * 100) : 0;
	return {
		quantity: 1,
		category: o.category || "General",
		reasoning: o.reasoning || "",
		agentSource: o.agentSource || "context",
		imageKeyword: o.imageKeyword || keywordForName(o.name),
		isVegetarian: o.isVegetarian ?? true,
		isEco: o.isEco ?? false,
		etaMinutes: o.etaMinutes ?? 11,
		discountPercent: o.discountPercent ?? discount,
		relevanceScore: o.relevanceScore ?? 70,
		brand: o.brand,
		...o
	};
}
function catalogMatch(itemName) {
	const lower = itemName.toLowerCase();
	return productCatalog_default.find((p) => p.name.toLowerCase().includes(lower) || p.keywords?.some((k) => lower.includes(k) || k.includes(lower)));
}
function powerCutItems() {
	return [
		mk({
			id: "cp1",
			name: "LED Rechargeable Torch",
			category: "Emergency",
			price: 449,
			originalPrice: 650,
			reasoning: "Immediate light source",
			agentSource: "speed",
			imageKeyword: "led-torch-flashlight",
			etaMinutes: 8,
			relevanceScore: 96,
			crisisReason: "Added — primary light during the outage"
		}),
		mk({
			id: "cp2",
			name: "Battery-Powered Fan",
			category: "Emergency",
			price: 799,
			originalPrice: 1100,
			reasoning: "Cooling without power",
			agentSource: "context",
			imageKeyword: "battery-fan",
			etaMinutes: 8,
			relevanceScore: 90,
			crisisReason: "Added — cooling without AC/ceiling fan"
		}),
		mk({
			id: "cp3",
			name: "Insulated Ice Pack (2-pack)",
			category: "Emergency",
			price: 250,
			reasoning: "Save fridge perishables",
			agentSource: "context",
			imageKeyword: "ice-pack",
			etaMinutes: 8,
			relevanceScore: 92,
			crisisReason: "Added — your fridge items may spoil without power"
		}),
		mk({
			id: "cp4",
			name: "Power Bank 20,000 mAh",
			category: "Electronics",
			price: 1599,
			originalPrice: 2200,
			reasoning: "Keep phones alive",
			agentSource: "speed",
			imageKeyword: "power-bank",
			etaMinutes: 8,
			relevanceScore: 95,
			crisisReason: "Added — keep devices charged during the outage"
		}),
		mk({
			id: "cp5",
			name: "Emergency Candles (12-pack)",
			category: "Emergency",
			price: 199,
			reasoning: "Backup light",
			agentSource: "speed",
			imageKeyword: "emergency-candles",
			etaMinutes: 8,
			relevanceScore: 80,
			crisisReason: "Added — backup if torch batteries die"
		})
	];
}
function medicalItems() {
	return [
		mk({
			id: "cm1",
			name: "ORS Hydration Sachets (10-pack)",
			category: "Wellness",
			price: 120,
			reasoning: "Rehydration",
			agentSource: "health",
			imageKeyword: "ors-sachet",
			etaMinutes: 9,
			relevanceScore: 98,
			crisisReason: "Added — essential for hydration during illness"
		}),
		mk({
			id: "cm2",
			name: "Digital Thermometer",
			category: "Pharmacy",
			price: 240,
			reasoning: "Monitor temperature",
			agentSource: "health",
			imageKeyword: "digital-thermometer",
			etaMinutes: 9,
			relevanceScore: 96,
			crisisReason: "Added — essential for monitoring temperature"
		}),
		mk({
			id: "cm3",
			name: "Paracetamol Syrup (Pediatric)",
			category: "Pharmacy",
			price: 85,
			reasoning: "Fever symptoms",
			agentSource: "health",
			imageKeyword: "paracetamol-syrup",
			etaMinutes: 9,
			relevanceScore: 94,
			crisisReason: "Added — helps manage fever symptoms"
		}),
		mk({
			id: "cm4",
			name: "First Aid Kit (50 items)",
			category: "Emergency",
			price: 399,
			originalPrice: 599,
			reasoning: "General preparedness",
			agentSource: "health",
			imageKeyword: "first-aid-kit",
			etaMinutes: 9,
			relevanceScore: 90,
			crisisReason: "Added — covers most minor injuries"
		}),
		mk({
			id: "cm5",
			name: "Electrolyte Drink",
			category: "Beverages",
			price: 110,
			reasoning: "Energy + minerals",
			agentSource: "health",
			imageKeyword: "electrolyte-drink-bottle",
			etaMinutes: 9,
			relevanceScore: 85,
			crisisReason: "Added — replenishes lost minerals"
		})
	];
}
function babyItems() {
	return [
		mk({
			id: "cb1",
			name: "Diapers (Size 3, 30-pack)",
			category: "Baby",
			price: 599,
			reasoning: "Likely running low",
			agentSource: "context",
			imageKeyword: "baby-diapers",
			etaMinutes: 10,
			relevanceScore: 96,
			crisisReason: "Added — based on typical infant emergency needs"
		}),
		mk({
			id: "cb2",
			name: "Infant Formula 400g",
			category: "Baby",
			price: 549,
			reasoning: "Feeding essential",
			agentSource: "health",
			imageKeyword: "infant-formula",
			etaMinutes: 10,
			relevanceScore: 95,
			crisisReason: "Added — feeding essential"
		}),
		mk({
			id: "cb3",
			name: "Baby Wipes (3-pack)",
			category: "Baby",
			price: 280,
			reasoning: "Hygiene staple",
			agentSource: "context",
			imageKeyword: "baby-wipes",
			etaMinutes: 10,
			relevanceScore: 90,
			crisisReason: "Added — hygiene essential"
		}),
		mk({
			id: "cb4",
			name: "Baby Paracetamol Drops",
			category: "Pharmacy",
			price: 95,
			reasoning: "Infant fever relief",
			agentSource: "health",
			imageKeyword: "baby-medicine-bottle",
			etaMinutes: 10,
			relevanceScore: 92,
			crisisReason: "Added — for infant fever"
		}),
		mk({
			id: "cb5",
			name: "Diaper Rash Cream",
			category: "Baby",
			price: 199,
			reasoning: "Skin protection",
			agentSource: "health",
			imageKeyword: "diaper-rash-cream",
			etaMinutes: 10,
			relevanceScore: 80,
			crisisReason: "Added — prevents diaper rash"
		})
	];
}
function securityItems() {
	return [
		mk({
			id: "cs1",
			name: "LED Rechargeable Torch",
			category: "Security",
			price: 449,
			originalPrice: 650,
			reasoning: "Light = safety",
			agentSource: "speed",
			imageKeyword: "led-torch",
			etaMinutes: 10,
			relevanceScore: 95,
			crisisReason: "Added — improves visibility and home security"
		}),
		mk({
			id: "cs2",
			name: "Door Security Bar",
			category: "Security",
			price: 899,
			reasoning: "Physical reinforcement",
			agentSource: "context",
			imageKeyword: "door-security-bar",
			etaMinutes: 10,
			relevanceScore: 90,
			crisisReason: "Added — physical door reinforcement"
		}),
		mk({
			id: "cs3",
			name: "Personal Safety Alarm",
			category: "Security",
			price: 599,
			reasoning: "Loud deterrent",
			agentSource: "context",
			imageKeyword: "personal-safety-alarm",
			etaMinutes: 10,
			relevanceScore: 92,
			crisisReason: "Added — loud alarm deters intruders"
		}),
		mk({
			id: "cs4",
			name: "Motion-Sensor Light",
			category: "Security",
			price: 699,
			reasoning: "Automatic outdoor lighting",
			agentSource: "context",
			imageKeyword: "motion-sensor-light",
			etaMinutes: 10,
			relevanceScore: 88,
			crisisReason: "Added — deters approach to entry points"
		}),
		mk({
			id: "cs5",
			name: "Power Bank 20,000 mAh",
			category: "Electronics",
			price: 1599,
			originalPrice: 2200,
			reasoning: "Keep phone alive",
			agentSource: "speed",
			imageKeyword: "power-bank",
			etaMinutes: 10,
			relevanceScore: 85,
			crisisReason: "Added — keep phone alive to call for help"
		})
	];
}
function naturalEventItems() {
	return [
		mk({
			id: "cn1",
			name: "Bisleri Water 2L (4-pack)",
			category: "Beverages",
			price: 160,
			originalPrice: 200,
			reasoning: "Safe drinking water",
			agentSource: "health",
			imageKeyword: "water-bottles",
			etaMinutes: 12,
			relevanceScore: 96,
			crisisReason: "Added — recommended stock for severe weather events"
		}),
		mk({
			id: "cn2",
			name: "Ready-to-Eat Meals (5-pack)",
			category: "Emergency",
			price: 450,
			originalPrice: 600,
			reasoning: "No cooking needed",
			agentSource: "context",
			imageKeyword: "ready-meals",
			etaMinutes: 12,
			relevanceScore: 94,
			crisisReason: "Added — no cooking required"
		}),
		mk({
			id: "cn3",
			name: "Battery-Powered Radio",
			category: "Emergency",
			price: 1199,
			reasoning: "Stay informed",
			agentSource: "context",
			imageKeyword: "emergency-radio",
			etaMinutes: 12,
			relevanceScore: 90,
			crisisReason: "Added — stay informed if network drops"
		}),
		mk({
			id: "cn4",
			name: "First Aid Kit (50 items)",
			category: "Emergency",
			price: 399,
			originalPrice: 599,
			reasoning: "General preparedness",
			agentSource: "health",
			imageKeyword: "first-aid-kit",
			etaMinutes: 12,
			relevanceScore: 88,
			crisisReason: "Added — injury preparedness"
		}),
		mk({
			id: "cn5",
			name: "Emergency Candles (12-pack)",
			category: "Emergency",
			price: 199,
			reasoning: "Backup light",
			agentSource: "speed",
			imageKeyword: "emergency-candles",
			etaMinutes: 12,
			relevanceScore: 82,
			crisisReason: "Added — long-burning candles for outages"
		})
	];
}
function customCrisisItems(text) {
	const t = text.toLowerCase();
	if (/baby|infant|diaper|formula/.test(t)) return babyItems();
	if (/medic|fever|sick|hurt|injur|wound/.test(t)) return medicalItems();
	if (/power|outage|blackout|fridge/.test(t)) return powerCutItems();
	if (/lock|safe|intrud|securit/.test(t)) return securityItems();
	if (/storm|flood|cyclone|heat|rain/.test(t)) return naturalEventItems();
	return [
		mk({
			id: "cx1",
			name: "ORS Hydration Sachets (10-pack)",
			category: "Wellness",
			price: 120,
			reasoning: "General hydration",
			agentSource: "health",
			imageKeyword: "ors-sachet",
			etaMinutes: 10,
			relevanceScore: 90,
			crisisReason: "Added — general emergency essential"
		}),
		mk({
			id: "cx2",
			name: "LED Rechargeable Torch",
			category: "Emergency",
			price: 449,
			originalPrice: 650,
			reasoning: "Backup light",
			agentSource: "speed",
			imageKeyword: "led-torch",
			etaMinutes: 10,
			relevanceScore: 88,
			crisisReason: "Added — backup light source"
		}),
		mk({
			id: "cx3",
			name: "Emergency Candles (12-pack)",
			category: "Emergency",
			price: 199,
			reasoning: "Backup",
			agentSource: "speed",
			imageKeyword: "emergency-candles",
			etaMinutes: 10,
			relevanceScore: 80,
			crisisReason: "Added — backup light"
		}),
		mk({
			id: "cx4",
			name: "Bisleri Water 2L (4-pack)",
			category: "Beverages",
			price: 160,
			reasoning: "Drinking water",
			agentSource: "health",
			imageKeyword: "water-bottles",
			etaMinutes: 10,
			relevanceScore: 85,
			crisisReason: "Added — safe drinking water"
		}),
		mk({
			id: "cx5",
			name: "First Aid Kit (50 items)",
			category: "Emergency",
			price: 399,
			reasoning: "Preparedness",
			agentSource: "health",
			imageKeyword: "first-aid-kit",
			etaMinutes: 10,
			relevanceScore: 86,
			crisisReason: "Added — general preparedness"
		})
	];
}
function crisisItemsFor(t, custom = "") {
	switch (t) {
		case "power_cut": return powerCutItems();
		case "medical": return medicalItems();
		case "baby": return babyItems();
		case "security": return securityItems();
		case "natural_event": return naturalEventItems();
		case "custom": return customCrisisItems(custom);
	}
}
var useStore = create((set, get) => ({
	searchQuery: "",
	cartItems: [],
	skippedItems: [],
	agentVerdicts: {
		speed: "",
		context: "",
		health: ""
	},
	urgencyLevel: "normal",
	isGenerating: false,
	groupCartItems: [
		{
			id: "gi1",
			name: "Pizza Family Pack",
			imageKeyword: "pizza-family-pack",
			price: 599,
			by: 1,
			status: "confirmed"
		},
		{
			id: "gi2",
			name: "Coke 2L (3-pack)",
			imageKeyword: "coca-cola-bottles",
			price: 270,
			by: 0,
			status: "confirmed"
		},
		{
			id: "gi3",
			name: "Garlic Bread (2-pack)",
			imageKeyword: "garlic-bread",
			price: 220,
			by: 2,
			status: "confirmed"
		},
		{
			id: "gi4",
			name: "Choco Lava Cake (4)",
			imageKeyword: "chocolate-lava-cake",
			price: 320,
			by: 3,
			status: "confirmed"
		},
		{
			id: "gi5",
			name: "Paneer Tikka Starter",
			imageKeyword: "paneer-tikka",
			price: 380,
			by: 1,
			status: "pending"
		},
		{
			id: "gi6",
			name: "Imported Cheese Board",
			imageKeyword: "cheese-board",
			price: 750,
			by: 2,
			status: "rejected"
		}
	],
	groupPeople: [
		{
			name: "Krish",
			color: "#ff9900",
			initials: "K"
		},
		{
			name: "Priya",
			color: "#5848bc",
			initials: "P"
		},
		{
			name: "Arjun",
			color: "#007185",
			initials: "A"
		},
		{
			name: "Sneha",
			color: "#b12704",
			initials: "S"
		}
	],
	checkoutSource: "personal",
	lastOrderItems: [],
	lastOrderTotal: 0,
	lastOrderId: "",
	addresses: [{
		id: "home",
		label: "Home",
		fullName: "Krish Sharma",
		line1: "203, Vigyan Nagar",
		cityStateZip: "Kota, Rajasthan 324001"
	}, {
		id: "office",
		label: "Office",
		fullName: "Krish Sharma",
		line1: "5th Floor, Tech Park",
		cityStateZip: "Jaipur 302017"
	}],
	selectedAddressId: "home",
	userProfile: {
		name: "Krish Sharma",
		phone: "+91 98765 43210",
		email: "krish@example.com"
	},
	dietaryPreferences: ["Vegetarian", "Budget-conscious"],
	crisisType: null,
	crisisCustomText: "",
	familyMembers: [
		{
			id: "fm1",
			name: "Krish (You)",
			age: 21,
			note: "—"
		},
		{
			id: "fm2",
			name: "Mother",
			age: 48,
			note: "Vegetarian"
		},
		{
			id: "fm3",
			name: "Father",
			age: 52,
			note: "No dietary restrictions"
		},
		{
			id: "fm4",
			name: "Younger sibling",
			age: 12,
			note: "Lactose-sensitive"
		}
	],
	favoriteBrands: [
		{
			name: "Raw Pressery",
			category: "Juices",
			orderCount: 6,
			prioritize: true
		},
		{
			name: "Minimalist",
			category: "Skincare",
			orderCount: 3,
			prioritize: true
		},
		{
			name: "Amul",
			category: "Dairy",
			orderCount: 12,
			prioritize: true
		},
		{
			name: "Tata Sampann",
			category: "Pulses",
			orderCount: 4,
			prioritize: true
		}
	],
	crisisContacts: [{
		id: "cc1",
		name: "Priya Sharma",
		relation: "Sister",
		phone: "+91 98XXX XX234"
	}],
	recurringRules: [],
	productDetailFor: null,
	addressSelectorOpen: false,
	addAddressOpen: false,
	editAddressId: null,
	crisisTriageOpen: false,
	setSearchQuery: (text) => set({ searchQuery: text }),
	generateResults: async (input) => {
		set({
			isGenerating: true,
			searchQuery: input
		});
		try {
			const { dietaryPreferences } = get();
			const { generateCartFn } = await import("./agent.functions-Tw-wpMFb.mjs");
			const res = await generateCartFn({ data: {
				query: input,
				dietary: dietaryPreferences
			} });
			set({
				cartItems: (res.items || []).map((i) => ({
					...i,
					price: Number(i.price),
					originalPrice: i.original_price ? Number(i.original_price) : void 0,
					imageKeyword: i.image_keyword,
					isVegetarian: i.is_vegetarian,
					isEco: i.is_eco,
					etaMinutes: i.eta_minutes
				})),
				skippedItems: (res.skipped || []).map((i) => ({
					...i,
					price: Number(i.price),
					imageKeyword: i.image_keyword
				})),
				agentVerdicts: res.verdicts,
				urgencyLevel: res.urgency,
				isGenerating: false
			});
		} catch (error) {
			console.error("AI Generation failed:", error);
			set({
				isGenerating: false,
				agentVerdicts: {
					speed: "ERROR",
					context: String(error.message || error),
					health: "Check browser console or terminal"
				}
			});
		}
	},
	updateQuantity: (id, qty) => set((s) => ({ cartItems: s.cartItems.map((it) => it.id === id ? {
		...it,
		quantity: Math.max(0, qty)
	} : it).filter((it) => it.quantity > 0) })),
	removeItem: (id) => set((s) => ({ cartItems: s.cartItems.filter((it) => it.id !== id) })),
	addCartItem: (item) => set((s) => {
		if (s.cartItems.find((i) => i.id === item.id)) return { cartItems: s.cartItems.map((i) => i.id === item.id ? {
			...i,
			quantity: i.quantity + (item.quantity || 1)
		} : i) };
		return { cartItems: [...s.cartItems, mk(item)] };
	}),
	addSkippedItem: (id) => {
		const s = get();
		const sk = s.skippedItems.find((x) => x.id === id);
		if (!sk) return;
		set({
			cartItems: [...s.cartItems, mk({
				id: sk.id,
				name: sk.name,
				category: "Added back",
				price: sk.price,
				reasoning: "Added by user from skipped list",
				imageKeyword: sk.imageKeyword
			})],
			skippedItems: s.skippedItems.filter((x) => x.id !== id)
		});
	},
	clearCart: () => set({
		cartItems: [],
		skippedItems: []
	}),
	setGroupItems: (fn) => set((s) => ({ groupCartItems: fn(s.groupCartItems) })),
	setGroupItemStatus: (id, status) => set((s) => ({ groupCartItems: s.groupCartItems.map((i) => i.id === id ? {
		...i,
		status
	} : i) })),
	addGroupPerson: (p) => set((s) => ({ groupPeople: [...s.groupPeople, p] })),
	setCheckoutSource: (source) => set({ checkoutSource: source }),
	placeOrder: () => {
		const s = get();
		const id = `NOW-2026-${Math.floor(1e4 + Math.random() * 89999)}`;
		if (s.checkoutSource === "group") {
			const items = s.groupCartItems.filter((i) => i.status === "confirmed").map((g) => mk({
				id: g.id,
				name: g.name,
				price: g.price,
				imageKeyword: g.imageKeyword,
				category: "Group",
				reasoning: "Group cart item"
			}));
			set({
				lastOrderItems: items,
				lastOrderTotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
				lastOrderId: id,
				groupCartItems: [],
				checkoutSource: "personal"
			});
		} else {
			const items = s.cartItems;
			set({
				lastOrderItems: items,
				lastOrderTotal: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
				lastOrderId: id,
				cartItems: []
			});
		}
		return id;
	},
	setSelectedAddress: (id) => set({ selectedAddressId: id }),
	addAddress: (a) => {
		const id = `addr_${Date.now()}`;
		set((s) => ({
			addresses: [...s.addresses, {
				id,
				...a
			}],
			selectedAddressId: id
		}));
		return id;
	},
	updateAddress: (id, a) => set((s) => ({ addresses: s.addresses.map((x) => x.id === id ? {
		id,
		...a
	} : x) })),
	deleteAddress: (id) => set((s) => {
		const left = s.addresses.filter((x) => x.id !== id);
		return {
			addresses: left,
			selectedAddressId: s.selectedAddressId === id ? left[0]?.id || "" : s.selectedAddressId
		};
	}),
	updateProfile: (p) => set((s) => ({ userProfile: {
		...s.userProfile,
		...p
	} })),
	toggleDietary: (tag) => set((s) => ({ dietaryPreferences: s.dietaryPreferences.includes(tag) ? s.dietaryPreferences.filter((t) => t !== tag) : [...s.dietaryPreferences, tag] })),
	toggleBrand: (name) => set((s) => ({ favoriteBrands: s.favoriteBrands.map((b) => b.name === name ? {
		...b,
		prioritize: !b.prioritize
	} : b) })),
	updateFamilyMember: (id, m) => set((s) => ({ familyMembers: s.familyMembers.map((x) => x.id === id ? {
		...x,
		...m
	} : x) })),
	addRecurringRule: (rawInput) => {
		const trimmed = rawInput.trim();
		if (!trimmed) return;
		const parsed = parseRecurringInput(trimmed);
		const match = catalogMatch(parsed.itemName);
		set((s) => ({ recurringRules: [...s.recurringRules, {
			id: `rr_${Date.now()}`,
			itemName: parsed.itemName,
			frequencyLabel: parsed.frequencyLabel,
			frequencyDays: parsed.frequencyDays,
			rawInput: trimmed,
			nextDueDate: addDays(/* @__PURE__ */ new Date(), parsed.frequencyDays),
			price: match?.price ?? 150,
			imageKeyword: match?.image_keyword ?? keywordForName(parsed.itemName)
		}] }));
	},
	deleteRecurringRule: (id) => set((s) => ({ recurringRules: s.recurringRules.filter((r) => r.id !== id) })),
	fulfillRecurringRule: (id) => {
		const rule = get().recurringRules.find((r) => r.id === id);
		if (!rule) return;
		get().addCartItem({
			id: `${rule.id}_${Date.now()}`,
			name: rule.itemName,
			price: rule.price,
			imageKeyword: rule.imageKeyword,
			category: "Recurring",
			reasoning: `Recurring reminder — ${rule.frequencyLabel.toLowerCase()}.`,
			agentSource: "context"
		});
		set((s) => ({ recurringRules: s.recurringRules.map((r) => r.id === id ? {
			...r,
			nextDueDate: addDays(/* @__PURE__ */ new Date(), r.frequencyDays)
		} : r) }));
	},
	updateCrisisContact: (id, c) => set((s) => ({ crisisContacts: s.crisisContacts.map((x) => x.id === id ? {
		...x,
		...c
	} : x) })),
	addCrisisContact: () => set((s) => ({ crisisContacts: [...s.crisisContacts, {
		id: `cc_${Date.now()}`,
		name: "New Contact",
		relation: "",
		phone: ""
	}] })),
	deleteCrisisContact: (id) => set((s) => ({ crisisContacts: s.crisisContacts.filter((c) => c.id !== id) })),
	setCrisisType: (t, custom = "") => set({
		crisisType: t,
		crisisCustomText: custom
	}),
	openProductDetail: (p) => set({ productDetailFor: p }),
	closeProductDetail: () => set({ productDetailFor: null }),
	openAddressSelector: () => set({ addressSelectorOpen: true }),
	closeAddressSelector: () => set({ addressSelectorOpen: false }),
	openAddAddress: (editId) => set({
		addAddressOpen: true,
		editAddressId: editId || null,
		addressSelectorOpen: false
	}),
	closeAddAddress: () => set({
		addAddressOpen: false,
		editAddressId: null
	}),
	openCrisisTriage: () => set({ crisisTriageOpen: true }),
	closeCrisisTriage: () => set({ crisisTriageOpen: false })
}));
var cartTotal = (items) => items.reduce((sum, it) => sum + it.price * it.quantity, 0);
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/Layout-BSXXmDwm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Logo({ light = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center leading-none select-none",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `text-[26px] font-extrabold tracking-tight ${light ? "text-white" : "text-[#131921]"}`,
			children: "now"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: "52",
			height: "10",
			viewBox: "0 0 52 10",
			className: "-mt-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 6 L14 4 L20 7 L30 2 L38 6 L50 3",
				fill: "none",
				stroke: "#FF9900",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M44 1 L48 3 L46 5",
				fill: "none",
				stroke: "#FF9900",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})]
		})]
	});
}
var PLACEHOLDERS = [
	"Guests arriving in an hour...",
	"Power cut, fridge items at risk...",
	"Just got home, starving...",
	"Feeling unwell, need supplies...",
	"Snap your fridge — get a cart..."
];
var CATEGORIES = [
	"All",
	"Groceries",
	"Wellness",
	"Household Essentials",
	"Snacks & Beverages",
	"AI Predictions"
];
var NAV_LINKS = [
	{
		label: "AI Council",
		to: "/results"
	},
	{
		label: "Predictive Pulse",
		to: "/pulse"
	},
	{
		label: "Fridge Whisperer",
		to: "/fridge-whisperer"
	},
	{
		label: "Crisis Mode",
		to: "/crisis"
	},
	{
		label: "Group Carts",
		to: "/group/demo"
	},
	{
		label: "Eco Impact",
		to: "/eco-impact"
	},
	{
		label: "Voice Mode",
		to: "/voice"
	},
	{
		label: "Chat Shopping",
		to: "/chat"
	},
	{
		label: "Profile",
		to: "/profile"
	}
];
function Header() {
	const [text, setText] = (0, import_react.useState)("");
	const [ph, setPh] = (0, import_react.useState)("");
	const [phIdx, setPhIdx] = (0, import_react.useState)(0);
	const [charIdx, setCharIdx] = (0, import_react.useState)(0);
	const [cat, setCat] = (0, import_react.useState)("All");
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const [acctOpen, setAcctOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const cartItems = useStore((s) => s.cartItems);
	const generate = useStore((s) => s.generateResults);
	const userProfile = useStore((s) => s.userProfile);
	const addresses = useStore((s) => s.addresses);
	const selectedAddressId = useStore((s) => s.selectedAddressId);
	const openAddressSelector = useStore((s) => s.openAddressSelector);
	const openCrisisTriage = useStore((s) => s.openCrisisTriage);
	const cartCount = cartItems.reduce((n, i) => n + i.quantity, 0);
	const inputRef = (0, import_react.useRef)(null);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
	const pincode = selectedAddress?.cityStateZip.match(/\d{6}/)?.[0] || "324001";
	const city = selectedAddress?.cityStateZip.split(",")[0] || "Kota";
	(0, import_react.useEffect)(() => {
		const current = PLACEHOLDERS[phIdx];
		if (charIdx < current.length) {
			const t = setTimeout(() => {
				setPh(current.slice(0, charIdx + 1));
				setCharIdx((i) => i + 1);
			}, 55);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => {
			setCharIdx(0);
			setPh("");
			setPhIdx((i) => (i + 1) % PLACEHOLDERS.length);
		}, 2200);
		return () => clearTimeout(t);
	}, [charIdx, phIdx]);
	function submit(e) {
		e?.preventDefault();
		const q = (text || ph || "daily restock").trim();
		navigate({ to: "/results" });
		generate(q);
	}
	function isActive(to) {
		if (to === "/group/demo") return pathname.startsWith("/group/");
		return pathname === to;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-[#131921] text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[1500px] mx-auto flex items-center gap-2 px-3 h-[60px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openAddressSelector,
						className: "hidden md:flex items-start text-left px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4 mt-3 mr-1 text-[#ccc]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[12px] text-[#ccc]",
								children: ["Deliver to ", userProfile.name.split(" ")[0]]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[14px] font-bold",
								children: [
									city,
									" ",
									pincode
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: submit,
						className: "flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#ff9900]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: cat,
								onChange: (e) => setCat(e.target.value),
								className: "bg-[#f3f3f3] text-[#0f1111] text-[12px] px-2 border-r border-[#cdcdcd] outline-none",
								children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: ph,
								className: "flex-1 px-3 text-[14px] text-[#0f1111] bg-white outline-none min-w-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5 text-[#0f1111]" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "hidden lg:flex items-center gap-1 px-2 py-1 text-[14px] font-bold hover:outline hover:outline-1 hover:outline-white rounded-sm shrink-0",
						children: ["🇮🇳 EN ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3 h-3" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative shrink-0",
						onMouseEnter: () => setAcctOpen(true),
						onMouseLeave: () => setAcctOpen(false),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "text-left px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[12px]",
								children: ["Hello, ", userProfile.name.split(" ")[0]]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[14px] font-bold flex items-center gap-0.5",
								children: ["Account & Lists ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3 h-3" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: acctOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scaleY: .95,
								y: -4
							},
							animate: {
								opacity: 1,
								scaleY: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								scaleY: .95
							},
							transition: { duration: .15 },
							style: { transformOrigin: "top" },
							className: "absolute right-0 top-full bg-white text-[#0f1111] shadow-2xl border border-[#d5d9d9] rounded-sm w-64 z-50 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[13px] font-semibold mb-2",
									children: "Your Account"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/profile",
									className: "block py-1 text-[13px] az-link",
									children: "Your Profile"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/tracking/$orderId",
									params: { orderId: "demo-order" },
									className: "block py-1 text-[13px] az-link",
									children: "Your Orders"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/pulse",
									className: "block py-1 text-[13px] az-link",
									children: "Your Predictive Pulse"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/eco-impact",
									className: "block py-1 text-[13px] az-link",
									children: "Your Eco Impact"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-[13px] az-link",
									children: "Sign Out"
								})
							]
						}) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/tracking/$orderId",
						params: { orderId: "demo-order" },
						className: "hidden md:block text-left px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm leading-tight shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px]",
							children: "Returns"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[14px] font-bold",
							children: "& Orders"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cart",
						className: "flex items-end gap-1 px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm relative shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-8 h-8" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								initial: { scale: .6 },
								animate: { scale: 1 },
								transition: {
									type: "spring",
									stiffness: 400,
									damping: 18
								},
								className: "absolute -top-1 left-5 bg-[#ff9900] text-[#131921] text-[13px] font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1",
								children: cartCount
							}, cartCount)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[14px] font-bold pb-1",
							children: "Cart"
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-[#232f3e] text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-[1500px] mx-auto flex items-center px-2 h-[40px] gap-1 text-[14px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setMenuOpen(true),
					className: "flex items-center gap-1 px-3 py-2 font-bold hover:outline hover:outline-1 hover:outline-white rounded-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-5 h-5" }), " All"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "flex items-center gap-0 overflow-x-auto flex-1 relative",
					children: NAV_LINKS.map((l) => {
						const active = isActive(l.to);
						const onClick = l.to === "/crisis" ? (e) => {
							e.preventDefault();
							openCrisisTriage();
						} : void 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: l.to,
							onClick,
							className: `relative px-3 py-2 whitespace-nowrap rounded-sm transition-colors duration-150 ${active ? "text-[#ff9900] font-semibold" : "hover:text-[#febd69]"}`,
							children: [l.label, active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "navIndicator",
								className: "absolute left-2 right-2 bottom-0 h-[2px] bg-[#ff9900] rounded",
								transition: {
									type: "spring",
									stiffness: 380,
									damping: 30
								}
							})]
						}, l.label);
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			className: "fixed inset-0 z-[100] bg-black/40",
			onClick: () => setMenuOpen(false),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { x: "-100%" },
				animate: { x: 0 },
				exit: { x: "-100%" },
				transition: {
					duration: .25,
					ease: "easeOut"
				},
				className: "bg-white h-full w-[360px] max-w-[90vw] overflow-y-auto",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-[#232f3e] text-white px-5 py-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-bold text-lg",
							children: ["Hello, ", userProfile.name.split(" ")[0]]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setMenuOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-6 h-6" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MegaSection, {
						title: "Now Intelligence",
						items: [
							{
								label: "AI Council",
								to: "/results"
							},
							{
								label: "Predictive Pulse",
								to: "/pulse"
							},
							{
								label: "Fridge Whisperer",
								to: "/fridge-whisperer"
							},
							{
								label: "Voice Mode",
								to: "/voice"
							},
							{
								label: "Chat Shopping",
								to: "/chat"
							}
						],
						onClose: () => setMenuOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MegaSection, {
						title: "Shop by Need",
						items: [{
							label: "Daily Restock",
							to: "/results"
						}, {
							label: "Eco Impact",
							to: "/eco-impact"
						}],
						onClose: () => setMenuOpen(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MegaSection, {
						title: "Programs & Features",
						items: [{
							label: "Group Carts & Split Pay",
							to: "/group/demo"
						}, {
							label: "Profile",
							to: "/profile"
						}],
						onClose: () => setMenuOpen(false)
					})
				]
			})
		}) })
	] });
}
function MegaSection({ title, items, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-b border-[#d5d9d9] py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5 text-[16px] font-bold mb-2",
			children: title
		}), items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: i.to,
			onClick: onClose,
			className: "block px-5 py-2 text-[14px] hover:bg-[#eaedf3]",
			children: i.label
		}, i.label))]
	});
}
var COLS = [
	{
		title: "Get to Know Now",
		links: [
			"About Now",
			"How It Works",
			"Careers",
			"Press"
		]
	},
	{
		title: "Connect With Now",
		links: [
			"AI Council Explained",
			"Predictive Pulse Guide",
			"Fridge Whisperer Guide",
			"Voice Mode Guide"
		]
	},
	{
		title: "Now for Households",
		links: [
			"Group Carts & Split Pay",
			"Crisis Mode",
			"Eco Impact Program",
			"Household Patterns"
		]
	},
	{
		title: "Let Us Help You",
		links: [
			"Your Account",
			"Your Orders",
			"Returns & Replacements",
			"Help & FAQ"
		]
	}
];
var MEGA = [
	["Now Music", "Stream millions of songs"],
	["Now Web Services", "Cloud computing"],
	["Now for Business", "Bulk shopping for offices"],
	["Now Devices", "Smart home gear"],
	["Now Fresh", "Grocery delivery"],
	["Now Care", "Same-day pharmacy"],
	["Now Pay", "Wallet & UPI"],
	["Now Studios", "Original content"],
	["Now Outlet", "Clearance deals"],
	["Now Kids", "Subscription boxes"],
	["Now Garage", "Auto parts"],
	["Now Outdoors", "Camping & travel"]
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => window.scrollTo({
					top: 0,
					behavior: "smooth"
				}),
				className: "w-full bg-[#37475a] hover:bg-[#485769] text-white text-[13px] py-3 text-center",
				children: "Back to top"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#232f3e] text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-12",
					children: COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-bold text-[16px] mb-3",
						children: c.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							className: "text-[#dddddd] hover:underline text-[13px] cursor-pointer",
							children: l
						}) }, l))
					})] }, c.title))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-white/20",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[1500px] mx-auto py-8 flex flex-col items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 text-[12px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "border border-white/40 px-3 py-1.5 rounded-sm hover:border-white",
									children: "English ▾"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "border border-white/40 px-3 py-1.5 rounded-sm hover:border-white",
									children: "₹ INR — Indian Rupee ▾"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "border border-white/40 px-3 py-1.5 rounded-sm hover:border-white",
									children: "🇮🇳 India ▾"
								})
							]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-[#0f1111] text-[#999] py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4 px-8 text-[11px]",
					children: MEGA.map(([t, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-white text-[13px]",
						children: t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: d })] }, t))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[1500px] mx-auto mt-8 px-8 text-center text-[11px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-center gap-5 mb-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "hover:underline cursor-pointer",
								children: "Conditions of Use"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "hover:underline cursor-pointer",
								children: "Privacy Notice"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								className: "hover:underline cursor-pointer",
								children: "Your Ads Privacy Choices"
							})
						]
					}), "© 2026 Now (HackOn with Amazon Season 6.0 — Concept Project)"]
				})]
			})
		]
	});
}
function imageFor(keyword, size = 400) {
	const slug = (keyword || "product").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "product";
	let h = 0;
	for (let i = 0; i < slug.length; i++) h = h * 31 + slug.charCodeAt(i) >>> 0;
	return `https://loremflickr.com/${size}/${size}/${encodeURIComponent(slug)}?lock=${h % 1e5}`;
}
function fallbackImage(seed, size = 400) {
	let h = 0;
	for (let i = 0; i < seed.length; i++) h = h * 31 + seed.charCodeAt(i) >>> 0;
	return `https://picsum.photos/seed/${h % 1e5}/${size}/${size}`;
}
function ProductImage({ keyword, seed, size = 400, className, alt }) {
	const [errored, setErrored] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: errored ? fallbackImage(seed || keyword, size) : imageFor(keyword, size),
		alt: alt || keyword,
		loading: "lazy",
		onError: () => setErrored(true),
		className,
		draggable: false
	});
}
function ProductDetailModal() {
	const product = useStore((s) => s.productDetailFor);
	const close = useStore((s) => s.closeProductDetail);
	const addCart = useStore((s) => s.addCartItem);
	const cartItems = useStore((s) => s.cartItems);
	const [qty, setQty] = (0, import_react.useState)(1);
	const [added, setAdded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setQty(1);
		setAdded(false);
	}, [product?.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: product && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
		onClick: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			transition: { duration: .18 },
			className: "bg-white rounded-lg max-w-[600px] w-full max-h-[90vh] overflow-y-auto relative shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: close,
					className: "absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-[#f3f3f3] flex items-center justify-center shadow z-10",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-[300px] bg-[#f3f3f3] overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
						keyword: product.imageKeyword,
						seed: product.id,
						size: 1024,
						className: "w-full h-full object-cover",
						alt: product.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[22px] font-bold leading-tight",
							children: product.name
						}), product.brand && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[12px] text-[#565959] mt-0.5",
							children: ["Brand: ", product.brand]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[26px] font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
										className: "text-[14px]",
										children: "₹"
									}), product.price]
								}),
								product.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[14px] text-[#565959] line-through",
									children: ["M.R.P: ₹", product.originalPrice]
								}),
								product.discountPercent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-0.5 rounded",
									children: [
										"-",
										product.discountPercent,
										"%"
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex text-[#ffa41c]",
								children: [[
									1,
									2,
									3,
									4
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 fill-current" }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 fill-current opacity-50" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[#007185] ml-1",
								children: "(231 ratings)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
							id: product.id,
							name: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BundleRow, { name: product.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reviews, {
							id: product.id,
							name: product.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 pt-3 border-t border-[#d5d9d9]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center border border-[#d5d9d9] rounded",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => Math.max(1, q - 1)),
										className: "px-3 py-2 hover:bg-[#f3f3f3]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "w-4 h-4" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "px-4 text-[15px] font-semibold",
										children: qty
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setQty((q) => q + 1),
										className: "px-3 py-2 hover:bg-[#f3f3f3]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									addCart({
										...product,
										quantity: qty
									});
									setAdded(true);
									setTimeout(() => setAdded(false), 1100);
								},
								className: "btn-az-yellow flex-1 py-2.5 font-semibold flex items-center justify-center gap-2",
								children: added ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), " Added ✓"] }) : "Add to Cart"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[11px] text-[#565959]",
							children: [cartItems.length, " items currently in your cart"]
						})
					]
				})
			]
		})
	}) });
}
function Description({ id, name }) {
	const meta = metaFor(id, name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: "font-semibold text-[14px] mb-1",
		children: "About this item"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[13px] text-[#0f1111] leading-relaxed",
		children: meta.description
	})] });
}
function BundleRow({ name }) {
	const addCart = useStore((s) => s.addCartItem);
	const partners = bundlesFor(name);
	if (partners.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-[#d5d9d9] pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold text-[14px] mb-2",
			children: "Often bought with this"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-2 overflow-x-auto pb-1",
			children: partners.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-[140px] border border-[#d5d9d9] rounded p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square rounded overflow-hidden bg-[#f3f3f3] mb-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
							keyword: keywordForName(p),
							seed: `bundle-${p}`,
							size: 200,
							className: "w-full h-full object-cover",
							alt: p
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] line-clamp-2 leading-tight h-8",
						children: p
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => addCart({
							id: `bundle-${name}-${i}`,
							name: p,
							price: 99 + i * 30,
							imageKeyword: keywordForName(p),
							reasoning: `Bundled with ${name}`
						}),
						className: "btn-az-yellow w-full mt-1 text-[11px]",
						children: "Add"
					})
				]
			}, p))
		})]
	});
}
function Reviews({ id, name }) {
	const meta = metaFor(id, name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-[#d5d9d9] pt-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "font-semibold text-[14px] mb-2",
			children: "Customer reviews"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: meta.reviews.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: r.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex text-[#ffa41c]",
							children: [
								1,
								2,
								3,
								4,
								5
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `w-3 h-3 ${n <= r.rating ? "fill-current" : "opacity-30"}` }, n))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[#565959]",
							children: ["· ", r.date]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[#0f1111] mt-0.5",
					children: r.text
				})]
			}, i))
		})]
	});
}
function AddressSelector() {
	const open = useStore((s) => s.addressSelectorOpen);
	const close = useStore((s) => s.closeAddressSelector);
	const addresses = useStore((s) => s.addresses);
	const selectedId = useStore((s) => s.selectedAddressId);
	const setSelected = useStore((s) => s.setSelectedAddress);
	const openAdd = useStore((s) => s.openAddAddress);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[180] bg-black/40 flex items-start justify-center p-4 pt-24",
		onClick: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: -10,
				scale: .98
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .98
			},
			transition: { duration: .15 },
			className: "bg-white rounded-md shadow-2xl w-[420px] max-w-full p-4",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-3 pb-2 border-b border-[#d5d9d9]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-5 h-5 text-[#007185]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-bold text-[15px]",
						children: "Choose a delivery address"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 max-h-[60vh] overflow-y-auto",
					children: addresses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							setSelected(a.id);
							close();
						},
						className: `w-full text-left border rounded p-3 hover:border-[#ff9900] transition ${selectedId === a.id ? "border-[#ff9900] bg-[#fff8ed]" : "border-[#d5d9d9]"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-[14px]",
									children: a.label
								}), selectedId === a.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-[#007600]" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[12px] text-[#565959]",
								children: a.fullName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[12px] text-[#565959]",
								children: [
									a.line1,
									", ",
									a.cityStateZip
								]
							})
						]
					}) }, a.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => openAdd(),
					className: "mt-3 w-full border border-dashed border-[#d5d9d9] rounded p-3 text-[13px] text-[#007185] hover:bg-[#f3f3f3] flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" }), " Add a new address"]
				})
			]
		})
	}) });
}
function AddAddressModal() {
	const open = useStore((s) => s.addAddressOpen);
	const close = useStore((s) => s.closeAddAddress);
	const editId = useStore((s) => s.editAddressId);
	const addresses = useStore((s) => s.addresses);
	const add = useStore((s) => s.addAddress);
	const update = useStore((s) => s.updateAddress);
	const editing = editId ? addresses.find((a) => a.id === editId) : void 0;
	const [label, setLabel] = (0, import_react.useState)("");
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [line1, setLine1] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [touched, setTouched] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) {
			setLabel(editing?.label || "");
			setFullName(editing?.fullName || "");
			setLine1(editing?.line1 || "");
			setCity(editing?.cityStateZip || "");
			setTouched(false);
		}
	}, [open, editing]);
	function save() {
		setTouched(true);
		if (!label || !fullName || !line1 || !city) return;
		if (editing) update(editing.id, {
			label,
			fullName,
			line1,
			cityStateZip: city
		});
		else add({
			label,
			fullName,
			line1,
			cityStateZip: city
		});
		close();
	}
	const missing = (v) => touched && !v;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[210] bg-black/50 flex items-center justify-center p-4",
		onClick: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			transition: { duration: .15 },
			className: "bg-white rounded-lg w-[440px] max-w-full p-5 shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-[16px]",
						children: editing ? "Edit address" : "Add a new address"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: close,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-[13px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Label (Home / Work / Other)",
							value: label,
							onChange: setLabel,
							error: missing(label)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full name",
							value: fullName,
							onChange: setFullName,
							error: missing(fullName)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Address line",
							value: line1,
							onChange: setLine1,
							error: missing(line1)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City, State, Pincode",
							value: city,
							onChange: setCity,
							error: missing(city)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: save,
					className: "btn-az-yellow w-full mt-4 py-2.5 font-semibold",
					children: "Save address"
				})
			]
		})
	}) });
}
function Field({ label, value, onChange, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[12px] text-[#565959] mb-1",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (e) => onChange(e.target.value),
				className: `w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#ff9900] ${error ? "border-[#b12704] bg-[#fff8f8]" : "border-[#d5d9d9]"}`
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] text-[#b12704] mt-1",
				children: "Required"
			})
		]
	});
}
var CARDS = [
	{
		type: "power_cut",
		title: "Power Cut / Outage",
		desc: "Protect perishables, stay powered",
		keyword: "power-outage-candles"
	},
	{
		type: "medical",
		title: "Medical / Someone's Unwell",
		desc: "Fever, injury, or sudden illness",
		keyword: "first-aid-kit"
	},
	{
		type: "baby",
		title: "Baby / Infant Needs",
		desc: "Diapers, formula, baby medicine",
		keyword: "baby-essentials"
	},
	{
		type: "security",
		title: "Security / Safety Concern",
		desc: "Lock, light, or safety items needed urgently",
		keyword: "door-lock-security"
	},
	{
		type: "natural_event",
		title: "Natural Event Prep",
		desc: "Storm, flood, or heatwave incoming",
		keyword: "storm-preparation"
	}
];
function CrisisTriageModal() {
	const open = useStore((s) => s.crisisTriageOpen);
	const close = useStore((s) => s.closeCrisisTriage);
	const setCrisis = useStore((s) => s.setCrisisType);
	const navigate = useNavigate();
	const [customMode, setCustomMode] = (0, import_react.useState)(false);
	const [customText, setCustomText] = (0, import_react.useState)("");
	function select(t, custom) {
		setCrisis(t, custom);
		close();
		setCustomMode(false);
		setCustomText("");
		navigate({ to: "/crisis" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[220] bg-black/60 flex items-center justify-center p-4",
		onClick: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .95
			},
			transition: { duration: .18 },
			className: "bg-white rounded-lg w-[520px] max-w-full max-h-[90vh] overflow-y-auto border-t-4 border-t-[#b12704] shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5 text-[#b12704]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[18px] font-bold",
						children: "What's the situation?"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: close,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-5 h-5" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pb-5 grid grid-cols-2 gap-3",
				children: [CARDS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => select(c.type),
					className: "text-left border border-[#d5d9d9] hover:border-[#b12704] hover:bg-[#fff5f3] rounded-lg p-3 transition",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-video rounded overflow-hidden mb-2 bg-[#f3f3f3]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
								keyword: c.keyword,
								seed: c.type,
								size: 300,
								className: "w-full h-full object-cover",
								alt: c.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-[13px] leading-tight",
							children: c.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-[#565959] leading-tight mt-0.5",
							children: c.desc
						})
					]
				}, c.type)), !customMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setCustomMode(true),
					className: "text-left border border-dashed border-[#d5d9d9] hover:border-[#b12704] hover:bg-[#fff5f3] rounded-lg p-3 transition flex flex-col items-center justify-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl mb-1",
							children: "✍️"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-[13px]",
							children: "Something Else"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] text-[#565959]",
							children: "Describe your own situation"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-span-2 border border-[#b12704] rounded-lg p-3 bg-[#fff5f3]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13px] font-semibold mb-2",
							children: "Describe what's happening"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							autoFocus: true,
							value: customText,
							onChange: (e) => setCustomText(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && customText.trim()) select("custom", customText.trim());
							},
							placeholder: "e.g., my pipe burst...",
							className: "w-full border border-[#d5d9d9] rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#b12704]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setCustomMode(false),
								className: "text-[12px] az-link",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: !customText.trim(),
								onClick: () => select("custom", customText.trim()),
								className: "btn-az-yellow ml-auto px-3 py-1.5 text-[12px] disabled:opacity-50",
								children: "Continue →"
							})]
						})
					]
				})]
			})]
		})
	}) });
}
function GlobalModals() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductDetailModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressSelector, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddAddressModal, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrisisTriageModal, {})
	] });
}
function Layout({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen flex flex-col bg-[#eaeded]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlobalModals, {})
		]
	});
}
//#endregion
export { crisisItemsFor as a, useStore as c, cartTotal as i, ProductImage as n, getDueStatus as o, bundlesFor as r, keywordForName as s, Layout as t };
