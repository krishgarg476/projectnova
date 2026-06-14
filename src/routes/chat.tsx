import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useStore } from "@/store";
import { Send, MessageCircle, Sparkles, ShoppingCart, Check, Loader2 } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat Shopping — Now" }] }),
  component: ChatPage,
});

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageKeyword: string;
  category: string;
  brand?: string;
  etaMinutes: number;
}

interface Msg {
  id: string;
  role: "user" | "ai";
  text?: string;
  products?: Product[];
  added?: boolean;
  isError?: boolean;
}

// Quick suggestion chips for common situations
const QUICK_SUGGESTIONS = [
  "Need maggi ingredients",
  "Feeling sick — what should I get?",
  "Friends coming over tonight",
  "Weekly grocery restock",
  "Power cut at home!",
  "Kids need snacks for school",
];

function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const addCart = useStore((s) => s.addCartItem);
  const dietaryPreferences = useStore((s) => s.dietaryPreferences);
  const familyMembers = useStore((s) => s.familyMembers);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  // Build family context string for AI
  const familyContext = familyMembers
    .map((m) => `${m.name} (age ${m.age}${m.note ? ", " + m.note : ""})`)
    .join("; ");

  const send = useCallback(async (overrideText?: string) => {
    const q = (overrideText || text).trim();
    if (!q || typing) return;

    const uId = `u-${Date.now()}`;
    setMsgs((m) => [...m, { id: uId, role: "user", text: q }]);
    setText("");
    setTyping(true);
    setShowSuggestions(false);

    try {
      // Build history for context
      const history = msgs
        .filter((m) => m.text)
        .map((m) => ({ role: m.role, text: m.text! }));

      const { chatMessageFn } = await import("@/lib/api/chat.functions");

      const result = await chatMessageFn({
        data: {
          message: q,
          history,
          dietary: dietaryPreferences,
          familyContext,
        },
      });

      setTyping(false);
      setMsgs((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "ai",
          text: result.reply,
          products: result.products.length > 0 ? result.products : undefined,
        },
      ]);
    } catch (error: any) {
      console.error("Chat AI error:", error);
      setTyping(false);
      // Extract a clean error message, strip raw JSON
      const rawMsg = String(error.message || error || "");
      const cleanMsg = rawMsg.includes("429") || rawMsg.includes("quota")
        ? "I'm a bit busy right now — please wait a moment and try again!"
        : rawMsg.length > 100
          ? "Something went wrong. Please try again in a moment."
          : rawMsg;
      setMsgs((m) => [
        ...m,
        {
          id: `a-${Date.now()}`,
          role: "ai",
          text: cleanMsg,
          isError: true,
        },
      ]);
    }
  }, [text, typing, msgs, dietaryPreferences, familyContext]);

  function addAll(msgId: string, products: Product[]) {
    if (!products) return;
    products.forEach((p) =>
      addCart({
        id: `chat-${p.id}-${Date.now()}`,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice,
        imageKeyword: p.imageKeyword,
        category: p.category,
        brand: p.brand,
        reasoning: "Added from AI chat suggestion",
        etaMinutes: p.etaMinutes,
      })
    );
    setMsgs((m) =>
      m.map((x) => (x.id === msgId ? { ...x, added: true } : x))
    );
  }

  function addSingle(msgId: string, product: Product) {
    addCart({
      id: `chat-${product.id}-${Date.now()}`,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      imageKeyword: product.imageKeyword,
      category: product.category,
      brand: product.brand,
      reasoning: "Added from AI chat suggestion",
      etaMinutes: product.etaMinutes,
    });
  }

  return (
    <Layout>
      <div className="max-w-[760px] mx-auto px-4 py-5">
        <div className="az-card flex flex-col h-[75vh]">
          {/* Header */}
          <div className="border-b border-[#d5d9d9] p-3 flex items-center gap-2">
            <div className="relative">
              <MessageCircle className="w-5 h-5 text-[#5848bc]" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00a650] rounded-full animate-pulse" />
            </div>
            <div className="font-bold">Chat Shopping</div>
            <div className="flex items-center gap-1 ml-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#ff9900]" />
              <span className="text-[12px] text-[#565959]">
                Now AI · Real-time
              </span>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafafa]">
            {/* Welcome message if empty */}
            {msgs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-[#ff9900] to-[#ff6600] flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-[15px] font-bold text-[#0f1111] mb-1">
                  Hi Krish! I'm your Now AI assistant
                </h3>
                <p className="text-[13px] text-[#565959] max-w-[320px] mx-auto">
                  Tell me what you need or describe your situation — I'll find
                  the right products for you in real time.
                </p>
              </motion.div>
            )}

            {/* Quick suggestions */}
            {showSuggestions && msgs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 justify-center"
              >
                {QUICK_SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[12px] px-3 py-1.5 rounded-full border border-[#d5d9d9] bg-white hover:bg-[#fff3e0] hover:border-[#ff9900] transition-all text-[#0f1111] cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}

            <AnimatePresence>
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 text-[13px] ${
                      m.role === "user"
                        ? "bg-[#dcf8c6] text-[#0f1111]"
                        : m.isError
                          ? "bg-[#fff0f0] border border-[#ffcccc] text-[#b12704]"
                          : "bg-white border border-[#d5d9d9]"
                    }`}
                  >
                    {m.text && <div>{m.text}</div>}
                    {m.products && m.products.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {m.products.map((p) => (
                          <div
                            key={p.id}
                            className="flex items-center gap-2 bg-[#f3f3f3] rounded px-2 py-1.5 text-[12px] group"
                          >
                            <span className="text-[#007600]">✓</span>
                            <div className="flex-1 min-w-0">
                              <span className="font-medium">{p.name}</span>
                              {p.brand && (
                                <span className="text-[10px] text-[#565959] ml-1">
                                  by {p.brand}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {p.originalPrice && p.originalPrice > p.price && (
                                <span className="text-[10px] text-[#565959] line-through">
                                  ₹{p.originalPrice}
                                </span>
                              )}
                              <span className="text-[11px] text-[#565959] font-medium">
                                ₹{p.price}
                              </span>
                              {!m.added && (
                                <button
                                  onClick={() => addSingle(m.id, p)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-[#e3e3e3]"
                                  title="Add to cart"
                                >
                                  <ShoppingCart className="w-3 h-3 text-[#007185]" />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#565959]">
                          <span>
                            ⚡ Delivery in ~{Math.min(...m.products.map((p) => p.etaMinutes))} min
                          </span>
                          <span>·</span>
                          <span>
                            Total: ₹{m.products.reduce((s, p) => s + p.price, 0)}
                          </span>
                        </div>
                        {!m.added ? (
                          <button
                            onClick={() => addAll(m.id, m.products!)}
                            className="btn-az-yellow w-full mt-2 text-[12px] flex items-center justify-center gap-1"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            Add all to cart →
                          </button>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center justify-center gap-1 text-[12px] text-[#007600] font-semibold mt-1 py-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Added to cart
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-[#d5d9d9] rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 text-[#5848bc] animate-spin" />
                    <span className="text-[12px] text-[#565959]">Now AI is thinking...</span>
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                          className="w-1.5 h-1.5 rounded-full bg-[#5848bc]"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-[#d5d9d9] p-3 flex gap-2"
          >
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                typing
                  ? "Now AI is responding..."
                  : "Type your situation or what you need..."
              }
              disabled={typing}
              className="flex-1 border border-[#d5d9d9] rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#ff9900] disabled:opacity-50 disabled:bg-[#f7f7f7]"
            />
            <button
              type="submit"
              disabled={typing || !text.trim()}
              className="btn-az-orange px-4 flex items-center justify-center disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
