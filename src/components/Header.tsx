import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Search, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import { useStore } from "@/store";
import { Logo } from "./Logo";

const PLACEHOLDERS = [
  "Guests arriving in an hour...",
  "Power cut, fridge items at risk...",
  "Just got home, starving...",
  "Feeling unwell, need supplies...",
  "Snap your fridge — get a cart...",
];

const CATEGORIES = ["All", "Groceries", "Wellness", "Household Essentials", "Snacks & Beverages", "AI Predictions"];

const NAV_LINKS: { label: string; to: string }[] = [
  { label: "AI Council", to: "/results" },
  { label: "Predictive Pulse", to: "/pulse" },
  { label: "Fridge Whisperer", to: "/fridge-whisperer" },
  { label: "Crisis Mode", to: "/crisis" },
  { label: "Group Carts", to: "/group/demo" },
  { label: "Eco Impact", to: "/eco-impact" },
  { label: "Voice Mode", to: "/voice" },
  { label: "Chat Shopping", to: "/chat" },
  { label: "Profile", to: "/profile" },
];

export function Header() {
  const [text, setText] = useState("");
  const [ph, setPh] = useState("");
  const [phIdx, setPhIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [cat, setCat] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [acctOpen, setAcctOpen] = useState(false);
  const navigate = useNavigate();
  const cartItems = useStore((s) => s.cartItems);
  const generate = useStore((s) => s.generateResults);
  const userProfile = useStore((s) => s.userProfile);
  const addresses = useStore((s) => s.addresses);
  const selectedAddressId = useStore((s) => s.selectedAddressId);
  const openAddressSelector = useStore((s) => s.openAddressSelector);
  const openCrisisTriage = useStore((s) => s.openCrisisTriage);
  const cartCount = cartItems.reduce((n, i) => n + i.quantity, 0);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];
  const pincode = selectedAddress?.cityStateZip.match(/\d{6}/)?.[0] || "324001";
  const city = selectedAddress?.cityStateZip.split(",")[0] || "Kota";

  useEffect(() => {
    const current = PLACEHOLDERS[phIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => { setPh(current.slice(0, charIdx + 1)); setCharIdx((i) => i + 1); }, 55);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => { setCharIdx(0); setPh(""); setPhIdx((i) => (i + 1) % PLACEHOLDERS.length); }, 2200);
    return () => clearTimeout(t);
  }, [charIdx, phIdx]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const q = (text || ph || "daily restock").trim();
    navigate({ to: "/results" });
    generate(q);
  }

  function isActive(to: string) {
    if (to === "/group/demo") return pathname.startsWith("/group/");
    return pathname === to;
  }

  return (
    <>
      {/* Row 1 */}
      <div className="bg-[#131921] text-white">
        <div className="max-w-[1500px] mx-auto flex items-center gap-2 px-3 h-[60px]">
          <Link to="/" className="px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm shrink-0">
            <Logo />
          </Link>

          <button onClick={openAddressSelector} className="hidden md:flex items-start text-left px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm shrink-0">
            <MapPin className="w-4 h-4 mt-3 mr-1 text-[#ccc]" />
            <div className="leading-tight">
              <div className="text-[12px] text-[#ccc]">Deliver to {userProfile.name.split(" ")[0]}</div>
              <div className="text-[14px] font-bold">{city} {pincode}</div>
            </div>
          </button>

          <form onSubmit={submit} className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-[#ff9900]">
            <select value={cat} onChange={(e) => setCat(e.target.value)} className="bg-[#f3f3f3] text-[#0f1111] text-[12px] px-2 border-r border-[#cdcdcd] outline-none">
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} placeholder={ph} className="flex-1 px-3 text-[14px] text-[#0f1111] bg-white outline-none min-w-0" />
            <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] px-4 flex items-center justify-center">
              <Search className="w-5 h-5 text-[#0f1111]" />
            </button>
          </form>

          <button className="hidden lg:flex items-center gap-1 px-2 py-1 text-[14px] font-bold hover:outline hover:outline-1 hover:outline-white rounded-sm shrink-0">
            🇮🇳 EN <ChevronDown className="w-3 h-3" />
          </button>

          <div className="relative shrink-0" onMouseEnter={() => setAcctOpen(true)} onMouseLeave={() => setAcctOpen(false)}>
            <button className="text-left px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm leading-tight">
              <div className="text-[12px]">Hello, {userProfile.name.split(" ")[0]}</div>
              <div className="text-[14px] font-bold flex items-center gap-0.5">Account & Lists <ChevronDown className="w-3 h-3" /></div>
            </button>
            <AnimatePresence>
              {acctOpen && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0.95, y: -4 }} animate={{ opacity: 1, scaleY: 1, y: 0 }} exit={{ opacity: 0, scaleY: 0.95 }}
                  transition={{ duration: 0.15 }} style={{ transformOrigin: "top" }}
                  className="absolute right-0 top-full bg-white text-[#0f1111] shadow-2xl border border-[#d5d9d9] rounded-sm w-64 z-50 p-3"
                >
                  <div className="text-[13px] font-semibold mb-2">Your Account</div>
                  <Link to="/profile" className="block py-1 text-[13px] az-link">Your Profile</Link>
                  <Link to="/tracking/$orderId" params={{ orderId: "demo-order" }} className="block py-1 text-[13px] az-link">Your Orders</Link>
                  <Link to="/pulse" className="block py-1 text-[13px] az-link">Your Predictive Pulse</Link>
                  <Link to="/eco-impact" className="block py-1 text-[13px] az-link">Your Eco Impact</Link>
                  <hr className="my-2" />
                  <button className="text-[13px] az-link">Sign Out</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/tracking/$orderId" params={{ orderId: "demo-order" }} className="hidden md:block text-left px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm leading-tight shrink-0">
            <div className="text-[12px]">Returns</div>
            <div className="text-[14px] font-bold">& Orders</div>
          </Link>

          <Link to="/cart" className="flex items-end gap-1 px-2 py-1 hover:outline hover:outline-1 hover:outline-white rounded-sm relative shrink-0">
            <div className="relative">
              <ShoppingCart className="w-8 h-8" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="absolute -top-1 left-5 bg-[#ff9900] text-[#131921] text-[13px] font-bold rounded-full min-w-[22px] h-[22px] flex items-center justify-center px-1"
              >
                {cartCount}
              </motion.span>
            </div>
            <span className="text-[14px] font-bold pb-1">Cart</span>
          </Link>
        </div>
      </div>

      {/* Row 2 */}
      <div className="bg-[#232f3e] text-white">
        <div className="max-w-[1500px] mx-auto flex items-center px-2 h-[40px] gap-1 text-[14px]">
          <button onClick={() => setMenuOpen(true)} className="flex items-center gap-1 px-3 py-2 font-bold hover:outline hover:outline-1 hover:outline-white rounded-sm">
            <Menu className="w-5 h-5" /> All
          </button>
          <nav className="flex items-center gap-0 overflow-x-auto flex-1 relative">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.to);
              const onClick = l.to === "/crisis" ? (e: React.MouseEvent) => { e.preventDefault(); openCrisisTriage(); } : undefined;
              return (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={onClick}
                  className={`relative px-3 py-2 whitespace-nowrap rounded-sm transition-colors duration-150 ${active ? "text-[#ff9900] font-semibold" : "hover:text-[#febd69]"}`}
                >
                  {l.label}
                  {active && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute left-2 right-2 bottom-0 h-[2px] bg-[#ff9900] rounded"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/40" onClick={() => setMenuOpen(false)}>
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white h-full w-[360px] max-w-[90vw] overflow-y-auto" onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#232f3e] text-white px-5 py-4 flex items-center justify-between">
                <div className="font-bold text-lg">Hello, {userProfile.name.split(" ")[0]}</div>
                <button onClick={() => setMenuOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <MegaSection title="Now Intelligence" items={[
                { label: "AI Council", to: "/results" },
                { label: "Predictive Pulse", to: "/pulse" },
                { label: "Fridge Whisperer", to: "/fridge-whisperer" },
                { label: "Voice Mode", to: "/voice" },
                { label: "Chat Shopping", to: "/chat" },
              ]} onClose={() => setMenuOpen(false)} />
              <MegaSection title="Shop by Need" items={[
                { label: "Daily Restock", to: "/results" },
                { label: "Eco Impact", to: "/eco-impact" },
              ]} onClose={() => setMenuOpen(false)} />
              <MegaSection title="Programs & Features" items={[
                { label: "Group Carts & Split Pay", to: "/group/demo" },
                { label: "Profile", to: "/profile" },
              ]} onClose={() => setMenuOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MegaSection({ title, items, onClose }: { title: string; items: { label: string; to: string }[]; onClose: () => void }) {
  return (
    <div className="border-b border-[#d5d9d9] py-3">
      <div className="px-5 text-[16px] font-bold mb-2">{title}</div>
      {items.map((i) => (
        <Link key={i.label} to={i.to} onClick={onClose} className="block px-5 py-2 text-[14px] hover:bg-[#eaedf3]">{i.label}</Link>
      ))}
    </div>
  );
}
