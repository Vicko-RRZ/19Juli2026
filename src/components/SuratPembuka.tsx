import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, FastForward } from 'lucide-react';

interface SuratPembukaProps {
  onComplete: () => void;
}

export default function SuratPembuka({ onComplete }: SuratPembukaProps) {
  const fullText = "Untuk Khanza, Dedek kesayanganku, pemilik tawa paling lepas, sifat paling menenangkan, dan kacamata paling ikonik di dunia. Hari ini kamu berusia 18 tahun. Jadi, aku membuat sebuah tempat kecil yang berisi cerita kita, foto-foto kita, dan berbagai bukti bahwa aku sangat bersyukur pernah dipertemukan denganmu.";

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 35); // Speedy enough, yet comfortable
      return () => clearTimeout(timeout);
    } else {
      setIsFinished(true);
    }
  }, [index]);

  const handleSkip = () => {
    setDisplayedText(fullText);
    setIndex(fullText.length);
    setIsFinished(true);
  };

  return (
    <section className="bg-gradient-to-b from-white to-pink-50/30 py-24 px-6 relative overflow-hidden flex flex-col items-center">
      
      {/* Decorative floral or heart vectors in soft styling */}
      <div className="absolute top-10 left-10 text-pink-200/50 text-4xl select-none pointer-events-none">❀</div>
      <div className="absolute bottom-12 right-12 text-pink-200/50 text-4xl select-none pointer-events-none">❀</div>

      <div className="w-full max-w-2xl bg-white/70 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-pink-100 shadow-md relative">
        {/* Soft background line textures representing writing paper */}
        <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-100 opacity-60"></div>

        <div className="relative pl-6 md:pl-10">
          
          <h3 className="font-serif text-rose-800 font-bold text-xl md:text-2xl mb-6 flex items-center gap-2">
            <span>Surat Pembuka Untuk Khanza</span>
            <span className="text-rose-400">✉</span>
          </h3>

          <div className="font-serif text-rose-900 text-base md:text-lg leading-loose min-h-[160px] whitespace-pre-wrap">
            {displayedText}
            {!isFinished && (
              <span className="inline-block w-[3px] h-[18px] bg-pink-500 ml-1 animate-pulse" />
            )}
          </div>

          {/* Action buttons with high-contrast text */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-pink-100">
            {!isFinished ? (
              <button
                onClick={handleSkip}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-pink-50 hover:bg-pink-100 text-rose-700 text-xs font-semibold rounded-full transition cursor-pointer"
              >
                <FastForward size={14} />
                <span>Tampilkan Langsung</span>
              </button>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={onComplete}
                className="w-full sm:w-auto flex items-center justify-center gap-1 px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm rounded-2xl shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <span>Lanjutkan Perjalanan</span>
                <ChevronRight size={16} />
              </motion.button>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
