import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";
import { useStore } from "@/store";
import { Loader2 } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  p: z.string().optional(),
});

export const Route = createFileRoute("/shared")({
  validateSearch: searchSchema,
  component: SharedCartReceiver,
});

function SharedCartReceiver() {
  const { p } = Route.useSearch();
  const navigate = useNavigate();
  const loadSharedCart = useStore((s) => s.loadSharedCart);

  useEffect(() => {
    if (p) {
      // Decode and load the cart
      loadSharedCart(p);
      // Give it a tiny delay just to show the loading screen for UX, then redirect
      const t = setTimeout(() => {
        navigate({ to: "/results", replace: true });
      }, 800);
      return () => clearTimeout(t);
    } else {
      navigate({ to: "/", replace: true });
    }
  }, [p, loadSharedCart, navigate]);

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center justify-center font-sans">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="w-10 h-auto mt-1" alt="Now" />
      </div>
      <Loader2 className="w-8 h-8 animate-spin text-[#ff9900] mb-4" />
      <h1 className="text-[20px] font-bold text-[#0f1111]">Loading your shared cart...</h1>
      <p className="text-[14px] text-[#565959] mt-2">Extracting items from WhatsApp.</p>
    </div>
  );
}
