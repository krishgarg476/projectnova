import { Star, Sparkles } from "lucide-react";
import { useState } from "react";

export interface Product {
  id: string;
  name: string;
  emoji: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reasoning?: string;
  agent?: "speed" | "context" | "health";
  bg?: string;
}

const BGS = ["#fde6c8", "#d6eaff", "#e3f5d8", "#fde0e0", "#e8e0f7", "#fff4c2", "#d9f1ec", "#fbe2cf"];

export function ProductCard({
  p,
  onAdd,
  compact = false,
}: {
  p: Product;
  onAdd?: () => void;
  compact?: boolean;
}) {
  const [showTip, setShowTip] = useState(false);
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
  const bg = p.bg || BGS[parseInt(p.id.replace(/\D/g, "") || "0") % BGS.length];

  return (
    <div className="az-card p-3 flex flex-col gap-2 hover:shadow-md transition-shadow group relative">
      <div className="relative">
        <div
          className="aspect-square rounded-md flex items-center justify-center text-6xl"
          style={{ background: bg }}
        >
          {p.emoji}
        </div>
        {discount > 0 && (
          <div className="absolute top-1 left-1 bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
            -{discount}%
          </div>
        )}
        {onAdd && (
          <button
            onClick={onAdd}
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#c89411] flex items-center justify-center text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity"
          >
            +
          </button>
        )}
      </div>

      <div className="text-[13px] line-clamp-2 leading-tight">{p.name}</div>

      {p.reasoning && (
        <div
          className="relative inline-block self-start"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
        >
          <span className="ai-badge cursor-help">
            <Sparkles className="w-3 h-3" /> Now AI
          </span>
          {showTip && (
            <div className="absolute z-20 left-0 top-full mt-1 w-56 bg-[#0f1111] text-white text-[12px] p-2 rounded-md shadow-lg leading-snug">
              {p.reasoning}
            </div>
          )}
        </div>
      )}

      {!compact && (
        <div className="flex items-center gap-1 text-[12px]">
          <div className="flex text-[#ffa41c]">
            {[1, 2, 3, 4].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            <Star className="w-3 h-3 fill-current opacity-50" />
          </div>
          <span className="text-[#007185]">({Math.floor(120 + parseInt(p.id.replace(/\D/g, "") || "1") * 37)})</span>
        </div>
      )}

      <div className="flex items-baseline gap-1">
        <span className="text-[18px] font-medium">
          <sup className="text-[12px]">₹</sup>
          {p.price}
        </span>
        {p.originalPrice && (
          <span className="text-[12px] text-[#565959] line-through">M.R.P: ₹{p.originalPrice}</span>
        )}
      </div>

      {!compact && (
        <a className="text-[12px] az-link">Shop deals</a>
      )}
    </div>
  );
}
