import { o as __toESM } from "../_runtime.mjs";
import { d as Link, f as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as productCatalog_default } from "./productCatalog-BzTMCepi.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as useStore, i as cartTotal, t as Layout } from "./Layout-BSXXmDwm.mjs";
import { I as Check, _ as Mic, a as Trash2, c as ShoppingCart, j as CircleAlert, n as X, v as MicOff, z as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/voice-B9LEDwtY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STOPWORDS = new Set([
	"a",
	"an",
	"the",
	"some",
	"me",
	"to",
	"please",
	"of",
	"for",
	"my",
	"cart",
	"and",
	"&",
	"also",
	"plus",
	"hello",
	"hi",
	"hey"
]);
function tokenize(s) {
	return s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}
function tokensMatch(a, b) {
	if (a === b) return true;
	if (a === b + "s" || b === a + "s") return true;
	if (a === b + "es" || b === a + "es") return true;
	return false;
}
function productTokens(p) {
	return [...tokenize(p.name), ...(p.keywords || []).flatMap(tokenize)];
}
function matchProducts(query) {
	const lower = query.toLowerCase().trim();
	if (!lower) return [];
	const items = productCatalog_default;
	const rawTokens = tokenize(lower);
	const queryTokens = rawTokens.filter((t) => !STOPWORDS.has(t));
	const effectiveTokens = queryTokens.length ? queryTokens : rawTokens;
	for (const p of items) {
		const allTokens = productTokens(p);
		if (effectiveTokens.every((t) => allTokens.some((at) => tokensMatch(t, at)))) return [{
			product: p,
			exact: true
		}];
	}
	if (effectiveTokens.length > 1) {
		const found = [];
		for (const t of effectiveTokens) {
			const p = items.find((p) => productTokens(p).some((at) => tokensMatch(t, at)));
			if (p && !found.some((f) => f.id === p.id)) found.push(p);
		}
		if (found.length >= 1) return found.map((product) => ({
			product,
			exact: true
		}));
	}
	let best = null;
	let bestScore = 0;
	for (const p of items) {
		const haystack = [
			p.name,
			p.category,
			p.image_keyword.replace(/-/g, " "),
			...p.keywords || []
		].join(" ").toLowerCase();
		let score = 0;
		for (const w of effectiveTokens) if (w.length >= 3 && haystack.includes(w)) score += 1;
		if (score > bestScore) {
			bestScore = score;
			best = p;
		}
	}
	return best ? [{
		product: best,
		exact: false
	}] : [];
}
var CONFIRM_RE = /^(confirm|done|that'?s all|finish|place( the)? order|checkout|go to cart|i'?m done)\b/i;
var CLEAR_RE = /^(clear|empty)( the| my)? cart\b/i;
var REMOVE_RE = /^(remove|delete|take off|drop)\s+(?:\d+\s+)?(.+)/i;
var ADD_RE = /^(?:add|i need|i want|get me|buy|order|get|please add|can you add)\s+(?:(\d+)\s+)?(.+)/i;
function parseVoiceCommand(raw) {
	const text = raw.trim().replace(/[.!?]+$/, "");
	if (!text) return { action: "noop" };
	if (CONFIRM_RE.test(text)) return { action: "confirm" };
	if (CLEAR_RE.test(text)) return { action: "clear" };
	let m = text.match(REMOVE_RE);
	if (m) return {
		action: "remove",
		item: m[2].trim()
	};
	m = text.match(ADD_RE);
	if (m) return {
		action: "add",
		item: m[2].trim(),
		quantity: m[1] ? parseInt(m[1], 10) : 1
	};
	return {
		action: "add",
		item: text,
		quantity: 1
	};
}
function VoicePage() {
	const { cartItems, addCartItem, removeItem, clearCart } = useStore();
	const navigate = useNavigate();
	const [supported, setSupported] = (0, import_react.useState)(true);
	const [listening, setListening] = (0, import_react.useState)(false);
	const [transcript, setTranscript] = (0, import_react.useState)("");
	const [interim, setInterim] = (0, import_react.useState)("");
	const [log, setLog] = (0, import_react.useState)([]);
	const [manualInput, setManualInput] = (0, import_react.useState)("");
	const [micError, setMicError] = (0, import_react.useState)(null);
	const recognitionRef = (0, import_react.useRef)(null);
	const listeningRef = (0, import_react.useRef)(false);
	const handleCommandRef = (0, import_react.useRef)(() => {});
	function pushLog(entry) {
		setLog((l) => [...l, {
			id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
			...entry
		}]);
	}
	function handleCommand(text) {
		const cmd = parseVoiceCommand(text);
		switch (cmd.action) {
			case "confirm":
				pushLog({
					type: "confirm",
					text: "Confirmed — going to cart"
				});
				setTimeout(() => navigate({ to: "/cart" }), 1e3);
				break;
			case "clear":
				clearCart();
				pushLog({
					type: "cleared",
					text: "Cart cleared"
				});
				break;
			case "remove": {
				if (!cmd.item) break;
				const matches = matchProducts(cmd.item);
				if (matches.length === 0) {
					pushLog({
						type: "unmatched",
						text: `Couldn't find "${cmd.item}" to remove`
					});
					break;
				}
				for (const match of matches) {
					removeItem(match.product.id);
					pushLog({
						type: "removed",
						text: `Removed ${match.product.name}`
					});
				}
				break;
			}
			case "add": {
				if (!cmd.item) break;
				const matches = matchProducts(cmd.item);
				if (matches.length === 0) {
					pushLog({
						type: "unmatched",
						text: `Couldn't find anything like "${cmd.item}"`
					});
					break;
				}
				for (const match of matches) {
					const p = match.product;
					const qty = matches.length === 1 ? cmd.quantity || 1 : 1;
					addCartItem({
						id: p.id,
						name: p.name,
						price: p.price,
						originalPrice: p.original_price ?? void 0,
						category: p.category,
						imageKeyword: p.image_keyword,
						isVegetarian: p.is_vegetarian,
						isEco: p.is_eco,
						etaMinutes: p.eta_minutes,
						brand: p.brand,
						quantity: qty,
						agentSource: "context",
						reasoning: match.exact ? `Added via voice command — "${text}"` : `"${cmd.item}" wasn't available — added the closest match instead.`
					});
					pushLog(match.exact ? {
						type: "added",
						text: `Added ${p.name}${qty > 1 ? ` ×${qty}` : ""}`
					} : {
						type: "substitute",
						text: `"${cmd.item}" unavailable — added ${p.name} instead`
					});
				}
				break;
			}
			default: break;
		}
	}
	(0, import_react.useEffect)(() => {
		handleCommandRef.current = handleCommand;
	});
	(0, import_react.useEffect)(() => {
		const Ctor = window.SpeechRecognition || window.webkitSpeechRecognition;
		if (!Ctor) {
			setSupported(false);
			return;
		}
		const recognition = new Ctor();
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.lang = "en-IN";
		recognition.onresult = (e) => {
			let finalText = "";
			let interimText = "";
			for (let i = e.resultIndex; i < e.results.length; i++) {
				const t = e.results[i][0].transcript;
				if (e.results[i].isFinal) finalText += t;
				else interimText += t;
			}
			setInterim(interimText);
			if (finalText.trim()) {
				const said = finalText.trim();
				setTranscript((prev) => prev ? `${prev} ${said}` : said);
				setInterim("");
				handleCommandRef.current(said);
			}
		};
		recognition.onstart = () => {
			setMicError(null);
		};
		recognition.onerror = (e) => {
			const err = e?.error;
			if (err === "no-speech" || err === "aborted") return;
			listeningRef.current = false;
			setListening(false);
			if (err === "not-allowed" || err === "service-not-allowed") setMicError("Microphone access was blocked. Allow microphone permission for this site (check the icon in your browser's address bar) and tap the mic again.");
			else if (err === "audio-capture") setMicError("No microphone was found on this device.");
			else setMicError(`Voice recognition error: ${err}`);
		};
		recognition.onend = () => {
			if (listeningRef.current) try {
				recognition.start();
			} catch {}
		};
		recognitionRef.current = recognition;
		return () => {
			listeningRef.current = false;
			try {
				recognition.stop();
			} catch {}
		};
	}, []);
	function toggleListening() {
		if (!recognitionRef.current) return;
		if (listening) {
			listeningRef.current = false;
			setListening(false);
			setInterim("");
			try {
				recognitionRef.current.stop();
			} catch {}
		} else {
			setMicError(null);
			listeningRef.current = true;
			setListening(true);
			try {
				recognitionRef.current.start();
			} catch (err) {
				listeningRef.current = false;
				setListening(false);
				setMicError(err?.message || "Couldn't start voice recognition. Try again or use the text input below.");
			}
		}
	}
	function submitManual(e) {
		e.preventDefault();
		const text = manualInput.trim();
		if (!text) return;
		setTranscript((prev) => prev ? `${prev} ${text}` : text);
		handleCommand(text);
		setManualInput("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layout, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-[600px] mx-auto px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			className: "az-link text-[13px] inline-flex items-center gap-1 mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" }), " Exit Voice Mode"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "az-card p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-[24px] font-bold",
					children: "Voice / Hands-Busy Mode"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[13px] text-[#565959] mt-1",
					children: supported ? `Tap the mic and tell Now what to add — e.g. "Add milk" or "I need 2 bread".` : "Voice input isn't supported in this browser — type a command below instead."
				}),
				supported && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: toggleListening,
					className: `relative w-32 h-32 mx-auto mt-8 rounded-full text-white flex items-center justify-center shadow-lg ${listening ? "bg-[#cc6600] hover:bg-[#b35900]" : "bg-[#ff9900] hover:bg-[#f08804]"}`,
					children: [listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicOff, { className: "w-12 h-12" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "w-12 h-12" }), listening && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full border-4 border-[#ff9900] animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute -inset-4 rounded-full border-2 border-[#ff9900]/40 animate-ping",
						style: { animationDelay: "0.4s" }
					})] })]
				}),
				micError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-start gap-2 text-[13px] text-left bg-[#fdf2f2] text-[#b12704] rounded p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: micError })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 min-h-[60px] border border-[#d5d9d9] rounded p-4 text-left bg-[#fafafa]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] text-[#565959] uppercase tracking-wide mb-1",
						children: "Transcript"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[15px]",
						children: [transcript || (listening ? "Listening..." : "Tap the mic, or type a command below"), interim && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[#888]",
							children: [" ", interim]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submitManual,
					className: "flex gap-1 mt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: manualInput,
						onChange: (e) => setManualInput(e.target.value),
						placeholder: "e.g. \"Add rice\" or \"remove milk\"",
						className: "flex-1 border border-[#d5d9d9] rounded px-2 py-1.5 text-[13px]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "btn-az-yellow text-[12px] px-3",
						children: "Send"
					})]
				}),
				log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-1.5 mt-5 text-left",
					children: log.slice().reverse().map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `flex items-center gap-2 text-[13px] rounded px-2 py-1.5 ${entry.type === "added" || entry.type === "confirm" ? "bg-[#f0f9f0] text-[#007600]" : entry.type === "substitute" ? "bg-[#fff8ed] text-[#cc6600]" : entry.type === "removed" || entry.type === "cleared" ? "bg-[#f3f3f3] text-[#565959]" : "bg-[#fdf2f2] text-[#b12704]"}`,
						children: [
							(entry.type === "added" || entry.type === "confirm") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-4 h-4 shrink-0" }),
							entry.type === "substitute" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4 shrink-0" }),
							(entry.type === "removed" || entry.type === "cleared") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 shrink-0" }),
							entry.type === "unmatched" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.text })
						]
					}, entry.id))
				}),
				cartItems.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-center justify-between border-t border-[#d5d9d9] pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[13px] flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "w-4 h-4" }),
							" ",
							cartItems.reduce((n, i) => n + i.quantity, 0),
							" item(s) — ₹",
							cartTotal(cartItems)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cart",
						className: "az-link text-[13px] font-semibold flex items-center gap-1",
						children: ["Go to Cart ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-4 h-4" })]
					})]
				})
			]
		})]
	}) });
}
//#endregion
export { VoicePage as component };
