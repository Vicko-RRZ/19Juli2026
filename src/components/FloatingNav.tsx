import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { LogOut, Heart } from 'lucide-react';

interface FloatingNavProps {
  onLogout: () => void;
  activeSection: string;
}

export default function FloatingNav({ onLogout, activeSection }: FloatingNavProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const menuItems = [
    { id: 'awal', label: 'Awal' },
    { id: 'cerita-kita', label: 'Cerita' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'pesan', label: 'Pesan' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'surat', label: 'Surat' },
    { id: 'kejutan', label: 'Kejutan' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. DESKTOP FLOATING HEADER NAVIGATION BAR */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-4xl bg-white/70 backdrop-blur-md border border-pink-100 px-6 py-3.5 rounded-full shadow-lg shadow-pink-200/10 hidden md:flex justify-between items-center select-none"
      >
        {/* Branding motif */}
        <div className="flex items-center gap-1.5 font-serif text-rose-800 font-extrabold text-sm tracking-tight cursor-pointer" onClick={() => handleScrollToSection('awal')}>
          <span>Khanza</span>
          <Heart size={12} fill="currentColor" className="text-pink-500 animate-pulse" />
          <span className="text-pink-400 font-normal text-xs">18</span>
        </div>

        {/* Menu Items links list */}
        <div className="flex items-center gap-1.5">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleScrollToSection(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition cursor-pointer ${
                  isActive 
                    ? 'bg-rose-500 text-white shadow-sm' 
                    : 'text-rose-700/80 hover:text-rose-900 hover:bg-pink-50/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Logout button */}
        <button
          onClick={onLogout}
          className="p-2 rounded-full text-rose-600 hover:bg-rose-50 transition hover:scale-105 active:scale-95 cursor-pointer"
          title="Keluar (Logout)"
        >
          <LogOut size={16} />
        </button>

        {/* Progress bar overlay line bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-pink-100 rounded-b-full overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-400 to-rose-400 h-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.nav>

      {/* 2. MOBILE BOTTOM COMPACT RAIL BAR */}
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-4 inset-x-4 z-30 bg-white/80 backdrop-blur-lg border border-pink-100 p-2 rounded-3xl shadow-xl shadow-pink-200/10 flex md:hidden justify-around items-center select-none"
      >
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleScrollToSection(item.id)}
              className={`flex-1 py-2 text-center flex flex-col items-center justify-center rounded-2xl transition cursor-pointer ${
                isActive 
                  ? 'text-rose-600 font-extrabold bg-pink-50/50' 
                  : 'text-rose-700/60 font-semibold'
              }`}
            >
              <span className="text-[10px] leading-none">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1" />
              )}
            </button>
          );
        })}

        {/* Compact progress bar docked on very top of mobile navigation rail */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-pink-50 rounded-t-3xl overflow-hidden">
          <div 
            className="bg-rose-400 h-full"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </motion.nav>
    </>
  );
}
