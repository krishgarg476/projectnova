import { createFileRoute, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useStore } from "@/store";
import { Check, Phone, MessageCircle, Star } from "lucide-react";

export const Route = createFileRoute("/tracking/$orderId")({
  head: () => ({ meta: [{ title: "Order Tracking — Now" }] }),
  component: TrackingPage,
});

const STEPS = ["Order Confirmed", "Preparing", "Out for Delivery", "Delivered"];

function TrackingPage() {
  const { orderId } = useParams({ from: "/tracking/$orderId" });
  const { lastOrderItems, lastOrderTotal } = useStore();
  const [countdown, setCountdown] = useState(28);
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);

  useEffect(() => { if (countdown <= 0) return; const t = setInterval(() => setCountdown((c) => c - 1), 1000); return () => clearInterval(t); }, [countdown]);
  useEffect(() => {
    if (countdown <= 21 && step < 1) setStep(1);
    if (countdown <= 14 && step < 2) setStep(2);
    if (countdown <= 0 && step < 3) setStep(3);
  }, [countdown, step]);

  const items = lastOrderItems.length ? lastOrderItems : [];
  const progress = Math.min(100, ((28 - countdown) / 28) * 100);

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 space-y-4">
        <div className="az-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-[12px] text-[#565959]">Order #</div>
              <h1 className="text-[22px] font-bold">{orderId.toUpperCase()}</h1>
            </div>
            <div className="text-right">
              <div className="text-[12px] text-[#565959]">Arriving in</div>
              <div className="text-[28px] font-bold text-[#007600]">{countdown > 0 ? `${countdown}s` : "Delivered!"}</div>
            </div>
          </div>
          <div className="mt-4 flex gap-2 items-center">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1 flex items-center gap-2">
                <div className={`flex-1 h-2 rounded-full ${i <= step ? "bg-[#007600]" : "bg-[#e0e0e0]"} relative overflow-hidden`}>
                  {i === step && step < 3 && <div className="absolute inset-0 bg-white/30 animate-pulse" />}
                </div>
                {i <= step && <Check className="w-4 h-4 text-[#007600]" />}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 mt-2 text-[11px] text-[#565959]">
            {STEPS.map((s, i) => <div key={s} className={i <= step ? "text-[#007600] font-semibold" : ""}>{s}</div>)}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
          <div className="az-card p-5">
            <h2 className="font-bold text-[16px] mb-3">Live route</h2>
            <div className="relative bg-[#e8f0d8] rounded-lg h-72 overflow-hidden" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 38px, #d0dec0 38px, #d0dec0 40px), repeating-linear-gradient(0deg, transparent, transparent 38px, #d0dec0 38px, #d0dec0 40px)" }}>
              <div className="absolute left-6 bottom-6 text-3xl">🏪</div>
              <div className="absolute right-6 top-6 text-3xl">🏠</div>
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 280" preserveAspectRatio="none">
                <path d="M40,240 Q120,140 200,180 T360,40" stroke="#5848bc" strokeWidth="3" strokeDasharray="6 4" fill="none" />
              </svg>
              <div className="absolute text-3xl transition-all duration-1000" style={{ left: `${10 + progress * 0.75}%`, top: `${75 - progress * 0.65}%` }}>🛵</div>
            </div>
          </div>

          <div className="az-card p-5">
            <h2 className="font-bold text-[16px] mb-3">Delivery partner</h2>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-[#ff9900] text-white flex items-center justify-center text-xl font-bold">RK</div>
              <div className="flex-1">
                <div className="font-semibold">Rohit Kumar</div>
                <div className="text-[12px] text-[#565959]">⭐ 4.9 · 1,240 deliveries</div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="btn-az-yellow flex-1 flex items-center justify-center gap-1"><Phone className="w-4 h-4" /> Call</button>
              <button className="btn-az-yellow flex-1 flex items-center justify-center gap-1"><MessageCircle className="w-4 h-4" /> Chat</button>
            </div>
          </div>
        </div>

        <div className="az-card p-5">
          <h2 className="font-bold text-[16px] mb-3">Order details</h2>
          {items.length === 0 ? (
            <div className="text-[13px] text-[#565959]">Demo order — no item details available.</div>
          ) : (
            <ul className="divide-y divide-[#d5d9d9]">
              {items.map((i) => (
                <li key={i.id} className="py-3 flex items-center gap-3">
                  <div className="w-12 h-12 rounded overflow-hidden bg-[#f3f3f3]"><ProductImage keyword={i.imageKeyword} seed={i.id} size={100} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 text-[14px]">{i.name}</div>
                  <div className="text-[13px] text-[#565959]">×{i.quantity}</div>
                  <div className="text-[14px] font-semibold w-20 text-right">₹{i.price * i.quantity}</div>
                </li>
              ))}
            </ul>
          )}
          {lastOrderTotal > 0 && <div className="text-right font-bold text-[16px] mt-3">Total: ₹{lastOrderTotal}</div>}
        </div>

        {step >= 3 && (
          <div className="az-card p-5 text-center">
            <Check className="w-12 h-12 mx-auto text-[#007600]" />
            <h2 className="text-[18px] font-bold mt-2">Delivered! Rate your delivery</h2>
            <div className="flex justify-center gap-1 mt-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => setRating(n)}>
                  <Star className={`w-8 h-8 ${n <= rating ? "fill-[#ffa41c] text-[#ffa41c]" : "text-[#d5d9d9]"}`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
