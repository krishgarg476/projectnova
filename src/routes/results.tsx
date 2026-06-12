import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { useStore, cartTotal } from "@/store";
import { Zap, Brain, HeartPulse, AlertTriangle, Check, Loader2, Plus } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "AI Council — Now" },
      { name: "description", content: "Three AI agents reasoning live to build your urgent cart." },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  const { searchQuery, agentVerdicts, cartItems, skippedItems, urgencyLevel, addSkippedItem, generateResults, addCartItem } = useStore();
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!searchQuery) generateResults("daily restock");
  }, []);

  useEffect(() => {
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1300);
    const t3 = setTimeout(() => setStep(3), 2100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [searchQuery]);

  const AGENTS = [
    { key: "speed", icon: Zap, name: "Speed Agent", color: "#ff9900", verdict: agentVerdicts.speed },
    { key: "context", icon: Brain, name: "Context Agent", color: "#5848bc", verdict: agentVerdicts.context },
    { key: "health", icon: HeartPulse, name: "Health & Budget Agent", color: "#007600", verdict: agentVerdicts.health },
  ];

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-5">
        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="az-card p-4">
            <div className="text-[12px] text-[#565959] uppercase tracking-wide mb-1">Now is analyzing</div>
            <div className="border border-[#d5d9d9] rounded p-2 bg-[#f7f7f7] text-[13px] italic">"{searchQuery || "daily restock"}"</div>
          </div>
          <div className="az-card p-4">
            <div className="font-bold text-[14px] mb-2">AI Agents</div>
            {AGENTS.map((a, i) => (
              <div key={a.key} className="flex items-center gap-2 py-1.5 text-[13px]">
                <a.icon className="w-4 h-4" style={{ color: a.color }} />
                <span className="flex-1">{a.name}</span>
                {step > i ? (
                  <span className="text-[11px] text-[#007600] font-semibold">✓ Done</span>
                ) : (
                  <Loader2 className="w-3 h-3 animate-spin text-[#565959]" />
                )}
              </div>
            ))}
          </div>
          <div className="az-card p-4">
            <div className="font-bold text-[14px] mb-2">Refine your cart</div>
            {["Vegetarian only", "Budget-friendly", "Fastest delivery only", "Eco-friendly picks"].map((l) => (
              <label key={l} className="flex items-center gap-2 py-1 text-[13px] cursor-pointer">
                <input type="checkbox" className="accent-[#ff9900]" />
                {l}
              </label>
            ))}
          </div>
        </aside>

        {/* Main */}
        <section className="space-y-4 min-w-0">
          {/* Filter pills */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["AI Recommended", "Fastest Arrival", "Best Value", "Most Relevant", "Eco-Friendly"].map((p, i) => (
              <button key={p} className={`px-3 py-1.5 rounded-full text-[12px] border whitespace-nowrap ${i === 0 ? "bg-[#0f1111] text-white border-[#0f1111]" : "bg-white border-[#d5d9d9] hover:border-[#0f1111]"}`}>{p}</button>
            ))}
          </div>

          {/* Council summary */}
          <div className="az-card p-5">
            <div className="font-bold text-[16px] mb-3 flex items-center gap-2">AI Council Verdicts</div>
            <div className="space-y-2">
              {AGENTS.map((a, i) => (
                <motion.div
                  key={a.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={step > i ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-start gap-3 p-3 rounded-md border border-[#d5d9d9]"
                  style={{ background: step > i ? "#fafafa" : "white" }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${a.color}22` }}>
                    <a.icon className="w-5 h-5" style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13px]">{a.name}</div>
                    <div className="text-[13px] text-[#565959]">{step > i ? a.verdict : "Analyzing..."}</div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${step > i ? "bg-[#e6f4ea] text-[#007600]" : "bg-[#f3f3f3] text-[#565959]"}`}>
                    {step > i ? "Resolved ✓" : "Analyzing..."}
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="text-[14px] mt-3"><b>Cart optimized for:</b> {searchQuery}</p>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cartItems.map((it) => (
              <ProductCard
                key={it.id}
                p={{ id: it.id, name: it.name, emoji: it.emoji || "🛒", price: it.price, originalPrice: it.originalPrice, reasoning: it.reasoning, agent: it.agentSource }}
                onAdd={() => addCartItem({ ...it })}
              />
            ))}
          </div>

          {/* Considered & Skipped */}
          {skippedItems.length > 0 && (
            <div className="az-card p-5">
              <h3 className="font-bold text-[15px] mb-3">Considered & Skipped — Why not included?</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {skippedItems.map((sk) => (
                  <div key={sk.id} className="min-w-[200px] az-card p-3 opacity-60 hover:opacity-100 transition">
                    <div className="bg-[#f3f3f3] aspect-square rounded flex items-center justify-center text-5xl mb-2">{sk.emoji}</div>
                    <div className="text-[13px] font-semibold line-clamp-1">{sk.name}</div>
                    <div className="text-[11px] text-[#565959] mt-1 line-clamp-2">{sk.reasoning}</div>
                    <button onClick={() => addSkippedItem(sk.id)} className="btn-az-yellow mt-2 w-full flex items-center justify-center gap-1"><Plus className="w-3 h-3" /> Add anyway</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Sticky mini cart */}
        <aside className="lg:sticky lg:top-4 h-fit">
          {urgencyLevel === "critical" ? (
            <div className="az-card border-l-4 border-l-[#b12704] p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#b12704] font-bold"><AlertTriangle className="w-5 h-5" /> Crisis situation detected</div>
              <p className="text-[13px] text-[#565959]">We've spotted urgent signals. Switch to a streamlined, speed-first checkout.</p>
              <button onClick={() => navigate({ to: "/crisis" })} className="btn-az-orange w-full py-2 font-semibold">Switch to Crisis Mode →</button>
            </div>
          ) : (
            <div className="az-card p-5 space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px]">Subtotal ({cartItems.length} items)</span>
                <span className="text-[18px] font-bold">₹{cartTotal(cartItems)}</span>
              </div>
              <div className="text-[12px] text-[#007600] flex items-center gap-1"><Check className="w-3 h-3" /> Eligible for Now Express (11 min)</div>
              <button onClick={() => navigate({ to: "/cart" })} className="btn-az-yellow w-full py-2 font-semibold">Proceed to Cart →</button>
              <button onClick={() => navigate({ to: "/checkout" })} className="btn-az-orange w-full py-2 font-semibold">Buy Now</button>
            </div>
          )}
          <Link to="/" className="az-link text-[13px] block mt-3 text-center">← Back to home</Link>
        </aside>
      </div>
    </Layout>
  );
}
