import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Mic, MicOff, X, Check, AlertCircle, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useStore, cartTotal } from "@/store";
import { matchProducts, parseVoiceCommand } from "@/lib/voiceMatch";

export const Route = createFileRoute("/voice")({
  head: () => ({ meta: [{ title: "Voice Mode — Now" }] }),
  component: VoicePage,
});

interface LogEntry {
  id: string;
  type: "added" | "substitute" | "removed" | "cleared" | "unmatched" | "confirm";
  text: string;
}

function VoicePage() {
  const { cartItems, addCartItem, removeItem, clearCart } = useStore();
  const navigate = useNavigate();

  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [manualInput, setManualInput] = useState("");
  const [micError, setMicError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const listeningRef = useRef(false);
  const handleCommandRef = useRef<(text: string) => void>(() => {});

  function pushLog(entry: Omit<LogEntry, "id">) {
    setLog((l) => [...l, { id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, ...entry }]);
  }

  function handleCommand(text: string) {
    const cmd = parseVoiceCommand(text);

    switch (cmd.action) {
      case "confirm":
        pushLog({ type: "confirm", text: "Confirmed — going to cart" });
        setTimeout(() => navigate({ to: "/cart" }), 1000);
        break;

      case "clear":
        clearCart();
        pushLog({ type: "cleared", text: "Cart cleared" });
        break;

      case "remove": {
        if (!cmd.item) break;
        const matches = matchProducts(cmd.item);
        if (matches.length === 0) {
          pushLog({ type: "unmatched", text: `Couldn't find "${cmd.item}" to remove` });
          break;
        }
        for (const match of matches) {
          removeItem(match.product.id);
          pushLog({ type: "removed", text: `Removed ${match.product.name}` });
        }
        break;
      }

      case "add": {
        if (!cmd.item) break;
        const matches = matchProducts(cmd.item);
        if (matches.length === 0) {
          pushLog({ type: "unmatched", text: `Couldn't find anything like "${cmd.item}"` });
          break;
        }
        for (const match of matches) {
          const p = match.product;
          const qty = matches.length === 1 ? (cmd.quantity || 1) : 1;
          addCartItem({
            id: p.id,
            name: p.name,
            price: p.price,
            originalPrice: p.original_price ?? undefined,
            category: p.category,
            imageKeyword: p.image_keyword,
            isVegetarian: p.is_vegetarian,
            isEco: p.is_eco,
            etaMinutes: p.eta_minutes,
            brand: p.brand,
            quantity: qty,
            agentSource: "context",
            reasoning: match.exact
              ? `Added via voice command — "${text}"`
              : `"${cmd.item}" wasn't available — added the closest match instead.`,
          });
          pushLog(
            match.exact
              ? { type: "added", text: `Added ${p.name}${qty > 1 ? ` ×${qty}` : ""}` }
              : { type: "substitute", text: `"${cmd.item}" unavailable — added ${p.name} instead` }
          );
        }
        break;
      }

      case "noop":
      default:
        break;
    }
  }

  useEffect(() => {
    handleCommandRef.current = handleCommand;
  });

  useEffect(() => {
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Ctor) {
      setSupported(false);
      return;
    }

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognition.onresult = (e: any) => {
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
        setTranscript((prev) => (prev ? `${prev} ${said}` : said));
        setInterim("");
        handleCommandRef.current(said);
      }
    };

    recognition.onstart = () => {
      setMicError(null);
    };

    recognition.onerror = (e: any) => {
      const err = e?.error;
      // Benign — fires during normal pauses; onend will restart if still listening.
      if (err === "no-speech" || err === "aborted") return;

      listeningRef.current = false;
      setListening(false);
      if (err === "not-allowed" || err === "service-not-allowed") {
        setMicError("Microphone access was blocked. Allow microphone permission for this site (check the icon in your browser's address bar) and tap the mic again.");
      } else if (err === "audio-capture") {
        setMicError("No microphone was found on this device.");
      } else {
        setMicError(`Voice recognition error: ${err}`);
      }
    };

    recognition.onend = () => {
      if (listeningRef.current) {
        try { recognition.start(); } catch {}
      }
    };

    recognitionRef.current = recognition;

    return () => {
      listeningRef.current = false;
      try { recognition.stop(); } catch {}
    };
  }, []);

  function toggleListening() {
    if (!recognitionRef.current) return;
    if (listening) {
      listeningRef.current = false;
      setListening(false);
      setInterim("");
      try { recognitionRef.current.stop(); } catch {}
    } else {
      setMicError(null);
      listeningRef.current = true;
      setListening(true);
      try {
        recognitionRef.current.start();
      } catch (err: any) {
        listeningRef.current = false;
        setListening(false);
        setMicError(err?.message || "Couldn't start voice recognition. Try again or use the text input below.");
      }
    }
  }

  function submitManual(e: React.FormEvent) {
    e.preventDefault();
    const text = manualInput.trim();
    if (!text) return;
    setTranscript((prev) => (prev ? `${prev} ${text}` : text));
    handleCommand(text);
    setManualInput("");
  }

  return (
    <Layout>
      <div className="max-w-[600px] mx-auto px-4 py-12">
        <Link to="/" className="az-link text-[13px] inline-flex items-center gap-1 mb-4"><X className="w-4 h-4" /> Exit Voice Mode</Link>
        <div className="az-card p-8 text-center">
          <h1 className="text-[24px] font-bold">Voice / Hands-Busy Mode</h1>
          <p className="text-[13px] text-[#565959] mt-1">
            {supported
              ? `Tap the mic and tell Now what to add — e.g. "Add milk" or "I need 2 bread".`
              : "Voice input isn't supported in this browser — type a command below instead."}
          </p>

          {supported && (
            <button
              onClick={toggleListening}
              className={`relative w-32 h-32 mx-auto mt-8 rounded-full text-white flex items-center justify-center shadow-lg ${listening ? "bg-[#cc6600] hover:bg-[#b35900]" : "bg-[#ff9900] hover:bg-[#f08804]"}`}
            >
              {listening ? <MicOff className="w-12 h-12" /> : <Mic className="w-12 h-12" />}
              {listening && <>
                <span className="absolute inset-0 rounded-full border-4 border-[#ff9900] animate-ping" />
                <span className="absolute -inset-4 rounded-full border-2 border-[#ff9900]/40 animate-ping" style={{ animationDelay: "0.4s" }} />
              </>}
            </button>
          )}

          {micError && (
            <div className="mt-4 flex items-start gap-2 text-[13px] text-left bg-[#fdf2f2] text-[#b12704] rounded p-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{micError}</span>
            </div>
          )}

          <div className="mt-8 min-h-[60px] border border-[#d5d9d9] rounded p-4 text-left bg-[#fafafa]">
            <div className="text-[11px] text-[#565959] uppercase tracking-wide mb-1">Transcript</div>
            <div className="text-[15px]">
              {transcript || (listening ? "Listening..." : "Tap the mic, or type a command below")}
              {interim && <span className="text-[#888]"> {interim}</span>}
            </div>
          </div>

          <form onSubmit={submitManual} className="flex gap-1 mt-3">
            <input
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder='e.g. "Add rice" or "remove milk"'
              className="flex-1 border border-[#d5d9d9] rounded px-2 py-1.5 text-[13px]"
            />
            <button type="submit" className="btn-az-yellow text-[12px] px-3">Send</button>
          </form>

          {log.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-5 text-left">
              {log.slice().reverse().map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-2 text-[13px] rounded px-2 py-1.5 ${
                    entry.type === "added" || entry.type === "confirm"
                      ? "bg-[#f0f9f0] text-[#007600]"
                      : entry.type === "substitute"
                      ? "bg-[#fff8ed] text-[#cc6600]"
                      : entry.type === "removed" || entry.type === "cleared"
                      ? "bg-[#f3f3f3] text-[#565959]"
                      : "bg-[#fdf2f2] text-[#b12704]"
                  }`}
                >
                  {(entry.type === "added" || entry.type === "confirm") && <Check className="w-4 h-4 shrink-0" />}
                  {entry.type === "substitute" && <ArrowRight className="w-4 h-4 shrink-0" />}
                  {(entry.type === "removed" || entry.type === "cleared") && <Trash2 className="w-4 h-4 shrink-0" />}
                  {entry.type === "unmatched" && <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{entry.text}</span>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="mt-6 flex items-center justify-between border-t border-[#d5d9d9] pt-4">
              <div className="text-[13px] flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" /> {cartItems.reduce((n, i) => n + i.quantity, 0)} item(s) — ₹{cartTotal(cartItems)}
              </div>
              <Link to="/cart" className="az-link text-[13px] font-semibold flex items-center gap-1">
                Go to Cart <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
