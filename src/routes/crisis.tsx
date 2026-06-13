import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useStore, cartTotal, crisisItemsFor } from "@/store";
import { AlertTriangle, Zap } from "lucide-react";

export const Route = createFileRoute("/crisis")({
  head: () => ({ meta: [{ title: "Crisis Mode — Now" }] }),
  component: CrisisPage,
});

const LABELS: Record<string, string> = {
  power_cut: "Power Cut",
  medical: "Medical Emergency",
  baby: "Baby Needs",
  security: "Security Concern",
  natural_event: "Severe Weather",
  custom: "Your Situation",
};

function CrisisPage() {
  const { crisisType, crisisCustomText, openCrisisTriage, placeOrder, setCheckoutSource } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!crisisType) openCrisisTriage();
  }, [crisisType]);

  if (!crisisType) {
    return (
      <Layout>
        <div className="max-w-[1500px] mx-auto px-4 py-12 text-center">
          <div className="az-card p-8 max-w-md mx-auto">
            <AlertTriangle className="w-12 h-12 mx-auto text-[#b12704]" />
            <h1 className="text-[20px] font-bold mt-3">Choose your situation</h1>
            <p className="text-[13px] text-[#565959] mt-2">Pick the crisis type to see tailored essentials.</p>
            <button onClick={openCrisisTriage} className="btn-az-orange px-6 py-2 mt-4 font-semibold">Open Triage →</button>
          </div>
        </div>
      </Layout>
    );
  }

  const items = crisisItemsFor(crisisType, crisisCustomText);
  const total = cartTotal(items);
  const label = crisisType === "custom" ? (crisisCustomText || "Your Situation") : LABELS[crisisType];

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 space-y-4">
        <div className="az-card border-l-4 border-l-[#b12704] p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-[#b12704]" />
          <div className="flex-1">
            <div className="font-bold text-[16px] text-[#b12704]">🚨 Crisis Mode — {label} — showing the fastest essentials for this.</div>
            <div className="text-[13px] text-[#565959]">Filters, alternatives, and reasoning are minimized. Speed first.</div>
          </div>
          <button onClick={openCrisisTriage} className="az-link text-[13px]">Change situation</button>
          <Link to="/results" className="az-link text-[13px]">Full results →</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          <section className="space-y-4">
            <AnimatePresence mode="popLayout">
              <motion.div key={crisisType + crisisCustomText} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {items.map((it) => (
                  <motion.div key={it.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="az-card p-4 relative">
                    <div className="absolute top-2 right-2 bg-[#b12704] text-white text-[11px] font-bold px-2 py-1 rounded">ETA: {it.etaMinutes} min</div>
                    <div className="aspect-square bg-[#f3f3f3] rounded overflow-hidden mb-3">
                      <ProductImage keyword={it.imageKeyword} seed={it.id} size={400} className="w-full h-full object-cover" />
                    </div>
                    <div className="font-semibold text-[15px]">{it.name}</div>
                    <div className="text-[20px] font-bold mt-1">₹{it.price}</div>
                    {it.crisisReason && (
                      <div className="mt-2 text-[11px] font-semibold bg-[#fde2e0] text-[#b12704] border border-[#b12704]/30 px-2 py-1 rounded inline-block">{it.crisisReason}</div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>

          <aside className="lg:sticky lg:top-4 h-fit space-y-3">
            <div className="az-card p-5 space-y-3 border-l-4 border-l-[#b12704]">
              <div className="flex justify-between text-[14px]"><span>Total ({items.length} items)</span><span className="font-bold">₹{total}</span></div>
              <div className="text-[12px] text-[#565959]">Billed automatically to your saved UPI.</div>
              <button
                onClick={() => {
                  setCheckoutSource("personal");
                  // simulate immediate crisis order
                  const id = placeOrder() || `NOW-2026-${Math.floor(10000 + Math.random() * 89999)}`;
                  navigate({ to: "/tracking/$orderId", params: { orderId: id } });
                }}
                className="w-full py-3 bg-[#b12704] hover:bg-[#8f1f03] text-white rounded font-bold flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" /> Confirm & Send Now
              </button>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
