
import React, { useState } from 'react';
import { Send, Music } from 'lucide-react';

export const RequestSystem: React.FC = () => {
  const [request, setRequest] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setRequest('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="glass p-6 rounded-3xl border-indigo-500/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
          <Music size={20} />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">Song Request</h3>
      </div>
      <p className="text-slate-400 text-xs mb-4">Wanna hear something specific? Send it to the booth!</p>
      
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          placeholder="Song title or artist..."
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
        />
        <button 
          disabled={status !== 'idle'}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-white transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? (
            <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Send size={18} />
          )}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="text-green-400 text-[10px] font-bold mt-2 animate-pulse uppercase tracking-widest">Request sent to DJ Spark!</p>
      )}
    </div>
  );
};
