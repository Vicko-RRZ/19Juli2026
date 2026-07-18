import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowDown, Image as ImageIcon } from 'lucide-react';

interface HeroSectionProps {
  onStartStory: () => void;
  onGoToPhotos: () => void;
}

export default function HeroSection({ onStartStory, onGoToPhotos }: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [birthdayState, setBirthdayState] = useState<'before' | 'today' | 'after'>('before');
  const [heroImg, setHeroImg] = useState('/photos/hero_khanza.jpg');

  const birthdayDate = new Date('2026-07-19T00:00:00+07:00'); // July 19, 2026 Jakarta Time

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = birthdayDate.getTime() - now.getTime();

      // Check current day status
      const isSameDay = now.getDate() === 19 && now.getMonth() === 6 && now.getFullYear() === 2026;

      if (isSameDay) {
        setBirthdayState('today');
      } else if (diff < 0) {
        setBirthdayState('after');
      } else {
        setBirthdayState('before');
        
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="awal" className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-16 overflow-hidden bg-gradient-to-b from-rose-50 via-pink-50/50 to-white">
      
      {/* Background decorations */}
      <div className="absolute top-1/4 left-10 w-24 h-24 bg-pink-200/30 rounded-full blur-xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-rose-200/30 rounded-full blur-xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-pink-100 text-rose-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-6 border border-pink-200/50 shadow-sm"
        >
          <Sparkles size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
          <span>Untuk Dedek yang sekarang berusia 18 tahun</span>
        </motion.div>

        {/* Title splits or drops */}
        <h1 className="font-serif text-5xl md:text-7xl font-extrabold text-rose-900 tracking-tight leading-[1.1] mb-6">
          Selamat Ulang Tahun,<br />
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 bg-clip-text text-transparent">Khanza!</span>
        </h1>

        {/* Beautiful Subtitle */}
        <p className="text-sm md:text-base text-rose-700/80 max-w-2xl leading-relaxed mb-10">
          Selamat datang di sebuah website yang isinya hampir sama banyaknya dengan rasa sayangku. Bedanya, rasa sayangku tidak punya batas penyimpanan.
        </p>

        {/* Polaroid falling container */}
        <motion.div
          initial={{ y: -300, rotate: -15, opacity: 0 }}
          animate={{ y: 0, rotate: -4, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 80, delay: 0.3 }}
          className="relative bg-white p-4 pb-12 rounded-2xl shadow-xl shadow-pink-200/30 border border-pink-50 max-w-[280px] md:max-w-[320px] mb-12 hover:rotate-2 hover:scale-105 transition duration-500 cursor-pointer"
        >
          {/* Polaroid Image Frame */}
          <div className="relative w-full aspect-square bg-rose-50 rounded-lg overflow-hidden">
            {/* Curated lovely portrait of Khanza with local fallback */}
            <img
              src={heroImg}
              alt="Khanza Aruna Zulvani"
              onError={() => {
                const fallback = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80";
                if (heroImg !== fallback) {
                  setHeroImg(fallback);
                }
              }}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Elegant overlay blur/light glow */}
            <div className="absolute inset-0 bg-radial-[circle_at_center,_var(--tw-gradient-stops)] from-transparent via-transparent to-pink-900/10 mix-blend-multiply"></div>
          </div>

          {/* Polaroid label text in handwriting look */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full text-center px-4 font-serif text-rose-700 font-bold italic tracking-wider text-sm md:text-base">
            Khanza Aruna Zulvani ❤
          </div>
        </motion.div>

        {/* Real-time Countdown Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full max-w-lg bg-white/70 backdrop-blur-sm px-6 py-5 rounded-3xl border border-pink-100/50 shadow-md shadow-pink-100/20 mb-12"
        >
          {birthdayState === 'before' && (
            <div>
              <p className="text-xs font-mono text-rose-500 uppercase tracking-widest mb-3">Menuju hari spesial Khanza</p>
              <div className="flex justify-center gap-4 md:gap-6">
                {[
                  { value: timeLeft.days, label: 'Hari' },
                  { value: timeLeft.hours, label: 'Jam' },
                  { value: timeLeft.minutes, label: 'Menit' },
                  { value: timeLeft.seconds, label: 'Detik' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="font-mono text-3xl md:text-4xl font-extrabold text-rose-800">{String(item.value).padStart(2, '0')}</span>
                    <span className="text-[10px] text-rose-400 uppercase font-semibold mt-1 tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {birthdayState === 'today' && (
            <div className="py-2 flex flex-col items-center text-center">
              <span className="text-2xl animate-bounce">🎉</span>
              <p className="text-base font-serif font-bold text-rose-800 mt-1">Hari ini harinya Khanza!</p>
              <p className="text-xs text-rose-500 mt-1">Selamat ulang tahun yang ke-18 kesayangan aku!</p>
            </div>
          )}

          {birthdayState === 'after' && (
            <div className="py-2 text-center">
              <p className="text-xs text-rose-500 uppercase font-mono tracking-wider">Perayaan Khanza masih berlanjut dan tempat kecil ini akan tetap ada.</p>
              <p className="text-sm font-serif font-bold text-rose-800 mt-1">I love you 3000, Sayangku (Dari Vicko Menul) ❤</p>
            </div>
          )}
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center"
        >
          <button
            onClick={onStartStory}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold rounded-2xl shadow-md shadow-pink-200 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <ArrowDown size={16} className="animate-bounce" />
            <span>Mulai dari Awal Cerita</span>
          </button>

          <button
            onClick={onGoToPhotos}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-pink-100 hover:bg-pink-50 text-rose-700 font-semibold rounded-2xl hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            <ImageIcon size={16} />
            <span>Langsung Lihat Foto</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
