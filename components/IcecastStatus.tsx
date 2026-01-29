
import React from 'react';
import { Server, Activity, ShieldCheck, Wifi } from 'lucide-react';

export const IcecastStatus: React.FC = () => {
  const stats = [
    { label: 'Mount Point', value: '/live.mp3', icon: <Server size={14} /> },
    { label: 'Bitrate', value: '320 kbps', icon: <Activity size={14} /> },
    { label: 'Uptime', value: '14d 02h 15m', icon: <ShieldCheck size={14} /> },
    { label: 'Format', value: 'MPEG Audio', icon: <Wifi size={14} /> },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
      {stats.map((stat, i) => (
        <div key={i} className="glass px-4 py-3 rounded-xl flex items-center gap-3 border-indigo-500/10 hover:border-indigo-500/30 transition-colors">
          <div className="text-indigo-400 bg-indigo-400/10 p-2 rounded-lg">
            {stat.icon}
          </div>
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1">{stat.label}</p>
            <p className="text-sm font-mono text-white font-medium">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
