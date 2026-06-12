import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Mic, X, Check } from "lucide-react";

export const Route = createFileRoute("/voice")({
  head: () => ({ meta: [{ title: "Voice Mode — Now" }] }),
  component: VoicePage,
});

const SCRIPT = [
  { delay: 1200, text: "Add rice" },
  { delay: 2500, text: "Add dal" },
  { delay: 3700, text: "Add onions" },
  { delay: 5200, text: "Confirm" },
];

function VoicePage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [chips, setChips] = useState<string[]>([]);
  const navigate = useNavigate();

  function start() {
    setListening(true);
    setTranscript("");
    setChips([]);
    SCRIPT.forEach((cmd) => {
      setTimeout(() => {
        setTranscript((t) => t + " " + cmd.text);
        if (cmd.text.startsWith("Add")) setChips((c) => [...c, cmd.text.replace("Add ", "")]);
        if (cmd.text === "Confirm") {
          setTimeout(() => navigate({ to: "/cart" }), 1200);
        }
      }, cmd.delay);
    });
  }

  return (
    <Layout>
      <div className="max-w-[600px] mx-auto px-4 py-12">
        <Link to="/" className="az-link text-[13px] inline-flex items-center gap-1 mb-4"><X className="w-4 h-4" /> Exit Voice Mode</Link>
        <div className="az-card p-8 text-center">
          <h1 className="text-[24px] font-bold">Voice / Hands-Busy Mode</h1>
          <p className="text-[13px] text-[#565959] mt-1">Tap the mic and tell Now what you need.</p>

          <button onClick={start} className="relative w-32 h-32 mx-auto mt-8 rounded-full bg-[#ff9900] hover:bg-[#f08804] text-white flex items-center justify-center shadow-lg">
            <Mic className="w-12 h-12" />
            {listening && <>
              <span className="absolute inset-0 rounded-full border-4 border-[#ff9900] animate-ping" />
              <span className="absolute -inset-4 rounded-full border-2 border-[#ff9900]/40 animate-ping" style={{ animationDelay: "0.4s" }} />
            </>}
          </button>

          <div className="mt-8 min-h-[80px] border border-[#d5d9d9] rounded p-4 text-left bg-[#fafafa]">
            <div className="text-[11px] text-[#565959] uppercase tracking-wide mb-1">Transcript</div>
            <div className="text-[15px]">{transcript || (listening ? "Listening..." : "Tap mic to start (demo will simulate voice input)")}</div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {chips.map((c) => (
              <span key={c} className="ai-badge animate-in fade-in zoom-in duration-300">{c} ✓</span>
            ))}
          </div>

          {chips.length >= 3 && (
            <div className="mt-4 flex items-center justify-center gap-2 text-[#007600] text-[14px] animate-in fade-in">
              <Check className="w-5 h-5" /> Now says: "Confirmed 3 items. Routing to cart…"
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
