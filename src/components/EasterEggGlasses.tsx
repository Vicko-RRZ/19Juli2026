import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Glasses, Sparkles, Trophy, X, CalendarHeart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EasterEggProps {
  foundIds: number[];
  onFind: (id: number) => void;
}

// 1. The Global Overlay / Progress Pill & Grand Prize Modal
export function EasterEggSystem({ foundIds, onFind }: EasterEggProps) {
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const totalGlasses = 5;

  const hints = [
    { id: 1, section: 'Awal (Hero)', text: 'Dekat lencana nama di atas foto utama' },
    { id: 2, section: 'Cerita Kita', text: 'Di dekat bagian bawah lini masa sejarah kita' },
    { id: 3, section: 'Galeri Foto', text: 'Di pojok kanan atas dari seksi galeri foto' },
    { id: 4, section: 'Tas Interaktif', text: 'Di sekitar barang flatlay yang tumpah dari tas' },
    { id: 5, section: 'Surat Utama', text: 'Di samping stempel lilin surat terakhir' },
  ];

  useEffect(() => {
    if (foundIds.length === totalGlasses) {
      // Trigger magical prize modal!
      setShowPrizeModal(true);
      setShowHints(false);
      
      // Fire beautiful continuous golden fireworks confetti!
      const end = Date.now() + 3 * 1000;
      const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: ['#f43f5e', '#fbbf24', '#fbcfe8']
        });
      }, 200);
    }
  }, [foundIds]);

  return (
    <>
      {/* Floating Progress Tracker Pill with Clue Panel */}
      <div className="fixed bottom-24 md:bottom-6 left-4 md:left-6 z-40 flex flex-col items-start gap-2 max-w-xs md:max-w-sm">
        <AnimatePresence>
          {showHints && foundIds.length < totalGlasses && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-pink-100 shadow-xl shadow-pink-200/30 text-rose-950 text-xs w-72 mb-1"
            >
              <div className="flex justify-between items-center border-b border-pink-50 pb-2 mb-2">
                <span className="font-bold text-rose-800 font-mono text-[10px] uppercase tracking-wider">Petunjuk Kacamata</span>
                <button 
                  onClick={() => setShowHints(false)}
                  className="text-rose-400 hover:text-rose-600 transition cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
              <ul className="space-y-1.5 font-sans">
                {hints.map((hint) => {
                  const isFound = foundIds.includes(hint.id);
                  return (
                    <li key={hint.id} className="flex items-start gap-2">
                      <span className={`text-xs mt-0.5 ${isFound ? 'text-green-500 font-bold' : 'text-rose-500 animate-pulse font-bold'}`}>
                        {isFound ? '✓' : '●'}
                      </span>
                      <div className="flex-1">
                        <span className={`font-semibold ${isFound ? 'line-through text-slate-400' : 'text-rose-800'}`}>
                          [{hint.section}]
                        </span>{' '}
                        <span className={isFound ? 'line-through text-slate-400' : 'text-slate-600'}>
                          {hint.text}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-md px-4 py-3 rounded-full border border-pink-100 shadow-lg shadow-pink-200/20 flex items-center gap-2.5 hover:scale-105 transition"
        >
          <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-rose-500 relative">
            <Glasses size={16} />
            {foundIds.length < totalGlasses && (
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
            )}
          </div>
          <div className="text-left font-mono">
            <p className="text-[9px] text-rose-400 uppercase tracking-widest leading-none">Cari Kacamata</p>
            <p className="text-xs font-bold text-rose-800 leading-none mt-1">Ditemukan: {foundIds.length} / {totalGlasses}</p>
          </div>

          {foundIds.length < totalGlasses && (
            <button
              onClick={() => setShowHints(!showHints)}
              className="ml-2 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-full font-mono text-[9px] font-bold uppercase border border-pink-100 transition cursor-pointer"
            >
              {showHints ? 'Tutup' : 'Petunjuk'}
            </button>
          )}
        </motion.div>
      </div>

      {/* GRAND PRIZE REWARD MODAL */}
      <AnimatePresence>
        {showPrizeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-pink-950/70 via-slate-950/95 to-slate-950 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              className="bg-white border-2 border-yellow-200 p-8 rounded-[40px] max-w-md w-full text-center relative shadow-2xl relative overflow-hidden"
            >
              {/* Golden star details */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none"></div>
              
              <button
                onClick={() => setShowPrizeModal(false)}
                className="absolute top-4 right-4 p-2 bg-pink-50 hover:bg-pink-100 text-rose-500 rounded-full transition cursor-pointer"
              >
                <X size={16} />
              </button>

              {/* Huge rotating kacamata badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-rose-400 flex items-center justify-center text-white mb-6 shadow-xl shadow-pink-300/30"
              >
                <Glasses size={46} className="text-white drop-shadow-md" />
              </motion.div>

              <span className="px-4 py-1.5 bg-yellow-100 text-yellow-700 font-mono text-[10px] uppercase font-bold rounded-full tracking-wider border border-yellow-200">
                ★ Misi Rahasia Selesai ★
              </span>

              <h3 className="font-serif text-2xl font-extrabold text-rose-900 mt-5 leading-tight">
                Kamu Berhasil Menemukan Semua Kacamata!
              </h3>
              
              <p className="font-serif italic text-sm text-rose-800 leading-relaxed mt-4 mb-6 px-2">
                “Tetapi tetap saja, tidak ada yang lebih ikonik daripada kacamata Khanza yang asli.”
              </p>

              {/* Reward Coupon box */}
              <div className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-200/50 text-rose-800 shadow-inner">
                <div className="flex items-center gap-2 justify-center text-rose-600 mb-1">
                  <CalendarHeart size={16} className="animate-bounce" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">KUPON HADIAH TAMBAHAN</span>
                </div>
                <p className="font-serif font-bold text-sm text-rose-900 mt-1">
                  “Kesempatan Emas untuk Ngajak Aku Ngedate Lagi!”
                </p>
                <p className="text-[10px] text-rose-400 font-mono mt-1 uppercase">Berlaku selamanya • Tanpa kadaluarsa</p>
              </div>

              <div className="mt-6 flex justify-center text-[10px] text-rose-400 font-mono uppercase tracking-wider">
                <span>I Love You 3000, dari Vicko yang Menul</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// 2. The Hidden Glasses Icon that can be clicked anywhere on the webpage
interface HiddenGlassesProps {
  id: number;
  foundIds: number[];
  onFind: (id: number) => void;
  className?: string;
}

export function HiddenGlassesIcon({ id, foundIds, onFind, className = "" }: HiddenGlassesProps) {
  const isFound = foundIds.includes(id);

  if (isFound) return null; // Disappear when discovered

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering parent clicks
    onFind(id);
    confetti({
      particleCount: 30,
      spread: 60,
      colors: ['#ec4899', '#f43f5e', '#fbbf24']
    });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.25, rotate: [0, -10, 10, 0] }}
      whileTap={{ scale: 0.85 }}
      onClick={handleClick}
      className={`flex items-center justify-center bg-white border-2 border-pink-300 text-pink-500 hover:text-pink-600 hover:border-pink-400 rounded-full p-2.5 shadow-lg shadow-pink-200/40 cursor-pointer absolute z-30 outline-none transition-all duration-300 ${className}`}
      title="Klik untuk menemukan kacamata!"
    >
      {/* Pulsing glow ring */}
      <span className="absolute inset-0 rounded-full bg-pink-400/40 animate-ping -z-10 pointer-events-none"></span>
      <Glasses size={22} className="relative z-10" />
    </motion.button>
  );
}
export default EasterEggSystem;
