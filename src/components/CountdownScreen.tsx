import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Heart, LogOut, Lock, Sparkles } from 'lucide-react';

interface CountdownScreenProps {
  onLogout: () => void;
  targetDateStr?: string; // default to '2026-07-19T00:00:00+07:00'
}

export default function CountdownScreen({ onLogout, targetDateStr = '2026-07-19T00:00:00+07:00' }: CountdownScreenProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    const targetTime = new Date(targetDateStr).getTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
        // Automatically refresh or let the app know it's ready
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isExpired: false });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDateStr]);

  // If countdown is expired, we can show a special button to reload or open
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div id="countdown-container" className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 relative overflow-hidden px-4 py-8 select-none">
      
      {/* Decorative Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 16 + 10}px`
            }}
            animate={{
              y: [0, -60, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4 + Math.random() * 5,
              delay: Math.random() * 2
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="bg-white/85 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-pink-100/50 relative overflow-hidden"
        >
          {/* Decorative glowing gradient blur */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-300/30 rounded-full blur-3xl pointer-events-none" />

          {/* Icon Header */}
          <div className="flex flex-col items-center mb-6">
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, -3, 3, 0]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-16 h-16 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-200 mb-4"
            >
              <Clock size={30} className="animate-pulse" />
            </motion.div>
            
            <span className="bg-pink-100/70 border border-pink-200 text-rose-700 text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full font-bold flex items-center gap-1">
              <Sparkles size={10} className="text-pink-500 animate-spin" />
              Menghitung Hari Bahagia
            </span>
            
            <h2 className="font-serif text-3xl font-extrabold text-rose-800 tracking-tight mt-4">
              Sabar Ya Sayang...
            </h2>
          </div>

          <p className="text-sm text-rose-700/80 max-w-md mx-auto leading-relaxed mb-8">
            Website kado ulang tahun spesial untuk <span className="font-bold text-rose-800">Khanza</span> baru bisa dibuka pada tanggal <span className="font-semibold text-rose-800">19 Juli 2026 pukul 00:00 WIB</span>. 
            Vicko sedang merajut memori indah kita di dalam sini. Tunggu sebentar lagi ya, Cantik! ❤
          </p>

          {/* COUNTDOWN TILES */}
          <div className="grid grid-cols-4 gap-2.5 md:gap-4 max-w-md mx-auto mb-8">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((tile, idx) => (
              <div 
                key={idx} 
                className="bg-rose-50/50 border border-pink-100/50 rounded-2xl p-3 md:p-4 shadow-sm flex flex-col items-center justify-center relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-400/40 to-rose-400/40" />
                <span className="font-mono text-2xl md:text-3.5xl font-extrabold text-rose-800 leading-none">
                  {String(tile.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] md:text-xs font-semibold text-rose-500 uppercase mt-1 tracking-wider">
                  {tile.label}
                </span>
              </div>
            ))}
          </div>

          {timeLeft.isExpired ? (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleReload}
              className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-sm rounded-2xl shadow-md shadow-pink-200/40 cursor-pointer transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Lock size={16} />
              Buka Kado Sekarang!
            </motion.button>
          ) : (
            <div className="border-t border-rose-100/60 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <span className="text-xs text-rose-500/70 italic flex items-center gap-1.5">
                <Heart size={12} className="text-rose-400 fill-rose-400 animate-pulse" />
                Dibuat dengan segenap cinta oleh Vicko
              </span>
              
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 text-xs font-medium text-rose-600/80 hover:text-rose-800 transition px-3 py-1.5 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100/40"
              >
                <LogOut size={13} />
                Keluar / Ganti Akun
              </button>
            </div>
          )}
        </motion.div>
        
        <p className="text-center text-[10px] text-rose-700/50 mt-6 max-w-xs mx-auto leading-relaxed">
          Ulang tahunmu adalah hari paling membahagiakan.<br />Terima kasih telah hadir di duniaku.
        </p>
      </div>
    </div>
  );
}
