import { o as __toESM } from "../_runtime.mjs";
import { d as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn } from "./esm-I6x-3bX5.mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-OjCiqqCU.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { C as LoaderCircle, L as Camera, s as Sparkles } from "../_libs/lucide-react.mjs";
import { t as ProductCard } from "./ProductCard-V1PP3TH5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fridge-whisperer-Bi0U25K3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputSchema = objectType({ base64Image: stringType() });
var processImageFn = createServerFn({ method: "POST" }).inputValidator((data) => inputSchema.parse(data)).handler(createSsrRpc("46dedc7adf69af42a94c1891de95fe897d68bca2ad872d5ba30a55831ac24d9e"));
function FridgePage() {
	const [scanned, setScanned] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const [noticed, setNoticed] = (0, import_react.useState)([]);
	const [results, setResults] = (0, import_react.useState)([]);
	const [preview, setPreview] = (0, import_react.useState)(null);
	const addCart = useStore((s) => s.addCartItem);
	async function onUpload(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = async (event) => {
			const base64Image = event.target?.result;
			setPreview(base64Image);
			setScanned(true);
			setLoading(true);
			setStep(0);
			setNoticed([]);
			setResults([]);
			try {
				const data = await processImageFn({ data: { base64Image } });
				setNoticed(data.noticed);
				setResults(data.results);
				data.noticed.forEach((_, i) => setTimeout(() => setStep(i + 1), 800 + i * 400));
			} catch (err) {
				console.error("Vision failed", err);
				setNoticed([{
					t: "Failed to scan image. Please try again.",
					add: false
				}]);
				setStep(1);
			} finally {
				setLoading(false);
			}
		};
		reader.readAsDataURL(file);
	}
	function addAll() {
		results.forEach((r) => addCart({
			id: r.id,
			name: r.name,
			category: "Fridge",
			price: r.price,
			reasoning: r.reasoning,
			imageKeyword: r.imageKeyword
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[1500px] mx-auto px-4 py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[28px] font-bold mb-1",
				children: "Fridge Whisperer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[14px] text-[#565959] mb-5",
				children: "Snap a photo of your fridge — Now AI spots what's missing and builds a restock cart."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "az-card p-4",
					children: !scanned ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "border-2 border-dashed border-[#d5d9d9] bg-[#fafafa] aspect-square rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#f3f3f3] hover:border-[#5848bc]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "w-16 h-16 text-[#5848bc]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[15px] font-semibold",
								children: "Click to upload a photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[12px] text-[#565959]",
								children: "of your fridge, pantry, or counter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								onChange: onUpload,
								className: "hidden"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#cce0ff] to-[#aac8f5] flex items-center justify-center",
						children: [
							preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: preview,
								alt: "Uploaded",
								className: "absolute inset-0 w-full h-full object-cover opacity-80"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/10" }),
							loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-16 h-16 text-white animate-spin absolute" }),
							step < noticed.length && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute inset-x-0 h-1 bg-[#5848bc] shadow-[0_0_20px_#5848bc]",
								style: {
									top: `${step / Math.max(1, noticed.length) * 100}%`,
									transition: "top 0.4s"
								}
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "az-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-bold text-[16px] mb-3 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-4 h-4 text-[#5848bc]" }), " Now noticed:"]
					}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[13px] text-[#565959] animate-pulse",
						children: "Scanning image..."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-2",
						children: noticed.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: `flex items-center gap-3 p-2 rounded transition-all duration-500 ${i < step ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[13px] flex-1",
								children: n.t
							}), n.add ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ai-badge",
								children: "Adding"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-[#565959]",
								children: "Skipped"
							})]
						}, i))
					})]
				})]
			}),
			step >= noticed.length && results.length > 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 az-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-[18px] mb-3",
						children: "Suggested cart"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 md:grid-cols-4 gap-3",
						children: results.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, {
							p: {
								id: r.id,
								name: r.name,
								imageKeyword: r.imageKeyword,
								price: r.price,
								reasoning: r.reasoning
							},
							onAdd: () => addCart({
								id: r.id,
								name: r.name,
								category: "Fridge",
								price: r.price,
								reasoning: r.reasoning,
								imageKeyword: r.imageKeyword
							})
						}, r.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: addAll,
							className: "btn-az-yellow px-6 py-2 font-semibold",
							children: "Add all to Cart"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "btn-az-orange px-6 py-2 font-semibold",
							children: "Review full cart →"
						})]
					})
				]
			})
		]
	}) });
}
//#endregion
export { FridgePage as component };
