
import React, { useState } from 'react';
import { Play, MoreHorizontal, Clock, Calendar, Info } from 'lucide-react';
import { MOCK_PLAYLIST, MOCK_SCHEDULE } from '../constants';
import { ScheduleDetailModal } from './ScheduleDetailModal';
import { ImageWithFallback } from './ImageWithFallback';
import { ScheduleItem } from '../types';

export const Playlist: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ScheduleItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Track History */}
        <section className="glass rounded-3xl overflow-hidden border-white/5" aria-labelledby="history-heading">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-indigo-400" aria-hidden="true" />
              <h3 id="history-heading" className="text-sm font-bold text-white">Recently Played</h3>
            </div>
          </div>
          <ul className="divide-y divide-white/5">
            {MOCK_PLAYLIST.map((song) => (
              <li key={song.id}>
                <button 
                  className="w-full text-left p-4 flex items-center gap-4 group hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:bg-white/5"
                  aria-label={`Play ${song.title} by ${song.artist}`}
                >
                  <span className="text-[8px] font-mono text-slate-400 w-10" aria-label={`Played at ${song.startTime}`}>{song.startTime}</span>
                  <ImageWithFallback 
                    src={song.coverUrl} 
                    alt="" 
                    className="w-10 h-10 rounded-xl"
                  />
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-[10px] font-bold text-white truncate">{song.title}</h4>
                    <p className="text-[8px] text-slate-400 truncate">{song.artist}</p>
                  </div>
                  <div className="p-2 text-slate-400 group-hover:text-indigo-400 transition-colors">
                    <Play size={12} aria-hidden="true" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* Program Schedule */}
        <section className="glass rounded-3xl overflow-hidden border-white/5" aria-labelledby="schedule-heading">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-pink-400" aria-hidden="true" />
              <h3 id="schedule-heading" className="text-sm font-bold text-white">Daily Program</h3>
            </div>
            <span className="text-[8px] font-bold text-slate-400 uppercase">Mon, June 10</span>
          </div>
          <ul className="p-2">
            {MOCK_SCHEDULE.map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => setSelectedItem(item)}
                  className="w-full p-3 flex items-center gap-4 rounded-2xl hover:bg-white/5 transition-all group text-left relative"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                       <span className="text-[8px] font-mono text-indigo-400" aria-label={`Scheduled for ${item.time}`}>{item.time}</span>
                       {item.type === 'Live' && (
                         <span className="flex h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" aria-label="Live Now"></span>
                       )}
                    </div>
                    <h4 className="text-xs font-black text-white group-hover:text-indigo-400 transition-colors">{item.show || 'Broadcast Block'}</h4>
                    <p className="text-[8px] text-slate-400 font-medium">Hosted by {item.host}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-400">
                    <Info size={14} />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <ScheduleDetailModal 
        item={selectedItem} 
        onClose={() => setSelectedItem(null)} 
      />
    </>
  );
};
