import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductImage } from "@/components/ProductImage";
import { useStore } from "@/store";
import { getDueStatus } from "@/lib/recurring";
import { Leaf, Shield, MapPin, History, Heart, Activity, Pencil, Plus, X, Trash2, Camera, Star, Users } from "lucide-react";

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
  { id: "NOW-2026-9684", date: "3 days ago", items: "Wellness essentials", total: 451, query: "feeling unwell, body aches" },
  { id: "NOW-2026-9522", date: "Last week", items: "Weekly grocery restock", total: 1240, query: "weekly grocery restock" },
];

function ProfilePage() {
  const navigate = useNavigate();
  const session = useStore((s) => s.session);
  const authReady = useStore((s) => s.authReady);
  const userProfile = useStore((s) => s.userProfile);
  const updateProfile = useStore((s) => s.updateProfile);
  const addresses = useStore((s) => s.addresses) || [];
  const openAddAddress = useStore((s) => s.openAddAddress);
  const deleteAddress = useStore((s) => s.deleteAddress);
  const setSelectedAddress = useStore((s) => s.setSelectedAddress);
  const selectedAddressId = useStore((s) => s.selectedAddressId);
  const dietaryPreferences = useStore((s) => s.dietaryPreferences);
  const toggleDietary = useStore((s) => s.toggleDietary);
  const familyMembers = useStore((s) => s.familyMembers);
  const updateFamilyMember = useStore((s) => s.updateFamilyMember);
  const favoriteBrands = useStore((s) => s.favoriteBrands);
  const toggleBrand = useStore((s) => s.toggleBrand);
  const crisisContacts = useStore((s) => s.crisisContacts);
  const updateCrisisContact = useStore((s) => s.updateCrisisContact);
  const addCrisisContact = useStore((s) => s.addCrisisContact);
  const deleteCrisisContact = useStore((s) => s.deleteCrisisContact);
  const generateResults = useStore((s) => s.generateResults);
  const recurringRules = useStore((s) => s.recurringRules);
  const addRecurringRule = useStore((s) => s.addRecurringRule);
  const deleteRecurringRule = useStore((s) => s.deleteRecurringRule);
  const fulfillRecurringRule = useStore((s) => s.fulfillRecurringRule);
  const [pats, setPats] = useState(PATTERNS);
  const [editing, setEditing] = useState<string | null>(null);
  const [pendingDel, setPendingDel] = useState<string | null>(null);
  const [editContact, setEditContact] = useState<string | null>(null);
  const [editMember, setEditMember] = useState<string | null>(null);
  const [newRule, setNewRule] = useState("");

  async function reorder(q: string) {
    await generateResults(q);
    navigate({ to: "/results" });
  }

  function onAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) updateProfile({ avatarUrl: URL.createObjectURL(f) });
  }

  useEffect(() => {
    if (authReady && !session) {
      navigate({ to: "/auth", replace: true });
    }
  }, [authReady, session, navigate]);

  if (!authReady) return <Layout><div className="flex items-center justify-center min-h-[60vh] text-[#565959]">Loading...</div></Layout>;
  if (!session) return null;

  return (
    <Layout>
      <div className="max-w-[1500px] mx-auto px-4 py-5">
        <h1 className="text-[28px] font-normal mb-4">Your Account</h1>

        {/* Profile header */}
        <div className="az-card p-5 mb-4 flex gap-5 items-start flex-wrap">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-[#f3f3f3] border border-[#d5d9d9] shrink-0">
            {userProfile.avatarUrl ? <img src={userProfile.avatarUrl} className="w-full h-full object-cover" /> : <ProductImage keyword="portrait-person" seed="user" size={200} className="w-full h-full object-cover" />}
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            {(["name", "phone", "email"] as const).map((field) => (
              <EditableField key={field} label={field[0].toUpperCase() + field.slice(1)} value={userProfile[field] || ""} editing={editing === field} onEdit={() => setEditing(field)} onCancel={() => setEditing(null)} onSave={(v) => { updateProfile({ [field]: v }); setEditing(null); }} />
            ))}
            <label className="inline-flex items-center gap-2 text-[12px] az-link cursor-pointer mt-2">
              <Camera className="w-4 h-4" /> Change profile photo
              <input type="file" accept="image/*" onChange={onAvatar} className="hidden" />
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Tile icon={<MapPin className="w-6 h-6 text-[#007185]" />} title="Saved Addresses" desc="Where Now delivers.">
            <div className="space-y-2 text-[13px]">
              {addresses.map((a) => (
                <div key={a.id} className={`border rounded p-3 ${selectedAddressId === a.id ? "border-[#ff9900] bg-[#fff8ed]" : "border-[#d5d9d9]"}`}>
                  {pendingDel === a.id ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12px]">Delete this address?</span>
                      <div className="flex gap-1">
                        <button onClick={() => { deleteAddress(a.id); setPendingDel(null); }} className="btn-az-yellow text-[11px] px-2">Yes</button>
                        <button onClick={() => setPendingDel(null)} className="text-[11px] az-link px-2">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">{a.label}</div>
                        <div className="flex gap-2">
                          <button onClick={() => setSelectedAddress(a.id)} className="text-[11px] az-link">Use</button>
                          <button onClick={() => openAddAddress(a.id)}><Pencil className="w-3 h-3 text-[#565959]" /></button>
                          <button onClick={() => setPendingDel(a.id)}><Trash2 className="w-3 h-3 text-[#b12704]" /></button>
                        </div>
                      </div>
                      <div className="text-[#565959]">{a.line1}, {a.cityStateZip}</div>
                    </>
                  )}
                </div>
              ))}
              <button onClick={() => openAddAddress()} className="w-full border border-dashed border-[#d5d9d9] rounded p-2 text-[12px] az-link flex items-center justify-center gap-1"><Plus className="w-3 h-3" /> Add new address</button>
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

          <Tile icon={<Heart className="w-6 h-6 text-[#b12704]" />} title="Dietary & Budget Preferences" desc="Tags Now uses to refine carts.">
            <div className="flex flex-wrap gap-2 mt-2">
              {PREFS.map((p) => {
                const active = dietaryPreferences.includes(p);
                return (
                  <motion.button key={p} whileTap={{ scale: 1.08 }} onClick={() => toggleDietary(p)} className={`px-3 py-1 rounded-full text-[12px] border transition ${active ? "bg-[#5848bc] text-white border-[#5848bc]" : "bg-white border-[#d5d9d9] hover:border-[#0f1111]"}`}>
                    {p}
                  </motion.button>
                );
              })}
            </div>
          </Tile>

          <Tile icon={<Activity className="w-6 h-6 text-[#5848bc]" />} title="Household Patterns" desc="Learned routines Now can act on.">
            {pats.map((p, i) => (
              <label key={p.l} className="flex items-center justify-between py-2 text-[13px]">
                <span>{p.l}</span>
                <button onClick={() => setPats(pats.map((x, j) => j === i ? { ...x, on: !x.on } : x))} className={`w-10 h-5 rounded-full p-0.5 transition ${p.on ? "bg-[#ff9900]" : "bg-[#d5d9d9]"}`}>
                  <motion.div animate={{ x: p.on ? 20 : 0, scale: [1, 1.1, 1] }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-4 h-4 rounded-full bg-white shadow" />
                </button>
              </label>
            ))}
          </Tile>

          <Tile icon={<Users className="w-6 h-6 text-[#5848bc]" />} title="Household Profile" desc="Family of 4 · AI learns context.">
            <div className="space-y-2 text-[13px]">
              {familyMembers.map((m) => (
                <div key={m.id} className="border border-[#d5d9d9] rounded p-2">
                  {editMember === m.id ? (
                    <div className="space-y-1">
                      <input defaultValue={m.name} onChange={(e) => updateFamilyMember(m.id, { name: e.target.value })} className="w-full border border-[#d5d9d9] rounded px-2 py-1 text-[12px]" />
                      <input defaultValue={m.note} onChange={(e) => updateFamilyMember(m.id, { note: e.target.value })} className="w-full border border-[#d5d9d9] rounded px-2 py-1 text-[12px]" placeholder="Note (e.g. vegetarian)" />
                      <button onClick={() => setEditMember(null)} className="btn-az-yellow text-[11px]">Save</button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{m.name} — {m.age}</div>
                        <div className="text-[11px] text-[#565959]">{m.note}</div>
                      </div>
                      <button onClick={() => setEditMember(m.id)}><Pencil className="w-3 h-3 text-[#565959]" /></button>
                    </div>
                  )}
                </div>
              ))}
              <div className="text-[12px] text-[#565959] mt-2">Recurring household needs:</div>
              {recurringRules.length === 0 && (
                <div className="text-[12px] text-[#565959] italic">No recurring reminders yet — add one below.</div>
              )}
              <ul className="space-y-1.5">
                {recurringRules.map((r) => {
                  const { status, daysUntil } = getDueStatus(r.nextDueDate);
                  const due = status === "overdue" || status === "due-today";
                  return (
                    <li key={r.id} className={`flex items-center justify-between gap-2 border rounded p-2 ${due ? "border-[#ff9900] bg-[#fff8ed]" : "border-[#d5d9d9]"}`}>
                      <div className="min-w-0">
                        <div className="font-semibold text-[12px] truncate">{r.itemName} — {r.frequencyLabel.toLowerCase()}</div>
                        <div className={`text-[11px] ${status === "overdue" ? "text-[#b12704]" : status === "due-today" ? "text-[#cc6600]" : "text-[#565959]"}`}>
                          {status === "overdue" ? `Overdue by ${Math.abs(daysUntil)} day(s)` : status === "due-today" ? "Due today" : `Due in ${daysUntil} day(s)`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {due && (
                          <button onClick={() => fulfillRecurringRule(r.id)} className="btn-az-yellow text-[11px] px-2">Add to cart</button>
                        )}
                        <button onClick={() => deleteRecurringRule(r.id)}><Trash2 className="w-3 h-3 text-[#b12704]" /></button>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newRule.trim()) {
                    addRecurringRule(newRule);
                    setNewRule("");
                  }
                }}
                className="flex gap-1 mt-2"
              >
                <input
                  value={newRule}
                  onChange={(e) => setNewRule(e.target.value)}
                  placeholder='e.g. "Remind me to add Bread every alternate days"'
                  className="flex-1 border border-[#d5d9d9] rounded px-2 py-1 text-[12px]"
                />
                <button type="submit" className="btn-az-yellow text-[11px] px-2 flex items-center gap-1 shrink-0"><Plus className="w-3 h-3" /> Add</button>
              </form>
            </div>
          </Tile>

          <Tile icon={<Star className="w-6 h-6 text-[#ff9900]" />} title="Your Favorite Brands" desc="Learned brand preferences.">
            <ul className="space-y-2 text-[13px]">
              {favoriteBrands.map((b) => (
                <li key={b.name} className="flex items-center justify-between gap-2">
                  <div className="w-8 h-8 rounded overflow-hidden bg-[#f3f3f3]"><ProductImage keyword={`${b.name}-logo`} seed={b.name} size={80} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[12px] truncate">{b.name}</div>
                    <div className="text-[11px] text-[#565959]">{b.category} · ordered {b.orderCount}×</div>
                  </div>
                  <button onClick={() => toggleBrand(b.name)} className={`w-9 h-5 rounded-full p-0.5 transition ${b.prioritize ? "bg-[#ff9900]" : "bg-[#d5d9d9]"}`}>
                    <motion.div animate={{ x: b.prioritize ? 16 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-4 h-4 rounded-full bg-white shadow" />
                  </button>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile icon={<Shield className="w-6 h-6 text-[#b12704]" />} title="Crisis Contacts" desc="People notified in Crisis Mode.">
            <ul className="space-y-2 text-[13px]">
              {crisisContacts.map((c) => (
                <li key={c.id} className="border border-[#d5d9d9] rounded p-2">
                  {editContact === c.id ? (
                    <div className="space-y-1">
                      <input defaultValue={c.name} onChange={(e) => updateCrisisContact(c.id, { name: e.target.value })} placeholder="Name" className="w-full border rounded px-2 py-1 text-[12px]" />
                      <input defaultValue={c.relation} onChange={(e) => updateCrisisContact(c.id, { relation: e.target.value })} placeholder="Relation" className="w-full border rounded px-2 py-1 text-[12px]" />
                      <input defaultValue={c.phone} onChange={(e) => updateCrisisContact(c.id, { phone: e.target.value })} placeholder="Phone" className="w-full border rounded px-2 py-1 text-[12px]" />
                      <div className="flex gap-2">
                        <button onClick={() => setEditContact(null)} className="btn-az-yellow text-[11px]">Save</button>
                        <button onClick={() => { deleteCrisisContact(c.id); setEditContact(null); }} className="text-[11px] az-link text-[#b12704]">Delete</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-[11px] text-[#565959]">{c.relation} · {c.phone}</div>
                      </div>
                      <button onClick={() => setEditContact(c.id)}><Pencil className="w-3 h-3 text-[#565959]" /></button>
                    </div>
                  )}
                </li>
              ))}
              <button onClick={addCrisisContact} className="w-full border border-dashed border-[#d5d9d9] rounded p-2 text-[12px] az-link flex items-center justify-center gap-1"><Plus className="w-3 h-3" /> Add another contact</button>
            </ul>
          </Tile>

          <Tile icon={<Leaf className="w-6 h-6 text-[#007600]" />} title="Eco Impact" desc="See your sustainability dashboard.">
            <button onClick={() => navigate({ to: "/eco-impact" })} className="btn-az-yellow w-full mt-2">Open Eco Impact →</button>
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

function EditableField({ label, value, editing, onEdit, onCancel, onSave }: { label: string; value: string; editing: boolean; onEdit: () => void; onCancel: () => void; onSave: (v: string) => void }) {
  const [v, setV] = useState(value);
  if (editing) return (
    <div className="flex items-center gap-2 text-[13px]">
      <span className="text-[#565959] w-16">{label}:</span>
      <input value={v} onChange={(e) => setV(e.target.value)} className="border border-[#d5d9d9] rounded px-2 py-1 flex-1" />
      <button onClick={() => onSave(v)} className="btn-az-yellow text-[11px]">Save</button>
      <button onClick={onCancel} className="az-link text-[11px]">Cancel</button>
    </div>
  );
  return (
    <div className="flex items-center gap-2 text-[14px]">
      <span className="text-[#565959] w-16">{label}:</span>
      <span className="font-semibold flex-1">{value}</span>
      <button onClick={() => { setV(value); onEdit(); }}><Pencil className="w-3 h-3 text-[#565959]" /></button>
    </div>
  );
}

// Unused but kept to retain icon import compatibility
export const _X = X;
