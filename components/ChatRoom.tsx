
import React, { useState, useEffect, useRef } from 'react';
import { Send, User } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  text: string;
  time: string;
}

export const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'TechnoHead', text: 'This track is fire! Who produced this?', time: '14:20' },
    { id: '2', user: 'Sarah_J', text: 'Perfect vibes for a Monday afternoon.', time: '14:21' },
    { id: '3', user: 'BassLover', text: 'Loving the progression on this one.', time: '14:23' },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      user: 'You',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <section className="glass rounded-3xl border-white/5 flex flex-col h-[400px] overflow-hidden" aria-label="Live Chat Room">
      <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <h3 className="text-xs font-bold text-white flex items-center gap-2">
          <User size={14} className="text-indigo-400" aria-hidden="true" />
          Listener Chat
        </h3>
        <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest" aria-live="polite">42 Active</span>
      </div>

      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        aria-live="polite"
        aria-atomic="false"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.user === 'You' ? 'items-end' : 'items-start'}`}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[8px] font-bold text-slate-300">
                {msg.user}
              </span>
              <span className="text-[7px] text-slate-500">{msg.time}</span>
            </div>
            <div className={`px-4 py-2 rounded-2xl text-[10px] max-w-[80%] ${
              msg.user === 'You' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white/10 text-slate-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-black/20 border-t border-white/5">
        <div className="relative">
          <label htmlFor="chat-input" className="sr-only">Type a message</label>
          <input
            id="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-4 pr-10 text-[10px] text-white focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
          <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-white transition-colors" aria-label="Send message">
            <Send size={14} aria-hidden="true" />
          </button>
        </div>
      </form>
    </section>
  );
};
