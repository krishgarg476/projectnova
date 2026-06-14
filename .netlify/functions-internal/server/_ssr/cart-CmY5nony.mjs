import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as purchaseHistory } from "./purchaseHistory-CKismEig.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, i as cartTotal, n as ProductImage, o as getDueStatus, r as bundlesFor, s as keywordForName, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { F as ChevronDown, M as ChevronUp, T as Leaf, p as Plus, s as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-CmY5nony.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CO2_PER_ITEM_KG = .2;
var MAX_SUGGESTIONS = 2;
var UPCOMING_WINDOW_DAYS = 3;
function getGreenPathSuggestions(cartItems, recurringRules) {
	const inCartIds = new Set(cartItems.map((i) => i.id));
	const inCartNames = new Set(cartItems.map((i) => i.name.toLowerCase()));
	const out = [];
	const alreadySuggested = (name) => out.some((o) => o.name.toLowerCase() === name.toLowerCase());
	for (const r of purchaseHistory.predictedRestocks) {
		if (out.length >= MAX_SUGGESTIONS) break;
		if (inCartIds.has(r.id) || inCartNames.has(r.name.toLowerCase())) continue;
		out.push({
			id: r.id,
			name: r.name,
			price: r.price,
			imageKeyword: r.imageKeyword,
			category: r.category,
			reasoning: r.reasoning
		});
	}
	for (const rule of recurringRules) {
		if (out.length >= MAX_SUGGESTIONS) break;
		if (inCartNames.has(rule.itemName.toLowerCase()) || alreadySuggested(rule.itemName)) continue;
		const { status, daysUntil } = getDueStatus(rule.nextDueDate);
		if (!(status === "overdue" || status === "due-today" || status === "upcoming" && daysUntil <= UPCOMING_WINDOW_DAYS)) continue;
		out.push({
			id: rule.id,
			name: rule.itemName,
			price: rule.price,
			imageKeyword: rule.imageKeyword,
			category: "Recurring",
			reasoning: `From your recurring reminder — ${rule.frequencyLabel.toLowerCase()}.`
		});
	}
	return out;
}
function estimateCO2SavedKg(suggestionCount) {
	return Math.round(suggestionCount * CO2_PER_ITEM_KG * 10) / 10;
}
function CartPage() {
	const { cartItems, skippedItems, recurringRules, updateQuantity, removeItem, addSkippedItem, addCartItem, addresses, selectedAddressId } = useStore();
	const [expanded, setExpanded] = (0, import_react.useState)(null);
	const [showSkipped, setShowSkipped] = (0, import_react.useState)(false);
	const [greenAdded, setGreenAdded] = (0, import_react.useState)(false);
	const [greenSavings, setGreenSavings] = (0, import_react.useState)(0);
	const navigate = useNavigate();
	const total = cartTotal(cartItems);
	const address = addresses.find((a) => a.id === selectedAddressId);
	const pincode = address?.cityStateZip.match(/\d{6}/)?.[0] || "324001";
	const suggestedBundles = (0, import_react.useMemo)(() => {
		const present = new Set(cartItems.map((i) => i.name.toLowerCase()));
		const out = [];
		for (const i of cartItems) for (const p of bundlesFor(i.name)) if (!present.has(p.toLowerCase()) && !out.find((x) => x.name === p)) out.push({
			from: i.name,
			name: p
		});
		return out.slice(0, 4);
	}, [cartItems]);
	const greenSuggestions = (0, import_react.useMemo)(() => getGreenPathSuggestions(cartItems, recurringRules), [cartItems, recurringRules]);
	const co2Saved = estimateCO2SavedKg(greenSuggestions.length);
	function addGreenSuggestions() {
		for (const item of greenSuggestions) addCartItem({
			id: item.id,
			name: item.name,
			category: item.category,
			price: item.price,
			imageKeyword: item.imageKeyword,
			reasoning: "Added via Green Path — consolidates your delivery",
			agentSource: "context"
		});
		setGreenSavings(co2Saved);
		setGreenAdded(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "az-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between border-b border-[#d5d9d9] pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[28px] font-normal",
						children: "Shopping Cart"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[13px] text-[#565959]",
						children: "Price"
					})]
				}),
				cartItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-12 text-center text-[#565959]",
					children: ["Your cart is empty. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "az-link",
						children: "Continue shopping"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-[#d5d9d9]",
					children: cartItems.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "py-4 flex gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-[120px] h-[120px] bg-[#f3f3f3] rounded overflow-hidden shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
									keyword: it.imageKeyword,
									seed: it.id,
									size: 300,
									className: "w-full h-full object-cover"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[16px] font-semibold leading-tight",
										children: it.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[12px] text-[#007600] mt-0.5",
										children: "In Stock"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setExpanded(expanded === it.id ? null : it.id),
										className: "ai-badge mt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3" }),
											" Now AI: ",
											it.reasoning
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 mt-3 text-[13px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center border border-[#d5d9d9] rounded",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => updateQuantity(it.id, it.quantity - 1),
														className: "px-2 py-1 hover:bg-[#f3f3f3]",
														children: "−"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "px-3",
														children: it.quantity
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => updateQuantity(it.id, it.quantity + 1),
														className: "px-2 py-1 hover:bg-[#f3f3f3]",
														children: "+"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[#d5d9d9]",
												children: "|"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => removeItem(it.id),
												className: "az-link",
												children: "Delete"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[18px] font-bold whitespace-nowrap",
								children: ["₹", it.price * it.quantity]
							})
						]
					}, it.id))
				}),
				suggestedBundles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 border border-[#d5d9d9] rounded p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-semibold text-[14px] mb-2",
						children: "Complete your order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-3 overflow-x-auto",
						children: suggestedBundles.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-[160px] border border-[#d5d9d9] rounded p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "aspect-square rounded overflow-hidden bg-[#f3f3f3] mb-1",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
										keyword: keywordForName(b.name),
										seed: b.name,
										size: 200,
										className: "w-full h-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] line-clamp-2 h-8",
									children: b.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-[#565959]",
									children: ["often with ", b.from.split(" ")[0]]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => addCartItem({
										id: `bundle-cart-${i}`,
										name: b.name,
										price: 99 + i * 20,
										imageKeyword: keywordForName(b.name),
										reasoning: `Bundled with ${b.from}`
									}),
									className: "btn-az-yellow w-full mt-1 text-[11px] flex items-center justify-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3" }), " Add"]
								})
							]
						}, b.name))
					})]
				}),
				skippedItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 border-t border-[#d5d9d9] pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowSkipped(!showSkipped),
						className: "font-semibold text-[14px] flex items-center gap-1",
						children: [
							"Now also considered ",
							skippedItems.length,
							" other items ",
							showSkipped ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-4 h-4" })
						]
					}), showSkipped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3",
						children: skippedItems.map((sk) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 p-3 border border-[#d5d9d9] rounded opacity-70 hover:opacity-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-16 h-16 rounded overflow-hidden bg-[#f3f3f3]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
									keyword: sk.imageKeyword,
									seed: sk.id,
									size: 100,
									className: "w-full h-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[13px] font-semibold",
										children: sk.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] text-[#565959]",
										children: sk.reasoning
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => addSkippedItem(sk.id),
										className: "btn-az-yellow mt-1 text-[11px]",
										children: "Add to Cart"
									})
								]
							})]
						}, sk.id))
					})]
				}),
				cartItems.length > 0 && (greenSuggestions.length > 0 || greenAdded) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 p-4 rounded-md border border-[#007600]/40 bg-[#e8f5e9]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-semibold text-[14px] text-[#0a5d20]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "w-4 h-4" }), " Green Path"]
					}), !greenAdded ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[13px] mt-1",
							children: [
								"Adding ",
								greenSuggestions.length === 1 ? "1 more item" : `${greenSuggestions.length} more items`,
								" from your usual list —",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: greenSuggestions.map((s) => s.name).join(", ")
								}),
								" — would let this be delivered in the same trip, saving ~",
								co2Saved,
								" kg CO₂."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 bg-white/70 rounded mt-2 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-[#007600] transition-all duration-500",
								style: { width: "35%" }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: addGreenSuggestions,
							className: "btn-az-yellow mt-3",
							children: "Add suggested items"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-2 bg-white/70 rounded mt-2 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full bg-[#007600] transition-all duration-500",
							style: { width: "100%" }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[13px] text-[#0a5d20] mt-2 font-semibold",
						children: [
							"✓ Delivery consolidated — ~",
							greenSavings,
							" kg CO₂ saved"
						]
					})] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:sticky lg:top-4 h-fit space-y-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[15px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#007600]",
							children: "✓"
						}), " Your order qualifies for FREE Express delivery."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[14px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Subtotal (",
							cartItems.length,
							" items):"
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold",
							children: ["₹", total]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[14px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Delivery:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-[#007600]",
							children: "FREE"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-[18px] text-[#b12704] font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["₹", total] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => navigate({ to: "/checkout" }),
						className: "btn-az-yellow w-full py-2.5 font-semibold",
						children: "Proceed to Checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/group/$cartId",
						params: { cartId: "demo" },
						className: "block text-center mt-2 border border-[#d5d9d9] rounded py-2 text-[13px] hover:bg-[#f3f3f3]",
						children: "Split this cart with friends →"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[12px] text-[#565959] mt-2",
						children: [
							"⏱ Arriving in 9–12 min to ",
							address?.cityStateZip.split(",")[0],
							" ",
							pincode
						]
					})
				]
			})
		})]
	}) });
}
//#endregion
export { CartPage as component };
