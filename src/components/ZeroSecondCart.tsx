// "Zero-Second Cart" — Next-Basket Prediction.
// A small hand-rolled gradient-boosted tree model (trained offline by
// scripts/trainBasketModel.ts on src/lib/data/basketSessions.json) looks at
// the current time/day plus how overdue each grocery category is, and
// predicts what the user most likely opened the app to buy. If nothing is
// confident enough, this renders nothing.
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useMotionValue, animate } from "framer-motion";
import { Zap, ArrowRight, Check } from "lucide-react";
import { useStore } from "@/store";
import { ProductImage } from "@/components/ProductImage";
import { predictNextBasket } from "@/lib/ml/basketModel";
import { getCurrentSessionContext } from "@/lib/ml/sessionContext";

const HANDLE_SIZE = 56;

export function ZeroSecondCart() {
  const navigate = useNavigate();
  const addCartItem = useStore((s) => s.addCartItem);
  const [dispatched, setDispatched] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const prediction = useMemo(() => predictNextBasket(getCurrentSessionContext()), []);

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
        reasoning: `Zero-Second Cart — ${prediction.confidence}% likely you're out of ${prediction.label}, based on the time and your usual pattern.`,
        agentSource: "context",
      });
    }
    setDispatched(true);
    setTimeout(() => navigate({ to: "/cart" }), 700);
  }

  function handleDragEnd() {
    const track = trackRef.current;
    if (!track) return;
    const maxX = track.offsetWidth - HANDLE_SIZE;
    if (x.get() > maxX * 0.6) {
      animate(x, maxX, { type: "spring", stiffness: 300, damping: 30 });
      dispatch();
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
    }
  }

  return (
    <div className="max-w-[1500px] mx-auto px-4 pt-4">
      <div className="az-card p-4 sm:p-5 border-2 border-[#ff9900]/40 bg-gradient-to-r from-[#fff8ed] to-white">
        <div className="flex items-center gap-2 text-[12px] font-bold text-[#cc6600] uppercase tracking-wide">
          <Zap className="w-4 h-4" /> Zero-Second Cart
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-2">
          <div className="flex -space-x-3 shrink-0">
            {prediction.items.map((item) => (
              <div key={item.id} className="w-14 h-14 rounded-full bg-[#f3f3f3] border-2 border-white overflow-hidden shadow">
                <ProductImage keyword={item.imageKeyword} seed={item.id} size={100} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <p className="text-[14px] flex-1 min-w-[200px]">
            There's a <span className="font-bold">{prediction.confidence}% chance</span> you're out of{" "}
            <span className="font-bold">{prediction.label}</span> right now — want it dispatched?
          </p>
        </div>

        <div ref={trackRef} className="relative h-14 rounded-full bg-[#fff3e0] mt-4 overflow-hidden select-none touch-none">
          <div className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-[#cc6600] pointer-events-none px-16 text-center">
            {dispatched ? "Dispatched — heading to your cart..." : `Swipe to dispatch ${prediction.label} →`}
          </div>
          <motion.div
            drag={dispatched ? false : "x"}
            dragConstraints={trackRef}
            dragElastic={0}
            dragMomentum={false}
            style={{ x }}
            onDragEnd={handleDragEnd}
            className="absolute left-0 top-0 h-14 w-14 rounded-full bg-[#ff9900] flex items-center justify-center text-white shadow-md cursor-grab active:cursor-grabbing"
          >
            {dispatched ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
