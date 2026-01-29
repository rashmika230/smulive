
import React from 'react';
import { motion } from 'framer-motion';

export const Visualizer: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  const barCount = 18; // Increased for more detail

  // Helper to determine animation behavior based on bar index (simulating frequency bands)
  const getBarBehavior = (index: number) => {
    const total = barCount;
    if (index < total * 0.3) {
      // Bass bars: Slower, deeper pulses
      return {
        height: [ '20%', '90%', '40%', '100%', '20%' ],
        duration: 0.8 + Math.random() * 0.4,
        ease: [0.45, 0.05, 0.55, 0.95], // Custom cubic-bezier for a "bouncy" bass feel
        glow: 'rgba(99, 102, 241, 0.6)'
      };
    } else if (index < total * 0.7) {
      // Mid-range bars: Moderate speed and amplitude
      return {
        height: [ '30%', '70%', '50%', '85%', '30%' ],
        duration: 0.5 + Math.random() * 0.3,
        ease: "easeInOut",
        glow: 'rgba(129, 140, 248, 0.5)'
      };
    } else {
      // Treble bars: Fast, jittery movement
      return {
        height: [ '40%', '60%', '45%', '75%', '40%' ],
        duration: 0.3 + Math.random() * 0.2,
        ease: "linear",
        glow: 'rgba(165, 180, 252, 0.4)'
      };
    }
  };

  return (
    <div className="flex items-end gap-[2px] h-12 w-auto px-2 group" aria-hidden="true">
      {[...Array(barCount)].map((_, i) => {
        const behavior = getBarBehavior(i);
        
        return (
          <motion.div
            key={i}
            initial={{ height: '4px' }}
            animate={isPlaying ? {
              height: behavior.height,
              backgroundColor: [
                '#6366f1', // indigo-500
                '#818cf8', // indigo-400
                '#4f46e5', // indigo-600
                '#6366f1'
              ],
              boxShadow: [
                `0 0 10px ${behavior.glow}`,
                `0 0 20px ${behavior.glow}`,
                `0 0 10px ${behavior.glow}`
              ]
            } : {
              height: '4px',
              backgroundColor: '#1e293b', // slate-800
              boxShadow: 'none'
            }}
            transition={isPlaying ? {
              duration: behavior.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: behavior.ease,
              delay: i * 0.03 // Progressive delay for wave effect
            } : {
              duration: 0.3,
              ease: "easeOut"
            }}
            className="w-[4px] rounded-t-full relative overflow-hidden"
          >
            {/* Glossy overlay effect for each bar */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-30" />
          </motion.div>
        );
      })}
    </div>
  );
};
