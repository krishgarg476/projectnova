import { o as __toESM } from "../_runtime.mjs";
import { f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, i as cartTotal, n as ProductImage, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { C as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DeS0Ef3b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const { cartItems, groupCartItems, checkoutSource, addresses, selectedAddressId, openAddressSelector, placeOrder } = useStore();
	const [speed, setSpeed] = (0, import_react.useState)("express");
	const [pay, setPay] = (0, import_react.useState)("upi");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const isGroup = checkoutSource === "group";
	const reviewItems = isGroup ? groupCartItems.filter((i) => i.status === "confirmed").map((i) => ({
		id: i.id,
		name: i.name,
		price: i.price,
		quantity: 1,
		imageKeyword: i.imageKeyword
	})) : cartItems.map((i) => ({
		id: i.id,
		name: i.name,
		price: i.price,
		quantity: i.quantity,
		imageKeyword: i.imageKeyword
	}));
	const total = isGroup ? reviewItems.reduce((s, i) => s + i.price, 0) : cartTotal(cartItems);
	const address = addresses.find((a) => a.id === selectedAddressId);
	function handlePlace() {
		setLoading(true);
		setTimeout(() => {
			navigate({
				to: "/tracking/$orderId",
				params: { orderId: placeOrder() }
			});
		}, 1e3);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-[28px] font-normal border-b border-[#d5d9d9] pb-3 mb-4",
			children: ["Checkout ", isGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[14px] text-[#5848bc] font-semibold ml-2",
				children: "(Group order)"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						n: 1,
						title: "Delivery address",
						children: address ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[14px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: address.fullName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[#565959]",
									children: [
										address.line1,
										", ",
										address.cityStateZip
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: openAddressSelector,
									className: "az-link text-[13px] mt-1",
									children: "Change"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13px] text-[#565959]",
							children: "No address selected."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						n: 2,
						title: "Delivery speed",
						children: [
							{
								id: "express",
								l: "Now Express — 8–12 min — FREE ⚡",
								note: "Recommended"
							},
							{
								id: "standard",
								l: "Standard — 30–45 min — FREE"
							},
							{
								id: "scheduled",
								l: "Scheduled — choose a time — FREE"
							}
						].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 py-2 cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "speed",
									checked: speed === s.id,
									onChange: () => setSpeed(s.id),
									className: "accent-[#ff9900]"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[14px]",
									children: s.l
								}),
								s.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-[#007600] bg-[#e6f4ea] px-2 py-0.5 rounded",
									children: s.note
								})
							]
						}, s.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						n: 3,
						title: "Payment method",
						children: [
							{
								id: "upi",
								l: "UPI"
							},
							{
								id: "card",
								l: "Credit / Debit Card"
							},
							{
								id: "cod",
								l: "Cash on Delivery"
							}
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 py-2 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "pay",
								checked: pay === p.id,
								onChange: () => setPay(p.id),
								className: "accent-[#ff9900]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[14px]",
								children: p.l
							})]
						}, p.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						n: 4,
						title: "Review items and delivery",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [reviewItems.slice(0, 8).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded overflow-hidden bg-[#f3f3f3]",
								title: i.name,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
									keyword: i.imageKeyword,
									seed: i.id,
									size: 100,
									className: "w-full h-full object-cover"
								})
							}, i.id)), reviewItems.length > 8 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[13px] text-[#565959]",
								children: [
									"and ",
									reviewItems.length - 8,
									" more"
								]
							})]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:sticky lg:top-4 h-fit az-card p-5 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handlePlace,
						disabled: loading || reviewItems.length === 0,
						className: "btn-az-yellow w-full py-3 font-semibold flex items-center justify-center gap-2",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-5 h-5 animate-spin" }) : "Place your order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] text-[#565959]",
						children: "By placing your order, you agree to Now's privacy notice and conditions of use."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[16px] font-bold",
						children: "Order Summary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Items (",
							reviewItems.length,
							"):"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", total] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[13px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#007600]",
							children: "FREE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[18px] text-[#b12704] font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Order total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", total] })]
					})
				]
			})]
		})]
	}) });
}
function Section({ n, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "az-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "text-[18px] font-bold mb-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[#007185]",
					children: [n, "."]
				}),
				" ",
				title
			]
		}), children]
	});
}
//#endregion
export { CheckoutPage as component };
