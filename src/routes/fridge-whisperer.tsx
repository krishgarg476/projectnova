import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Camera, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useStore } from "@/store";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/fridge-whisperer")({
  head: () => ({ meta: [{ title: "Fridge Whisperer — Now" }] }),
  component: FridgePage,
});

const NOTICED = [
  { k: "milk-carton", t: "Milk carton looks nearly empty", add: true },
  { k: "leafy-greens", t: "No fresh vegetables visible", add: true },
  { k: "eggs", t: "Egg tray down to 2 — restocking", add: true },
  { k: "bread-loaf", t: "Bread — looks fine, skipping", add: false },
  { k: "butter", t: "Butter half-empty", add: true },
];

const RESULTS = [
  { id: "f1", name: "Amul Toned Milk 1L (2-pack)", imageKeyword: "milk-carton", price: 128, reasoning: "Carton in photo is nearly empty" },
  { id: "f2", name: "Fresh Spinach 250g", imageKeyword: "spinach-bunch", price: 45, reasoning: "Veg crisper appears empty" },
  { id: "f3", name: "Farm Eggs (12-pack)", imageKeyword: "farm-eggs", price: 96, reasoning: "Only 2 eggs visible" },
  { id: "f4", name: "Amul Butter 500g", imageKeyword: "amul-butter", price: 285, reasoning: "Butter pack half-empty" },
];

function FridgePage() {
  const [scanned, setScanned] = useState(false);
  const [step, setStep] = useState(0);
  const addCart = useStore((s) => s.addCartItem);

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setScanned(true);
    NOTICED.forEach((_, i) => setTimeout(() => setStep(i + 1), 1800 + i * 400));
  }

  function addAll() {
    RESULTS.forEach((r) => addCart({ id: r.id, name: r.name, category: "Fridge", price: r.price, reasoning: r.reasoning, imageKeyword: r.imageKeyword }));
  }

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5">
        <h1 className="text-[28px] font-bold mb-1">Fridge Whisperer</h1>
        <p className="text-[14px] text-[#565959] mb-5">Snap a photo of your fridge — Now AI spots what's missing and builds a restock cart.</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="az-card p-4">
            {!scanned ? (
              <label className="border-2 border-dashed border-[#d5d9d9] bg-[#fafafa] aspect-square rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#f3f3f3] hover:border-[#5848bc]">
                <Camera className="w-16 h-16 text-[#5848bc]" />
                <div className="text-[15px] font-semibold">Click to upload a photo</div>
                <div className="text-[12px] text-[#565959]">of your fridge, pantry, or counter</div>
                <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
              </label>
            ) : (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#cce0ff] to-[#aac8f5] flex items-center justify-center text-9xl">
                🧊
                {step < NOTICED.length && (
                  <div className="absolute inset-x-0 h-1 bg-[#5848bc] shadow-[0_0_20px_#5848bc]" style={{ top: `${(step / NOTICED.length) * 100}%`, transition: "top 0.4s" }} />
                )}
              </div>
            )}
          </div>

          <div className="az-card p-5">
            <div className="font-bold text-[16px] mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#5848bc]" /> Now noticed:</div>
            <ul className="space-y-2">
              {NOTICED.map((n, i) => (
                <li key={i} className={`flex items-center gap-3 p-2 rounded transition-all duration-500 ${i < step ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                  <span className="text-2xl">{["🥛", "🥬", "🥚", "🍞", "🧈"][i]}</span>
                  <span className="text-[13px] flex-1">{n.t}</span>
                  {n.add ? <span className="ai-badge">Adding</span> : <span className="text-[11px] text-[#565959]">Skipped</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {step >= NOTICED.length && (
          <div className="mt-6 az-card p-5">
            <h2 className="font-bold text-[18px] mb-3">Suggested cart</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {RESULTS.map((r) => (
                <ProductCard key={r.id} p={{ id: r.id, name: r.name, imageKeyword: r.imageKeyword, price: r.price, reasoning: r.reasoning }} onAdd={() => addCart({ id: r.id, name: r.name, category: "Fridge", price: r.price, reasoning: r.reasoning, imageKeyword: r.imageKeyword })} />
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={addAll} className="btn-az-yellow px-6 py-2 font-semibold">Add all to Cart</button>
              <Link to="/cart" className="btn-az-orange px-6 py-2 font-semibold">Review full cart →</Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
