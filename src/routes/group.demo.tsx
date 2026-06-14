import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Users, Link as LinkIcon, Lock, Sparkles, Check, IndianRupee, QrCode, MessageCircle } from "lucide-react";
import { ProductImage } from "@/components/ProductImage";
import { useStore } from "@/store";
import { useNavigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/group/demo")({
  component: GroupDemoPage,
  head: () => ({ meta: [{ title: "Now Squad — Group Ordering" }] }),
});

const MOCK_FRIENDS = [
  { id: "f1", name: "Rahul", color: "bg-blue-500" },
  { id: "f2", name: "Priya", color: "bg-pink-500" },
  { id: "f3", name: "Aditya", color: "bg-emerald-500" },
  { id: "f4", name: "Karan", color: "bg-amber-500" },
  { id: "f5", name: "Sneha", color: "bg-purple-500" },
];

const MOCK_EVENTS = [
  { time: 2000, type: "join", friend: MOCK_FRIENDS[0] },
  { time: 3000, type: "add", friend: MOCK_FRIENDS[0], item: { name: "Lay's Party Pack", price: 150, img: "potato-chips-bowl" } },
  { time: 4500, type: "join", friend: MOCK_FRIENDS[1] },
  { time: 5500, type: "add", friend: MOCK_FRIENDS[1], item: { name: "Coca-Cola 500ml", price: 40, img: "coca-cola-bottle" } },
  { time: 6500, type: "join", friend: MOCK_FRIENDS[3] },
  { time: 7000, type: "join", friend: MOCK_FRIENDS[2] },
  { time: 8000, type: "add", friend: MOCK_FRIENDS[3], item: { name: "Britannia Cake Tray", price: 250, img: "chocolate-cake" } },
  { time: 8500, type: "add", friend: MOCK_FRIENDS[2], item: { name: "Coca-Cola 500ml", price: 40, img: "coca-cola-bottle" } },
  { time: 9500, type: "join", friend: MOCK_FRIENDS[4] },
  { time: 10000, type: "add", friend: MOCK_FRIENDS[0], item: { name: "Coca-Cola 500ml", price: 40, img: "coca-cola-bottle" } },
  { time: 11000, type: "add", friend: MOCK_FRIENDS[4], item: { name: "Haldiram's Mixed Namkeen", price: 165, img: "indian-snacks-bowl" } },
];

function GroupDemoPage() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 mins
  const [joined, setJoined] = useState([{ id: "me", name: "You (Host)", color: "bg-[#5848bc]" }]);
  const [cart, setCart] = useState<{ friend: any; item: any }[]>([]);
  const [phase, setPhase] = useState<"live" | "ai-intervention" | "split-bill">("live");
  
  const addGlobalCart = useStore((s) => s.addCartItem);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStarted) return;
    
    // Countdown timer
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    
    // Play mock events
    const timeouts = MOCK_EVENTS.map(event => {
      return setTimeout(() => {
        if (event.type === "join") {
          setJoined(j => [...j, event.friend]);
        } else if (event.type === "add") {
          setCart(c => [...c, { friend: event.friend, item: event.item }]);
        }
      }, event.time);
    });

    return () => {
      clearInterval(timer);
      timeouts.forEach(clearTimeout);
    };
  }, [sessionStarted]);

  const totalAmount = cart.reduce((sum, c) => sum + c.item.price, 0);

  const formatTime = (sec: number) => `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`;

  function handleSwap() {
    // Remove individual cokes and add 2L bottle
    const newCart = cart.filter(c => c.item.name !== "Coca-Cola 500ml");
    newCart.push({ friend: { name: "AI Council", color: "bg-purple-500" }, item: { name: "Coca-Cola 2L Party Pack", price: 90, img: "coca-cola-bottle" } });
    setCart(newCart);
    setPhase("split-bill");
  }

  function handleCheckout() {
    // Add to real cart and go
    cart.forEach(c => addGlobalCart({
      id: Math.random().toString(),
      name: c.item.name,
      category: "Group Order",
      price: c.item.price,
      reasoning: `Added by ${c.friend.name}`,
      imageKeyword: c.item.img,
      quantity: 1,
      agentSource: "speed"
    }));
    navigate({ to: "/cart" });
  }

  if (!sessionStarted) {
    return (
      <Layout>
        <div className="max-w-md mx-auto px-4 py-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
            <Users className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-[32px] font-extrabold mb-2 text-[#0f1111]">Now Squad</h1>
          <p className="text-[16px] text-[#565959] mb-8">
            Create a live cart. Share a link. Let your friends add what they want directly to your order. 
          </p>
          <button 
            onClick={() => setSessionStarted(true)}
            className="w-full bg-[#5848bc] hover:bg-[#4a3ca0] text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" /> Start Group Order
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-[800px] mx-auto px-4 py-6">
        
        {/* Header Dashboard */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#e7e7e7] p-5 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-[24px] font-bold text-[#0f1111] mb-1">Movie Night Snacks</h1>
              <p className="text-[14px] text-[#565959]">Hosted by You</p>
            </div>
            <div className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg font-mono font-bold flex items-center gap-2">
              <Lock className="w-4 h-4" /> {formatTime(timeLeft)}
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => alert("Displaying large QR code for friends to scan...")} className="flex-1 bg-gray-50 border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-700 hover:bg-gray-100">
              <QrCode className="w-5 h-5" /> Show QR
            </button>
            <button onClick={() => alert("Link copied to clipboard: now.com/squad/1x9a")} className="flex-1 bg-gray-50 border border-gray-200 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-gray-700 hover:bg-gray-100">
              <LinkIcon className="w-5 h-5" /> Copy Link
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3">Squad Members ({joined.length})</div>
            <div className="flex -space-x-2">
              {joined.map((j, i) => (
                <div key={i} className={`w-10 h-10 rounded-full ${j.color} border-2 border-white flex items-center justify-center text-white font-bold text-sm shadow-sm transition-all duration-300 animate-in fade-in zoom-in`}>
                  {j.name.charAt(0)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Cart */}
        {phase === "live" && (
          <div className="mb-24">
            <h2 className="text-[18px] font-bold mb-4 flex items-center justify-between">
              Live Cart 
              <span className="text-[14px] font-normal text-gray-500">{cart.length} items</span>
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-12 text-gray-400">Waiting for friends to add items...</div>
            ) : (
              <div className="space-y-3">
                {cart.map((c, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-4 animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="w-12 h-12 rounded-lg bg-gray-50 p-1 flex-shrink-0">
                      <ProductImage keyword={c.item.img} alt={c.item.name} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[15px]">{c.item.name}</div>
                      <div className="text-[13px] text-gray-500">₹{c.item.price}</div>
                    </div>
                    <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold text-white ${c.friend.color}`}>
                      {c.friend.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AI Intervention Phase */}
        {phase === "ai-intervention" && (
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100 mb-6 animate-in zoom-in-95 duration-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-purple-900 mb-2">Smart Swap Opportunity</h3>
                <p className="text-purple-800 text-[14px] mb-4 leading-relaxed">
                  I noticed your squad added <strong>three individual 500ml Cokes</strong> (₹120 total). 
                  I can swap this for a <strong>2L Party Pack</strong> to save you ₹30 and give everyone more drinks!
                </p>
                <div className="flex gap-3">
                  <button onClick={handleSwap} className="bg-purple-600 text-white px-5 py-2.5 rounded-lg font-bold text-[14px] flex items-center gap-2 hover:bg-purple-700">
                    <Check className="w-4 h-4" /> Accept Swap
                  </button>
                  <button onClick={() => setPhase("split-bill")} className="bg-white text-purple-600 border border-purple-200 px-5 py-2.5 rounded-lg font-bold text-[14px] hover:bg-purple-50">
                    Keep Originals
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Split Bill Phase */}
        {phase === "split-bill" && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 animate-in slide-in-from-bottom-8">
            <div className="bg-green-50 p-5 text-center border-b border-green-100">
              <div className="text-green-600 font-bold mb-1">Total to Pay Now</div>
              <div className="text-[36px] font-extrabold text-green-700">₹{totalAmount}</div>
              <p className="text-[13px] text-green-600/80">You pay now. We split the bill automatically.</p>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-[14px] text-gray-500 uppercase mb-4">Who owes what</h4>
              <div className="space-y-3">
                {joined.filter(j => j.id !== "me").map((j, i) => {
                   const friendTotal = cart.filter(c => c.friend?.id === j.id).reduce((sum, c) => sum + c.item.price, 0);
                   const split = friendTotal > 0 ? friendTotal : Math.round(totalAmount / joined.length);
                   return (
                     <div key={i} className="flex justify-between items-center pb-3 border-b border-gray-100">
                       <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-full ${j.color} text-white flex items-center justify-center font-bold text-xs`}>{j.name.charAt(0)}</div>
                         <span className="font-semibold">{j.name}</span>
                       </div>
                       <span className="font-bold text-[15px]">₹{split}</span>
                     </div>
                   );
                })}
              </div>
              <button onClick={handleCheckout} className="w-full mt-6 bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2">
                <MessageCircle className="w-5 h-5" /> Send UPI Requests & Pay
              </button>
            </div>
          </div>
        )}

        {/* Bottom Action Bar */}
        {phase === "live" && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-10 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <div className="max-w-[800px] mx-auto flex gap-4 items-center">
              <div className="flex-1">
                <div className="text-[12px] text-gray-500 font-medium">Squad Total</div>
                <div className="text-[20px] font-bold text-[#0f1111]">₹{totalAmount}</div>
              </div>
              <button 
                onClick={() => setPhase("ai-intervention")}
                disabled={cart.length === 0}
                className="bg-[#ffd814] hover:bg-[#f7ca00] disabled:opacity-50 text-black font-bold px-8 py-3.5 rounded-xl shadow-sm flex items-center gap-2"
              >
                <Lock className="w-5 h-5" /> Lock Cart
              </button>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
