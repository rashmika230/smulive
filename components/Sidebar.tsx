
import React from 'react';
import { 
  LayoutDashboard, 
  Music2, 
  CalendarDays, 
  BarChart3, 
  Settings, 
  Radio,
  ExternalLink
} from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const iconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard size={20} />,
  Music2: <Music2 size={20} />,
  CalendarDays: <CalendarDays size={20} />,
  BarChart3: <BarChart3 size={20} />,
  Settings: <Settings size={20} />
};

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 border-r border-white/5 bg-[#0e0e11] flex flex-col h-full hidden lg:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Radio className="text-white" size={24} />
        </div>
        <div>
          <h1 className="font-bold text-white leading-tight">SMU LIVE</h1>
          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">Broadcast FM</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                item.label === 'Dashboard' 
                ? 'bg-white/5 text-white' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}>
                {iconMap[item.icon]}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="glass p-4 rounded-xl">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Live Status</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-xs font-medium text-white">Station 104.2 FM</span>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-medium bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 transition-all">
            <ExternalLink size={14} />
            Public Page
          </button>
        </div>
      </div>
    </aside>
  );
};
