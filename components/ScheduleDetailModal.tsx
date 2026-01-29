
import React, { useEffect } from 'react';
import { X, Calendar, Clock, User, Share2, PlusCircle } from 'lucide-react';
import { ScheduleItem } from '../types';

interface ScheduleDetailModalProps {
  item: ScheduleItem | null;
  onClose: () => void;
}

export const ScheduleDetailModal: React.FC<ScheduleDetailModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [item, onClose]);

  if (!item) return null;

  const handleAddToCalendar = () => {
    const [start, end] = item.time.split(' - ');
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0].replace(/-/g, '');
    
    const startTime = start.replace(':', '') + '00';
    const endTime = (end || start).replace(/[:.]/g, '') + '00';
    
    const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(item.show)}&details=${encodeURIComponent(item.description || '')}&dates=${dateStr}T${startTime}/${dateStr}T${endTime}`;
    window.open(googleUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
      
      <div className="relative glass w-full max-w-lg rounded-[3rem] border-white/10 p-10 shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-slate-400 hover:text-white transition-colors rounded-full"
        >
          <X size={20} />
        </button>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-[7px] font-black uppercase tracking-[0.2em] ${
                item.type === 'Live' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
              }`}>
                {item.type} Broadcast
              </span>
            </div>
            <h3 className="text-3xl font-black text-white tracking-tight leading-none">{item.show || 'Unnamed Program'}</h3>
            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-pink-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{item.host}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Program Overview</h4>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              {item.description || "No additional information available for this program."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button 
              onClick={handleAddToCalendar}
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-white text-black font-black text-[9px] tracking-[0.2em] uppercase hover:bg-indigo-50 transition-all shadow-xl shadow-white/5"
            >
              <PlusCircle size={16} />
              Add to Calendar
            </button>
            <button 
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl glass text-white font-black text-[9px] tracking-[0.2em] uppercase hover:bg-white/5 transition-all"
            >
              <Share2 size={16} />
              Share Show
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
