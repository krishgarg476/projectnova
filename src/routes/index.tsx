import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard, type Product } from "@/components/ProductCard";
import { useStore } from "@/store";
import { ChevronLeft, ChevronRight, Sparkles, Camera, Mic, Users, Leaf, AlertTriangle, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Now — AI-Powered Urgent Shopping on Amazon" },
      { name: "description", content: "Describe what's happening. Now's AI Council builds your cart in seconds — built for urgent, real-life shopping moments." },
    ],
  }),
  component: Home,
});

const SLIDES = [
  {
    headline: "Tell Now what's going on.",
    sub: "AI-powered urgent shopping — describe your situation, get your cart instantly.",
    cta: "Try it now",
    emojis: ["🍱", "🥤", "🍿", "💊", "🧻", "🥛", "🍞", "🔋"],
    bg: "linear-gradient(135deg, #e8e4ff 0%, #c8b8ff 100%)",
  },
  {
    headline: "Your next 24 hours, predicted.",
    sub: "Predictive Pulse learns your patterns — so the cart is ready before you need it.",
    cta: "See your Pulse",
    emojis: ["☕", "🍳", "🥗", "🍝", "🍪", "🍵", "🌮", "🍕"],
    bg: "linear-gradient(135deg, #d4f0e8 0%, #8ed5be 100%)",
  },
  {
    headline: "Snap your fridge. Get your cart.",
    sub: "Fridge Whisperer uses vision AI to spot what's missing — and restocks it.",
    cta: "Try Fridge Whisperer",
    emojis: ["🥬", "🥕", "🥚", "🧀", "🥩", "🍎", "🥛", "🧈"],
    bg: "linear-gradient(135deg, #ffe5cc 0%, #ffb380 100%)",
  },
];

const DEAL_PRODUCTS: Product[] = [
  { id: "d1", name: "ORS Hydration Sachets (10-pack)", emoji: "💊", price: 120, originalPrice: 180 },
  { id: "d2", name: "Premium Basmati Rice 5kg", emoji: "🍚", price: 549, originalPrice: 750 },
  { id: "d3", name: "10,000 mAh Quick-Charge Power Bank", emoji: "🔋", price: 999, originalPrice: 1499 },
  { id: "d4", name: "Insulated Lunch Box Set", emoji: "🍱", price: 449, originalPrice: 699 },
  { id: "d5", name: "Emergency Candle Pack (12)", emoji: "🕯️", price: 199, originalPrice: 280 },
  { id: "d6", name: "Instant Coffee Sachets (30)", emoji: "☕", price: 279, originalPrice: 350 },
  { id: "d7", name: "Tata Sampann Toor Dal 1kg", emoji: "🥣", price: 169, originalPrice: 210 },
  { id: "d8", name: "Colgate MaxFresh 150g (3-pack)", emoji: "🪥", price: 198, originalPrice: 270 },
  { id: "d9", name: "Whole Wheat Bread (2-pack)", emoji: "🍞", price: 90, originalPrice: 120 },
  { id: "d10", name: "Amul Butter 500g", emoji: "🧈", price: 285, originalPrice: 320 },
  { id: "d11", name: "Maggi Hot & Sweet Sauce 1kg", emoji: "🍅", price: 145, originalPrice: 195 },
  { id: "d12", name: "Dettol Handwash 750ml (2-pack)", emoji: "🧼", price: 199, originalPrice: 280 },
];

const CRISIS_DEALS: Product[] = [
  { id: "c1", name: "First Aid Kit (50 items)", emoji: "🩹", price: 399, originalPrice: 599 },
  { id: "c2", name: "LED Rechargeable Torch", emoji: "🔦", price: 449, originalPrice: 650 },
  { id: "c3", name: "Bisleri Water 2L (4-pack)", emoji: "💧", price: 160, originalPrice: 200 },
  { id: "c4", name: "Battery-Powered Fan", emoji: "🌀", price: 799, originalPrice: 1100 },
  { id: "c5", name: "Ready-to-Eat Meals (5)", emoji: "🥘", price: 450, originalPrice: 600 },
  { id: "c6", name: "Power Bank 20,000 mAh", emoji: "🔋", price: 1599, originalPrice: 2200 },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const generate = useStore((s) => s.generateResults);
  const addCart = useStore((s) => s.addCartItem);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  async function quickRun(q: string) {
    await generate(q);
    navigate({ to: "/results" });
  }

  return (
    <Layout>
      <div className="bg-[#eaeded]">
        {/* Hero carousel */}
        <div className="relative h-[380px] overflow-hidden">
          {SLIDES.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ background: s.bg, opacity: i === slide ? 1 : 0 }}
            >
              <div className="max-w-[1500px] mx-auto h-full px-12 flex items-center justify-between gap-12">
                <div className="max-w-xl">
                  <h1 className="text-[44px] leading-tight font-extrabold text-[#0f1111]">{s.headline}</h1>
                  <p className="mt-3 text-[18px] text-[#0f1111]/80">{s.sub}</p>
                  <button onClick={() => quickRun("daily restock")} className="mt-6 btn-az-orange px-6 py-3 text-[15px] font-semibold">
                    {s.cta} →
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {s.emojis.map((e, idx) => (
                    <div key={idx} className="w-20 h-20 bg-white/80 rounded-xl flex items-center justify-center text-4xl shadow-sm">{e}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-16 bg-white/30 hover:bg-white/60 flex items-center justify-center rounded">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={() => setSlide((s) => (s + 1) % SLIDES.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-16 bg-white/30 hover:bg-white/60 flex items-center justify-center rounded">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {SLIDES.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === slide ? "bg-[#131921] w-6" : "bg-white/70 w-2"}`} />)}
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 -mt-16 relative z-10 space-y-4">
          {/* Four-column row 1 */}
          <FourColRow>
            <Tile title="Tell Now what's happening">
              <div className="bg-[#f3f3f3] aspect-[4/3] rounded flex items-center justify-center text-5xl">📱✨</div>
              <button onClick={() => quickRun("guests arriving in an hour")} className="az-link text-[13px] mt-2 text-left">Try the AI Council →</button>
            </Tile>
            <Tile title="Shop by situation">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "Guests arriving", e: "🎉", q: "guests arriving in an hour" },
                  { l: "Feeling unwell", e: "🤒", q: "feeling unwell, body aches" },
                  { l: "Power cut", e: "⚡", q: "power cut, fridge items at risk" },
                  { l: "Just got home", e: "🏠", q: "just got home, starving" },
                ].map((x) => (
                  <button key={x.l} onClick={() => quickRun(x.q)} className="bg-[#f3f3f3] hover:bg-[#e9e9e9] aspect-square rounded flex flex-col items-center justify-center gap-1">
                    <span className="text-3xl">{x.e}</span>
                    <span className="text-[11px]">{x.l}</span>
                  </button>
                ))}
              </div>
            </Tile>
            <Tile title="Top picks from your patterns">
              <div className="space-y-2">
                {[
                  { e: "🍿", n: "Snack Pack — Tonight 7 PM" },
                  { e: "🥛", n: "Milk restock — Tomorrow 8 AM" },
                  { e: "☕", n: "Coffee sachets — Tomorrow morning" },
                ].map((x) => (
                  <div key={x.n} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#f3f3f3] rounded flex items-center justify-center text-xl">{x.e}</div>
                    <div className="text-[12px] flex-1">{x.n}</div>
                  </div>
                ))}
              </div>
              <Link to="/pulse" className="az-link text-[13px] block mt-2">Explore your Pulse →</Link>
            </Tile>
            <Tile title="Crisis-ready essentials">
              <div className="grid grid-cols-2 gap-2">
                {[{ e: "💊", l: "ORS" }, { e: "🔦", l: "Flashlight" }, { e: "🕯️", l: "Candles" }, { e: "🩹", l: "First-aid" }].map((x) => (
                  <div key={x.l} className="bg-[#fff5f3] aspect-square rounded flex flex-col items-center justify-center gap-1">
                    <span className="text-3xl">{x.e}</span>
                    <span className="text-[11px]">{x.l}</span>
                  </div>
                ))}
              </div>
              <Link to="/crisis" className="az-link text-[13px] block mt-2">Learn about Crisis Mode →</Link>
            </Tile>
          </FourColRow>

          {/* Group cart banner */}
          <div className="az-card overflow-hidden">
            <div className="bg-gradient-to-r from-[#dde9f5] to-[#f3e5ff] p-6 flex items-center justify-between gap-6">
              <div>
                <h2 className="text-[22px] font-bold flex items-center gap-2"><Users className="w-6 h-6 text-[#5848bc]" /> Group Carts — split the bill, automatically.</h2>
                <p className="text-[14px] text-[#565959] mt-1">Share one cart with friends. Each person pays their share. Now AI suggests items based on the group.</p>
              </div>
              <Link to="/group/demo" className="btn-az-orange px-6 py-3 font-semibold whitespace-nowrap">Create a group cart →</Link>
            </div>
          </div>

          {/* Four-column row 2 */}
          <FourColRow>
            <Tile title="Eco Impact this month">
              <div className="flex items-center gap-3">
                <div className="relative w-20 h-20">
                  <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#eee" strokeWidth="4" />
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#007600" strokeWidth="4" strokeDasharray="88" strokeDashoffset="33" strokeLinecap="round" />
                  </svg>
                  <Leaf className="w-6 h-6 text-[#007600] absolute inset-0 m-auto" />
                </div>
                <div>
                  <div className="text-[20px] font-bold">1.2 kg</div>
                  <div className="text-[12px] text-[#565959]">CO₂ saved via bundled deliveries</div>
                </div>
              </div>
              <Link to="/profile" className="az-link text-[13px] block mt-2">View Eco Impact →</Link>
            </Tile>
            <Tile title="Fridge Whisperer">
              <div className="bg-[#fff7ec] aspect-[4/3] rounded flex items-center justify-center"><Camera className="w-12 h-12 text-[#ff9900]" /></div>
              <p className="text-[12px] mt-2 text-[#565959]">Snap a photo, get a cart.</p>
              <Link to="/fridge-whisperer" className="az-link text-[13px] block mt-1">Open Fridge Whisperer →</Link>
            </Tile>
            <Tile title="Voice Mode">
              <div className="bg-[#efeaff] aspect-[4/3] rounded flex items-center justify-center"><Mic className="w-12 h-12 text-[#5848bc]" /></div>
              <p className="text-[12px] mt-2 text-[#565959]">Hands busy? Just talk to Now.</p>
              <Link to="/voice" className="az-link text-[13px] block mt-1">Start Voice Mode →</Link>
            </Tile>
            <Tile title="Household Patterns">
              <div className="bg-[#f3f3f3] aspect-[4/3] rounded flex items-end justify-around p-3">
                {[40, 65, 35, 80, 55, 90, 70].map((h, i) => <div key={i} className="w-3 rounded-t bg-[#5848bc]" style={{ height: `${h}%` }} />)}
              </div>
              <Link to="/profile" className="az-link text-[13px] block mt-2">View patterns →</Link>
            </Tile>
          </FourColRow>

          {/* Recommended grid */}
          <section className="az-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[21px] font-bold">Recommended for you</h2>
              <a className="az-link text-[13px]">See all deals</a>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {DEAL_PRODUCTS.map((p) => (
                <ProductCard key={p.id} p={p} onAdd={() => addCart({ id: p.id, name: p.name, category: "Deal", quantity: 1, price: p.price, originalPrice: p.originalPrice, reasoning: "Added from Recommended for you", agentSource: "context", emoji: p.emoji })} />
              ))}
            </div>
          </section>

          {/* Crisis essentials */}
          <section className="az-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[21px] font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-[#b12704]" /> Best Sellers in Crisis Essentials</h2>
              <Link to="/crisis" className="az-link text-[13px]">Open Crisis Mode →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {CRISIS_DEALS.map((p) => (
                <ProductCard key={p.id} p={p} onAdd={() => addCart({ id: p.id, name: p.name, category: "Emergency", quantity: 1, price: p.price, originalPrice: p.originalPrice, reasoning: "Crisis essentials best-seller", agentSource: "speed", emoji: p.emoji })} />
              ))}
            </div>
          </section>

          {/* Pulse teaser */}
          <section className="az-card p-5 mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[21px] font-bold flex items-center gap-2"><Activity className="w-5 h-5 text-[#5848bc]" /> Your Predictive Pulse</h2>
              <Link to="/pulse" className="az-link text-[13px]">View full timeline →</Link>
            </div>
            <p className="text-[14px] text-[#565959] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5848bc]" />
              Based on your last 30 days, Now predicts <b>3 needs in the next 24 hours</b>.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}

function FourColRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="az-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#d5d9d9]">
      {children}
    </div>
  );
}
function Tile({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5">
      <h3 className="font-bold text-[18px] mb-3">{title}</h3>
      {children}
    </div>
  );
}
