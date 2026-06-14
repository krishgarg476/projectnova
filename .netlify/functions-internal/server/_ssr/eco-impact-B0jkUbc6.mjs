import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Layout } from "./Layout-BSXXmDwm.mjs";
import { T as Leaf, k as Flame } from "../_libs/lucide-react.mjs";
import { a as Line, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, r as YAxis } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/eco-impact-B0jkUbc6.js
var import_jsx_runtime = require_jsx_runtime();
var WEEKLY = [
	{
		w: "Wk 1",
		co2: .4
	},
	{
		w: "Wk 2",
		co2: .7
	},
	{
		w: "Wk 3",
		co2: .9
	},
	{
		w: "Wk 4",
		co2: 1.2
	}
];
var BUNDLED = [
	{
		date: "June 10",
		items: "Bundled 3 items",
		saved: "0.3 kg"
	},
	{
		date: "June 6",
		items: "Bundled 4 items",
		saved: "0.4 kg"
	},
	{
		date: "May 30",
		items: "Bundled 2 items",
		saved: "0.15 kg"
	},
	{
		date: "May 24",
		items: "Bundled 5 items",
		saved: "0.5 kg"
	},
	{
		date: "May 18",
		items: "Bundled 3 items",
		saved: "0.25 kg"
	}
];
var TIPS = [
	"Choose 'Standard' delivery when you're not in a rush to reduce trips.",
	"Reusable packaging items are marked with a 🌱 badge across Now.",
	"Bundling 4+ items in one delivery cuts emissions by ~40% per item.",
	"Refill packs use 60% less plastic than fresh bottles — look for them."
];
function EcoImpactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-48 h-48 mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						viewBox: "0 0 36 36",
						className: "w-48 h-48 -rotate-90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "18",
							cy: "18",
							r: "14",
							fill: "none",
							stroke: "#eee",
							strokeWidth: "3.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "18",
							cy: "18",
							r: "14",
							fill: "none",
							stroke: "#007600",
							strokeWidth: "3.5",
							strokeDasharray: "88",
							strokeDashoffset: "22",
							strokeLinecap: "round"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 flex flex-col items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[36px] font-bold text-[#007600]",
							children: "1.2 kg"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] text-[#565959]",
							children: "CO₂ saved this month"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-[26px] font-bold flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "w-6 h-6 text-[#007600]" }), " Your Green Path"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] text-[#565959] mt-2",
					children: "Equivalent to planting 0.3 trees 🌳. Keep bundling deliveries to grow your impact."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-[16px] mb-3",
						children: "Weekly trend"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-56",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
								data: WEEKLY,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, { dataKey: "w" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
										type: "monotone",
										dataKey: "co2",
										stroke: "#007600",
										strokeWidth: 3,
										dot: {
											r: 5,
											fill: "#007600"
										}
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-bold text-[16px] mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "w-5 h-5 text-[#ff9900]" }), " 4-week green streak"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 mt-3",
							children: [
								1,
								2,
								3,
								4
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 aspect-square rounded bg-[#e6f4ea] flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "w-6 h-6 text-[#007600]" })
							}, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-[#565959] mt-3",
							children: "You've consolidated deliveries every week this month. One more week to unlock the \"Eco Champion\" badge."
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-[16px] mb-3",
					children: "Bundled deliveries (last 5)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-[#d5d9d9] text-[13px]",
					children: BUNDLED.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-2 flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							b.date,
							" — ",
							b.items
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[#007600] font-semibold",
							children: ["saved ", b.saved]
						})]
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-[16px] mb-3",
					children: "Eco tips"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-[13px]",
					children: TIPS.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "w-4 h-4 text-[#007600] shrink-0 mt-0.5" }), t]
					}, i))
				})]
			})
		]
	}) });
}
//#endregion
export { EcoImpactPage as component };
