import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store";
import { Check, Plus, MapPin } from "lucide-react";

export function AddressSelector() {
  const open = useStore((s) => s.addressSelectorOpen);
  const close = useStore((s) => s.closeAddressSelector);
  const addresses = useStore((s) => s.addresses);
  const selectedId = useStore((s) => s.selectedAddressId);
  const setSelected = useStore((s) => s.setSelectedAddress);
  const openAdd = useStore((s) => s.openAddAddress);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[180] bg-black/40 flex items-start justify-center p-4 pt-24"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-md shadow-2xl w-[420px] max-w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#d5d9d9]">
              <MapPin className="w-5 h-5 text-[#007185]" />
              <div className="font-bold text-[15px]">Choose a delivery address</div>
            </div>
            <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
              {addresses.map((a) => (
                <li key={a.id}>
                  <button
                    onClick={() => { setSelected(a.id); close(); }}
                    className={`w-full text-left border rounded p-3 hover:border-[#ff9900] transition ${selectedId === a.id ? "border-[#ff9900] bg-[#fff8ed]" : "border-[#d5d9d9]"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-[14px]">{a.label}</div>
                      {selectedId === a.id && <Check className="w-4 h-4 text-[#007600]" />}
                    </div>
                    <div className="text-[12px] text-[#565959]">{a.fullName}</div>
                    <div className="text-[12px] text-[#565959]">{a.line1}, {a.cityStateZip}</div>
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => openAdd()}
              className="mt-3 w-full border border-dashed border-[#d5d9d9] rounded p-3 text-[13px] text-[#007185] hover:bg-[#f3f3f3] flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add a new address
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
