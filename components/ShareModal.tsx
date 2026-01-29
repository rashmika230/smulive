
import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Twitter, Facebook, MessageCircle, Share2 } from 'lucide-react';
import { Song } from '../types';

interface ShareModalProps {
  song: Song;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ song, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = `Listening to "${song.title}" by ${song.artist} on SMU LIVE FM! 🎶`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-[#1DA1F2]'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-[#4267B2]'
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={20} />,
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      color: 'bg-[#25D366]'
    }
  ];

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal Content */}
      <div className="relative glass w-full max-w-sm rounded-[2.5rem] border-white/10 p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          aria-label="Close sharing options"
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400" aria-hidden="true">
            <Share2 size={32} />
          </div>
          
          <div>
            <h3 id="share-modal-title" className="text-xl font-black text-white">Share the Vibe</h3>
            <p className="text-slate-300 text-sm mt-1">Spread the music with your friends</p>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full" role="group" aria-label="Social sharing links">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl ${link.color} text-white hover:scale-105 transition-transform focus:ring-4 focus:ring-white/20 outline-none`}
                aria-label={`Share on ${link.name}`}
              >
                {link.icon}
                <span className="text-[10px] font-bold uppercase tracking-widest" aria-hidden="true">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="w-full space-y-2">
            <label htmlFor="share-link-input" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left ml-2">Direct Link</label>
            <div className="flex gap-2">
              <input 
                id="share-link-input"
                type="text" 
                readOnly 
                value={shareUrl}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-slate-200 focus:outline-none"
              />
              <button 
                onClick={handleCopy}
                aria-label={copied ? "Copied!" : "Copy link to clipboard"}
                className="bg-white text-black px-4 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-colors flex items-center justify-center focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
