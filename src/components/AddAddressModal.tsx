import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export function AddAddressModal() {
  const open = useStore((s) => s.addAddressOpen);
  const close = useStore((s) => s.closeAddAddress);
  const editId = useStore((s) => s.editAddressId);
  const addresses = useStore((s) => s.addresses) || [];
  const add = useStore((s) => s.addAddress);
  const update = useStore((s) => s.updateAddress);

  const editing = editId ? addresses.find((a) => a.id === editId) : undefined;
  const [label, setLabel] = useState("");
  const [fullName, setFullName] = useState("");
  const [line1, setLine1] = useState("");
  const [city, setCity] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (open) {
      setLabel(editing?.label || "");
      setFullName(editing?.fullName || "");
      setLine1(editing?.line1 || "");
      setCity(editing?.cityStateZip || "");
      setTouched(false);
    }
  }, [open, editId]);

  function save() {
    setTouched(true);
    if (!label || !fullName || !line1 || !city) return;
    if (editing) update(editing.id, { label, fullName, line1, cityStateZip: city });
    else add({ label, fullName, line1, cityStateZip: city });
    close();
  }

  const missing = (v: string) => touched && !v;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[210] bg-black/50 flex items-center justify-center p-4"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-lg w-[440px] max-w-full p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-[16px]">{editing ? "Edit address" : "Add a new address"}</h2>
              <button onClick={close}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 text-[13px]">
              <Field label="Label (Home / Work / Other)" value={label} onChange={setLabel} error={missing(label)} />
              <Field label="Full name" value={fullName} onChange={setFullName} error={missing(fullName)} />
              <Field label="Address line" value={line1} onChange={setLine1} error={missing(line1)} />
              <Field label="City, State, Pincode" value={city} onChange={setCity} error={missing(city)} />
            </div>
            <button onClick={save} className="btn-az-yellow w-full mt-4 py-2.5 font-semibold">Save address</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, value, onChange, error }: { label: string; value: string; onChange: (v: string) => void; error: boolean }) {
  return (
    <label className="block">
      <div className="text-[12px] text-[#565959] mb-1">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full border rounded px-3 py-2 outline-none focus:ring-1 focus:ring-[#ff9900] ${error ? "border-[#b12704] bg-[#fff8f8]" : "border-[#d5d9d9]"}`}
      />
      {error && <div className="text-[11px] text-[#b12704] mt-1">Required</div>}
    </label>
  );
}
