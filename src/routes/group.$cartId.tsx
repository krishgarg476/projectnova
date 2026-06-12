import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Check, X, Copy, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const Route = createFileRoute("/group/$cartId")({
  head: () => ({ meta: [{ title: "Group Cart — Now" }] }),
  component: GroupPage,
});

const PEOPLE = [
  { name: "Krish", color: "#ff9900", initials: "K" },
  { name: "Priya", color: "#5848bc", initials: "P" },
  { name: "Arjun", color: "#007185", initials: "A" },
  { name: "Sneha", color: "#b12704", initials: "S" },
];

const ITEMS = [
  { id: "g1", name: "Pizza Family Pack", emoji: "🍕", price: 599, by: 1, status: "confirmed" },
  { id: "g2", name: "Coke 2L (3-pack)", emoji: "🥤", price: 270, by: 0, status: "confirmed" },
  { id: "g3", name: "Garlic Bread (2-pack)", emoji: "🥖", price: 220, by: 2, status: "confirmed" },
  { id: "g4", name: "Choco Lava Cake (4)", emoji: "🍫", price: 320, by: 3, status: "confirmed" },
  { id: "g5", name: "Paneer Tikka Starter", emoji: "🍢", price: 380, by: 1, status: "pending" },
  { id: "g6", name: "Imported Cheese Board", emoji: "🧀", price: 750, by: 2, status: "rejected" },
];

function GroupPage() {
  useParams({ from: "/group/$cartId" });
  const [items, setItems] = useState(ITEMS);
  const [copied, setCopied] = useState(false);

  function setStatus(id: string, status: string) {
    setItems((it) => it.map((i) => (i.id === id ? { ...i, status } : i)));
  }

  const confirmed = items.filter((i) => i.status === "confirmed");
  const totals = PEOPLE.map((p, i) => ({
    name: p.name,
    amount: confirmed.filter((c) => c.by === i).reduce((s, c) => s + c.price, 0),
    color: p.color,
  }));
  const total = confirmed.reduce((s, c) => s + c.price, 0);
  const perHead = Math.round(total / PEOPLE.length);

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 space-y-4">
        <div className="az-card p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold flex items-center gap-2"><Users className="w-6 h-6 text-[#5848bc]" /> Shared cart for tonight 🎉</h1>
            <div className="text-[13px] text-[#565959]">4 people viewing · now.app/group/abc123</div>
          </div>
          <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="btn-az-yellow px-4 py-2 flex items-center gap-2">
            <Copy className="w-4 h-4" /> {copied ? "Copied ✓" : "Copy share link"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          <section className="az-card p-5">
            <div className="flex items-center gap-3 mb-4">
              {PEOPLE.map((p) => (
                <div key={p.name} className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center" style={{ background: p.color }}>{p.initials}</div>
              ))}
              <button className="w-10 h-10 rounded-full border-2 border-dashed border-[#d5d9d9] text-[#565959] hover:border-[#0f1111]">+</button>
            </div>
            <ul className="divide-y divide-[#d5d9d9]">
              {items.map((it) => {
                const person = PEOPLE[it.by];
                return (
                  <li key={it.id} className={`py-3 flex items-center gap-3 ${it.status === "confirmed" ? "border-l-4 border-l-[#007600] pl-3" : ""} ${it.status === "rejected" ? "opacity-40 line-through" : ""}`}>
                    <div className="w-14 h-14 bg-[#f3f3f3] rounded flex items-center justify-center text-3xl">{it.emoji}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-[14px]">{it.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: person.color }}>{person.initials}</span>
                        <span className="text-[12px] text-[#565959]">Suggested by {person.name}</span>
                      </div>
                    </div>
                    <div className="text-[14px] font-bold w-20 text-right">₹{it.price}</div>
                    <div className="flex gap-1">
                      <button onClick={() => setStatus(it.id, "confirmed")} className="w-8 h-8 rounded-full bg-[#e6f4ea] hover:bg-[#c8e6c9] text-[#007600] flex items-center justify-center"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setStatus(it.id, "rejected")} className="w-8 h-8 rounded-full bg-[#fde2e0] hover:bg-[#fac8c5] text-[#b12704] flex items-center justify-center"><X className="w-4 h-4" /></button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          <aside className="space-y-4">
            <div className="az-card p-5">
              <h2 className="font-bold text-[16px] mb-3">Cost split</h2>
              <div className="h-44">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={totals} layout="vertical" margin={{ left: 10 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={60} />
                    <Tooltip />
                    <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                      {totals.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="text-[13px] mt-2 text-[#565959]">Or split evenly: <b className="text-[#0f1111]">₹{perHead}</b> each</div>
            </div>

            <div className="az-card p-5 space-y-2">
              <div className="flex justify-between text-[15px]"><span>Group total</span><span className="font-bold">₹{total}</span></div>
              <Link to="/checkout" className="btn-az-yellow w-full block text-center py-2.5 font-semibold">Confirm group order →</Link>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  );
}
