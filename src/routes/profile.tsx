import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { useStore } from "@/store";
import { Leaf, Shield, MapPin, History, Heart, Activity } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Your Account — Now" }] }),
  component: ProfilePage,
});

const PATTERNS = [
  { l: "Weekday mornings: tea essentials", on: true },
  { l: "Friday evenings: snacks & beverages", on: true },
  { l: "Monthly: bulk household restock", on: false },
];

const PREFS = ["Vegetarian", "No nuts", "Budget-conscious", "Eco-friendly", "Quick delivery"];

const ORDERS = [
  { id: "NOW-2026-9712", date: "Yesterday", items: "Snack & beverage pack", total: 879, query: "snack and beverage pack" },
  { id: "NOW-2026-9684", date: "3 days ago", items: "Wellness essentials", total: 451, query: "wellness essentials" },
  { id: "NOW-2026-9522", date: "Last week", items: "Weekly grocery restock", total: 1240, query: "weekly grocery restock" },
];

function ProfilePage() {
  const [pats, setPats] = useState(PATTERNS);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ Vegetarian: true, "Budget-conscious": true });
  const navigate = useNavigate();
  const generate = useStore((s) => s.generateResults);

  async function reorder(q: string) {
    await generate(q);
    navigate({ to: "/results" });
  }

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5">
        <h1 className="text-[28px] font-normal mb-4">Your Account</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <Tile icon={<Activity className="w-6 h-6 text-[#5848bc]" />} title="Household Patterns" desc="Learned routines Now can act on.">
            {pats.map((p, i) => (
              <label key={p.l} className="flex items-center justify-between py-2 text-[13px]">
                <span>{p.l}</span>
                <input type="checkbox" checked={p.on} onChange={() => setPats(pats.map((x, j) => j === i ? { ...x, on: !x.on } : x))} className="w-9 h-5 accent-[#ff9900]" />
              </label>
            ))}
          </Tile>

          <Tile icon={<Leaf className="w-6 h-6 text-[#007600]" />} title="Eco Impact" desc="Your green path so far.">
            <div className="flex items-center justify-center my-3">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-32 h-32 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#eee" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="#007600" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-[24px] font-bold text-[#007600]">1.2 kg</div>
                  <div className="text-[10px] text-[#565959]">CO₂ saved</div>
                </div>
              </div>
            </div>
            <div className="text-[12px] text-center text-[#565959]">8 bundled deliveries this month</div>
          </Tile>

          <Tile icon={<Heart className="w-6 h-6 text-[#b12704]" />} title="Dietary & Budget Preferences" desc="Tags Now uses to refine carts.">
            <div className="flex flex-wrap gap-2 mt-2">
              {PREFS.map((p) => (
                <button key={p} onClick={() => setPrefs({ ...prefs, [p]: !prefs[p] })} className={`px-3 py-1 rounded-full text-[12px] border transition ${prefs[p] ? "bg-[#5848bc] text-white border-[#5848bc]" : "bg-white border-[#d5d9d9] hover:border-[#0f1111]"}`}>
                  {p}
                </button>
              ))}
            </div>
          </Tile>

          <Tile icon={<Shield className="w-6 h-6 text-[#b12704]" />} title="Crisis Contacts" desc="People notified during a Crisis Mode order.">
            <div className="border border-[#d5d9d9] rounded p-3 text-[13px]">
              <div className="font-semibold">Priya Sharma</div>
              <div className="text-[#565959]">Sister · +91 98XXX XX234</div>
              <button className="az-link text-[12px] mt-1">Edit</button>
            </div>
          </Tile>

          <Tile icon={<MapPin className="w-6 h-6 text-[#007185]" />} title="Saved Addresses" desc="Where Now delivers.">
            <div className="space-y-2 text-[13px]">
              <div className="border border-[#d5d9d9] rounded p-3">
                <div className="font-semibold">Home</div>
                <div className="text-[#565959]">203, Vigyan Nagar, Kota 324001</div>
              </div>
              <div className="border border-[#d5d9d9] rounded p-3">
                <div className="font-semibold">Office</div>
                <div className="text-[#565959]">5th Floor, Tech Park, Jaipur 302017</div>
              </div>
            </div>
          </Tile>

          <Tile icon={<History className="w-6 h-6 text-[#565959]" />} title="Order History" desc="Quick reorder from past purchases.">
            <ul className="space-y-2 text-[13px]">
              {ORDERS.map((o) => (
                <li key={o.id} className="flex items-center justify-between border-b border-[#d5d9d9] pb-2 last:border-0">
                  <div>
                    <div className="font-semibold">{o.items}</div>
                    <div className="text-[11px] text-[#565959]">{o.date} · ₹{o.total}</div>
                  </div>
                  <button onClick={() => reorder(o.query)} className="btn-az-yellow text-[12px]">Buy Again</button>
                </li>
              ))}
            </ul>
          </Tile>
        </div>
      </div>
    </Layout>
  );
}

function Tile({ icon, title, desc, children }: any) {
  return (
    <div className="az-card p-5">
      <div className="flex items-center gap-3 mb-2">{icon}<h2 className="font-bold text-[16px]">{title}</h2></div>
      <p className="text-[12px] text-[#565959] mb-2">{desc}</p>
      {children}
    </div>
  );
}
