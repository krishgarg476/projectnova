import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useStore, cartTotal } from "@/store";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Now" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartItems } = useStore();
  const [speed, setSpeed] = useState("express");
  const [pay, setPay] = useState("upi");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const total = cartTotal(cartItems);

  function placeOrder() {
    setLoading(true);
    setTimeout(() => navigate({ to: "/tracking/$orderId", params: { orderId: "now-2026-9847" } }), 1100);
  }

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5">
        <h1 className="text-[28px] font-normal border-b border-[#d5d9d9] pb-3 mb-4">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          <section className="space-y-4">
            <Section n={1} title="Delivery address">
              <div className="text-[14px]">
                <div className="font-semibold">Krish Sharma</div>
                <div className="text-[#565959]">203, Vigyan Nagar, Kota, Rajasthan 324001</div>
                <button className="az-link text-[13px] mt-1">Change</button>
              </div>
            </Section>

            <Section n={2} title="Delivery speed">
              {[
                { id: "express", l: "Now Express — 8–12 min — FREE ⚡", note: "Recommended" },
                { id: "standard", l: "Standard — 30–45 min — FREE" },
                { id: "scheduled", l: "Scheduled — choose a time — FREE" },
              ].map((s) => (
                <label key={s.id} className="flex items-center gap-3 py-2 cursor-pointer">
                  <input type="radio" name="speed" checked={speed === s.id} onChange={() => setSpeed(s.id)} className="accent-[#ff9900]" />
                  <span className="text-[14px]">{s.l}</span>
                  {s.note && <span className="text-[11px] text-[#007600] bg-[#e6f4ea] px-2 py-0.5 rounded">{s.note}</span>}
                </label>
              ))}
              {speed === "scheduled" && (
                <select className="mt-2 border border-[#d5d9d9] rounded px-2 py-1 text-[13px]">
                  <option>Today 6:00 PM</option><option>Today 8:00 PM</option><option>Tomorrow 9:00 AM</option>
                </select>
              )}
            </Section>

            <Section n={3} title="Payment method">
              {[{ id: "upi", l: "UPI" }, { id: "card", l: "Credit / Debit Card" }, { id: "cod", l: "Cash on Delivery" }].map((p) => (
                <label key={p.id} className="flex items-center gap-3 py-2 cursor-pointer">
                  <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} className="accent-[#ff9900]" />
                  <span className="text-[14px]">{p.l}</span>
                </label>
              ))}
              {pay === "card" && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <input className="col-span-3 border border-[#d5d9d9] rounded px-3 py-2 text-[13px]" placeholder="Card number" />
                  <input className="col-span-2 border border-[#d5d9d9] rounded px-3 py-2 text-[13px]" placeholder="MM / YY" />
                  <input className="border border-[#d5d9d9] rounded px-3 py-2 text-[13px]" placeholder="CVV" />
                </div>
              )}
            </Section>

            <Section n={4} title="Review items and delivery">
              <div className="flex items-center gap-2 flex-wrap">
                {cartItems.slice(0, 6).map((i) => <div key={i.id} className="w-12 h-12 bg-[#f3f3f3] rounded flex items-center justify-center text-2xl">{i.emoji}</div>)}
                {cartItems.length > 6 && <span className="text-[13px] text-[#565959]">and {cartItems.length - 6} more</span>}
              </div>
            </Section>
          </section>

          <aside className="lg:sticky lg:top-4 h-fit az-card p-5 space-y-2">
            <button onClick={placeOrder} disabled={loading || cartItems.length === 0} className="btn-az-yellow w-full py-3 font-semibold flex items-center justify-center">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Place your order"}
            </button>
            <div className="text-[11px] text-[#565959]">By placing your order, you agree to Now's privacy notice and conditions of use.</div>
            <hr />
            <div className="text-[16px] font-bold">Order Summary</div>
            <div className="flex justify-between text-[13px]"><span>Items ({cartItems.length}):</span><span>₹{total}</span></div>
            <div className="flex justify-between text-[13px]"><span>Delivery:</span><span className="text-[#007600]">FREE</span></div>
            <hr />
            <div className="flex justify-between text-[18px] text-[#b12704] font-bold"><span>Order total:</span><span>₹{total}</span></div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="az-card p-5">
      <h2 className="text-[18px] font-bold mb-3"><span className="text-[#007185]">{n}.</span> {title}</h2>
      {children}
    </div>
  );
}
