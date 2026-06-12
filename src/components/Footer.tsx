import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const COLS = [
  {
    title: "Get to Know Now",
    links: ["About Now", "How It Works", "Careers", "Press"],
  },
  {
    title: "Connect With Now",
    links: ["AI Council Explained", "Predictive Pulse Guide", "Fridge Whisperer Guide", "Voice Mode Guide"],
  },
  {
    title: "Now for Households",
    links: ["Group Carts & Split Pay", "Crisis Mode", "Eco Impact Program", "Household Patterns"],
  },
  {
    title: "Let Us Help You",
    links: ["Your Account", "Your Orders", "Returns & Replacements", "Help & FAQ"],
  },
];

const MEGA = [
  ["Now Music", "Stream millions of songs"],
  ["Now Web Services", "Cloud computing"],
  ["Now for Business", "Bulk shopping for offices"],
  ["Now Devices", "Smart home gear"],
  ["Now Fresh", "Grocery delivery"],
  ["Now Care", "Same-day pharmacy"],
  ["Now Pay", "Wallet & UPI"],
  ["Now Studios", "Original content"],
  ["Now Outlet", "Clearance deals"],
  ["Now Kids", "Subscription boxes"],
  ["Now Garage", "Auto parts"],
  ["Now Outdoors", "Camping & travel"],
];

export function Footer() {
  return (
    <footer className="mt-12">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-white text-[13px] py-3 text-center"
      >
        Back to top
      </button>

      <div className="bg-[#232f3e] text-white">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-12">
          {COLS.map((c) => (
            <div key={c.title}>
              <div className="font-bold text-[16px] mb-3">{c.title}</div>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a className="text-[#dddddd] hover:underline text-[13px] cursor-pointer">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/20">
          <div className="max-w-[1500px] mx-auto py-8 flex flex-col items-center gap-4">
            <Link to="/"><Logo /></Link>
            <div className="flex gap-3 text-[12px]">
              <button className="border border-white/40 px-3 py-1.5 rounded-sm hover:border-white">English ▾</button>
              <button className="border border-white/40 px-3 py-1.5 rounded-sm hover:border-white">₹ INR — Indian Rupee ▾</button>
              <button className="border border-white/40 px-3 py-1.5 rounded-sm hover:border-white">🇮🇳 India ▾</button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f1111] text-[#999] py-10">
        <div className="max-w-[1500px] mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-4 px-8 text-[11px]">
          {MEGA.map(([t, d]) => (
            <div key={t}>
              <div className="text-white text-[13px]">{t}</div>
              <div>{d}</div>
            </div>
          ))}
        </div>
        <div className="max-w-[1500px] mx-auto mt-8 px-8 text-center text-[11px]">
          <div className="flex justify-center gap-5 mb-2">
            <a className="hover:underline cursor-pointer">Conditions of Use</a>
            <a className="hover:underline cursor-pointer">Privacy Notice</a>
            <a className="hover:underline cursor-pointer">Your Ads Privacy Choices</a>
          </div>
          © 2026 Now (HackOn with Amazon Season 6.0 — Concept Project)
        </div>
      </div>
    </footer>
  );
}
