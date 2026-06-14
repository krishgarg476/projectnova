import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { u as Send, y as MessageCircle } from "../_libs/lucide-react.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chat-Dd_0JViS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function chipsForQuery(q) {
	const l = q.toLowerCase();
	if (/maggi|noodles|cooking/.test(l)) return [
		{
			name: "Maggi Noodles (2-pack)",
			price: 48,
			imageKeyword: "maggi-noodles"
		},
		{
			name: "Onion 1kg",
			price: 40,
			imageKeyword: "onion"
		},
		{
			name: "Tomato 500g",
			price: 30,
			imageKeyword: "tomato"
		},
		{
			name: "Extra Masala Sachet",
			price: 10,
			imageKeyword: "spice-sachet"
		}
	];
	if (/sick|fever|unwell|cold/.test(l)) return [
		{
			name: "ORS Hydration Sachets",
			price: 120,
			imageKeyword: "ors-sachet"
		},
		{
			name: "Paracetamol 500mg",
			price: 35,
			imageKeyword: "paracetamol"
		},
		{
			name: "Real Fruit Juice 1L",
			price: 130,
			imageKeyword: "fruit-juice"
		}
	];
	if (/week|restock|grocer|household/.test(l)) return [
		{
			name: "Amul Milk 2L",
			price: 128,
			imageKeyword: "milk-carton"
		},
		{
			name: "Lactose-Free Almond Milk 1L",
			price: 220,
			imageKeyword: "almond-milk"
		},
		{
			name: "Basmati Rice 5kg",
			price: 549,
			imageKeyword: "basmati-rice"
		},
		{
			name: "Toor Dal 1kg",
			price: 169,
			imageKeyword: "toor-dal"
		},
		{
			name: "Mixed Vegetables 2kg",
			price: 280,
			imageKeyword: "mixed-vegetables"
		}
	];
	return [{
		name: "Quick Snack Pack",
		price: 199,
		imageKeyword: "snack-pack"
	}, {
		name: "Cold Drink 1L",
		price: 80,
		imageKeyword: "cold-drink"
	}];
}
var SEED = [
	{
		id: "u1",
		role: "user",
		text: "Need maggi ingredients"
	},
	{
		id: "a1",
		role: "ai",
		text: "Got it! Here's what you'll need:",
		chips: chipsForQuery("maggi")
	},
	{
		id: "u2",
		role: "user",
		text: "Feeling sick — what should I get?"
	},
	{
		id: "a2",
		role: "ai",
		text: "Sorry to hear. Here are wellness essentials:",
		chips: chipsForQuery("sick")
	},
	{
		id: "u3",
		role: "user",
		text: "Weekly grocery restock for the family"
	},
	{
		id: "a3",
		role: "ai",
		text: "Here's a full household restock for your family of 4 — includes a lactose-free option for your household profile:",
		chips: chipsForQuery("weekly restock")
	}
];
function ChatPage() {
	const [msgs, setMsgs] = (0, import_react.useState)(SEED);
	const [text, setText] = (0, import_react.useState)("");
	const [typing, setTyping] = (0, import_react.useState)(false);
	const addCart = useStore((s) => s.addCartItem);
	const endRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [msgs, typing]);
	function send() {
		const q = text.trim();
		if (!q) return;
		const uId = `u-${Date.now()}`;
		setMsgs((m) => [...m, {
			id: uId,
			role: "user",
			text: q
		}]);
		setText("");
		setTyping(true);
		setTimeout(() => {
			setTyping(false);
			setMsgs((m) => [...m, {
				id: `a-${Date.now()}`,
				role: "ai",
				text: "Here's what I found:",
				chips: chipsForQuery(q)
			}]);
		}, 1e3);
	}
	function addAll(msgId, chips) {
		if (!chips) return;
		chips.forEach((c, i) => addCart({
			id: `${msgId}-${i}`,
			name: c.name,
			price: c.price,
			imageKeyword: c.imageKeyword,
			reasoning: "Added from chat"
		}));
		setMsgs((m) => m.map((x) => x.id === msgId ? {
			...x,
			added: true
		} : x));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-[760px] mx-auto px-4 py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "az-card flex flex-col h-[75vh]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-[#d5d9d9] p-3 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-5 h-5 text-[#5848bc]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold",
							children: "Chat Shopping"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto text-[12px] text-[#565959]",
							children: "Now AI · Always on"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafafa]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [msgs.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						layout: true,
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `max-w-[75%] rounded-lg p-3 text-[13px] ${m.role === "user" ? "bg-[#dcf8c6] text-[#0f1111]" : "bg-white border border-[#d5d9d9]"}`,
							children: [m.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: m.text }), m.chips && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 space-y-1",
								children: [m.chips.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 bg-[#f3f3f3] rounded px-2 py-1 text-[12px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#007600]",
											children: "✓"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1",
											children: c.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] text-[#565959]",
											children: ["₹", c.price]
										})
									]
								}, i)), !m.added ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => addAll(m.id, m.chips),
									className: "btn-az-yellow w-full mt-2 text-[12px]",
									children: "Add all to cart →"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[12px] text-[#007600] font-semibold mt-1",
									children: "Added to cart ✓"
								})]
							})]
						})
					}, m.id)), typing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-white border border-[#d5d9d9] rounded-lg p-3 flex gap-1",
							children: [
								0,
								1,
								2
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
								animate: { y: [
									0,
									-4,
									0
								] },
								transition: {
									duration: .8,
									repeat: Infinity,
									delay: i * .15
								},
								className: "w-2 h-2 rounded-full bg-[#5848bc]"
							}, i))
						})
					}, "typing")] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: endRef })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (e) => {
						e.preventDefault();
						send();
					},
					className: "border-t border-[#d5d9d9] p-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: text,
						onChange: (e) => setText(e.target.value),
						placeholder: "Type your situation or what you need...",
						className: "flex-1 border border-[#d5d9d9] rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#ff9900]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-az-orange px-4 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4" })
					})]
				})
			]
		})
	}) });
}
//#endregion
export { ChatPage as component };
