import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useStore, cartTotal } from "@/store";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Now" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cartItems, groupCartItems, checkoutSource, addresses, selectedAddressId, openAddressSelector, placeOrder } = useStore();
  const [speed, setSpeed] = useState("express");
  const [pay, setPay] = useState("upi");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isGroup = checkoutSource === "group";
  const reviewItems = isGroup
    ? groupCartItems.filter((i) => i.status === "confirmed").map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: 1, imageKeyword: i.imageKeyword }))
    : cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, imageKeyword: i.imageKeyword }));

  const baseTotal = isGroup ? reviewItems.reduce((s, i) => s + i.price, 0) : cartTotal(cartItems);
  const flexibleDiscount = 25;
  const total = speed === "flexible" ? Math.max(0, baseTotal - flexibleDiscount) : baseTotal;
  const address = addresses.find((a) => a.id === selectedAddressId);

  const [flexMinutes, setFlexMinutes] = useState(12);
  const [flexSeconds, setFlexSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (speed === "flexible") {
      interval = setInterval(() => {
        setFlexSeconds((prev) => {
          if (prev === 0) {
            setFlexMinutes((m) => Math.max(0, m - 1));
            return 59;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [speed]);

  function handlePlace() {
    setLoading(true);
    setTimeout(() => {
      const id = placeOrder();
      navigate({ to: "/tracking/$orderId", params: { orderId: id } });
    }, 1000);
  }

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5">
        <h1 className="text-[28px] font-normal border-b border-[#d5d9d9] pb-3 mb-4">Checkout {isGroup && <span className="text-[14px] text-[#5848bc] font-semibold ml-2">(Group order)</span>}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          <section className="space-y-4">
            <Section n={1} title="Delivery address">
              {address ? (
                <div className="text-[14px]">
                  <div className="font-semibold">{address.fullName}</div>
                  <div className="text-[#565959]">{address.line1}, {address.cityStateZip}</div>
                  <button onClick={openAddressSelector} className="az-link text-[13px] mt-1">Change</button>
                </div>
              ) : <div className="text-[13px] text-[#565959]">No address selected.</div>}
            </Section>

            <Section n={2} title="Delivery speed">
              {[
                { id: "express", l: "Now Express — 8–12 min — FREE ⚡", note: "Recommended" },
                { id: "flexible", l: "Flexible Me — Batch my order — Save ₹25", badge: "NEW" },
                { id: "standard", l: "Standard — 30–45 min — FREE" },
                { id: "scheduled", l: "Scheduled — choose a time — FREE" },
              ].map((s) => (
                <div key={s.id} className={`p-3 rounded-md mb-2 border ${speed === s.id ? "border-[#ff9900] bg-[#fffaf0]" : "border-transparent"}`}>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="speed" checked={speed === s.id} onChange={() => setSpeed(s.id)} className="accent-[#ff9900] w-4 h-4" />
                    <span className="text-[14px] font-medium">{s.l}</span>
                    {s.note && <span className="text-[11px] text-[#007600] bg-[#e6f4ea] px-2 py-0.5 rounded">{s.note}</span>}
                    {s.badge && <span className="text-[10px] text-white bg-[#c40000] px-1.5 py-0.5 rounded font-bold">{s.badge}</span>}
                  </label>
                  
                  {s.id === "flexible" && speed === "flexible" && (
                    <div className="ml-7 mt-3 p-3 bg-white border border-[#007185]/20 rounded-md shadow-sm">
                      <div className="flex justify-between text-[13px] text-[#0f1111] font-semibold mb-1">
                        <span>Waiting for a batch partner in your building...</span>
                        <span className="text-[#007185]">{flexMinutes}m {flexSeconds < 10 ? '0'+flexSeconds : flexSeconds}s remaining</span>
                      </div>
                      <div className="w-full bg-[#f3f3f3] rounded-full h-2 mb-2 overflow-hidden">
                        <div 
                          className="bg-[#007185] h-2 rounded-full transition-all duration-1000" 
                          style={{ width: `${100 - ((flexMinutes * 60 + flexSeconds) / (12 * 60)) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-[11px] text-[#565959]">
                        If matched, you save ₹25 and we reduce 1 delivery trip. You can cancel and switch to Express anytime before match.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </Section>

            <Section n={3} title="Payment method">
              {[{ id: "upi", l: "UPI" }, { id: "card", l: "Credit / Debit Card" }, { id: "cod", l: "Cash on Delivery" }].map((p) => (
                <label key={p.id} className="flex items-center gap-3 py-2 cursor-pointer">
                  <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} className="accent-[#ff9900]" />
                  <span className="text-[14px]">{p.l}</span>
                </label>
              ))}
            </Section>

            <Section n={4} title="Review items and delivery">
              <div className="flex items-center gap-2 flex-wrap">
                {reviewItems.slice(0, 8).map((i) => (
                  <div key={i.id} className="w-12 h-12 rounded overflow-hidden bg-[#f3f3f3]" title={i.name}>
                    <ProductImage keyword={i.imageKeyword} seed={i.id} size={100} className="w-full h-full object-cover" />
                  </div>
                ))}
                {reviewItems.length > 8 && <span className="text-[13px] text-[#565959]">and {reviewItems.length - 8} more</span>}
              </div>
            </Section>
          </section>

          <aside className="lg:sticky lg:top-4 h-fit az-card p-5 space-y-2">
            <button onClick={handlePlace} disabled={loading || reviewItems.length === 0} className="btn-az-yellow w-full py-3 font-semibold flex items-center justify-center gap-2">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Place your order"}
            </button>
            <div className="text-[11px] text-[#565959]">By placing your order, you agree to Now's privacy notice and conditions of use.</div>
            <hr />
            <div className="text-[16px] font-bold">Order Summary</div>
            <div className="flex justify-between text-[13px]"><span>Items ({reviewItems.length}):</span><span>₹{baseTotal}</span></div>
            <div className="flex justify-between text-[13px]"><span>Delivery:</span><span className="text-[#007600]">FREE</span></div>
            {speed === "flexible" && (
              <div className="flex justify-between text-[13px] text-[#007600] font-medium">
                <span>Flexible Batch Discount:</span><span>-₹{flexibleDiscount}</span>
              </div>
            )}
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
