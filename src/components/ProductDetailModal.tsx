import { AnimatePresence, motion } from "framer-motion";
import { useStore, cartTotal } from "@/store";
import { ProductImage } from "./ProductImage";
import { metaFor, bundlesFor, keywordForName } from "@/lib/catalog";
import { X, Star, Plus, Minus, Check } from "lucide-react";
import { useState, useEffect } from "react";

export function ProductDetailModal() {
  const product = useStore((s) => s.productDetailFor);
  const close = useStore((s) => s.closeProductDetail);
  const addCart = useStore((s) => s.addCartItem);
  const cartItems = useStore((s) => s.cartItems);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => { setQty(1); setAdded(false); }, [product?.id]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="bg-white rounded-lg max-w-[600px] w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={close} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-[#f3f3f3] flex items-center justify-center shadow z-10" aria-label="Close">
              <X className="w-5 h-5" />
            </button>

            <div className="h-[300px] bg-[#f3f3f3] overflow-hidden">
              <ProductImage keyword={product.imageKeyword} seed={product.id} size={1024} className="w-full h-full object-cover" alt={product.name} />
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-[22px] font-bold leading-tight">{product.name}</h2>
                {product.brand && <div className="text-[12px] text-[#565959] mt-0.5">Brand: {product.brand}</div>}
              </div>

              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-[26px] font-bold"><sup className="text-[14px]">₹</sup>{product.price}</span>
                {product.originalPrice && <span className="text-[14px] text-[#565959] line-through">M.R.P: ₹{product.originalPrice}</span>}
                {product.discountPercent > 0 && <span className="bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-0.5 rounded">-{product.discountPercent}%</span>}
              </div>

              <div className="flex items-center gap-1 text-[13px]">
                <div className="flex text-[#ffa41c]">
                  {[1, 2, 3, 4].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  <Star className="w-4 h-4 fill-current opacity-50" />
                </div>
                <span className="text-[#007185] ml-1">(231 ratings)</span>
              </div>

              <Description id={product.id} name={product.name} />

              <BundleRow name={product.name} />

              <Reviews id={product.id} name={product.name} />

              <div className="flex items-center gap-3 pt-3 border-t border-[#d5d9d9]">
                <div className="flex items-center border border-[#d5d9d9] rounded">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-[#f3f3f3]"><Minus className="w-4 h-4" /></button>
                  <span className="px-4 text-[15px] font-semibold">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-[#f3f3f3]"><Plus className="w-4 h-4" /></button>
                </div>
                <button
                  onClick={() => {
                    addCart({ ...product, quantity: qty });
                    setAdded(true);
                    setTimeout(() => setAdded(false), 1100);
                  }}
                  className="btn-az-yellow flex-1 py-2.5 font-semibold flex items-center justify-center gap-2"
                >
                  {added ? <><Check className="w-4 h-4" /> Added ✓</> : "Add to Cart"}
                </button>
              </div>
              <div className="text-[11px] text-[#565959]">{cartItems.length} items currently in your cart</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Description({ id, name }: { id: string; name: string }) {
  const meta = metaFor(id, name);
  return (
    <div>
      <h3 className="font-semibold text-[14px] mb-1">About this item</h3>
      <p className="text-[13px] text-[#0f1111] leading-relaxed">{meta.description}</p>
    </div>
  );
}

function BundleRow({ name }: { name: string }) {
  const addCart = useStore((s) => s.addCartItem);
  const partners = bundlesFor(name);
  if (partners.length === 0) return null;
  return (
    <div className="border-t border-[#d5d9d9] pt-3">
      <h3 className="font-semibold text-[14px] mb-2">Often bought with this</h3>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {partners.map((p, i) => (
          <div key={p} className="min-w-[140px] border border-[#d5d9d9] rounded p-2">
            <div className="aspect-square rounded overflow-hidden bg-[#f3f3f3] mb-1">
              <ProductImage keyword={keywordForName(p)} seed={`bundle-${p}`} size={200} className="w-full h-full object-cover" alt={p} />
            </div>
            <div className="text-[11px] line-clamp-2 leading-tight h-8">{p}</div>
            <button
              onClick={() => addCart({ id: `bundle-${name}-${i}`, name: p, price: 99 + i * 30, imageKeyword: keywordForName(p), reasoning: `Bundled with ${name}` })}
              className="btn-az-yellow w-full mt-1 text-[11px]"
            >Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reviews({ id, name }: { id: string; name: string }) {
  const meta = metaFor(id, name);
  return (
    <div className="border-t border-[#d5d9d9] pt-3">
      <h3 className="font-semibold text-[14px] mb-2">Customer reviews</h3>
      <ul className="space-y-3">
        {meta.reviews.map((r, i) => (
          <li key={i} className="text-[12px]">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{r.name}</span>
              <div className="flex text-[#ffa41c]">
                {[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`w-3 h-3 ${n <= r.rating ? "fill-current" : "opacity-30"}`} />)}
              </div>
              <span className="text-[#565959]">· {r.date}</span>
            </div>
            <p className="text-[#0f1111] mt-0.5">{r.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function _unused() { return cartTotal([]); }
