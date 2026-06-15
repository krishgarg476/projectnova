import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Plus, X } from "lucide-react";
import { purchaseHistory } from "@/lib/data/purchaseHistory";
import { useStore } from "@/store";
import { ProductImage } from "@/components/ProductImage";

export function PredictivePulse() {
  const [isVisible, setIsVisible] = useState(false);
  const addCart = useStore((s) => s.addCartItem);
  const navigate = useNavigate();

  const session = useStore((s) => s.session);

  // Show the popup 2 seconds after the page loads, only if logged in
  useEffect(() => {
    if (session && purchaseHistory.predictedRestocks && purchaseHistory.predictedRestocks.length > 0) {
      const t = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, [session]);

  if (!purchaseHistory.predictedRestocks?.length) return null;

  const item = purchaseHistory.predictedRestocks[0];

  function handleAdd() {
    addCart({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      reasoning: item.reasoning,
      imageKeyword: item.imageKeyword,
      quantity: 1,
      agentSource: "context",
    });
    setIsVisible(false);
    navigate({ to: "/cart" });
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
          className="fixed top-[80px] right-6 z-50 w-full max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.2)] border border-[#e7e7e7] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-[#d4f0e8] to-[#8ed5be] px-4 py-2 flex items-center justify-between border-b border-[#cce6df]">
              <div className="flex items-center gap-2 font-bold text-[#0f1111] text-[14px]">
                <Activity className="w-4 h-4 text-[#008296]" />
                Predictive Pulse
              </div>
              <button 
                onClick={() => setIsVisible(false)} 
                className="text-[#0f1111]/60 hover:text-[#0f1111] transition-colors p-1"
                aria-label="Close prediction"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 flex gap-4 items-center">
              <div className="w-16 h-16 shrink-0 rounded bg-[#f7f7f7] flex items-center justify-center p-2 border border-[#e7e7e7]">
                <ProductImage keyword={item.imageKeyword} alt={item.name} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-semibold text-[#0f1111] leading-tight mb-1 truncate">{item.name}</div>
                <div className="text-[12px] text-[#565959] leading-snug">
                  {item.reasoning}
                </div>
              </div>
            </div>
            
            <div className="px-4 pb-4">
              <button
                onClick={handleAdd}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-semibold text-[13px] py-2 rounded-full border border-[#fcd200] shadow-[0_1px_2px_rgba(15,17,17,0.15)] flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" /> One-Tap Reorder (₹{item.price})
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
