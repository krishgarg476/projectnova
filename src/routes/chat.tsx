import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { useStore } from "@/store";
import { Send, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "Chat Shopping — Now" }] }),
  component: ChatPage,
});

interface Msg { id: string; role: "user" | "ai"; text?: string; chips?: { name: string; price: number; imageKeyword: string }[]; added?: boolean; }

function chipsForQuery(q: string): Msg["chips"] {
  const l = q.toLowerCase();
  if (/maggi|noodles|cooking/.test(l)) return [
    { name: "Maggi Noodles (2-pack)", price: 48, imageKeyword: "maggi-noodles" },
    { name: "Onion 1kg", price: 40, imageKeyword: "onion" },
    { name: "Tomato 500g", price: 30, imageKeyword: "tomato" },
    { name: "Extra Masala Sachet", price: 10, imageKeyword: "spice-sachet" },
  ];
  if (/sick|fever|unwell|cold/.test(l)) return [
    { name: "ORS Hydration Sachets", price: 120, imageKeyword: "ors-sachet" },
    { name: "Paracetamol 500mg", price: 35, imageKeyword: "paracetamol" },
    { name: "Real Fruit Juice 1L", price: 130, imageKeyword: "fruit-juice" },
  ];
  if (/week|restock|grocer|household/.test(l)) return [
    { name: "Amul Milk 2L", price: 128, imageKeyword: "milk-carton" },
    { name: "Lactose-Free Almond Milk 1L", price: 220, imageKeyword: "almond-milk" },
    { name: "Basmati Rice 5kg", price: 549, imageKeyword: "basmati-rice" },
    { name: "Toor Dal 1kg", price: 169, imageKeyword: "toor-dal" },
    { name: "Mixed Vegetables 2kg", price: 280, imageKeyword: "mixed-vegetables" },
  ];
  return [
    { name: "Quick Snack Pack", price: 199, imageKeyword: "snack-pack" },
    { name: "Cold Drink 1L", price: 80, imageKeyword: "cold-drink" },
  ];
}

const SEED: Msg[] = [
  { id: "u1", role: "user", text: "Need maggi ingredients" },
  { id: "a1", role: "ai", text: "Got it! Here's what you'll need:", chips: chipsForQuery("maggi") },
  { id: "u2", role: "user", text: "Feeling sick — what should I get?" },
  { id: "a2", role: "ai", text: "Sorry to hear. Here are wellness essentials:", chips: chipsForQuery("sick") },
  { id: "u3", role: "user", text: "Weekly grocery restock for the family" },
  { id: "a3", role: "ai", text: "Here's a full household restock for your family of 4 — includes a lactose-free option for your household profile:", chips: chipsForQuery("weekly restock") },
];

function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>(SEED);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const addCart = useStore((s) => s.addCartItem);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

  function send() {
    const q = text.trim();
    if (!q) return;
    const uId = `u-${Date.now()}`;
    setMsgs((m) => [...m, { id: uId, role: "user", text: q }]);
    setText("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: `a-${Date.now()}`, role: "ai", text: "Here's what I found:", chips: chipsForQuery(q) }]);
    }, 1000);
  }

  function addAll(msgId: string, chips: Msg["chips"]) {
    if (!chips) return;
    chips.forEach((c, i) => addCart({ id: `${msgId}-${i}`, name: c.name, price: c.price, imageKeyword: c.imageKeyword, reasoning: "Added from chat" }));
    setMsgs((m) => m.map((x) => x.id === msgId ? { ...x, added: true } : x));
  }

  return (
    <Layout>
      <div className="max-w-[760px] mx-auto px-4 py-5">
        <div className="az-card flex flex-col h-[75vh]">
          <div className="border-b border-[#d5d9d9] p-3 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#5848bc]" />
            <div className="font-bold">Chat Shopping</div>
            <span className="ml-auto text-[12px] text-[#565959]">Now AI · Always on</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#fafafa]">
            <AnimatePresence>
              {msgs.map((m) => (
                <motion.div key={m.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] rounded-lg p-3 text-[13px] ${m.role === "user" ? "bg-[#dcf8c6] text-[#0f1111]" : "bg-white border border-[#d5d9d9]"}`}>
                    {m.text && <div>{m.text}</div>}
                    {m.chips && (
                      <div className="mt-2 space-y-1">
                        {m.chips.map((c, i) => (
                          <div key={i} className="flex items-center gap-2 bg-[#f3f3f3] rounded px-2 py-1 text-[12px]">
                            <span className="text-[#007600]">✓</span>
                            <span className="flex-1">{c.name}</span>
                            <span className="text-[11px] text-[#565959]">₹{c.price}</span>
                          </div>
                        ))}
                        {!m.added ? (
                          <button onClick={() => addAll(m.id, m.chips)} className="btn-az-yellow w-full mt-2 text-[12px]">Add all to cart →</button>
                        ) : (
                          <div className="text-[12px] text-[#007600] font-semibold mt-1">Added to cart ✓</div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <motion.div key="typing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white border border-[#d5d9d9] rounded-lg p-3 flex gap-1">
                    {[0, 1, 2].map((i) => <motion.span key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} className="w-2 h-2 rounded-full bg-[#5848bc]" />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={endRef} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="border-t border-[#d5d9d9] p-3 flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your situation or what you need..." className="flex-1 border border-[#d5d9d9] rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#ff9900]" />
            <button type="submit" className="btn-az-orange px-4 flex items-center justify-center"><Send className="w-4 h-4" /></button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
