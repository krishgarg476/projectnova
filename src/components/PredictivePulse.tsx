import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { Zap, ArrowRight, Check, X } from "lucide-react";
import { useStore } from "@/store";
import { ProductImage } from "@/components/ProductImage";
import { predictNextBasket } from "@/lib/ml/basketModel";
import { getCurrentSessionContext } from "@/lib/ml/sessionContext";

export function PredictivePulse() {
  const [isVisible, setIsVisible] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const addCartItem = useStore((s) => s.addCartItem);
  const navigate = useNavigate();

  const prediction = useMemo(() => predictNextBasket(getCurrentSessionContext()), []);

  useEffect(() => {
    if (prediction) {
      const t = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(t);
    }
  }, [prediction]);

  if (!prediction) return null;

  function dispatch() {
    if (dispatched || !prediction) return;
    for (const item of prediction.items) {
      addCartItem({
        id: item.id,
        name: item.name,
        price: item.price,
        category: item.category,
        imageKeyword: item.imageKeyword,
        reasoning: `Zero-Second Cart — ${prediction.confidence}% likely you're out of ${prediction.label}.`,
        agentSource: "context",
      });
    }
    setDispatched(true);
    setTimeout(() => {
      setIsVisible(false);
      navigate({ to: "/cart" });
    }, 700);
  }

  function handleDragEnd() {
    const track = trackRef.current;
    if (!track) return;
    const maxX = track.offsetWidth - 48;
    if (x.get() > maxX * 0.6) {
      animate(x, maxX, { type: "spring", stiffness: 300, damping: 30 });
      dispatch();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
          className="fixed top-[80px] right-6 z-50 w-full max-w-sm"
        >
          <div className="bg-white rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.2)] border border-[#e7e7e7] overflow-hidden flex flex-col">
            <div className="bg-[#fff8ed] px-4 py-3 flex items-center justify-between border-b border-[#ff9900]/30">
              <div className="flex items-center gap-2 text-[12px] font-bold text-[#cc6600] uppercase tracking-wide">
                <Zap className="w-4 h-4" /> Zero-Second Cart
              </div>
              <button 
                onClick={() => setIsVisible(false)} 
                className="text-[#cc6600]/60 hover:text-[#cc6600] transition-colors p-1"
                aria-label="Close prediction"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 shrink-0">
                  {prediction.items.map((item) => (
                    <div key={item.id} className="w-12 h-12 rounded-full bg-[#f3f3f3] border-2 border-white overflow-hidden shadow">
                      <ProductImage keyword={item.imageKeyword} seed={item.id} size={80} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-[13px] text-[#0f1111] leading-snug">
                  There's a <span className="font-bold">{prediction.confidence}% chance</span> you're out of{" "}
                  <span className="font-bold">{prediction.label}</span> right now — want it dispatched?
                </div>
              </div>
              
              <div ref={trackRef} className="relative h-12 rounded-full bg-[#ffeed6] overflow-hidden select-none touch-none">
                <div className="absolute inset-0 flex items-center justify-center text-[12px] font-semibold text-[#cc6600] pointer-events-none px-12 text-center leading-tight">
                  {dispatched ? "Dispatched!" : `Swipe to dispatch →`}
                </div>
                <motion.div
                  drag={dispatched ? false : "x"}
                  dragConstraints={trackRef}
                  dragElastic={0}
                  dragMomentum={false}
                  style={{ x }}
                  onDragEnd={handleDragEnd}
                  className="absolute left-0 top-0 h-12 w-12 rounded-full bg-[#ff9900] flex items-center justify-center text-white shadow-md cursor-grab active:cursor-grabbing"
                >
                  {dispatched ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
