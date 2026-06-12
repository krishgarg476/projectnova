import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useStore, cartTotal } from "@/store";
import { Sparkles, Leaf, ChevronDown, ChevronUp } from "lucide-react";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Now" }] }),
  component: CartPage,
});

function CartPage() {
  const { cartItems, skippedItems, updateQuantity, removeItem, addSkippedItem, addCartItem } = useStore();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showSkipped, setShowSkipped] = useState(false);
  const [ecoBoost, setEcoBoost] = useState(0);
  const navigate = useNavigate();
  const total = cartTotal(cartItems);

  function addEcoSuggestions() {
    addCartItem({ id: "eco1", name: "Reusable Cloth Napkins (4-pack)", category: "Eco", quantity: 1, price: 220, reasoning: "Bundled with this delivery", agentSource: "context", emoji: "🧺" });
    addCartItem({ id: "eco2", name: "Bamboo Toothbrush (2-pack)", category: "Eco", quantity: 1, price: 180, reasoning: "Bundled with this delivery", agentSource: "context", emoji: "🪥" });
    setEcoBoost(100);
  }

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        <section className="az-card p-5">
          <div className="flex items-baseline justify-between border-b border-[#d5d9d9] pb-3">
            <h1 className="text-[28px] font-normal">Shopping Cart</h1>
            <span className="text-[13px] text-[#565959]">Price</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-12 text-center text-[#565959]">
              Your cart is empty. <Link to="/" className="az-link">Continue shopping</Link>
            </div>
          ) : (
            <ul className="divide-y divide-[#d5d9d9]">
              {cartItems.map((it) => (
                <li key={it.id} className="py-4 flex gap-4">
                  <div className="w-[120px] h-[120px] bg-[#f3f3f3] rounded flex items-center justify-center text-5xl shrink-0">{it.emoji || "🛒"}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[16px] font-semibold leading-tight">{it.name}</div>
                    <div className="text-[12px] text-[#007600] mt-0.5">In Stock</div>
                    <button onClick={() => setExpanded(expanded === it.id ? null : it.id)} className="ai-badge mt-2">
                      <Sparkles className="w-3 h-3" /> Now AI: {it.reasoning}
                    </button>
                    {expanded === it.id && (
                      <div className="mt-2 p-3 bg-[#fafafa] border border-[#d5d9d9] rounded text-[12px]">
                        <div className="mb-2 font-semibold">Swap with:</div>
                        <div className="flex gap-2 overflow-x-auto">
                          {["Cheaper", "Bigger size", "Eco option"].map((alt) => (
                            <div key={alt} className="min-w-[140px] border border-[#d5d9d9] rounded p-2 bg-white">
                              <div className="text-2xl text-center">{it.emoji}</div>
                              <div className="text-[11px] mt-1 text-center">{alt}</div>
                              <button className="btn-az-yellow w-full mt-1 text-[11px]">Swap</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mt-3 text-[13px]">
                      <div className="flex items-center border border-[#d5d9d9] rounded">
                        <button onClick={() => updateQuantity(it.id, it.quantity - 1)} className="px-2 py-1 hover:bg-[#f3f3f3]">−</button>
                        <span className="px-3">{it.quantity}</span>
                        <button onClick={() => updateQuantity(it.id, it.quantity + 1)} className="px-2 py-1 hover:bg-[#f3f3f3]">+</button>
                      </div>
                      <span className="text-[#d5d9d9]">|</span>
                      <button onClick={() => removeItem(it.id)} className="az-link">Delete</button>
                      <span className="text-[#d5d9d9]">|</span>
                      <button className="az-link">Save for later</button>
                    </div>
                  </div>
                  <div className="text-[18px] font-bold whitespace-nowrap">₹{it.price * it.quantity}</div>
                </li>
              ))}
            </ul>
          )}

          {skippedItems.length > 0 && (
            <div className="mt-5 border-t border-[#d5d9d9] pt-4">
              <button onClick={() => setShowSkipped(!showSkipped)} className="font-semibold text-[14px] flex items-center gap-1">
                Now also considered {skippedItems.length} other items {showSkipped ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {showSkipped && (
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skippedItems.map((sk) => (
                    <div key={sk.id} className="flex gap-3 p-3 border border-[#d5d9d9] rounded opacity-70 hover:opacity-100">
                      <div className="w-16 h-16 bg-[#f3f3f3] rounded flex items-center justify-center text-3xl">{sk.emoji}</div>
                      <div className="flex-1">
                        <div className="text-[13px] font-semibold">{sk.name}</div>
                        <div className="text-[11px] text-[#565959]">{sk.reasoning}</div>
                        <button onClick={() => addSkippedItem(sk.id)} className="btn-az-yellow mt-1 text-[11px]">Add to Cart</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Green Path */}
          <div className="mt-5 p-4 rounded-md border border-[#007600]/40 bg-[#e8f5e9]">
            <div className="flex items-center gap-2 font-semibold text-[14px] text-[#0a5d20]">
              <Leaf className="w-4 h-4" /> Green Path
            </div>
            <p className="text-[13px] mt-1">Add 2 more items to consolidate this delivery and save ~0.4 kg CO₂.</p>
            <div className="h-2 bg-white/70 rounded mt-2 overflow-hidden">
              <div className="h-full bg-[#007600] transition-all duration-500" style={{ width: `${ecoBoost || 35}%` }} />
            </div>
            {ecoBoost === 0 ? (
              <button onClick={addEcoSuggestions} className="btn-az-yellow mt-3">Add suggested items</button>
            ) : (
              <div className="text-[13px] text-[#0a5d20] mt-2 font-semibold">✓ Eco bundle added — 0.4 kg CO₂ saved</div>
            )}
          </div>
        </section>

        <aside className="lg:sticky lg:top-4 h-fit space-y-3">
          <div className="az-card p-5 space-y-2">
            <div className="text-[15px]"><span className="text-[#007600]">✓</span> Your order qualifies for FREE Express delivery.</div>
            <div className="flex justify-between text-[14px]"><span>Subtotal ({cartItems.length} items):</span><span className="font-bold">₹{total}</span></div>
            <div className="flex justify-between text-[14px]"><span>Delivery:</span><span className="font-bold text-[#007600]">FREE</span></div>
            <hr />
            <div className="flex justify-between text-[18px] text-[#b12704] font-bold"><span>Total:</span><span>₹{total}</span></div>
            <button onClick={() => navigate({ to: "/checkout" })} className="btn-az-yellow w-full py-2.5 font-semibold">Proceed to Checkout</button>
            <Link to="/group/demo" className="block text-center mt-2 border border-[#d5d9d9] rounded py-2 text-[13px] hover:bg-[#f3f3f3]">Split this cart with friends →</Link>
            <div className="text-[12px] text-[#565959] flex items-center gap-1 mt-2">⏱ Arriving in 9–12 min to Kota 324001</div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
