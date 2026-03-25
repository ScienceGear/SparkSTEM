import { useState, useRef, useEffect } from "react";
import { useAskAI } from "@workspace/api-client-react";
import { PlayfulCard } from "@/components/PlayfulUI";
import { Send, Bot, Sparkles, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content: "Hi there! I'm RoboTutor. Ask me any question about Science or Math!"
    }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mutate: askQuestion, isPending } = useAskAI({
    mutation: {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: "ai", content: data.answer }]);
      }
    }
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isPending) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: Date.now().toString(), role: "user", content: userMsg }]);
    
    askQuestion({ data: { question: userMsg } });
  };

  const suggestions = [
    "Why is the sky blue?",
    "How do magnets work?",
    "Explain photosynthesis",
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 min-h-[calc(100vh-80px)] flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-white rounded-2xl border-4 border-border shadow-md overflow-hidden relative">
           <img src={`${import.meta.env.BASE_URL}images/ai-avatar.png`} alt="AI Avatar" className="w-full h-full object-cover bg-blue-50" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">RoboTutor <Sparkles className="inline w-6 h-6 text-secondary" /></h1>
          <p className="text-muted-foreground font-medium">Your personal 24/7 science genius</p>
        </div>
      </div>

      <PlayfulCard className="flex-1 flex flex-col p-0 overflow-hidden border-4 shadow-xl border-border">
        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white to-background scroll-smooth"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white ${
                  msg.role === 'ai' ? 'bg-secondary text-white' : 'bg-primary text-white'
                }`}>
                  {msg.role === 'ai' ? <Bot className="w-6 h-6" /> : 'Me'}
                </div>
                
                <div className={`max-w-[80%] p-4 text-[15px] leading-relaxed font-medium ${
                  msg.role === 'ai' 
                    ? 'bg-white border-2 border-border rounded-2xl rounded-tl-none shadow-sm text-foreground' 
                    : 'bg-primary text-white rounded-2xl rounded-tr-none shadow-md shadow-primary/20'
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
            
            {isPending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4"
              >
                <div className="w-10 h-10 shrink-0 rounded-full bg-secondary text-white flex items-center justify-center shadow-sm border-2 border-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div className="bg-white border-2 border-border rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-muted-foreground font-bold text-sm">Thinking...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t-2 border-border">
          {messages.length === 1 && (
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(sug); }}
                  className="whitespace-nowrap px-4 py-2 bg-muted text-foreground rounded-full text-sm font-bold border border-border hover:border-primary hover:text-primary transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex gap-3 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              disabled={isPending}
              className="flex-1 bg-muted/50 border-2 border-border rounded-2xl px-6 py-4 font-medium focus:outline-none focus:border-primary focus:bg-white transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isPending}
              className="bg-primary text-white p-4 rounded-2xl border-b-4 border-primary-dark hover:-translate-y-0.5 active:border-b-0 active:translate-y-1 transition-all disabled:opacity-50 disabled:transform-none disabled:border-b-4"
            >
              <Send className="w-6 h-6" />
            </button>
          </form>
        </div>
      </PlayfulCard>
    </div>
  );
}
