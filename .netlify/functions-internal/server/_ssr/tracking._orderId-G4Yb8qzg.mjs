import { o as __toESM } from "../_runtime.mjs";
import { p as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, n as ProductImage, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { I as Check, m as Phone, o as Star, y as MessageCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tracking._orderId-G4Yb8qzg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	"Order Confirmed",
	"Preparing",
	"Out for Delivery",
	"Delivered"
];
function TrackingPage() {
	const { orderId } = useParams({ from: "/tracking/$orderId" });
	const { lastOrderItems, lastOrderTotal } = useStore();
	const [countdown, setCountdown] = (0, import_react.useState)(28);
	const [step, setStep] = (0, import_react.useState)(0);
	const [rating, setRating] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (countdown <= 0) return;
		const t = setInterval(() => setCountdown((c) => c - 1), 1e3);
		return () => clearInterval(t);
	}, [countdown]);
	(0, import_react.useEffect)(() => {
		if (countdown <= 21 && step < 1) setStep(1);
		if (countdown <= 14 && step < 2) setStep(2);
		if (countdown <= 0 && step < 3) setStep(3);
	}, [countdown, step]);
	const items = lastOrderItems.length ? lastOrderItems : [];
	const progress = Math.min(100, (28 - countdown) / 28 * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5 space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] text-[#565959]",
							children: "Order #"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[22px] font-bold",
							children: orderId.toUpperCase()
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[12px] text-[#565959]",
								children: "Arriving in"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[28px] font-bold text-[#007600]",
								children: countdown > 0 ? `${countdown}s` : "Delivered!"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex gap-2 items-center",
						children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `flex-1 h-2 rounded-full ${i <= step ? "bg-[#007600]" : "bg-[#e0e0e0]"} relative overflow-hidden`,
								children: i === step && step < 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-white/30 animate-pulse" })
							}), i <= step && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 text-[#007600]" })]
						}, s))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-4 mt-2 text-[11px] text-[#565959]",
						children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: i <= step ? "text-[#007600] font-semibold" : "",
							children: s
						}, s))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-[16px] mb-3",
						children: "Live route"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative bg-[#e8f0d8] rounded-lg h-72 overflow-hidden",
						style: { backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 38px, #d0dec0 38px, #d0dec0 40px), repeating-linear-gradient(0deg, transparent, transparent 38px, #d0dec0 38px, #d0dec0 40px)" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute left-6 bottom-6 text-3xl",
								children: "🏪"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute right-6 top-6 text-3xl",
								children: "🏠"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								className: "absolute inset-0 w-full h-full",
								viewBox: "0 0 400 280",
								preserveAspectRatio: "none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M40,240 Q120,140 200,180 T360,40",
									stroke: "#5848bc",
									strokeWidth: "3",
									strokeDasharray: "6 4",
									fill: "none"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute text-3xl transition-all duration-1000",
								style: {
									left: `${10 + progress * .75}%`,
									top: `${75 - progress * .65}%`
								},
								children: "🛵"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-[16px] mb-3",
							children: "Delivery partner"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-14 h-14 rounded-full bg-[#ff9900] text-white flex items-center justify-center text-xl font-bold",
								children: "RK"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: "Rohit Kumar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[12px] text-[#565959]",
									children: "⭐ 4.9 · 1,240 deliveries"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "btn-az-yellow flex-1 flex items-center justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-4 h-4" }), " Call"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "btn-az-yellow flex-1 flex items-center justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-4 h-4" }), " Chat"]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-[16px] mb-3",
						children: "Order details"
					}),
					items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13px] text-[#565959]",
						children: "Demo order — no item details available."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "divide-y divide-[#d5d9d9]",
						children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "py-3 flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded overflow-hidden bg-[#f3f3f3]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
										keyword: i.imageKeyword,
										seed: i.id,
										size: 100,
										className: "w-full h-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 text-[14px]",
									children: i.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[13px] text-[#565959]",
									children: ["×", i.quantity]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[14px] font-semibold w-20 text-right",
									children: ["₹", i.price * i.quantity]
								})
							]
						}, i.id))
					}),
					lastOrderTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right font-bold text-[16px] mt-3",
						children: ["Total: ₹", lastOrderTotal]
					})
				]
			}),
			step >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-12 h-12 mx-auto text-[#007600]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[18px] font-bold mt-2",
						children: "Delivered! Rate your delivery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center gap-1 mt-3",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRating(n),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `w-8 h-8 ${n <= rating ? "fill-[#ffa41c] text-[#ffa41c]" : "text-[#d5d9d9]"}` })
						}, n))
					})
				]
			})
		]
	}) });
}
//#endregion
export { TrackingPage as component };
