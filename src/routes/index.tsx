import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { useStore } from "@/store";
import { PredictivePulse } from "@/components/PredictivePulse";
import { ZeroSecondCart } from "@/components/ZeroSecondCart";
import { ChevronLeft, ChevronRight, Sparkles, Camera, Mic, Users, Leaf, AlertTriangle, Activity } from "lucide-react";

import { getHomeProductsFn } from "@/lib/api/home.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Now — AI-Powered Urgent Shopping on Amazon" },
      { name: "description", content: "Describe what's happening. Now's AI Council builds your cart in seconds." },
    ],
  }),
  loader: async () => {
    return await getHomeProductsFn();
  },
  component: Home,
});

const SLIDES = [
  { headline: "Tell Now what's going on.", sub: "AI-powered urgent shopping — describe your situation, get your cart instantly.", cta: "Try it now", action: true, keywords: ["lunch-box", "soda-can", "popcorn", "medicine", "tissue", "milk-carton", "bread-loaf", "battery"], bg: "linear-gradient(135deg, #e8e4ff 0%, #c8b8ff 100%)" },
  { headline: "Your next 24 hours, predicted.", sub: "Predictive Pulse learns your patterns — so the cart is ready before you need it.", cta: "See your Pulse", action: true, keywords: ["coffee-cup", "fried-eggs", "salad", "pasta", "cookies", "tea", "tacos", "pizza"], bg: "linear-gradient(135deg, #d4f0e8 0%, #8ed5be 100%)" },
  { headline: "Snap your fridge. Get your cart.", sub: "Fridge Whisperer uses vision AI to spot what's missing — and restocks it.", cta: "Try Fridge Whisperer", route: "/fridge-whisperer", keywords: ["lettuce", "carrot", "eggs", "cheese-block", "meat", "apple", "milk-bottle", "butter"], bg: "linear-gradient(135deg, #ffe5cc 0%, #ffb380 100%)" },
];

function Home() {
  const { deals, crisis } = Route.useLoaderData();
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const generate = useStore((s) => s.generateResults);
  const addCart = useStore((s) => s.addCartItem);
  const openCrisis = useStore((s) => s.openCrisisTriage);

  useEffect(() => { const t = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 5500); return () => clearInterval(t); }, []);

  async function quickRun(q: string) { await generate(q); navigate({ to: "/results" }); }

  return (
    <Layout>
      <ZeroSecondCart />
      <PredictivePulse />
      <div className="bg-[#eaeded]">
        <div className="relative h-[380px] overflow-hidden">
          {SLIDES.map((s, i) => (
            <div key={i} className="absolute inset-0 transition-opacity duration-700" style={{ background: s.bg, opacity: i === slide ? 1 : 0, pointerEvents: i === slide ? "auto" : "none" }}>
              <div className="max-w-[1500px] mx-auto h-full px-12 flex items-center justify-between gap-12">
                <div className="max-w-xl">
                  <h1 className="text-[44px] leading-tight font-extrabold text-[#0f1111]">{s.headline}</h1>
                  <p className="mt-3 text-[18px] text-[#0f1111]/80">{s.sub}</p>
                  <button onClick={() => s.action ? quickRun("daily restock") : navigate({ to: s.route })} className="mt-6 btn-az-orange px-6 py-3 text-[15px] font-semibold">{s.cta} →</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {s.keywords.map((k, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden bg-white/80 shadow-sm">
                      <ProductImage keyword={k} seed={`hero-${i}-${idx}`} size={200} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-16 bg-white/30 hover:bg-white/60 flex items-center justify-center rounded"><ChevronLeft className="w-6 h-6" /></button>
          <button onClick={() => setSlide((s) => (s + 1) % SLIDES.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-16 bg-white/30 hover:bg-white/60 flex items-center justify-center rounded"><ChevronRight className="w-6 h-6" /></button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {SLIDES.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === slide ? "bg-[#131921] w-6" : "bg-white/70 w-2"}`} />)}
          </div>
        </div>

        <div className="max-w-[1500px] mx-auto px-4 -mt-16 relative z-10 space-y-4">
          <FourColRow>
            <Tile title="Tell Now what's happening">
              <div className="bg-[#f3f3f3] aspect-[4/3] rounded overflow-hidden">
                <ProductImage keyword="smartphone-app" seed="tile-tell" size={400} className="w-full h-full object-cover" />
              </div>
              <button onClick={() => quickRun("guests arriving in an hour")} className="az-link text-[13px] mt-2 text-left">Try the AI Council →</button>
            </Tile>
            <Tile title="Shop by situation">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { l: "Guests arriving", k: "party-snacks", q: "guests arriving in an hour" },
                  { l: "Feeling unwell", k: "medicine-tea", q: "feeling unwell, body aches" },
                  { l: "Power cut", k: "candle-torch", q: "power cut, fridge items at risk" },
                  { l: "Just got home", k: "ready-meal", q: "just got home, starving" },
                ].map((x) => (
                  <button key={x.l} onClick={() => quickRun(x.q)} className="bg-[#f3f3f3] hover:bg-[#e9e9e9] aspect-square rounded overflow-hidden flex flex-col items-center justify-end gap-1 relative">
                    <ProductImage keyword={x.k} seed={x.l} size={200} className="absolute inset-0 w-full h-full object-cover opacity-90" />
                    <span className="relative bg-white/95 text-[11px] w-full text-center py-1 font-semibold">{x.l}</span>
                  </button>
                ))}
              </div>
            </Tile>
            <Tile title="Top picks from your patterns">
              <div className="space-y-2">
                {[
                  { k: "popcorn", n: "Snack Pack — Tonight 7 PM" },
                  { k: "milk-carton", n: "Milk restock — Tomorrow 8 AM" },
                  { k: "coffee-sachet", n: "Coffee sachets — Tomorrow morning" },
                ].map((x) => (
                  <div key={x.n} className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#f3f3f3] rounded overflow-hidden"><ProductImage keyword={x.k} seed={x.n} size={100} className="w-full h-full object-cover" /></div>
                    <div className="text-[12px] flex-1">{x.n}</div>
                  </div>
                ))}
              </div>
              <Link to="/pulse" className="az-link text-[13px] block mt-2">Explore your Pulse →</Link>
            </Tile>
            <Tile title="Crisis-ready essentials">
              <div className="grid grid-cols-2 gap-2">
                {[{ k: "ors-sachet", l: "ORS" }, { k: "flashlight", l: "Flashlight" }, { k: "candles", l: "Candles" }, { k: "first-aid", l: "First-aid" }].map((x) => (
                  <div key={x.l} className="bg-[#fff5f3] aspect-square rounded overflow-hidden relative">
                    <ProductImage keyword={x.k} seed={x.l} size={200} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-white/95 text-[11px] text-center py-1 font-semibold">{x.l}</span>
                  </div>
                ))}
              </div>
              <button onClick={openCrisis} className="az-link text-[13px] block mt-2 text-left">Learn about Crisis Mode →</button>
            </Tile>
          </FourColRow>

          <div className="az-card overflow-hidden">
            <div className="bg-gradient-to-r from-[#dde9f5] to-[#f3e5ff] p-6 flex items-center justify-between gap-6">
              <div>
                <h2 className="text-[22px] font-bold flex items-center gap-2"><Users className="w-6 h-6 text-[#5848bc]" /> Group Carts — split the bill, automatically.</h2>
                <p className="text-[14px] text-[#565959] mt-1">Share one cart with friends. Each person pays their share.</p>
              </div>
              <Link to="/group/$cartId" params={{ cartId: "demo" }} className="btn-az-orange px-6 py-3 font-semibold whitespace-nowrap">Create a group cart →</Link>
            </div>
          </div>

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
              <Link to="/eco-impact" className="az-link text-[13px] block mt-2">View Eco Impact →</Link>
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

          <section className="az-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[21px] font-bold">Recommended for you</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {deals.map((p: any) => (
                <ProductCard key={p.id} p={{...p, imageKeyword: p.image_keyword || p.imageKeyword}} onAdd={() => addCart({ id: p.id, name: p.name, category: "Deal", price: p.price, originalPrice: p.originalPrice || p.price * 1.2, reasoning: "Added from Recommended for you", imageKeyword: p.image_keyword || p.imageKeyword || "product", brand: p.brand, isEco: p.isEco })} />
              ))}
            </div>
          </section>

          <section className="az-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[21px] font-bold flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-[#b12704]" /> Best Sellers in Crisis Essentials</h2>
              <button onClick={openCrisis} className="az-link text-[13px]">Open Crisis Mode →</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {crisis.map((p: any) => (
                <ProductCard key={p.id} p={{...p, imageKeyword: p.image_keyword || p.imageKeyword}} onAdd={() => addCart({ id: p.id, name: p.name, category: "Emergency", price: p.price, originalPrice: p.originalPrice || p.price * 1.2, reasoning: "Crisis essentials best-seller", imageKeyword: p.image_keyword || p.imageKeyword || "product", agentSource: "speed" })} />
              ))}
            </div>
          </section>

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

function FourColRow({ children }: { children: React.ReactNode }) { return <div className="az-card grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#d5d9d9]">{children}</div>; }
function Tile({ title, children }: { title: string; children: React.ReactNode }) { return <div className="p-5"><h3 className="font-bold text-[18px] mb-3">{title}</h3>{children}</div>; }
