import { AnimatePresence, motion } from "framer-motion";
import { useStore, type CrisisType } from "@/store";
import { ProductImage } from "./ProductImage";
import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

const CARDS: { type: CrisisType; title: string; desc: string; keyword: string }[] = [
  { type: "power_cut", title: "Power Cut / Outage", desc: "Protect perishables, stay powered", keyword: "power-outage-candles" },
  { type: "medical", title: "Medical / Someone's Unwell", desc: "Fever, injury, or sudden illness", keyword: "first-aid-kit" },
  { type: "baby", title: "Baby / Infant Needs", desc: "Diapers, formula, baby medicine", keyword: "baby-essentials" },
  { type: "security", title: "Security / Safety Concern", desc: "Lock, light, or safety items needed urgently", keyword: "door-lock-security" },
  { type: "natural_event", title: "Natural Event Prep", desc: "Storm, flood, or heatwave incoming", keyword: "storm-preparation" },
];

export function CrisisTriageModal() {
  const open = useStore((s) => s.crisisTriageOpen);
  const close = useStore((s) => s.closeCrisisTriage);
  const setCrisis = useStore((s) => s.setCrisisType);
  const navigate = useNavigate();
  const [customMode, setCustomMode] = useState(false);
  const [customText, setCustomText] = useState("");

  function select(t: CrisisType, custom?: string) {
    setCrisis(t, custom);
    close();
    setCustomMode(false);
    setCustomText("");
    navigate({ to: "/crisis" });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[220] bg-black/60 flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="bg-white rounded-lg w-[520px] max-w-full max-h-[90vh] overflow-y-auto border-t-4 border-t-[#b12704] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#b12704]" />
                <h2 className="text-[18px] font-bold">What's the situation?</h2>
              </div>
              <button onClick={close}><X className="w-5 h-5" /></button>
            </div>
            <div className="px-5 pb-5 grid grid-cols-2 gap-3">
              {CARDS.map((c) => (
                <button key={c.type} onClick={() => select(c.type)} className="text-left border border-[#d5d9d9] hover:border-[#b12704] hover:bg-[#fff5f3] rounded-lg p-3 transition">
                  <div className="aspect-video rounded overflow-hidden mb-2 bg-[#f3f3f3]">
                    <ProductImage keyword={c.keyword} seed={c.type} size={300} className="w-full h-full object-cover" alt={c.title} />
                  </div>
                  <div className="font-semibold text-[13px] leading-tight">{c.title}</div>
                  <div className="text-[11px] text-[#565959] leading-tight mt-0.5">{c.desc}</div>
                </button>
              ))}
              {!customMode ? (
                <button onClick={() => setCustomMode(true)} className="text-left border border-dashed border-[#d5d9d9] hover:border-[#b12704] hover:bg-[#fff5f3] rounded-lg p-3 transition flex flex-col items-center justify-center">
                  <div className="text-2xl mb-1">✍️</div>
                  <div className="font-semibold text-[13px]">Something Else</div>
                  <div className="text-[11px] text-[#565959]">Describe your own situation</div>
                </button>
              ) : (
                <div className="col-span-2 border border-[#b12704] rounded-lg p-3 bg-[#fff5f3]">
                  <div className="text-[13px] font-semibold mb-2">Describe what's happening</div>
                  <input
                    autoFocus
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && customText.trim()) select("custom", customText.trim()); }}
                    placeholder="e.g., my pipe burst..."
                    className="w-full border border-[#d5d9d9] rounded px-3 py-2 text-[13px] outline-none focus:ring-1 focus:ring-[#b12704]"
                  />
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => setCustomMode(false)} className="text-[12px] az-link">Cancel</button>
                    <button
                      disabled={!customText.trim()}
                      onClick={() => select("custom", customText.trim())}
                      className="btn-az-yellow ml-auto px-3 py-1.5 text-[12px] disabled:opacity-50"
                    >Continue →</button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
