import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, ArrowLeft, Phone, Video, MoreVertical, Check, CheckCheck, Loader2 } from "lucide-react";
import { processWhatsAppMessageFn } from "@/lib/api/whatsapp.functions";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({ meta: [{ title: "WhatsApp Simulator" }] }),
  component: WhatsAppSimulator,
});

interface Message {
  id: string;
  sender: "user" | "bot";
  text?: string;
  imgUrl?: string;
  time: string;
  status: "sent" | "delivered" | "read";
  isHtml?: boolean;
}

function WhatsAppSimulator() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! I'm Now. Forward me a recipe, a handwritten list, or just tell me what you want to cook, and I'll send you an instant cart! 🛒",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "read",
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  async function handleSendText() {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");
    
    addMessage({
      sender: "user",
      text: userText,
    });

    await processMessage(userText, undefined);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      addMessage({
        sender: "user",
        imgUrl: base64,
      });
      await processMessage(undefined, base64);
    };
    reader.readAsDataURL(file);
  }

  function addMessage(msg: Partial<Message>) {
    setMessages(prev => [...prev, {
      id: Math.random().toString(),
      sender: msg.sender || "user",
      text: msg.text,
      imgUrl: msg.imgUrl,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "read",
      isHtml: msg.isHtml,
    }]);
  }

  async function processMessage(text?: string, image?: string) {
    setIsLoading(true);
    try {
      const res = await processWhatsAppMessageFn({ data: { text, image } });
      
      // Convert formatted text to HTML for links
      const htmlText = res.textReply
        .replace(/\\n/g, '<br/>')
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-blue-500 underline" target="_blank">$1</a>')
        .replace(/(\/shared\?p=[^\s]+)/g, '<a href="$1" class="text-blue-500 font-bold underline" style="word-break: break-all;">$1</a>');
      
      addMessage({
        sender: "bot",
        text: htmlText,
        isHtml: true,
      });
    } catch (e) {
      console.error(e);
      addMessage({
        sender: "bot",
        text: "Sorry, I had trouble processing that. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#ece5dd] flex items-center justify-center font-sans">
      {/* Mobile Simulator Frame */}
      <div className="w-full max-w-[400px] h-[100dvh] sm:h-[800px] sm:max-h-[90vh] bg-[#efe7dd] sm:rounded-[30px] sm:shadow-2xl sm:border-[8px] border-[#333] flex flex-col relative overflow-hidden">
        
        {/* WhatsApp Header */}
        <div className="bg-[#075e54] text-white flex items-center justify-between px-2 py-3 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <button onClick={() => navigate({ to: "/" })} className="p-1 -ml-1 rounded-full hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-white p-1 flex items-center justify-center shrink-0">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="w-full h-auto mt-1" alt="Now" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[16px] leading-tight">Amazon Now</span>
              <span className="text-[11px] text-white/80">bot • always open</span>
            </div>
          </div>
          <div className="flex items-center gap-3 pr-2">
            <Video className="w-5 h-5" />
            <Phone className="w-4 h-4" />
            <MoreVertical className="w-5 h-5" />
          </div>
        </div>

        {/* WhatsApp Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 relative"
          style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: 'contain' }}
        >
          <div className="bg-[#dcf8c6] px-3 py-1.5 rounded-lg text-center text-[11px] text-[#555] mx-auto mb-2 opacity-90 shadow-sm max-w-[80%]">
            Messages and calls are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
          </div>

          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-lg px-2.5 py-1.5 shadow-sm relative ${m.sender === "user" ? "bg-[#dcf8c6] rounded-tr-none" : "bg-white rounded-tl-none"}`}>
                {m.imgUrl && (
                  <div className="mb-1 rounded overflow-hidden">
                    <img src={m.imgUrl} className="w-full max-h-[250px] object-cover" alt="Uploaded" />
                  </div>
                )}
                {m.text && (
                  <div className="text-[14px] text-[#111] leading-snug break-words">
                    {m.isHtml ? <span dangerouslySetInnerHTML={{ __html: m.text }} /> : m.text}
                  </div>
                )}
                <div className="flex items-center justify-end gap-1 mt-0.5 min-w-[50px]">
                  <span className="text-[10px] text-[#667781] whitespace-nowrap">{m.time}</span>
                  {m.sender === "user" && <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-sm text-[13px] text-[#667781] italic flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[#075e54]" /> typing...
              </div>
            </div>
          )}
        </div>

        {/* WhatsApp Input Area */}
        <div className="bg-transparent p-2 flex items-end gap-2 pb-6 sm:pb-2">
          <div className="flex-1 bg-white rounded-full flex items-center px-2 py-1 shadow-sm min-h-[44px]">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileRef}
              onChange={handleFileUpload}
            />
            <button 
              onClick={() => fileRef.current?.click()} 
              className="p-2 text-[#8696a0] hover:bg-gray-100 rounded-full transition-colors"
            >
              <ImageIcon className="w-6 h-6" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendText()}
              placeholder="Message"
              className="flex-1 bg-transparent outline-none px-2 text-[15px] py-2"
            />
          </div>
          <button 
            onClick={handleSendText}
            className={`w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0 shadow-sm transition-colors ${input.trim() ? "bg-[#00a884] text-white" : "bg-[#00a884] text-white"}`}
          >
            {input.trim() ? <Send className="w-5 h-5 ml-1" /> : <Send className="w-5 h-5 ml-1" />}
          </button>
        </div>
      </div>
    </div>
  );
}
