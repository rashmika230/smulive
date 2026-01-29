
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart,
} from 'lucide-react';
import { Song } from '../types';
import { Visualizer } from './Visualizer';
import { ImageWithFallback } from './ImageWithFallback';
import { ZENO_STREAM_URL } from '../constants';
import { motion } from 'framer-motion';

interface PlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const Player: React.FC<PlayerProps> = ({ currentSong, isPlaying, onTogglePlay }) => {
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio with more robust settings
  useEffect(() => {
    // Append type=.mp3 to help some browsers identify the stream
    const directUrl = `${ZENO_STREAM_URL}?type=.mp3&_=${Date.now()}`;
    audioRef.current = new Audio(directUrl);
    audioRef.current.crossOrigin = "anonymous";
    audioRef.current.preload = "none"; // Wait for play
    
    const handleCanPlay = () => {
      if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    };

    const handleError = (e: any) => {
      console.warn("Stream encounter issue, attempting refresh:", e);
      // If playing and error occurs, try to reconnect once
      if (isPlaying && audioRef.current) {
        audioRef.current.src = `${ZENO_STREAM_URL}?type=.mp3&_=${Date.now()}`;
        audioRef.current.load();
        audioRef.current.play().catch(console.error);
      }
    };

    audioRef.current.addEventListener('canplay', handleCanPlay);
    audioRef.current.addEventListener('error', handleError);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplay', handleCanPlay);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Play/Pause
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      // Re-load source on fresh play to ensure we are live
      if (audioRef.current.paused) {
        audioRef.current.load();
        audioRef.current.play().catch(err => {
          console.error("Manual playback triggered error:", err);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Sync Volume
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume / 100;
  }, [volume, isMuted]);

  return (
    <motion.section 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-8 pt-10 pointer-events-none" 
      aria-label="Audio Player"
    >
      <div className="max-w-6xl mx-auto glass h-24 rounded-[2.5rem] border-white/[0.05] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] px-8 lg:px-12 flex items-center justify-between gap-8 pointer-events-auto backdrop-blur-3xl relative">
        
        {/* Track Info Section */}
        <div className="flex items-center gap-5 w-1/4 min-w-[200px] lg:min-w-[320px]">
          <div className="relative shrink-0">
            <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ${isPlaying ? 'scale-110 shadow-indigo-600/30 ring-2 ring-indigo-500/20' : ''}`}>
              <ImageWithFallback 
                src={currentSong.coverUrl} 
                alt={currentSong.title} 
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                 <Visualizer isPlaying={isPlaying} />
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-extrabold text-white truncate tracking-tight">{currentSong.title}</h4>
            <p className="text-[8px] text-indigo-400 font-black truncate uppercase tracking-[0.15em]">{currentSong.artist}</p>
          </div>
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`shrink-0 transition-all duration-300 ml-2 ${isLiked ? 'text-pink-500 scale-125' : 'text-slate-600 hover:text-white'}`}
          >
            <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Playback Controls */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-8 lg:gap-10">
            <button className="text-slate-700 cursor-not-allowed" disabled>
              <SkipBack size={22} fill="currentColor" />
            </button>
            
            <button 
              onClick={onTogglePlay}
              className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-2xl shadow-white/10 ring-[6px] ring-white/5"
            >
              {isPlaying ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
            </button>

            <button className="text-slate-700 cursor-not-allowed" disabled>
              <SkipForward size={22} fill="currentColor" />
            </button>
          </div>
          
          <div className="w-full hidden md:flex items-center justify-center">
            <span className={`text-[8px] font-black uppercase tracking-[0.3em] flex items-center gap-2.5 ${isPlaying ? 'text-red-500 animate-pulse' : 'text-slate-600'}`}>
              <span className={`w-1.2 h-1.2 rounded-full ${isPlaying ? 'bg-red-500' : 'bg-slate-600'}`}></span>
              {isPlaying ? 'Live Stream Active' : 'Station Ready'}
            </span>
          </div>
        </div>

        {/* Volume & Quality */}
        <div className="w-1/4 hidden lg:flex items-center justify-end gap-10">
          <div className="flex items-center gap-4 group/vol">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-500 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <div className="w-24 relative flex items-center h-6">
              <input 
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-white focus:outline-none"
                style={{
                  background: `linear-gradient(to right, white ${isMuted ? 0 : volume}%, rgba(255, 255, 255, 0.1) ${isMuted ? 0 : volume}%)`
                }}
              />
            </div>
          </div>
          
          <div className="hidden xl:flex flex-col items-end opacity-40">
            <span className="text-[7px] font-black text-slate-500 uppercase tracking-tighter">Bitrate</span>
            <span className="text-[8px] font-mono text-white font-bold">HQ 320K</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
