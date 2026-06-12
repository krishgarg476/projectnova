import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { useStore } from "@/store";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";
import { motion } from "framer-motion";

export const Route = createFileRoute("/pulse")({
  head: () => ({ meta: [{ title: "Predictive Pulse — Now" }] }),
  component: PulsePage,
});

const WEEK = [
  { d: "Mon", v: 32 },
  { d: "Tue", v: 45 },
  { d: "Wed", v: 28 },
  { d: "Thu", v: 60 },
  { d: "Fri", v: 88 },
  { d: "Sat", v: 72 },
  { d: "Sun", v: 50 },
];

const TIMELINE = [
  { time: "7:00 PM", title: "Snack Run", emoji: "🍿", conf: 87, reason: "You order snacks 9/10 Fridays at this time.", query: "snacks for tonight" },
  { time: "9:30 PM", title: "Late Dinner", emoji: "🍜", conf: 73, reason: "Light dinner pattern on Fridays.", query: "late dinner, quick" },
  { time: "8:00 AM", title: "Milk & Bread Restock", emoji: "🥛", conf: 94, reason: "Weekend morning staples — predicted to run out.", query: "milk bread restock" },
  { time: "11:30 AM", title: "Weekend Brunch Supplies", emoji: "🥑", conf: 68, reason: "Saturday brunch detected in last 4 weeks.", query: "brunch supplies" },
];

function PulsePage() {
  const navigate = useNavigate();
  const generate = useStore((s) => s.generateResults);

  async function prep(q: string) {
    await generate(q);
    navigate({ to: "/results" });
  }

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5 space-y-4">
        <div className="az-card p-5">
          <h1 className="text-[22px] font-bold">Predictive Pulse</h1>
          <p className="text-[14px] text-[#565959]">Now learns your patterns and prepares carts before you need them.</p>
        </div>

        <div className="az-card p-5">
          <h2 className="font-bold text-[16px] mb-3">Your activity pattern this week</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WEEK}>
                <XAxis dataKey="d" />
                <YAxis />
                <Bar dataKey="v" radius={[4, 4, 0, 0]}>
                  {WEEK.map((e, i) => <Cell key={i} fill={e.d === "Fri" ? "#ff9900" : "#d5d9d9"} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="az-card p-5">
          <h2 className="font-bold text-[16px] mb-4">Next 24 hours — predicted needs</h2>
          <ol className="relative border-l-2 border-[#5848bc]/30 ml-4 space-y-6">
            {TIMELINE.map((t, i) => (
              <motion.li
                key={t.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="ml-6 relative"
              >
                <span className="absolute -left-[34px] w-6 h-6 rounded-full bg-[#5848bc] text-white text-sm flex items-center justify-center font-bold">{i + 1}</span>
                <div className="az-card p-4 flex items-center gap-4">
                  <div className="text-4xl">{t.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="font-bold text-[15px]">{t.title}</div>
                      <span className="text-[12px] text-[#565959]">— {t.time}</span>
                      <span className="ai-badge">{t.conf}% likely</span>
                    </div>
                    <div className="text-[13px] text-[#565959]">{t.reason}</div>
                  </div>
                  <button onClick={() => prep(t.query)} className="btn-az-orange px-4 py-2 text-[13px] font-semibold whitespace-nowrap">Prep this cart →</button>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Layout>
  );
}
