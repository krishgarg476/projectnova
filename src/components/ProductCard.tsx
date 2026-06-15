import { useStore, type CartItem } from "@/store";
import { ProductImage } from "./ProductImage";
import { Sparkles, Star, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export interface Product {
  id: string;
  name: string;
  imageKeyword?: string;
  emoji?: string; // legacy/ignored
  price: number;
  originalPrice?: number;
  reasoning?: string;
  agent?: "speed" | "context" | "health";
  brand?: string;
  isEco?: boolean;
}

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
  const openProductDetail = useStore((s) => s.openProductDetail);
  const favBrands = useStore((s) => s.favoriteBrands);
  const isFavBrand = !!(p.brand && favBrands.find((b) => b.name === p.brand && b.prioritize));
  const discount = p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0;
  const keyword = p.imageKeyword || p.name.toLowerCase().split(" ").slice(0, 3).join("-");

  function openDetail() {
    openProductDetail({
      id: p.id, name: p.name, category: "Detail", quantity: 1, price: p.price, originalPrice: p.originalPrice,
      reasoning: p.reasoning || "", agentSource: p.agent || "context", imageKeyword: keyword,
      isVegetarian: true, isEco: p.isEco ?? false, etaMinutes: 11, discountPercent: discount, relevanceScore: 80, brand: p.brand,
    } as CartItem);
  }

  return (
    <motion.div layout className="az-card p-3 flex flex-col gap-2 hover:shadow-md transition-shadow group relative">
      <div className="relative cursor-pointer" onClick={openDetail}>
        <div className="aspect-square rounded-md overflow-hidden bg-[#f3f3f3]">
          <ProductImage keyword={keyword} seed={p.id} size={400} className="w-full h-full object-cover" alt={p.name} />
        </div>
        {discount > 0 && (
          <div className="absolute top-1 left-1 bg-[#cc0c39] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm">
            -{discount}%
          </div>
        )}
        {p.isEco && (
          <div className="absolute top-1 right-1 bg-[#007600] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">🌱 ECO</div>
        )}
        {onAdd && (
          <button
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#c89411] flex items-center justify-center text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Add to cart"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      <button onClick={openDetail} className="text-[13px] line-clamp-2 leading-tight text-left hover:text-[#c7511f]">{p.name}</button>

      <div className="flex items-center gap-1 flex-wrap">
        {p.reasoning && (
          <div
            className="relative inline-block"
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
        {isFavBrand && (
          <span className="inline-flex items-center gap-1 border border-[#ff9900] text-[#c7511f] text-[10px] font-semibold px-1.5 py-0.5 rounded-full">⭐ Your usual brand</span>
        )}
      </div>

      {!compact && (
        <div className="flex items-center gap-1 text-[12px]">
          <div className="flex text-[#ffa41c]">
            {[1, 2, 3, 4].map((i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            <Star className="w-3 h-3 fill-current opacity-50" />
          </div>
          <span className="text-[#007185]">({Math.floor(120 + parseInt(p.id.replace(/\D/g, "").slice(-5) || "1", 10) * 37 % 5000)})</span>
        </div>
      )}

      <div className="flex items-baseline gap-1">
        <span className="text-[18px] font-medium">
          <sup className="text-[12px]">₹</sup>{p.price}
        </span>
        {p.originalPrice && (
          <span className="text-[12px] text-[#565959] line-through">M.R.P: ₹{p.originalPrice}</span>
        )}
      </div>
    </motion.div>
  );
}
