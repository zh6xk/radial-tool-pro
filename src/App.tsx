import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileImage,
  FileText,
  Scissors,
  Camera,
  Archive,
  Youtube,
  Tv,
  Github,
  Sparkles,
  Search,
  X,
  ChevronRight,
  Layers
} from 'lucide-react';

interface RadialItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
  color?: string;
}

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [activePage, setActivePage] = useState<'media' | 'web'>('media');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Daftar item Halaman 0: MEDIA TOOLS
  const mediaItems: RadialItem[] = [
    { id: 'format', label: 'Format Image', icon: <FileImage className="w-6 h-6" />, action: () => sendAction('format-image') },
    { id: 'pdf', label: 'Image to PDF', icon: <FileText className="w-6 h-6" />, action: () => sendAction('image-to-pdf') },
    { id: 'screenshot', label: 'Screenshot', icon: <Camera className="w-6 h-6" />, action: () => sendAction('screenshot') },
    { id: 'compress', label: 'Compress', icon: <Archive className="w-6 h-6" />, action: () => sendAction('compress') },
    { id: 'split', label: 'PDF Split', icon: <Scissors className="w-6 h-6" />, action: () => sendAction('pdf-split') },
  ];

  // Daftar item Halaman 1: WEB LAUNCHER
  const webItems: RadialItem[] = [
    { id: 'youtube', label: 'YouTube', icon: <Youtube className="w-6 h-6 text-red-500" />, action: () => openUrl('https://youtube.com') },
    { id: 'netflix', label: 'Netflix', icon: <Tv className="w-6 h-6 text-red-600" />, action: () => openUrl('https://netflix.com') },
    { id: 'github', label: 'GitHub', icon: <Github className="w-6 h-6 text-white" />, action: () => openUrl('https://github.com') },
    { id: 'chatgpt', label: 'ChatGPT', icon: <Sparkles className="w-6 h-6 text-emerald-400" />, action: () => openUrl('https://chatgpt.com') },
    { id: 'google', label: 'Google', icon: <Search className="w-6 h-6 text-blue-400" />, action: () => openUrl('https://google.com') },
  ];

  const currentItems = activePage === 'media' ? mediaItems : webItems;

  const sendAction = (actionName: string) => {
    if ((window as any).electronAPI) {
      (window as any).electronAPI.sendAction(actionName);
    } else {
      console.log('Action triggered:', actionName);
    }
  };

  const openUrl = (url: string) => {
    if ((window as any).electronAPI) {
      (window as any).electronAPI.openExternal(url);
    } else {
      window.open(url, '_blank');
    }
  };

  // Navigasi scroll mouse untuk ganti page
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        setActivePage('web');
      } else if (e.deltaY < 0) {
        setActivePage('media');
      }
    };
    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const radius = 135;
  const count = currentItems.length;

  return (
    <div className="relative w-screen h-screen flex items-center justify-center pointer-events-auto">
      {/* Ambient Backdrop Blur Scrim */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      {/* Main Radial Container */}
      <motion.div
        initial={{ scale: 0.82, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 320 }}
        className="relative w-[340px] h-[340px] flex items-center justify-center z-10"
      >
        {/* Outer Glow Halo Ring */}
        <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_50px_rgba(14,165,233,0.15)] pointer-events-none" />

        {/* Center Hub Button (✕ BATAL & Indicator) */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if ((window as any).electronAPI) (window as any).electronAPI.closeMenu();
          }}
          className="relative w-20 h-20 rounded-full bg-[#111827]/90 border border-white/20 shadow-2xl flex flex-col items-center justify-center group hover:border-red-500/60 hover:bg-red-950/40 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5 text-white/70 group-hover:text-red-400 group-hover:rotate-90 transition-all duration-200" />
          <span className="text-[10px] font-semibold text-white/50 group-hover:text-red-300 mt-0.5 tracking-wider uppercase">
            Batal
          </span>

          {/* Dots Indicator Layer */}
          <div className="flex gap-1.5 mt-1.5">
            <span className={`w-1.5 h-1.5 rounded-full transition-all ${activePage === 'media' ? 'bg-sky-400 w-3' : 'bg-white/30'}`} />
            <span className={`w-1.5 h-1.5 rounded-full transition-all ${activePage === 'web' ? 'bg-sky-400 w-3' : 'bg-white/30'}`} />
          </div>
        </motion.button>

        {/* Radial Slices Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 15, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="absolute inset-0"
          >
            {currentItems.map((item, index) => {
              const angle = (index * (360 / count) - 90) * (Math.PI / 180);
              const x = Math.round(radius * Math.cos(angle));
              const y = Math.round(radius * Math.sin(angle));
              const isHovered = hoveredIndex === index;

              return (
                <motion.div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px - 44px)`,
                    top: `calc(50% + ${y}px - 44px)`,
                  }}
                  whileHover={{ scale: 1.15 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={item.action}
                  className="cursor-pointer group flex flex-col items-center justify-center w-[88px] h-[88px]"
                >
                  {/* Floating Glass Tile */}
                  <div
                    className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg ${
                      isHovered
                        ? 'bg-sky-500 text-white shadow-[0_0_25px_rgba(14,165,233,0.6)] border border-white'
                        : 'bg-[#1e293b]/85 text-white/80 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Label Pill */}
                  <span
                    className={`mt-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium tracking-tight whitespace-nowrap transition-all duration-200 ${
                      isHovered
                        ? 'bg-sky-950/80 text-sky-200 border border-sky-400/40 shadow-sm'
                        : 'text-white/70 bg-black/40 backdrop-blur-sm'
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Pill Badge Mode di Bagian Bawah */}
        <div className="absolute -bottom-10 flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md shadow-xl text-xs text-white/80">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold uppercase tracking-wider text-[10px] text-sky-300">
            {activePage}
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[10px] text-white/50">Scroll untuk switch</span>
        </div>
      </motion.div>
    </div>
  );
}