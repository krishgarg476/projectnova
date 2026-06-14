import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as crisisItemsFor, c as useStore, i as cartTotal, n as ProductImage, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { i as TriangleAlert, t as Zap } from "../_libs/lucide-react.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crisis-y9kjOPty.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LABELS = {
	power_cut: "Power Cut",
	medical: "Medical Emergency",
	baby: "Baby Needs",
	security: "Security Concern",
	natural_event: "Severe Weather",
	custom: "Your Situation"
};
function CrisisPage() {
	const { crisisType, crisisCustomText, openCrisisTriage, placeOrder, setCheckoutSource } = useStore();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!crisisType) openCrisisTriage();
	}, [crisisType]);
	if (!crisisType) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-12 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "az-card p-8 max-w-md mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-12 h-12 mx-auto text-[#b12704]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[20px] font-bold mt-3",
					children: "Choose your situation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] text-[#565959] mt-2",
					children: "Pick the crisis type to see tailored essentials."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: openCrisisTriage,
					className: "btn-az-orange px-6 py-2 mt-4 font-semibold",
					children: "Open Triage →"
				})
			]
		})
	}) });
	const items = crisisItemsFor(crisisType, crisisCustomText);
	const total = cartTotal(items);
	const label = crisisType === "custom" ? crisisCustomText || "Your Situation" : LABELS[crisisType];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "az-card border-l-4 border-l-[#b12704] p-4 flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "w-6 h-6 text-[#b12704]" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold text-[16px] text-[#b12704]",
						children: [
							"🚨 Crisis Mode — ",
							label,
							" — showing the fastest essentials for this."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13px] text-[#565959]",
						children: "Filters, alternatives, and reasoning are minimized. Speed first."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: openCrisisTriage,
					className: "az-link text-[13px]",
					children: "Change situation"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/results",
					className: "az-link text-[13px]",
					children: "Full results →"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "popLayout",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							layout: true,
							initial: {
								opacity: 0,
								y: 10
							},
							animate: {
								opacity: 1,
								y: 0
							},
							className: "az-card p-4 relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute top-2 right-2 bg-[#b12704] text-white text-[11px] font-bold px-2 py-1 rounded",
									children: [
										"ETA: ",
										it.etaMinutes,
										" min"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-square bg-[#f3f3f3] rounded overflow-hidden mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
										keyword: it.imageKeyword,
										seed: it.id,
										size: 400,
										className: "w-full h-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-[15px]",
									children: it.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[20px] font-bold mt-1",
									children: ["₹", it.price]
								}),
								it.crisisReason && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-2 text-[11px] font-semibold bg-[#fde2e0] text-[#b12704] border border-[#b12704]/30 px-2 py-1 rounded inline-block",
									children: it.crisisReason
								})
							]
						}, it.id))
					}, crisisType + crisisCustomText)
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-4 h-fit space-y-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5 space-y-3 border-l-4 border-l-[#b12704]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[14px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"Total (",
								items.length,
								" items)"
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold",
								children: ["₹", total]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] text-[#565959]",
							children: "Billed automatically to your saved UPI."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setCheckoutSource("personal");
								navigate({
									to: "/tracking/$orderId",
									params: { orderId: placeOrder() || `NOW-2026-${Math.floor(1e4 + Math.random() * 89999)}` }
								});
							},
							className: "w-full py-3 bg-[#b12704] hover:bg-[#8f1f03] text-white rounded font-bold flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-5 h-5" }), " Confirm & Send Now"]
						})
					]
				})
			})]
		})]
	}) });
}
//#endregion
export { CrisisPage as component };
