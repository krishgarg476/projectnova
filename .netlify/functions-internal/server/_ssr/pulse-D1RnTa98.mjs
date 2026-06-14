import { f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
import { c as ResponsiveContainer, i as XAxis, o as Bar, r as YAxis, s as Cell, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pulse-D1RnTa98.js
var import_jsx_runtime = require_jsx_runtime();
var WEEK = [
	{
		d: "Mon",
		v: 32
	},
	{
		d: "Tue",
		v: 45
	},
	{
		d: "Wed",
		v: 28
	},
	{
		d: "Thu",
		v: 60
	},
	{
		d: "Fri",
		v: 88
	},
	{
		d: "Sat",
		v: 72
	},
	{
		d: "Sun",
		v: 50
	}
];
var TIMELINE = [
	{
		time: "7:00 PM",
		title: "Snack Run",
		emoji: "🍿",
		conf: 87,
		reason: "You order snacks 9/10 Fridays at this time.",
		query: "snacks for tonight"
	},
	{
		time: "9:30 PM",
		title: "Late Dinner",
		emoji: "🍜",
		conf: 73,
		reason: "Light dinner pattern on Fridays.",
		query: "late dinner, quick"
	},
	{
		time: "8:00 AM",
		title: "Milk & Bread Restock",
		emoji: "🥛",
		conf: 94,
		reason: "Weekend morning staples — predicted to run out.",
		query: "milk bread restock"
	},
	{
		time: "11:30 AM",
		title: "Weekend Brunch Supplies",
		emoji: "🥑",
		conf: 68,
		reason: "Saturday brunch detected in last 4 weeks.",
		query: "brunch supplies"
	}
];
function PulsePage() {
	const navigate = useNavigate();
	const generate = useStore((s) => s.generateResults);
	async function prep(q) {
		await generate(q);
		navigate({ to: "/results" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[22px] font-bold",
					children: "Predictive Pulse"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] text-[#565959]",
					children: "Now learns your patterns and prepares carts before you need them."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-[16px] mb-3",
					children: "Your activity pattern this week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: WEEK,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, { dataKey: "d" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "v",
									radius: [
										4,
										4,
										0,
										0
									],
									children: WEEK.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: e.d === "Fri" ? "#ff9900" : "#d5d9d9" }, i))
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-[16px] mb-4",
					children: "Next 24 hours — predicted needs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "relative border-l-2 border-[#5848bc]/30 ml-4 space-y-6",
					children: TIMELINE.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
						initial: {
							opacity: 0,
							x: -20
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						viewport: { once: true },
						transition: { delay: i * .15 },
						className: "ml-6 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "absolute -left-[34px] w-6 h-6 rounded-full bg-[#5848bc] text-white text-sm flex items-center justify-center font-bold",
							children: i + 1
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "az-card p-4 flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-4xl",
									children: t.emoji
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-[15px]",
												children: t.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[12px] text-[#565959]",
												children: ["— ", t.time]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ai-badge",
												children: [t.conf, "% likely"]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[13px] text-[#565959]",
										children: t.reason
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => prep(t.query),
									className: "btn-az-orange px-4 py-2 text-[13px] font-semibold whitespace-nowrap",
									children: "Prep this cart →"
								})
							]
						})]
					}, t.time))
				})]
			})
		]
	}) });
}
//#endregion
export { PulsePage as component };
