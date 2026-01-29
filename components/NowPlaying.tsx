
import React, { useState } from 'react';
import { Play, Pause, Heart, Share2, Radio } from 'lucide-react';
import { Song } from '../types';
import { ShareModal } from './ShareModal';
import { ImageWithFallback } from './ImageWithFallback';
import { motion } from 'framer-motion';

interface NowPlayingProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const NowPlaying: React.FC<NowPlayingProps> = ({ song, isPlaying, onTogglePlay }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        whileHover={{ scale: 1.005 }}
        className="relative group"
      >
        <div className="glass rounded-[3.5rem] p-8 lg:p-14 overflow-hidden relative shadow-2xl">
          {/* Subtle background graphic */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none" aria-hidden="true">
            <Radio size={300} />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10">
            {/* Artwork Container */}
            <div className="relative shrink-0">
              <motion.div 
                whileHover={{ rotate: -2, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="w-64 h-64 lg:w-[320px] lg:h-[320px] rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-white/5 relative"
              >
                <ImageWithFallback 
                  src={song.coverUrl} 
                  alt={song.title} 
                  className="w-full h-full"
                />
                <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <button 
                    onClick={onTogglePlay}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-2xl hover:scale-110 active:scale-90 transition-all"
                  >
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                  </button>
                </div>
              </motion.div>
              
              {/* Animated Live Tag */}
              <div className="absolute -top-4 -right-4 bg-red-600 px-4 py-2 rounded-2xl shadow-[0_10px_20px_rgba(220,38,38,0.4)] flex items-center gap-2 border border-white/10 animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]"></div>
                <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Live</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-[7px] font-black uppercase tracking-[0.2em]">
                    Digital Broadcast
                  </span>
                  <span className="text-[7px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                    Sanahas Media Unit
                  </span>
                </div>
                
                <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tighter leading-tight lg:leading-[1.1]">
                  {song.title}
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-5 text-lg lg:text-xl text-slate-400 font-semibold tracking-tight">
                  <span className="text-indigo-400/80">{song.artist}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/10"></span>
                  <span className="text-slate-500">{song.album}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
                <button 
                  onClick={onTogglePlay}
                  className="flex items-center gap-4 px-8 py-4 bg-white text-black font-extrabold rounded-2xl hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/5"
                >
                  {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                  <span className="text-[10px] uppercase tracking-widest">{isPlaying ? 'Stop Broadcast' : 'Listen Live'}</span>
                </button>
                <button 
                  onClick={() => setIsShareModalOpen(true)}
                  className="flex items-center gap-4 px-8 py-4 glass text-white font-extrabold rounded-2xl hover:bg-white/5 hover:scale-105 active:scale-95 transition-all"
                >
                  <Share2 size={18} />
                  <span className="text-[10px] uppercase tracking-widest">Share Vibe</span>
                </button>
              </div>

              <div className="pt-4 opacity-40">
                <p className="text-[10px] font-medium text-slate-400 italic">"Empowering voices through digital innovation."</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ShareModal 
        song={song} 
        isOpen={isShareModalOpen} 
        onClose={() => setIsShareModalOpen(false)} 
      />
    </>
  );
};
