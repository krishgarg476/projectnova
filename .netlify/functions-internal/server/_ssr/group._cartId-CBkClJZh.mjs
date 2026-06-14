import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate, p as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, n as ProductImage, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { A as Copy, I as Check, n as X, p as Plus, r as Users } from "../_libs/lucide-react.mjs";
import { a as AnimatePresence, r as motion } from "../_libs/framer-motion.mjs";
import { c as ResponsiveContainer, i as XAxis, l as Tooltip, o as Bar, r as YAxis, s as Cell, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/group._cartId-CBkClJZh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CONTACTS = [
	{
		name: "Rohan",
		color: "#0e7c66"
	},
	{
		name: "Meera",
		color: "#cc4d6d"
	},
	{
		name: "Anish",
		color: "#0a558c"
	},
	{
		name: "Diya",
		color: "#874a98"
	},
	{
		name: "Kabir",
		color: "#b35900"
	}
];
function GroupPage() {
	useParams({ from: "/group/$cartId" });
	const { groupCartItems, groupPeople, setGroupItemStatus, addGroupPerson, setCheckoutSource } = useStore();
	const navigate = useNavigate();
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [inviteOpen, setInviteOpen] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)({});
	const confirmed = groupCartItems.filter((i) => i.status === "confirmed");
	const totals = groupPeople.map((p, i) => ({
		name: p.name,
		amount: confirmed.filter((c) => c.by === i).reduce((s, c) => s + c.price, 0),
		color: p.color
	}));
	const total = confirmed.reduce((s, c) => s + c.price, 0);
	const perHead = groupPeople.length ? Math.round(total / groupPeople.length) : 0;
	function sendInvites() {
		Object.entries(picked).forEach(([name, on]) => {
			if (on) {
				const c = CONTACTS.find((x) => x.name === name);
				addGroupPerson({
					name: c.name,
					color: c.color,
					initials: c.name[0]
				});
			}
		});
		setInviteOpen(false);
		setPicked({});
	}
	function confirmGroupOrder() {
		setCheckoutSource("group");
		navigate({ to: "/checkout" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Layout, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5 space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "az-card p-5 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-[22px] font-bold flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-6 h-6 text-[#5848bc]" }), " Shared cart for tonight 🎉"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-[13px] text-[#565959]",
				children: [groupPeople.length, " people viewing · now.app/group/abc123"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => {
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				},
				className: "btn-az-yellow px-4 py-2 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }),
					" ",
					copied ? "Copied ✓" : "Copy share link"
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "az-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-4 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: groupPeople.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { scale: 0 },
						animate: { scale: 1 },
						transition: {
							delay: i * .05,
							type: "spring"
						},
						className: "w-10 h-10 rounded-full text-white font-bold flex items-center justify-center",
						style: { background: p.color },
						children: p.initials
					}, p.name + i)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setInviteOpen(true),
						className: "w-10 h-10 rounded-full border-2 border-dashed border-[#d5d9d9] text-[#565959] hover:border-[#0f1111] flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "divide-y divide-[#d5d9d9]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: groupCartItems.map((it) => {
						const person = groupPeople[it.by] || groupPeople[0];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
							layout: true,
							exit: {
								opacity: 0,
								x: -20
							},
							className: `py-3 flex items-center gap-3 ${it.status === "confirmed" ? "border-l-4 border-l-[#007600] pl-3" : ""} ${it.status === "rejected" ? "opacity-40 line-through" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 bg-[#f3f3f3] rounded overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
										keyword: it.imageKeyword,
										seed: it.id,
										size: 100,
										className: "w-full h-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-[14px]",
										children: it.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center",
											style: { background: person.color },
											children: person.initials
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[12px] text-[#565959]",
											children: ["Suggested by ", person.name]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[14px] font-bold w-20 text-right",
									children: ["₹", it.price]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setGroupItemStatus(it.id, "confirmed"),
										className: "w-8 h-8 rounded-full bg-[#e6f4ea] hover:bg-[#c8e6c9] text-[#007600] flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setGroupItemStatus(it.id, "rejected"),
										className: "w-8 h-8 rounded-full bg-[#fde2e0] hover:bg-[#fac8c5] text-[#b12704] flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" })
									})]
								})
							]
						}, it.id);
					}) })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-[16px] mb-3",
							children: "Cost split"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: totals,
									layout: "vertical",
									margin: { left: 10 },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											type: "number",
											hide: true
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											dataKey: "name",
											type: "category",
											tick: { fontSize: 12 },
											width: 60
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "amount",
											radius: [
												0,
												4,
												4,
												0
											],
											children: totals.map((e, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: e.color }, i))
										})
									]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-[13px] mt-2 text-[#565959]",
							children: [
								"Or split evenly: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
									className: "text-[#0f1111]",
									children: ["₹", perHead]
								}),
								" each"
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-[15px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Group total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-bold",
								children: ["₹", total]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: confirmGroupOrder,
							className: "btn-az-yellow w-full block text-center py-2.5 font-semibold",
							children: "Confirm group order →"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "block text-center text-[12px] az-link mt-1",
							children: "← Back"
						})
					]
				})]
			})]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: inviteOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: () => setInviteOpen(false),
		className: "fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: { scale: .95 },
			animate: { scale: 1 },
			exit: { scale: .95 },
			onClick: (e) => e.stopPropagation(),
			className: "bg-white rounded-lg w-[400px] max-w-full p-5 shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-[16px] mb-3",
					children: "Invite people to this cart"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: CONTACTS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 p-2 border border-[#d5d9d9] rounded cursor-pointer hover:bg-[#fafafa]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: !!picked[c.name],
								onChange: (e) => setPicked((p) => ({
									...p,
									[c.name]: e.target.checked
								})),
								className: "accent-[#ff9900]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 h-8 rounded-full text-white text-[12px] font-bold flex items-center justify-center",
								style: { background: c.color },
								children: c.name[0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[14px]",
								children: c.name
							})
						]
					}) }, c.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: sendInvites,
					className: "btn-az-yellow w-full mt-4 py-2 font-semibold",
					children: "Send invites"
				})
			]
		})
	}) })] });
}
//#endregion
export { GroupPage as component };
