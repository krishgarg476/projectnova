
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Camera, Sparkles, Loader2 } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/store";
import { ProductCard } from "@/components/ProductCard";
import { processImageFn } from "@/lib/api/vision.functions";

export const Route = createFileRoute("/fridge-whisperer")({
  head: () => ({ meta: [{ title: "Fridge Whisperer — Now" }] }),
  component: FridgePage,
});

function FridgePage() {
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [noticed, setNoticed] = useState<{ t: string; add: boolean }[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const addCart = useStore((s) => s.addCartItem);

  async function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Image = event.target?.result as string;
      setPreview(base64Image);
      setScanned(true);
      setLoading(true);
      setStep(0);
      setNoticed([]);
      setResults([]);

      try {
        const data = await processImageFn({ data: { base64Image } });
        setNoticed(data.noticed);
        setResults(data.results);
        
        data.noticed.forEach((_, i) => setTimeout(() => setStep(i + 1), 800 + i * 400));
      } catch (err) {
        console.error("Vision failed", err);
        setNoticed([{ t: "Failed to scan image. Please try again.", add: false }]);
        setStep(1);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  }

  function addAll() {
    results.forEach((r) => addCart({ id: r.id, name: r.name, category: "Fridge", price: r.price, reasoning: r.reasoning, imageKeyword: r.imageKeyword }));
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
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-[#cce0ff] to-[#aac8f5] flex items-center justify-center">
                {preview && <img src={preview} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover opacity-80" />}
                <div className="absolute inset-0 bg-black/10"></div>
                {loading && <Loader2 className="w-16 h-16 text-white animate-spin absolute" />}
                
                {step < noticed.length && !loading && (
                  <div className="absolute inset-x-0 h-1 bg-[#5848bc] shadow-[0_0_20px_#5848bc]" style={{ top: `${(step / Math.max(1, noticed.length)) * 100}%`, transition: "top 0.4s" }} />
                )}
              </div>
            )}
          </div>

          <div className="az-card p-5">
            <div className="font-bold text-[16px] mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 text-[#5848bc]" /> Now noticed:</div>
            {loading ? (
              <div className="text-[13px] text-[#565959] animate-pulse">Scanning image...</div>
            ) : (
              <ul className="space-y-2">
                {noticed.map((n, i) => (
                  <li key={i} className={`flex items-center gap-3 p-2 rounded transition-all duration-500 ${i < step ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}>
                    <span className="text-[13px] flex-1">{n.t}</span>
                    {n.add ? <span className="ai-badge">Adding</span> : <span className="text-[11px] text-[#565959]">Skipped</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {step >= noticed.length && results.length > 0 && !loading && (
          <div className="mt-6 az-card p-5">
            <h2 className="font-bold text-[18px] mb-3">Suggested cart</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {results.map((r) => (
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
