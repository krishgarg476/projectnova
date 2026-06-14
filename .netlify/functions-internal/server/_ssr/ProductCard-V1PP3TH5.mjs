import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, n as ProductImage } from "./Layout-BSXXmDwm.mjs";
import { o as Star, p as Plus, s as Sparkles } from "../_libs/lucide-react.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-V1PP3TH5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p, onAdd, compact = false }) {
	const [showTip, setShowTip] = (0, import_react.useState)(false);
	const openProductDetail = useStore((s) => s.openProductDetail);
	const favBrands = useStore((s) => s.favoriteBrands);
	const isFavBrand = !!(p.brand && favBrands.find((b) => b.name === p.brand && b.prioritize));
	const discount = p.originalPrice ? Math.round((p.originalPrice - p.price) / p.originalPrice * 100) : 0;
	const keyword = p.imageKeyword || p.name.toLowerCase().split(" ").slice(0, 3).join("-");
	function openDetail() {
		openProductDetail({
			id: p.id,
			name: p.name,
			category: "Detail",
			quantity: 1,
			price: p.price,
			originalPrice: p.originalPrice,
			reasoning: p.reasoning || "",
			agentSource: p.agent || "context",
			imageKeyword: keyword,
			isVegetarian: true,
			isEco: p.isEco ?? false,
			etaMinutes: 11,
			discountPercent: discount,
			relevanceScore: 80,
			brand: p.brand
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		layout: true,
		className: "az-card p-3 flex flex-col gap-2 hover:shadow-md transition-shadow group relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative cursor-pointer",
				onClick: openDetail,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square rounded-md overflow-hidden bg-[#f3f3f3]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
							keyword,
							seed: p.id,
							size: 400,
							className: "w-full h-full object-cover",
							alt: p.name
						})
					}),
					discount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-1 left-1 bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm",
						children: [
							"-",
							discount,
							"%"
						]
					}),
					p.isEco && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-1 right-1 bg-[#007600] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm",
						children: "🌱 ECO"
					}),
					onAdd && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: (e) => {
							e.stopPropagation();
							onAdd();
						},
						className: "absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#c89411] flex items-center justify-center text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity",
						"aria-label": "Add to cart",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: openDetail,
				className: "text-[13px] line-clamp-2 leading-tight text-left hover:text-[#c7511f]",
				children: p.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 flex-wrap",
				children: [p.reasoning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative inline-block",
					onMouseEnter: () => setShowTip(true),
					onMouseLeave: () => setShowTip(false),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ai-badge cursor-help",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }), " Now AI"]
					}), showTip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute z-20 left-0 top-full mt-1 w-56 bg-[#0f1111] text-white text-[12px] p-2 rounded-md shadow-lg leading-snug",
						children: p.reasoning
					})]
				}), isFavBrand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-flex items-center gap-1 border border-[#ff9900] text-[#c7511f] text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
					children: "⭐ Your usual brand"
				})]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 text-[12px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex text-[#ffa41c]",
					children: [[
						1,
						2,
						3,
						4
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 fill-current" }, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3 h-3 fill-current opacity-50" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[#007185]",
					children: [
						"(",
						Math.floor(120 + parseInt(p.id.replace(/\D/g, "") || "1") * 37),
						")"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[18px] font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("sup", {
						className: "text-[12px]",
						children: "₹"
					}), p.price]
				}), p.originalPrice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[12px] text-[#565959] line-through",
					children: ["M.R.P: ₹", p.originalPrice]
				})]
			})
		]
	});
}
//#endregion
export { ProductCard as t };
