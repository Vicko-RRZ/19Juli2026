import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Printer, Smile, RefreshCw, Sparkles } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import confetti from 'canvas-confetti';

export default function SuratUtama() {
  const [isOpen, setIsOpen] = useState(false);
  const [hugCount, setHugCount] = useState(0);
  const [showHugMessage, setShowHugMessage] = useState(false);

  const handleVirtualHug = () => {
    setHugCount(prev => prev + 1);
    setShowHugMessage(true);

    // Sweet micro heart burst
    confetti({
      particleCount: 12,
      spread: 60,
      colors: ['#f43f5e', '#ec4899'],
      origin: { y: 0.8 }
    });

    setTimeout(() => {
      setShowHugMessage(false);
    }, 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="surat" className="py-24 bg-white relative overflow-hidden flex flex-col items-center print:py-0 print:bg-white">
      
      {/* Decorative stars / hearts in background */}
      <div className="absolute top-12 left-12 text-pink-200/50 text-4xl select-none pointer-events-none print:hidden">❀</div>
      <div className="absolute bottom-16 right-16 text-pink-200/50 text-4xl select-none pointer-events-none print:hidden">❀</div>

      <div className="max-w-3xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center mb-16 print:hidden">
          <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Puncak Cerita</span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-rose-900 mt-1">Surat Ulang Tahun Utama</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <AnimatePresence mode="wait">
          {!isOpen ? (
            // SEALED LETTER ENVELOPE (Flipped Closed)
            <motion.div
              key="sealed-envelope"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="w-full max-w-lg bg-gradient-to-tr from-pink-50 to-rose-100/40 border border-pink-200/80 p-8 rounded-[36px] shadow-lg shadow-pink-200/20 text-center cursor-pointer flex flex-col items-center group relative overflow-hidden print:hidden"
            >
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-pink-300/15 rounded-full blur-2xl pointer-events-none"></div>

              {/* Fake stamp decoration */}
              <div className="absolute top-4 right-4 w-12 h-14 border border-dashed border-rose-300 bg-white/60 flex flex-col items-center justify-center p-1 font-mono text-[6px] text-rose-400 rotate-3">
                <Heart size={14} className="text-rose-400 fill-current mb-0.5" />
                <span>SUMENEP</span>
                <span>19.07.26</span>
              </div>

              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-rose-500 mb-6 shadow-sm group-hover:scale-110 transition">
                <Mail size={28} />
              </div>

              <h3 className="font-serif text-xl font-bold text-rose-900">Sebuah Surat Cinta Spesial</h3>
              <p className="text-xs text-rose-500/80 mt-2 max-w-xs leading-relaxed">
                Ada surat terlipat rapi untuk Khanza kesayanganku di dalam amplop ini. Ketuk segel hati untuk membacanya ya, Sayang.
              </p>

              {/* Tactile Wax Seal Heart */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="mt-8 w-14 h-14 bg-gradient-to-br from-rose-600 to-pink-500 rounded-full flex items-center justify-center text-white shadow-md shadow-rose-900/30 border border-rose-400/30 relative z-10"
              >
                <Heart size={20} fill="currentColor" className="animate-pulse" />
              </motion.div>

              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 mt-4 font-bold">Buka Segel Cinta</span>
            </motion.div>
          ) : (
            // UNFLODED TEXTURED parchment Letter (Opened)
            <motion.div
              key="unfolded-letter"
              initial={{ scale: 0.98, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 30 }}
              className="w-full bg-[#fdfcf7] border border-[#e8dfc7] p-8 md:p-12 rounded-[40px] shadow-2xl relative text-left leading-relaxed text-slate-800 print:shadow-none print:border-none print:p-0 print:bg-white"
            >
              {/* Paper textured lines decoration */}
              <div className="absolute top-0 bottom-0 left-12 w-[1px] bg-red-100 opacity-45 print:hidden"></div>
              
              {/* Fake stamp decoration (re-drawn in open letter) */}
              <div className="absolute top-6 right-6 w-12 h-14 border border-dashed border-[#dcd1b3] bg-[#fcfbf7] flex flex-col items-center justify-center p-1 font-mono text-[6px] text-rose-800/60 rotate-6 print:hidden">
                <Heart size={14} className="text-rose-500/80 fill-current mb-0.5" />
                <span>SUMENEP</span>
                <span>19.07.26</span>
              </div>

              {/* Printable Area content */}
              <div className="pl-6 md:pl-10 font-serif text-[#3e341d] print:pl-0">
                
                {/* Header title print-only block */}
                <div className="hidden print:block text-center mb-8 border-b-2 border-dashed border-[#e8dfc7] pb-4">
                  <h1 className="text-2xl font-bold tracking-wider text-rose-800">KHANZA ARUNA ZULVANI - 18th BIRTHDAY KEEPSAKE</h1>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mt-1">Dibuat khusus dari pacarnya tercinta</p>
                </div>

                <div className="whitespace-pre-wrap leading-loose text-[15px] md:text-base space-y-4 font-serif">
                  {birthdayContent.mainLetter}
                </div>

                {/* Print signature */}
                <div className="mt-12 text-right">
                  <p className="italic text-rose-800 text-sm">Sayang kamu selamanya,</p>
                  <p className="font-bold text-lg text-rose-900 mt-2">Pacarmu Tercinta ❤</p>
                </div>

              </div>

              {/* Letter Bottom Utility Actions */}
              <div className="mt-12 pt-6 border-t border-[#e8dfc7]/60 flex flex-col sm:flex-row items-center gap-4 justify-between print:hidden">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                >
                  Tutup Surat
                </button>

                <div className="flex gap-3 w-full sm:w-auto justify-end">
                  {/* Print/Save Letter trigger */}
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 bg-pink-50 hover:bg-pink-100 text-rose-700 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    <Printer size={14} />
                    <span>Cetak / Simpan PDF</span>
                  </button>

                  {/* Hug trigger */}
                  <button
                    onClick={handleVirtualHug}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-xl shadow-sm hover:scale-105 active:scale-95 transition cursor-pointer"
                  >
                    <Heart size={14} fill="currentColor" className="animate-pulse" />
                    <span>Peluk Aku Virtual</span>
                  </button>
                </div>
              </div>

              {/* Visual hug counter output */}
              <AnimatePresence>
                {showHugMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="absolute bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-slate-900 text-white rounded-2xl flex items-center gap-2 text-xs shadow-xl font-medium border border-slate-800"
                  >
                    <Smile size={16} className="text-pink-300" />
                    <span>Pelukan berhasil dikirim. Aku menerimanya dengan senang hati ({hugCount})</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
