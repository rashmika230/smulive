
import React, { useState } from 'react';
import { Users, Send, CheckCircle2, Mic2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const JoinProgram: React.FC = () => {
  const [idea, setIdea] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim()) return;

    // Construct mailto link for direct submission
    const subject = encodeURIComponent("Program Proposal - SMU LIVE");
    const body = encodeURIComponent(`Hi SMU Team,\n\nI have a show proposal:\n\n${idea}`);
    window.location.href = `mailto:applications@sanahasmedia.lk?subject=${subject}&body=${body}`;

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIdea('');
    }, 4000);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-10 rounded-[3rem] border-green-500/20 text-center space-y-6"
        role="alert"
      >
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">Idea Captured!</h3>
        <p className="text-slate-400 text-xs font-medium leading-relaxed">
          Opening your email client... Our producers will review your proposal as soon as possible.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass p-10 rounded-[3rem] border-white/[0.03] relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
        <Mic2 size={120} />
      </div>
      
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-400">
          <Users size={22} />
        </div>
        <h3 className="text-xl font-extrabold text-white tracking-tight">Join The Booth</h3>
      </div>
      
      <p className="text-slate-400 text-xs mb-8 relative z-10 font-medium leading-relaxed">
        Have a groundbreaking show idea? We're looking for fresh voices to join our digital broadcasting squad.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="space-y-2">
          <label htmlFor="program-idea" className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em] ml-2 block">Proposal Brief</label>
          <textarea
            id="program-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Share your concept here..."
            className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 px-4 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all min-h-[120px] resize-none placeholder:text-slate-600"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-indigo-600 text-white hover:bg-indigo-500 hover:scale-[1.02] active:scale-95 transition-all font-black text-[9px] tracking-[0.2em] uppercase shadow-xl shadow-indigo-600/10"
          >
            Submit Proposal
          </button>
          
          <a
            href="mailto:applications@sanahasmedia.lk"
            className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl glass text-white hover:bg-white/5 hover:scale-[1.02] active:scale-95 transition-all font-black text-[9px] tracking-[0.2em] uppercase"
          >
            <Send size={14} />
            Quick Apply via Email
          </a>
        </div>
      </form>
    </motion.section>
  );
};
