import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GiftIntroProps {
  onComplete: (playMusic: boolean) => void;
}

export default function GiftIntro({ onComplete }: GiftIntroProps) {
  const [isOpenStage, setIsOpenStage] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (isOpenStage !== 'closed') return;
    setIsOpenStage('opening');

    // Sweet multi-burst confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fbcfe8', '#fbbf24']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f43f5e', '#ec4899', '#f472b6', '#fbcfe8', '#fbbf24']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setIsOpenStage('opened');
      }
    };
    frame();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Dim Romantic Nebula background */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-pink-950/40 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>

      <AnimatePresence mode="wait">
        {isOpenStage !== 'opened' ? (
          <motion.div
            key="gift-box-stage"
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="flex flex-col items-center text-center px-4 relative z-10"
          >
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-300 font-mono text-sm tracking-widest uppercase mb-6"
            >
              Ada hadiah kecil untuk Dedek.
            </motion.p>

            {/* Interactive 3D Gift Box container */}
            <motion.div
              onClick={handleOpen}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              animate={isOpenStage === 'opening' ? {
                scale: [1, 1.2, 0.9, 2.5],
                rotate: [0, -10, 15, -20, 360],
              } : {
                y: [0, -12, 0],
                rotateY: isHovered ? 15 : 0,
              }}
              transition={isOpenStage === 'opening' ? {
                duration: 1.5,
                ease: "easeInOut"
              } : {
                y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                rotateY: { duration: 0.4 }
              }}
              className="relative w-48 h-48 cursor-pointer preserve-3d flex items-center justify-center mb-10 group"
            >
              {/* Box Glow */}
              <div className="absolute inset-0 bg-pink-500/20 rounded-full blur-2xl group-hover:scale-125 transition duration-500"></div>

              {/* Gift SVG representing physical 3D box */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg
                  className="w-full h-full text-pink-400 drop-shadow-[0_10px_15px_rgba(244,63,94,0.4)] transition group-hover:text-pink-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 12v10H4V12" />
                  <path d="M2 7h20v5H2z" />
                  <path d="M12 22V7" />
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                </svg>

                {/* Sparkling dots on box */}
                <span className="absolute top-2 left-6 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-ping"></span>
                <span className="absolute bottom-6 right-8 w-2 h-2 bg-pink-300 rounded-full animate-pulse"></span>
              </div>
            </motion.div>

            <motion.button
              onClick={handleOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-lg shadow-pink-500/30 border border-pink-400/20 hover:shadow-pink-500/50 transition cursor-pointer flex items-center gap-2"
            >
              <Gift size={18} />
              <span>Ketuk untuk Membuka</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="music-selection-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center px-6 max-w-md relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-500/30"
            >
              <Heart size={24} fill="currentColor" className="animate-pulse" />
            </motion.div>

            <h2 className="font-serif text-3xl font-bold text-white mb-3">Selamat datang, Dedek.</h2>
            <p className="text-pink-200/80 text-sm leading-relaxed mb-8">
              Ini cerita kecil tentang kita. Untuk kenyamanan terbaik, silakan nyalakan musik romantisnya ya.
            </p>

            {/* Selection buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => onComplete(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-2xl hover:scale-105 active:scale-95 transition shadow-lg shadow-pink-500/20 cursor-pointer"
              >
                <Volume2 size={18} />
                <span>Mulai dengan Musik</span>
              </button>

              <button
                onClick={() => onComplete(false)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 text-white border border-white/10 hover:bg-white/20 font-semibold rounded-2xl hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <VolumeX size={18} className="opacity-80" />
                <span>Mulai Tanpa Musik</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
