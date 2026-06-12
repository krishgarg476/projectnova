import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { useStore, cartTotal } from "@/store";
import { AlertTriangle, Zap } from "lucide-react";

export const Route = createFileRoute("/crisis")({
  head: () => ({ meta: [{ title: "Crisis Mode — Now" }] }),
  component: CrisisPage,
});

function CrisisPage() {
  const { cartItems, urgencyLevel, generateResults } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (urgencyLevel !== "critical") generateResults("power cut, fridge at risk");
  }, []);

  const essentials = cartItems.slice(0, 5);
  const total = cartTotal(essentials);

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 space-y-4">
        <div className="az-card border-l-4 border-l-[#b12704] p-4 flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-[#b12704]" />
          <div className="flex-1">
            <div className="font-bold text-[16px] text-[#b12704]">🚨 Crisis Mode — showing only the fastest essentials</div>
            <div className="text-[13px] text-[#565959]">Filters, alternatives, and reasoning are minimized. Speed first.</div>
          </div>
          <Link to="/results" className="az-link text-[13px]">Show full results instead →</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {essentials.map((it) => (
                <div key={it.id} className="az-card p-4 relative">
                  <div className="absolute top-2 right-2 bg-[#b12704] text-white text-[11px] font-bold px-2 py-1 rounded">ETA: 8 min</div>
                  <div className="aspect-square bg-[#f3f3f3] rounded flex items-center justify-center text-7xl mb-3">{it.emoji || "🛒"}</div>
                  <div className="font-semibold text-[15px]">{it.name}</div>
                  <div className="text-[20px] font-bold mt-1">₹{it.price}</div>
                </div>
              ))}
            </div>
          </section>

          <aside className="lg:sticky lg:top-4 h-fit space-y-3">
            <div className="az-card p-5 space-y-3">
              <div className="text-[14px] font-semibold">Why fewer options?</div>
              <p className="text-[13px] text-[#565959]">In a crisis, Now shows only the essentials that can arrive fastest. No alternatives, no upsells.</p>
            </div>
            <div className="az-card p-5 space-y-3 border-l-4 border-l-[#b12704]">
              <div className="flex justify-between text-[14px]"><span>Total ({essentials.length} items)</span><span className="font-bold">₹{total}</span></div>
              <div className="text-[12px] text-[#565959]">Billed automatically to your saved UPI.</div>
              <button onClick={() => navigate({ to: "/tracking/$orderId", params: { orderId: "demo-order" } })} className="w-full py-3 bg-[#b12704] hover:bg-[#8f1f03] text-white rounded font-bold flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" /> Confirm & Send Now
              </button>
              <p className="text-[11px] text-[#565959] text-center">Crisis orders skip payment confirmation for speed.</p>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
