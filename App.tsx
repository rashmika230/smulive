
import React, { useState } from 'react';
import { NowPlaying } from './components/NowPlaying';
import { Playlist } from './components/Playlist';
import { ChatRoom } from './components/ChatRoom';
import { JoinProgram } from './components/JoinProgram';
import { Player } from './components/Player';
import { MOCK_PLAYLIST } from './constants';
import { Radio, Headphones, Globe, MessageSquare, ListMusic, Share2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentSong] = useState(MOCK_PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'history' | 'chat'>('history');

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#050507] text-slate-200 selection:bg-indigo-500/30">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-lg z-[100]">
        Skip to main content
      </a>

      {/* Modern Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[180px] rounded-full animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[180px] rounded-full animate-float" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Header Navigation */}
      <header className="h-20 border-b border-white/[0.03] bg-[#050507]/60 backdrop-blur-2xl sticky top-0 z-50 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 cursor-pointer group" 
            aria-label="SMU LIVE Home"
          >
            <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-600/20 group-hover:rotate-12 transition-transform duration-500">
              <Radio className="text-white" size={24} aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-lg tracking-tight">SMU LIVE</h1>
              {/* Enhanced On Air Indicator */}
              <motion.div 
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></span>
                </span>
                <p className="text-[7px] text-red-500 font-black uppercase tracking-[0.2em] drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">On Air</p>
              </motion.div>
            </div>
          </motion.div>

          <nav className="hidden xl:flex items-center gap-10" aria-label="Main Navigation">
            {['Live', 'Schedule', 'Team', 'Community'].map((item, idx) => (
              <a 
                key={item} 
                href="#" 
                className={`text-[9px] font-bold uppercase tracking-[0.2em] transition-all hover:text-white ${idx === 0 ? 'text-white' : 'text-slate-500'}`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-6"
        >
          <div className="hidden md:flex items-center gap-2.5 px-4 py-2 bg-white/[0.02] rounded-2xl border border-white/[0.05]" aria-label="1,284 Active Listeners">
            <Headphones size={13} className="text-indigo-400" aria-hidden="true" />
            <span className="text-[8px] font-mono text-white font-bold tracking-tighter">1,284 LISTENERS</span>
          </div>
          <a 
            href="mailto:donate@sanahasmedia.lk"
            className="bg-white text-black px-5 py-2 rounded-full font-extrabold text-[9px] tracking-widest uppercase hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
          >
            Support Us
          </a>
        </motion.div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        
        {/* Featured Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <NowPlaying 
            song={currentSong} 
            isPlaying={isPlaying} 
            onTogglePlay={handleTogglePlay} 
          />
        </motion.section>

        {/* content sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-8 border-b border-white/[0.03] pb-4" role="tablist">
                <button 
                  onClick={() => setActiveTab('history')}
                  role="tab"
                  aria-selected={activeTab === 'history'}
                  className={`text-[9px] font-bold uppercase tracking-[0.15em] transition-all relative ${activeTab === 'history' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Playlist History
                  {activeTab === 'history' && (
                    <motion.div layoutId="tab-underline" className="absolute -bottom-4.5 left-0 w-full h-[2px] bg-indigo-500" />
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('chat')}
                  role="tab"
                  aria-selected={activeTab === 'chat'}
                  className={`text-[9px] font-bold uppercase tracking-[0.15em] transition-all relative ${activeTab === 'chat' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  Live Community
                  {activeTab === 'chat' && (
                    <motion.div layoutId="tab-underline" className="absolute -bottom-4.5 left-0 w-full h-[2px] bg-indigo-500" />
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[400px]"
                >
                  {activeTab === 'history' ? <Playlist /> : <ChatRoom />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-10">
            <JoinProgram />
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-[2.5rem] border-white/[0.03] text-center"
            >
              <h4 className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">Stay Connected</h4>
              <div className="flex justify-center gap-4">
                {[Share2, Globe, Heart].map((Icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition-all">
                    <Icon size={18} />
                  </button>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </main>

      <Player 
        currentSong={currentSong} 
        isPlaying={isPlaying} 
        onTogglePlay={handleTogglePlay} 
      />

      <footer className="pt-24 pb-48 px-6 text-center border-t border-white/[0.03]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-center gap-4">
            <Radio size={20} className="text-indigo-500" />
            <span className="font-extrabold tracking-tight text-lg text-white">SMU LIVE FM</span>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed max-w-xl mx-auto font-medium">
            Broadcasting 24/7. Powered by Sanahas Media Unit of Walasmulla National School. 
            Empowering the next generation of broadcasting excellence.
          </p>
          <div className="flex justify-center gap-8 text-[8px] font-black uppercase tracking-[0.2em] text-slate-600">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Donate</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
