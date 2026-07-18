import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Heart, RotateCcw, Image, Mail, LogOut, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinalSurpriseProps {
  onScrollToTop: () => void;
  onScrollToGallery: () => void;
  onScrollToLetter: () => void;
  onLogout: () => void;
}

export default function FinalSurprise({
  onScrollToTop,
  onScrollToGallery,
  onScrollToLetter,
  onLogout
}: FinalSurpriseProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoved, setHasLoved] = useState(false);

  const handleOpenBox = () => {
    setIsOpen(true);

    // Breathtaking grand multi-firework burst
    const end = Date.now() + 2 * 1000;
    const interval = setInterval(() => {
      if (Date.now() > end) return clearInterval(interval);

      confetti({
        particleCount: 15,
        angle: 45,
        spread: 60,
        origin: { x: 0, y: 0.8 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24']
      });

      confetti({
        particleCount: 15,
        angle: 135,
        spread: 60,
        origin: { x: 1, y: 0.8 },
        colors: ['#f43f5e', '#ec4899', '#fbbf24']
      });
    }, 150);
  };

  const handleLoveClick = () => {
    setHasLoved(true);

    // Heart rain effect
    confetti({
      particleCount: 30,
      spread: 80,
      colors: ['#f43f5e', '#ec4899', '#fda4af'],
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="kejutan" className="py-24 bg-gradient-to-b from-pink-50/10 via-rose-50/20 to-rose-100/30 relative overflow-hidden flex flex-col items-center min-h-screen justify-center">
      
      {/* Dimmed background overlays for premium ambient focal contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">

        <AnimatePresence mode="wait">
          {!isOpen ? (
            // SEALED BOX STATE
            <motion.div
              key="closed-box-finale"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center"
            >
              <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1 mb-4">Puncak Hadiah</span>
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-900 mb-8">Satu Kejutan Terakhir</h2>

              <motion.div
                animate={{
                  y: [0, -12, 0],
                  scale: [1, 1.03, 1]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: 'easeInOut'
                }}
                onClick={handleOpenBox}
                className="w-44 h-44 bg-gradient-to-tr from-pink-100 to-rose-200/50 rounded-full flex items-center justify-center text-rose-500 cursor-pointer shadow-xl border border-pink-200/40 hover:scale-105 active:scale-95 transition relative group"
              >
                {/* Glowing ring */}
                <div className="absolute inset-0 bg-pink-400/20 rounded-full blur-xl group-hover:scale-110 transition duration-300"></div>
                <Gift size={54} className="relative z-10 text-rose-600 animate-pulse" />
              </motion.div>

              <button
                onClick={handleOpenBox}
                className="mt-8 px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-sm rounded-2xl shadow-md shadow-pink-200 hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                Buka Kejutan Terakhir
              </button>
            </motion.div>
          ) : (
            // REVEALED GRAND SURPRISE CARD
            <motion.div
              key="opened-surprise-content"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-pink-100 shadow-2xl flex flex-col items-center w-full relative overflow-hidden"
            >
              {/* Confetti sparkle backgrounds */}
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-pink-300/10 rounded-full blur-2xl pointer-events-none"></div>

              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-950 leading-tight">
                Selamat Ulang Tahun<br />ke-18, Khanza.
              </h2>
              
              <p className="text-sm text-rose-800/80 leading-relaxed mt-4 mb-8 max-w-sm">
                Terima kasih sudah hadir, bertahan, dan menjadi bagian yang sangat berarti dalam hidupku.
              </p>

              {/* Secret interactive love form */}
              <div className="w-full bg-pink-50/40 p-6 rounded-3xl border border-pink-100/40 mb-10 flex flex-col items-center relative min-h-[140px] justify-center">
                <AnimatePresence mode="wait">
                  {!hasLoved ? (
                    <motion.button
                      key="love-yes"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={handleLoveClick}
                      className="px-6 py-3.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:scale-105 active:scale-95 text-white font-serif font-bold text-sm rounded-2xl shadow-md shadow-pink-200/50 flex items-center gap-2 cursor-pointer"
                    >
                      <Heart size={16} fill="currentColor" className="animate-pulse" />
                      <span>Klik kalau kamu sayang aku juga</span>
                    </motion.button>
                  ) : (
                    <motion.div
                      key="love-unlocked"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-center flex flex-col items-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.25, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-12 h-12 bg-rose-500 text-white rounded-full flex items-center justify-center shadow-md mb-3"
                      >
                        <Heart size={20} fill="currentColor" />
                      </motion.div>
                      
                      <p className="font-serif font-bold text-rose-900 text-sm">
                        Jawabanmu sudah tercatat.<br />
                        <span className="text-xs text-rose-500 font-medium">Tidak tersedia tombol pembatalan.</span>
                      </p>

                      <h3 className="font-serif text-xl font-extrabold text-rose-900 mt-3 animate-pulse">
                        I love you 3000, Cantikku. ❤ (Dari Vicko yang menul)
                      </h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Finale paths navigation */}
              <div className="grid grid-cols-2 gap-3.5 w-full border-t border-pink-50 pt-8">
                
                <button
                  onClick={onScrollToTop}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 text-rose-700 text-xs font-semibold rounded-xl border border-pink-50 transition cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Mulai dari Awal</span>
                </button>

                <button
                  onClick={onScrollToGallery}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 text-rose-700 text-xs font-semibold rounded-xl border border-pink-50 transition cursor-pointer"
                >
                  <Image size={14} />
                  <span>Buka Galeri</span>
                </button>

                <button
                  onClick={onScrollToLetter}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 text-rose-700 text-xs font-semibold rounded-xl border border-pink-50 transition cursor-pointer"
                >
                  <Mail size={14} />
                  <span>Baca Surat Lagi</span>
                </button>

                {/* Secure server-side sign out path */}
                <button
                  onClick={onLogout}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-100/40 transition cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Keluar (Logout)</span>
                </button>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
