import { o as __toESM } from "../_runtime.mjs";
import { f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, n as ProductImage, o as getDueStatus, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { B as Activity, D as Heart, E as History, L as Camera, T as Leaf, a as Trash2, h as Pencil, l as Shield, o as Star, p as Plus, r as Users, x as MapPin } from "../_libs/lucide-react.mjs";
import { r as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-C641H8nO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PATTERNS = [
	{
		l: "Weekday mornings: tea essentials",
		on: true
	},
	{
		l: "Friday evenings: snacks & beverages",
		on: true
	},
	{
		l: "Monthly: bulk household restock",
		on: false
	}
];
var PREFS = [
	"Vegetarian",
	"No nuts",
	"Budget-conscious",
	"Eco-friendly",
	"Quick delivery"
];
var ORDERS = [
	{
		id: "NOW-2026-9712",
		date: "Yesterday",
		items: "Snack & beverage pack",
		total: 879,
		query: "snack and beverage pack"
	},
	{
		id: "NOW-2026-9684",
		date: "3 days ago",
		items: "Wellness essentials",
		total: 451,
		query: "feeling unwell, body aches"
	},
	{
		id: "NOW-2026-9522",
		date: "Last week",
		items: "Weekly grocery restock",
		total: 1240,
		query: "weekly grocery restock"
	}
];
function ProfilePage() {
	const navigate = useNavigate();
	const { userProfile, updateProfile, addresses, openAddAddress, deleteAddress, setSelectedAddress, selectedAddressId, dietaryPreferences, toggleDietary, familyMembers, updateFamilyMember, favoriteBrands, toggleBrand, crisisContacts, updateCrisisContact, addCrisisContact, deleteCrisisContact, generateResults, recurringRules, addRecurringRule, deleteRecurringRule, fulfillRecurringRule } = useStore();
	const [pats, setPats] = (0, import_react.useState)(PATTERNS);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [pendingDel, setPendingDel] = (0, import_react.useState)(null);
	const [editContact, setEditContact] = (0, import_react.useState)(null);
	const [editMember, setEditMember] = (0, import_react.useState)(null);
	const [newRule, setNewRule] = (0, import_react.useState)("");
	async function reorder(q) {
		await generateResults(q);
		navigate({ to: "/results" });
	}
	function onAvatar(e) {
		const f = e.target.files?.[0];
		if (f) updateProfile({ avatarUrl: URL.createObjectURL(f) });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[28px] font-normal mb-4",
				children: "Your Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "az-card p-5 mb-4 flex gap-5 items-start flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-24 h-24 rounded-full overflow-hidden bg-[#f3f3f3] border border-[#d5d9d9] shrink-0",
					children: userProfile.avatarUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: userProfile.avatarUrl,
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
						keyword: "portrait-person",
						seed: "user",
						size: 200,
						className: "w-full h-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0 space-y-1",
					children: [[
						"name",
						"phone",
						"email"
					].map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditableField, {
						label: field[0].toUpperCase() + field.slice(1),
						value: userProfile[field] || "",
						editing: editing === field,
						onEdit: () => setEditing(field),
						onCancel: () => setEditing(null),
						onSave: (v) => {
							updateProfile({ [field]: v });
							setEditing(null);
						}
					}, field)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex items-center gap-2 text-[12px] az-link cursor-pointer mt-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-4 h-4" }),
							" Change profile photo",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								onChange: onAvatar,
								className: "hidden"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-6 h-6 text-[#007185]" }),
						title: "Saved Addresses",
						desc: "Where Now delivers.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-[13px]",
							children: [addresses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `border rounded p-3 ${selectedAddressId === a.id ? "border-[#ff9900] bg-[#fff8ed]" : "border-[#d5d9d9]"}`,
								children: pendingDel === a.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[12px]",
										children: "Delete this address?"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												deleteAddress(a.id);
												setPendingDel(null);
											},
											className: "btn-az-yellow text-[11px] px-2",
											children: "Yes"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setPendingDel(null),
											className: "text-[11px] az-link px-2",
											children: "Cancel"
										})]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: a.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setSelectedAddress(a.id),
												className: "text-[11px] az-link",
												children: "Use"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => openAddAddress(a.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "w-3 h-3 text-[#565959]" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setPendingDel(a.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3 text-[#b12704]" })
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[#565959]",
									children: [
										a.line1,
										", ",
										a.cityStateZip
									]
								})] })
							}, a.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => openAddAddress(),
								className: "w-full border border-dashed border-[#d5d9d9] rounded p-2 text-[12px] az-link flex items-center justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3" }), " Add new address"]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "w-6 h-6 text-[#565959]" }),
						title: "Order History",
						desc: "Quick reorder from past purchases.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-[13px]",
							children: ORDERS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between border-b border-[#d5d9d9] pb-2 last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold",
									children: o.items
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-[11px] text-[#565959]",
									children: [
										o.date,
										" · ₹",
										o.total
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => reorder(o.query),
									className: "btn-az-yellow text-[12px]",
									children: "Buy Again"
								})]
							}, o.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "w-6 h-6 text-[#b12704]" }),
						title: "Dietary & Budget Preferences",
						desc: "Tags Now uses to refine carts.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2 mt-2",
							children: PREFS.map((p) => {
								const active = dietaryPreferences.includes(p);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
									whileTap: { scale: 1.08 },
									onClick: () => toggleDietary(p),
									className: `px-3 py-1 rounded-full text-[12px] border transition ${active ? "bg-[#5848bc] text-white border-[#5848bc]" : "bg-white border-[#d5d9d9] hover:border-[#0f1111]"}`,
									children: p
								}, p);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "w-6 h-6 text-[#5848bc]" }),
						title: "Household Patterns",
						desc: "Learned routines Now can act on.",
						children: pats.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center justify-between py-2 text-[13px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.l }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setPats(pats.map((x, j) => j === i ? {
									...x,
									on: !x.on
								} : x)),
								className: `w-10 h-5 rounded-full p-0.5 transition ${p.on ? "bg-[#ff9900]" : "bg-[#d5d9d9]"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									animate: {
										x: p.on ? 20 : 0,
										scale: [
											1,
											1.1,
											1
										]
									},
									transition: {
										type: "spring",
										stiffness: 500,
										damping: 30
									},
									className: "w-4 h-4 rounded-full bg-white shadow"
								})
							})]
						}, p.l))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-6 h-6 text-[#5848bc]" }),
						title: "Household Profile",
						desc: "Family of 4 · AI learns context.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 text-[13px]",
							children: [
								familyMembers.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "border border-[#d5d9d9] rounded p-2",
									children: editMember === m.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												defaultValue: m.name,
												onChange: (e) => updateFamilyMember(m.id, { name: e.target.value }),
												className: "w-full border border-[#d5d9d9] rounded px-2 py-1 text-[12px]"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												defaultValue: m.note,
												onChange: (e) => updateFamilyMember(m.id, { note: e.target.value }),
												className: "w-full border border-[#d5d9d9] rounded px-2 py-1 text-[12px]",
												placeholder: "Note (e.g. vegetarian)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setEditMember(null),
												className: "btn-az-yellow text-[11px]",
												children: "Save"
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold",
											children: [
												m.name,
												" — ",
												m.age
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-[#565959]",
											children: m.note
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setEditMember(m.id),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "w-3 h-3 text-[#565959]" })
										})]
									})
								}, m.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[12px] text-[#565959] mt-2",
									children: "Recurring household needs:"
								}),
								recurringRules.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[12px] text-[#565959] italic",
									children: "No recurring reminders yet — add one below."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-1.5",
									children: recurringRules.map((r) => {
										const { status, daysUntil } = getDueStatus(r.nextDueDate);
										const due = status === "overdue" || status === "due-today";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: `flex items-center justify-between gap-2 border rounded p-2 ${due ? "border-[#ff9900] bg-[#fff8ed]" : "border-[#d5d9d9]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "font-semibold text-[12px] truncate",
													children: [
														r.itemName,
														" — ",
														r.frequencyLabel.toLowerCase()
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: `text-[11px] ${status === "overdue" ? "text-[#b12704]" : status === "due-today" ? "text-[#cc6600]" : "text-[#565959]"}`,
													children: status === "overdue" ? `Overdue by ${Math.abs(daysUntil)} day(s)` : status === "due-today" ? "Due today" : `Due in ${daysUntil} day(s)`
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 shrink-0",
												children: [due && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => fulfillRecurringRule(r.id),
													className: "btn-az-yellow text-[11px] px-2",
													children: "Add to cart"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => deleteRecurringRule(r.id),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3 h-3 text-[#b12704]" })
												})]
											})]
										}, r.id);
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: (e) => {
										e.preventDefault();
										if (newRule.trim()) {
											addRecurringRule(newRule);
											setNewRule("");
										}
									},
									className: "flex gap-1 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: newRule,
										onChange: (e) => setNewRule(e.target.value),
										placeholder: "e.g. \"Remind me to add Bread every alternate days\"",
										className: "flex-1 border border-[#d5d9d9] rounded px-2 py-1 text-[12px]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										className: "btn-az-yellow text-[11px] px-2 flex items-center gap-1 shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3" }), " Add"]
									})]
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-6 h-6 text-[#ff9900]" }),
						title: "Your Favorite Brands",
						desc: "Learned brand preferences.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-[13px]",
							children: favoriteBrands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center justify-between gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-8 h-8 rounded overflow-hidden bg-[#f3f3f3]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
											keyword: `${b.name}-logo`,
											seed: b.name,
											size: 80,
											className: "w-full h-full object-cover"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold text-[12px] truncate",
											children: b.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px] text-[#565959]",
											children: [
												b.category,
												" · ordered ",
												b.orderCount,
												"×"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => toggleBrand(b.name),
										className: `w-9 h-5 rounded-full p-0.5 transition ${b.prioritize ? "bg-[#ff9900]" : "bg-[#d5d9d9]"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											animate: { x: b.prioritize ? 16 : 0 },
											transition: {
												type: "spring",
												stiffness: 500,
												damping: 30
											},
											className: "w-4 h-4 rounded-full bg-white shadow"
										})
									})
								]
							}, b.name))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "w-6 h-6 text-[#b12704]" }),
						title: "Crisis Contacts",
						desc: "People notified in Crisis Mode.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-[13px]",
							children: [crisisContacts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
								className: "border border-[#d5d9d9] rounded p-2",
								children: editContact === c.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											defaultValue: c.name,
											onChange: (e) => updateCrisisContact(c.id, { name: e.target.value }),
											placeholder: "Name",
											className: "w-full border rounded px-2 py-1 text-[12px]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											defaultValue: c.relation,
											onChange: (e) => updateCrisisContact(c.id, { relation: e.target.value }),
											placeholder: "Relation",
											className: "w-full border rounded px-2 py-1 text-[12px]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											defaultValue: c.phone,
											onChange: (e) => updateCrisisContact(c.id, { phone: e.target.value }),
											placeholder: "Phone",
											className: "w-full border rounded px-2 py-1 text-[12px]"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setEditContact(null),
												className: "btn-az-yellow text-[11px]",
												children: "Save"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													deleteCrisisContact(c.id);
													setEditContact(null);
												},
												className: "text-[11px] az-link text-[#b12704]",
												children: "Delete"
											})]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold",
										children: c.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] text-[#565959]",
										children: [
											c.relation,
											" · ",
											c.phone
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setEditContact(c.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "w-3 h-3 text-[#565959]" })
									})]
								})
							}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: addCrisisContact,
								className: "w-full border border-dashed border-[#d5d9d9] rounded p-2 text-[12px] az-link flex items-center justify-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3" }), " Add another contact"]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "w-6 h-6 text-[#007600]" }),
						title: "Eco Impact",
						desc: "See your sustainability dashboard.",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({ to: "/eco-impact" }),
							className: "btn-az-yellow w-full mt-2",
							children: "Open Eco Impact →"
						})
					})
				]
			})
		]
	}) });
}
function Tile({ icon, title, desc, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "az-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-2",
				children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-bold text-[16px]",
					children: title
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-[#565959] mb-2",
				children: desc
			}),
			children
		]
	});
}
function EditableField({ label, value, editing, onEdit, onCancel, onSave }) {
	const [v, setV] = (0, import_react.useState)(value);
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-[13px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[#565959] w-16",
				children: [label, ":"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: v,
				onChange: (e) => setV(e.target.value),
				className: "border border-[#d5d9d9] rounded px-2 py-1 flex-1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => onSave(v),
				className: "btn-az-yellow text-[11px]",
				children: "Save"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: onCancel,
				className: "az-link text-[11px]",
				children: "Cancel"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-[14px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-[#565959] w-16",
				children: [label, ":"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold flex-1",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => {
					setV(value);
					onEdit();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "w-3 h-3 text-[#565959]" })
			})
		]
	});
}
//#endregion
export { ProfilePage as component };
