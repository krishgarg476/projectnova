import { o as __toESM } from "../_runtime.mjs";
import { f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, n as ProductImage, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { I as Check, S as Lock, f as QrCode, r as Users, s as Sparkles, w as Link, y as MessageCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/group.demo-DduPlA6v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOCK_FRIENDS = [
	{
		id: "f1",
		name: "Rahul",
		color: "bg-blue-500"
	},
	{
		id: "f2",
		name: "Priya",
		color: "bg-pink-500"
	},
	{
		id: "f3",
		name: "Aditya",
		color: "bg-emerald-500"
	},
	{
		id: "f4",
		name: "Karan",
		color: "bg-amber-500"
	},
	{
		id: "f5",
		name: "Sneha",
		color: "bg-purple-500"
	}
];
var MOCK_EVENTS = [
	{
		time: 2e3,
		type: "join",
		friend: MOCK_FRIENDS[0]
	},
	{
		time: 3e3,
		type: "add",
		friend: MOCK_FRIENDS[0],
		item: {
			name: "Lay's Party Pack",
			price: 150,
			img: "potato-chips-bowl"
		}
	},
	{
		time: 4500,
		type: "join",
		friend: MOCK_FRIENDS[1]
	},
	{
		time: 5500,
		type: "add",
		friend: MOCK_FRIENDS[1],
		item: {
			name: "Coca-Cola 500ml",
			price: 40,
			img: "coca-cola-bottle"
		}
	},
	{
		time: 6500,
		type: "join",
		friend: MOCK_FRIENDS[3]
	},
	{
		time: 7e3,
		type: "join",
		friend: MOCK_FRIENDS[2]
	},
	{
		time: 8e3,
		type: "add",
		friend: MOCK_FRIENDS[3],
		item: {
			name: "Britannia Cake Tray",
			price: 250,
			img: "chocolate-cake"
		}
	},
	{
		time: 8500,
		type: "add",
		friend: MOCK_FRIENDS[2],
		item: {
			name: "Coca-Cola 500ml",
			price: 40,
			img: "coca-cola-bottle"
		}
	},
	{
		time: 9500,
		type: "join",
		friend: MOCK_FRIENDS[4]
	},
	{
		time: 1e4,
		type: "add",
		friend: MOCK_FRIENDS[0],
		item: {
			name: "Coca-Cola 500ml",
			price: 40,
			img: "coca-cola-bottle"
		}
	},
	{
		time: 11e3,
		type: "add",
		friend: MOCK_FRIENDS[4],
		item: {
			name: "Haldiram's Mixed Namkeen",
			price: 165,
			img: "indian-snacks-bowl"
		}
	}
];
function GroupDemoPage() {
	const [sessionStarted, setSessionStarted] = (0, import_react.useState)(false);
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(300);
	const [joined, setJoined] = (0, import_react.useState)([{
		id: "me",
		name: "You (Host)",
		color: "bg-[#5848bc]"
	}]);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [phase, setPhase] = (0, import_react.useState)("live");
	const addGlobalCart = useStore((s) => s.addCartItem);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!sessionStarted) return;
		const timer = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1e3);
		const timeouts = MOCK_EVENTS.map((event) => {
			return setTimeout(() => {
				if (event.type === "join") setJoined((j) => [...j, event.friend]);
				else if (event.type === "add") setCart((c) => [...c, {
					friend: event.friend,
					item: event.item
				}]);
			}, event.time);
		});
		return () => {
			clearInterval(timer);
			timeouts.forEach(clearTimeout);
		};
	}, [sessionStarted]);
	const totalAmount = cart.reduce((sum, c) => sum + c.item.price, 0);
	const formatTime = (sec) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;
	function handleSwap() {
		const newCart = cart.filter((c) => c.item.name !== "Coca-Cola 500ml");
		newCart.push({
			friend: {
				name: "AI Council",
				color: "bg-purple-500"
			},
			item: {
				name: "Coca-Cola 2L Party Pack",
				price: 90,
				img: "coca-cola-bottle"
			}
		});
		setCart(newCart);
		setPhase("split-bill");
	}
	function handleCheckout() {
		cart.forEach((c) => addGlobalCart({
			id: Math.random().toString(),
			name: c.item.name,
			category: "Group Order",
			price: c.item.price,
			reasoning: `Added by ${c.friend.name}`,
			imageKeyword: c.item.img,
			quantity: 1,
			agentSource: "speed"
		}));
		navigate({ to: "/cart" });
	}
	if (!sessionStarted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-md mx-auto px-4 py-12 flex flex-col items-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-10 h-10 text-indigo-600" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[32px] font-extrabold mb-2 text-[#0f1111]",
				children: "Now Squad"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[16px] text-[#565959] mb-8",
				children: "Create a live cart. Share a link. Let your friends add what they want directly to your order."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => setSessionStarted(true),
				className: "w-full bg-[#5848bc] hover:bg-[#4a3ca0] text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-5 h-5" }), " Start Group Order"]
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[800px] mx-auto px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl shadow-sm border border-[#e7e7e7] p-5 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-[24px] font-bold text-[#0f1111] mb-1",
							children: "Movie Night Snacks"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[14px] text-[#565959]",
							children: "Hosted by You"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-mono font-bold flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-4 h-4" }),
								" ",
								formatTime(timeLeft)
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => alert("Displaying large QR code for friends to scan..."),
							className: "flex-1 bg-gray-50 border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-700 hover:bg-gray-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "w-5 h-5" }), " Show QR"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => alert("Link copied to clipboard: now.com/squad/1x9a"),
							className: "flex-1 bg-gray-50 border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-700 hover:bg-gray-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { className: "w-5 h-5" }), " Copy Link"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 pt-6 border-t border-gray-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3",
							children: [
								"Squad Members (",
								joined.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex -space-x-2",
							children: joined.map((j, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `w-10 h-10 rounded-full ${j.color} border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-sm transition-all duration-300 animate-in fade-in zoom-in`,
								children: j.name.charAt(0)
							}, i))
						})]
					})
				]
			}),
			phase === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-[18px] font-bold mb-4 flex items-center justify-between",
					children: ["Live Cart", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[14px] font-normal text-gray-500",
						children: [cart.length, " items"]
					})]
				}), cart.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-12 text-gray-400",
					children: "Waiting for friends to add items..."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: cart.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-4 animate-in slide-in-from-right-4 fade-in duration-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-12 h-12 rounded-lg bg-gray-50 p-1 flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
									keyword: c.item.img,
									alt: c.item.name
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-[15px]",
									children: c.item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[13px] text-gray-500",
									children: ["₹", c.item.price]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `px-2.5 py-1 rounded-full text-[11px] font-bold text-white ${c.friend.color}`,
								children: c.friend.name
							})
						]
					}, i))
				})]
			}),
			phase === "ai-intervention" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-purple-50 rounded-2xl p-6 border border-purple-100 mb-6 animate-in zoom-in-95 duration-500",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-6 h-6 text-purple-600" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-[18px] font-bold text-purple-900 mb-2",
							children: "Smart Swap Opportunity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-purple-800 text-[14px] mb-4 leading-relaxed",
							children: [
								"I noticed your squad added ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "three individual 500ml Cokes" }),
								" (₹120 total). I can swap this for a ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "2L Party Pack" }),
								" to save you ₹30 and give everyone more drinks!"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSwap,
								className: "bg-purple-600 text-white px-5 py-2.5 rounded-lg font-bold text-[14px] flex items-center gap-2 hover:bg-purple-700",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" }), " Accept Swap"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setPhase("split-bill"),
								className: "bg-white text-purple-600 border border-purple-200 px-5 py-2.5 rounded-lg font-bold text-[14px] hover:bg-purple-50",
								children: "Keep Originals"
							})]
						})
					] })]
				})
			}),
			phase === "split-bill" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 animate-in slide-in-from-bottom-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-green-50 p-5 text-center border-b border-green-100",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-green-600 font-bold mb-1",
							children: "Total to Pay Now"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[36px] font-extrabold text-green-700",
							children: ["₹", totalAmount]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] text-green-600/80",
							children: "You pay now. We split the bill automatically."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-[14px] text-gray-500 uppercase mb-4",
							children: "Who owes what"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-3",
							children: joined.filter((j) => j.id !== "me").map((j, i) => {
								const friendTotal = cart.filter((c) => c.friend?.id === j.id).reduce((sum, c) => sum + c.item.price, 0);
								const split = friendTotal > 0 ? friendTotal : Math.round(totalAmount / joined.length);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-center pb-3 border-b border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `w-8 h-8 rounded-full ${j.color} text-white flex items-center justify-center font-bold text-xs`,
											children: j.name.charAt(0)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: j.name
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-[15px]",
										children: ["₹", split]
									})]
								}, i);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleCheckout,
							className: "w-full mt-6 bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-5 h-5" }), " Send UPI Requests & Pay"]
						})
					]
				})]
			}),
			phase === "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10 pb-[max(1rem,env(safe-area-inset-bottom))]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-[800px] mx-auto flex gap-4 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[12px] text-gray-500 font-medium",
							children: "Squad Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[20px] font-bold text-[#0f1111]",
							children: ["₹", totalAmount]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setPhase("ai-intervention"),
						disabled: cart.length === 0,
						className: "bg-[#ffd814] hover:bg-[#f7ca00] disabled:opacity-50 text-black font-bold px-8 py-3.5 rounded-xl shadow-sm flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "w-5 h-5" }), " Lock Cart"]
					})]
				})
			})
		]
	}) });
}
//#endregion
export { GroupDemoPage as component };
