import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, i as cartTotal, n as ProductImage, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { C as LoaderCircle, I as Check, O as HeartPulse, R as Brain, i as TriangleAlert, p as Plus, t as Zap } from "../_libs/lucide-react.mjs";
import { a as AnimatePresence, i as LayoutGroup, r as motion } from "../_libs/framer-motion.mjs";
import { t as ProductCard } from "./ProductCard-V1PP3TH5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/results-Cg06RZq2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	{
		key: "veg",
		label: "Vegetarian only"
	},
	{
		key: "budget",
		label: "Budget-friendly"
	},
	{
		key: "fast",
		label: "Fastest delivery only"
	},
	{
		key: "eco",
		label: "Eco-friendly picks"
	}
];
var SORTS = [
	{
		key: "ai",
		label: "AI Recommended"
	},
	{
		key: "fast",
		label: "Fastest Arrival"
	},
	{
		key: "value",
		label: "Best Value"
	},
	{
		key: "relevant",
		label: "Most Relevant"
	},
	{
		key: "eco",
		label: "Eco-Friendly"
	}
];
function ResultsPage() {
	const { searchQuery, agentVerdicts, cartItems, skippedItems, urgencyLevel, addSkippedItem, generateResults, addCartItem, isGenerating } = useStore();
	const [step, setStep] = (0, import_react.useState)(0);
	const [filters, setFilters] = (0, import_react.useState)({
		veg: false,
		budget: false,
		fast: false,
		eco: false
	});
	const [sort, setSort] = (0, import_react.useState)("ai");
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!searchQuery) generateResults("daily restock");
	}, []);
	(0, import_react.useEffect)(() => {
		if (isGenerating) setStep(-1);
		else {
			setStep(0);
			const t1 = setTimeout(() => setStep(1), 300);
			const t2 = setTimeout(() => setStep(2), 600);
			const t3 = setTimeout(() => setStep(3), 900);
			return () => {
				clearTimeout(t1);
				clearTimeout(t2);
				clearTimeout(t3);
			};
		}
	}, [isGenerating]);
	const filtered = (0, import_react.useMemo)(() => {
		return cartItems.filter((i) => {
			if (filters.veg && !i.isVegetarian) return false;
			if (filters.budget && i.price > 300) return false;
			if (filters.fast && i.etaMinutes > 10) return false;
			if (filters.eco && !i.isEco) return false;
			return true;
		});
	}, [cartItems, filters]);
	const sorted = (0, import_react.useMemo)(() => {
		const arr = [...filtered];
		if (sort === "fast") arr.sort((a, b) => a.etaMinutes - b.etaMinutes);
		else if (sort === "value") arr.sort((a, b) => b.discountPercent - a.discountPercent);
		else if (sort === "relevant") arr.sort((a, b) => b.relevanceScore - a.relevanceScore);
		else if (sort === "eco") arr.sort((a, b) => Number(b.isEco) - Number(a.isEco));
		return arr;
	}, [filtered, sort]);
	const AGENTS = [
		{
			key: "speed",
			icon: Zap,
			name: "Speed Agent",
			color: "#ff9900",
			verdict: agentVerdicts.speed
		},
		{
			key: "context",
			icon: Brain,
			name: "Context Agent",
			color: "#5848bc",
			verdict: agentVerdicts.context
		},
		{
			key: "health",
			icon: HeartPulse,
			name: "Health & Budget Agent",
			color: "#007600",
			verdict: agentVerdicts.health
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "az-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] text-[#565959] uppercase tracking-wide mb-1",
							children: "Now is analyzing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-[#d5d9d9] rounded p-2 bg-[#f7f7f7] text-[13px] italic",
							children: [
								"\"",
								searchQuery || "daily restock",
								"\""
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "az-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-[14px] mb-2",
							children: "AI Agents"
						}), AGENTS.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 py-1.5 text-[13px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, {
									className: "w-4 h-4",
									style: { color: a.color }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1",
									children: a.name
								}),
								step > i ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-[#007600] font-semibold",
									children: "✓ Done"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-3 h-3 animate-spin text-[#565959]" })
							]
						}, a.key))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "az-card p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-[14px] mb-2",
								children: "Refine your cart"
							}),
							FILTERS.map((f) => {
								const active = filters[f.key];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
									whileTap: { scale: .97 },
									onClick: () => setFilters((s) => ({
										...s,
										[f.key]: !s[f.key]
									})),
									className: `w-full flex items-center gap-2 px-2 py-1.5 mb-1 text-[13px] text-left rounded border transition-colors ${active ? "border-[#ff9900] bg-[#fff3e0]" : "border-transparent hover:border-[#d5d9d9] bg-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `w-4 h-4 rounded border flex items-center justify-center ${active ? "bg-[#ff9900] border-[#ff9900]" : "border-[#d5d9d9]"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
											initial: { scale: 0 },
											animate: { scale: 1 },
											exit: { scale: 0 },
											transition: {
												type: "spring",
												stiffness: 500,
												damping: 25
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3 text-white" })
										}) })
									}), f.label]
								}, f.key);
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] text-[#565959] mt-2",
								children: [
									"Showing ",
									sorted.length,
									" of ",
									cartItems.length,
									" items"
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4 min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGroup, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto pb-2 relative",
						children: SORTS.map((s) => {
							const active = sort === s.key;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSort(s.key),
								className: `relative px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-colors ${active ? "text-white" : "text-[#0f1111] border border-[#d5d9d9] hover:border-[#0f1111]"}`,
								children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									layoutId: "sortIndicator",
									className: "absolute inset-0 bg-[#0f1111] rounded-full -z-10",
									transition: {
										type: "spring",
										stiffness: 400,
										damping: 30
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative z-10",
									children: s.label
								})]
							}, s.key);
						})
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "az-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-[16px] mb-3",
							children: "AI Council Verdicts"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: AGENTS.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									x: -10
								},
								animate: step > i ? {
									opacity: 1,
									x: 0
								} : {
									opacity: .3,
									x: -10
								},
								transition: { duration: .4 },
								className: "flex items-start gap-3 p-3 rounded-md border border-[#d5d9d9]",
								style: { background: step > i ? "#fafafa" : "white" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
										style: { background: `${a.color}22` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, {
											className: `w-5 h-5 ${step <= i ? "animate-spin" : ""}`,
											style: { color: a.color }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-[13px]",
											children: a.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[13px] text-[#565959]",
											children: step > i ? a.verdict : "Analyzing..."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[11px] font-semibold px-2 py-1 rounded-full ${step > i ? "bg-[#e6f4ea] text-[#007600]" : "bg-[#f3f3f3] text-[#565959]"}`,
										children: step > i ? "Resolved ✓" : "Analyzing..."
									})
								]
							}, a.key))
						})]
					}),
					isGenerating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center py-20 text-[#565959] az-card min-h-[300px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-10 h-10 animate-spin mb-4 text-[#ff9900]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-[18px] text-[#0f1111]",
								children: "Curating products..."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[13px] mt-1",
								children: "The AI Council is debating the best items for you."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						layout: true,
						className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sorted.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layout: true,
							initial: {
								opacity: 0,
								scale: .9
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .9,
								height: 0
							},
							transition: { duration: .25 },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
								p: {
									id: it.id,
									name: it.name,
									imageKeyword: it.imageKeyword,
									price: it.price,
									originalPrice: it.originalPrice,
									reasoning: it.reasoning,
									agent: it.agentSource,
									brand: it.brand,
									isEco: it.isEco
								},
								onAdd: () => addCartItem({ ...it })
							})
						}, it.id)) })
					}),
					skippedItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "az-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-[15px] mb-3",
							children: "Considered & Skipped — Why not included?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-3 overflow-x-auto pb-2",
							children: skippedItems.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-[200px] az-card p-3 opacity-60 hover:opacity-100 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "aspect-square rounded bg-[#f3f3f3] overflow-hidden mb-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
											keyword: sk.imageKeyword,
											seed: sk.id,
											size: 200,
											className: "w-full h-full object-cover"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[13px] font-semibold line-clamp-1",
										children: sk.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-[#565959] mt-1 line-clamp-2",
										children: sk.reasoning
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => addSkippedItem(sk.id),
										className: "btn-az-yellow mt-2 w-full flex items-center justify-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3" }), " Add anyway"]
									})
								]
							}, sk.id))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:sticky lg:top-4 h-fit",
				children: [urgencyLevel === "critical" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card border-l-4 border-l-[#b12704] p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[#b12704] font-bold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-5 h-5" }), " Crisis situation detected"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] text-[#565959]",
							children: "We've spotted urgent signals. Switch to a streamlined, speed-first checkout."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({ to: "/crisis" }),
							className: "btn-az-orange w-full py-2 font-semibold",
							children: "Switch to Crisis Mode →"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[14px]",
								children: [
									"Subtotal (",
									cartItems.length,
									" items)"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[18px] font-bold",
								children: ["₹", cartTotal(cartItems)]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[12px] text-[#007600] flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3" }), " Eligible for Now Express (11 min)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({ to: "/cart" }),
							className: "btn-az-yellow w-full py-2 font-semibold",
							children: "Proceed to Cart →"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({ to: "/checkout" }),
							className: "btn-az-orange w-full py-2 font-semibold",
							children: "Buy Now"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "az-link text-[13px] block mt-3 text-center",
					children: "← Back to home"
				})]
			})
		]
	}) });
}
//#endregion
export { ResultsPage as component };
