import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useStore } from "@/store";
import { Check, X, Copy, Users, Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export const Route = createFileRoute("/group/$cartId")({
  head: () => ({ meta: [{ title: "Group Cart — Now" }] }),
  component: GroupPage,
});

const CONTACTS = [
  { name: "Rohan", color: "#0e7c66" },
  { name: "Meera", color: "#cc4d6d" },
  { name: "Anish", color: "#0a558c" },
  { name: "Diya", color: "#874a98" },
  { name: "Kabir", color: "#b35900" },
];

function GroupPage() {
  useParams({ from: "/group/$cartId" });
  const { groupCartItems, groupPeople, setGroupItemStatus, addGroupPerson, setCheckoutSource } = useStore();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [picked, setPicked] = useState<Record<string, boolean>>({});

  const confirmed = groupCartItems.filter((i) => i.status === "confirmed");
  const totals = groupPeople.map((p, i) => ({
    name: p.name,
    amount: confirmed.filter((c) => c.by === i).reduce((s, c) => s + c.price, 0),
    color: p.color,
  }));
  const total = confirmed.reduce((s, c) => s + c.price, 0);
  const perHead = groupPeople.length ? Math.round(total / groupPeople.length) : 0;

  function sendInvites() {
    Object.entries(picked).forEach(([name, on]) => {
      if (on) {
        const c = CONTACTS.find((x) => x.name === name)!;
        addGroupPerson({ name: c.name, color: c.color, initials: c.name[0] });
      }
    });
    setInviteOpen(false);
    setPicked({});
  }

  function confirmGroupOrder() {
    setCheckoutSource("group");
    navigate({ to: "/checkout" });
  }

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 space-y-4">
        <div className="az-card p-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-[22px] font-bold flex items-center gap-2"><Users className="w-6 h-6 text-[#5848bc]" /> Shared cart for tonight 🎉</h1>
            <div className="text-[13px] text-[#565959]">{groupPeople.length} people viewing · now.app/group/abc123</div>
          </div>
          <button onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="btn-az-yellow px-4 py-2 flex items-center gap-2">
            <Copy className="w-4 h-4" /> {copied ? "Copied ✓" : "Copy share link"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
          <section className="az-card p-5">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <AnimatePresence>
                {groupPeople.map((p, i) => (
                  <motion.div key={p.name + i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05, type: "spring" }} className="w-10 h-10 rounded-full text-white font-bold flex items-center justify-center" style={{ background: p.color }}>{p.initials}</motion.div>
                ))}
              </AnimatePresence>
              <button onClick={() => setInviteOpen(true)} className="w-10 h-10 rounded-full border-2 border-dashed border-[#d5d9d9] text-[#565959] hover:border-[#0f1111] flex items-center justify-center"><Plus className="w-4 h-4" /></button>
            </div>
            <ul className="divide-y divide-[#d5d9d9]">
              <AnimatePresence>
                {groupCartItems.map((it) => {
                  const person = groupPeople[it.by] || groupPeople[0];
                  return (
                    <motion.li key={it.id} layout exit={{ opacity: 0, x: -20 }} className={`py-3 flex items-center gap-3 ${it.status === "confirmed" ? "border-l-4 border-l-[#007600] pl-3" : ""} ${it.status === "rejected" ? "opacity-40 line-through" : ""}`}>
                      <div className="w-14 h-14 bg-[#f3f3f3] rounded overflow-hidden"><ProductImage keyword={it.imageKeyword} seed={it.id} size={100} className="w-full h-full object-cover" /></div>
                      <div className="flex-1">
                        <div className="font-semibold text-[14px]">{it.name}</div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center" style={{ background: person.color }}>{person.initials}</span>
                          <span className="text-[12px] text-[#565959]">Suggested by {person.name}</span>
                        </div>
                      </div>
                      <div className="text-[14px] font-bold w-20 text-right">₹{it.price}</div>
                      <div className="flex gap-1">
                        <button onClick={() => setGroupItemStatus(it.id, "confirmed")} className="w-8 h-8 rounded-full bg-[#e6f4ea] hover:bg-[#c8e6c9] text-[#007600] flex items-center justify-center"><Check className="w-4 h-4" /></button>
                        <button onClick={() => setGroupItemStatus(it.id, "rejected")} className="w-8 h-8 rounded-full bg-[#fde2e0] hover:bg-[#fac8c5] text-[#b12704] flex items-center justify-center"><X className="w-4 h-4" /></button>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
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
              <button onClick={confirmGroupOrder} className="btn-az-yellow w-full block text-center py-2.5 font-semibold">Confirm group order →</button>
              <Link to="/" className="block text-center text-[12px] az-link mt-1">← Back</Link>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {inviteOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setInviteOpen(false)} className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg w-[400px] max-w-full p-5 shadow-2xl">
              <h2 className="font-bold text-[16px] mb-3">Invite people to this cart</h2>
              <ul className="space-y-2">
                {CONTACTS.map((c) => (
                  <li key={c.name}>
                    <label className="flex items-center gap-3 p-2 border border-[#d5d9d9] rounded cursor-pointer hover:bg-[#fafafa]">
                      <input type="checkbox" checked={!!picked[c.name]} onChange={(e) => setPicked((p) => ({ ...p, [c.name]: e.target.checked }))} className="accent-[#ff9900]" />
                      <span className="w-8 h-8 rounded-full text-white text-[12px] font-bold flex items-center justify-center" style={{ background: c.color }}>{c.name[0]}</span>
                      <span className="text-[14px]">{c.name}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <button onClick={sendInvites} className="btn-az-yellow w-full mt-4 py-2 font-semibold">Send invites</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
