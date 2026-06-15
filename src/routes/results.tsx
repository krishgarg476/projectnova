import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { useStore, cartTotal, type CartItem } from "@/store";
import { Zap, Brain, HeartPulse, AlertTriangle, Check, Loader2, Plus } from "lucide-react";

export const Route = createFileRoute("/results")({
  head: () => ({ meta: [{ title: "AI Council — Now" }] }),
  component: ResultsPage,
});

type FilterKey = "veg" | "budget" | "fast" | "eco";
type SortKey = "ai" | "fast" | "value" | "relevant" | "eco";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "veg", label: "Vegetarian only" },
  { key: "budget", label: "Budget-friendly" },
  { key: "fast", label: "Fastest delivery only" },
  { key: "eco", label: "Eco-friendly picks" },
];

const SORTS: { key: SortKey; label: string }[] = [
  { key: "ai", label: "AI Recommended" },
  { key: "fast", label: "Fastest Arrival" },
  { key: "value", label: "Best Value" },
  { key: "relevant", label: "Most Relevant" },
  { key: "eco", label: "Eco-Friendly" },
];

function ResultsPage() {
  const { searchQuery, agentVerdicts, cartItems, skippedItems, urgencyLevel, recipeMeta, addSkippedItem, generateResults, addCartItem, isGenerating } = useStore();
  const [step, setStep] = useState(0);
  const [filters, setFilters] = useState<Record<FilterKey, boolean>>({ veg: false, budget: false, fast: false, eco: false });
  const [sort, setSort] = useState<SortKey>("ai");
  const navigate = useNavigate();

  useEffect(() => { if (!searchQuery) generateResults("daily restock"); }, []);

  useEffect(() => {
    if (isGenerating) {
      setStep(-1);
    } else {
      setStep(0);
      const t1 = setTimeout(() => setStep(1), 300);
      const t2 = setTimeout(() => setStep(2), 600);
      const t3 = setTimeout(() => setStep(3), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [isGenerating]);

  const filtered = useMemo(() => {
    return cartItems.filter((i) => {
      if (filters.veg && !i.isVegetarian) return false;
      if (filters.budget && i.price > 300) return false;
      if (filters.fast && i.etaMinutes > 10) return false;
      if (filters.eco && !i.isEco) return false;
      return true;
    });
  }, [cartItems, filters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "fast") arr.sort((a, b) => a.etaMinutes - b.etaMinutes);
    else if (sort === "value") arr.sort((a, b) => b.discountPercent - a.discountPercent);
    else if (sort === "relevant") arr.sort((a, b) => b.relevanceScore - a.relevanceScore);
    else if (sort === "eco") arr.sort((a, b) => Number(b.isEco) - Number(a.isEco));
    return arr;
  }, [filtered, sort]);

  const AGENTS = [
    { key: "speed", icon: Zap, name: "Speed Agent", color: "#ff9900", verdict: agentVerdicts.speed },
    { key: "context", icon: Brain, name: "Context Agent", color: "#5848bc", verdict: agentVerdicts.context },
    { key: "health", icon: HeartPulse, name: "Health & Budget Agent", color: "#007600", verdict: agentVerdicts.health },
  ];

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-[260px_1fr_320px] gap-5">
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
                {step > i ? <span className="text-[11px] text-[#007600] font-semibold">✓ Done</span> : <Loader2 className="w-3 h-3 animate-spin text-[#565959]" />}
              </div>
            ))}
          </div>
          <div className="az-card p-4">
            <div className="font-bold text-[14px] mb-2">Refine your cart</div>
            {FILTERS.map((f) => {
              const active = filters[f.key];
              return (
                <motion.button
                  key={f.key}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setFilters((s) => ({ ...s, [f.key]: !s[f.key] }))}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 mb-1 text-[13px] text-left rounded border transition-colors ${active ? "border-[#ff9900] bg-[#fff3e0]" : "border-transparent hover:border-[#d5d9d9] bg-white"}`}
                >
                  <span className={`w-4 h-4 rounded border flex items-center justify-center ${active ? "bg-[#ff9900] border-[#ff9900]" : "border-[#d5d9d9]"}`}>
                    <AnimatePresence>
                      {active && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", stiffness: 500, damping: 25 }}><Check className="w-3 h-3 text-white" /></motion.span>}
                    </AnimatePresence>
                  </span>
                  {f.label}
                </motion.button>
              );
            })}
            <div className="text-[11px] text-[#565959] mt-2">Showing {sorted.length} of {cartItems.length} items</div>
          </div>
        </aside>

        <section className="space-y-4 min-w-0">
          {recipeMeta && !isGenerating && (
            <div className="az-card p-5 bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] border border-[#fdba74]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-[20px] font-bold text-[#9a3412] capitalize">{recipeMeta.meal}</h2>
                  <p className="text-[14px] text-[#78350f]">Ingredients scaled exactly for {recipeMeta.people} people</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[13px] font-semibold text-[#b45309] bg-[#ffedd5] px-3 py-1 rounded-full border border-[#fdba74]">⏱ {recipeMeta.cookTime}</span>
                  <span className={`text-[12px] font-semibold px-3 py-1 rounded-full border ${
                    recipeMeta.difficulty === 'Easy' ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' : 
                    recipeMeta.difficulty === 'Medium' ? 'bg-[#fef08a] text-[#854d0e] border-[#fde047]' : 
                    'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                  }`}>
                    {recipeMeta.difficulty}
                  </span>
                </div>
              </div>
            </div>
          )}

          <LayoutGroup>
            <div className="flex gap-2 overflow-x-auto pb-2 relative">
              {SORTS.map((s) => {
                const active = sort === s.key;
                return (
                  <button key={s.key} onClick={() => setSort(s.key)} className={`relative px-3 py-1.5 rounded-full text-[12px] whitespace-nowrap transition-colors ${active ? "text-white" : "text-[#0f1111] border border-[#d5d9d9] hover:border-[#0f1111]"}`}>
                    {active && <motion.span layoutId="sortIndicator" className="absolute inset-0 bg-[#0f1111] rounded-full -z-10" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                    <span className="relative z-10">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="az-card p-5">
            <div className="font-bold text-[16px] mb-3">AI Council Verdicts</div>
            <div className="space-y-2">
              {AGENTS.map((a, i) => (
                <motion.div key={a.key} initial={{ opacity: 0, x: -10 }} animate={step > i ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -10 }} transition={{ duration: 0.4 }} className="flex items-start gap-3 p-3 rounded-md border border-[#d5d9d9]" style={{ background: step > i ? "#fafafa" : "white" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: `${a.color}22` }}>
                    <a.icon className={`w-5 h-5 ${step <= i ? "animate-spin" : ""}`} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13px]">{a.name}</div>
                    <div className="text-[13px] text-[#565959]">{step > i ? a.verdict : "Analyzing..."}</div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-1 rounded-full ${step > i ? "bg-[#e6f4ea] text-[#007600]" : "bg-[#f3f3f3] text-[#565959]"}`}>{step > i ? "Resolved ✓" : "Analyzing..."}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#565959] az-card min-h-[300px]">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#ff9900]" />
              <div className="font-bold text-[18px] text-[#0f1111]">Curating products...</div>
              <div className="text-[13px] mt-1">The AI Council is debating the best items for you.</div>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <AnimatePresence>
                {sorted.map((it) => (
                  <motion.div key={it.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9, height: 0 }} transition={{ duration: 0.25 }}>
                    <ProductCard p={{ id: it.id, name: it.name, imageKeyword: it.imageKeyword, price: it.price, originalPrice: it.originalPrice, reasoning: it.reasoning, agent: it.agentSource, brand: it.brand, isEco: it.isEco }} onAdd={() => addCartItem({ ...it })} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {skippedItems.length > 0 && (
            <div className="az-card p-5">
              <h3 className="font-bold text-[15px] mb-3">Considered & Skipped — Why not included?</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {skippedItems.map((sk) => (
                  <div key={sk.id} className="min-w-[200px] az-card p-3 opacity-60 hover:opacity-100 transition">
                    <div className="aspect-square rounded bg-[#f3f3f3] overflow-hidden mb-2">
                      <ProductImage keyword={sk.imageKeyword} seed={sk.id} size={200} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[13px] font-semibold line-clamp-1">{sk.name}</div>
                    <div className="text-[11px] text-[#565959] mt-1 line-clamp-2">{sk.reasoning}</div>
                    <button onClick={() => addSkippedItem(sk.id)} className="btn-az-yellow mt-2 w-full flex items-center justify-center gap-1"><Plus className="w-3 h-3" /> Add anyway</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

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
                <span className="text-[18px] font-bold">₹{cartTotal(cartItems as CartItem[])}</span>
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
