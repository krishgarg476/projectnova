import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useStore } from "@/store";
import { Leaf, Flame } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/eco-impact")({
  head: () => ({ meta: [{ title: "Eco Impact — Now" }] }),
  component: EcoImpactPage,
});

const WEEKLY = [
  { w: "Wk 1", co2: 0.4 },
  { w: "Wk 2", co2: 0.7 },
  { w: "Wk 3", co2: 0.9 },
  { w: "Wk 4", co2: 1.2 },
];

const BUNDLED = [
  { date: "June 10", items: "Bundled 3 items", saved: "0.3 kg" },
  { date: "June 6", items: "Bundled 4 items", saved: "0.4 kg" },
  { date: "May 30", items: "Bundled 2 items", saved: "0.15 kg" },
  { date: "May 24", items: "Bundled 5 items", saved: "0.5 kg" },
  { date: "May 18", items: "Bundled 3 items", saved: "0.25 kg" },
];

const TIPS = [
  "Choose 'Standard' delivery when you're not in a rush to reduce trips.",
  "Reusable packaging items are marked with a 🌱 badge across Now.",
  "Bundling 4+ items in one delivery cuts emissions by ~40% per item.",
  "Refill packs use 60% less plastic than fresh bottles — look for them.",
];

function EcoImpactPage() {
  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 space-y-4">
        <div className="az-card p-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-center">
          <div className="relative w-48 h-48 mx-auto">
            <svg viewBox="0 0 36 36" className="w-48 h-48 -rotate-90">
              <circle cx="18" cy="18" r="14" fill="none" stroke="#eee" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#007600" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="22" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[36px] font-bold text-[#007600]">1.2 kg</div>
              <div className="text-[12px] text-[#565959]">CO₂ saved this month</div>
            </div>
          </div>
          <div>
            <h1 className="text-[26px] font-bold flex items-center gap-2"><Leaf className="w-6 h-6 text-[#007600]" /> Your Green Path</h1>
            <p className="text-[14px] text-[#565959] mt-2">Equivalent to planting 0.3 trees 🌳. Keep bundling deliveries to grow your impact.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="az-card p-5">
            <h2 className="font-bold text-[16px] mb-3">Weekly trend</h2>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={WEEKLY}>
                  <XAxis dataKey="w" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="co2" stroke="#007600" strokeWidth={3} dot={{ r: 5, fill: "#007600" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="az-card p-5">
            <h2 className="font-bold text-[16px] mb-2 flex items-center gap-2"><Flame className="w-5 h-5 text-[#ff9900]" /> 4-week green streak</h2>
            <div className="flex gap-2 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-1 aspect-square rounded bg-[#e6f4ea] flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-[#007600]" />
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#565959] mt-3">You've consolidated deliveries every week this month. One more week to unlock the "Eco Champion" badge.</p>
          </div>
        </div>

        <div className="az-card p-5">
          <h2 className="font-bold text-[16px] mb-3">Bundled deliveries (last 5)</h2>
          <ul className="divide-y divide-[#d5d9d9] text-[13px]">
            {BUNDLED.map((b, i) => (
              <li key={i} className="py-2 flex justify-between">
                <span>{b.date} — {b.items}</span>
                <span className="text-[#007600] font-semibold">saved {b.saved}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="az-card p-5">
          <h2 className="font-bold text-[16px] mb-3">Eco tips</h2>
          <ul className="space-y-2 text-[13px]">
            {TIPS.map((t, i) => <li key={i} className="flex gap-2"><Leaf className="w-4 h-4 text-[#007600] shrink-0 mt-0.5" />{t}</li>)}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

// Use store imports to avoid tree-shaking issues
export const _u = useStore;
