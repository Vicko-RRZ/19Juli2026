import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Plus } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';

export default function ReasonsSection({ isVicko = false }: { isVicko?: boolean }) {
  const reasons = birthdayContent.reasonsToLove;
  
  // Track flipped state for individual card IDs
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  // Custom user additions to reasons (stored in client-side state for fun interactives!)
  const [customReasons, setCustomReasons] = useState<string[]>([]);
  const [newReasonInput, setNewReasonInput] = useState("");
  const [showInput, setShowInput] = useState(false);

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReasonInput.trim()) return;
    setCustomReasons((prev) => [...prev, newReasonInput.trim()]);
    setNewReasonInput("");
    setShowInput(false);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Visual glowing elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-rose-50 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Alasan Terbesar</span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-rose-900 mt-1">Kenapa Aku Bersyukur Punya Kamu</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason) => {
            const isFlipped = flippedCards.includes(reason.id);

            return (
              <div
                key={reason.id}
                onClick={() => toggleFlip(reason.id)}
                className="w-full h-44 cursor-pointer perspective-1000 group"
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full h-full relative preserve-3d transition-shadow duration-300 rounded-3xl"
                >
                  
                  {/* FRONT SIDE (Plain beautiful typography & heart badge) */}
                  <div className="absolute inset-0 backface-hidden bg-gradient-to-b from-white to-pink-50/20 border border-pink-100 p-6 rounded-3xl flex flex-col justify-between shadow-sm group-hover:shadow-md transition">
                    <div className="flex justify-between items-start">
                      <span className="w-8 h-8 rounded-full bg-pink-100 text-rose-600 flex items-center justify-center font-bold text-xs">
                        {String(reason.id).padStart(2, '0')}
                      </span>
                      <Heart size={16} className="text-pink-300 group-hover:text-pink-500 group-hover:scale-110 transition" />
                    </div>
                    
                    <p className="font-serif text-rose-900 font-bold text-sm leading-relaxed pr-4">
                      {reason.text}
                    </p>
                    
                    <span className="text-[9px] font-mono uppercase tracking-widest text-rose-400 text-right">Ketuk untuk detail ❤</span>
                  </div>

                  {/* BACK SIDE (Highly romantic details / inside commentary!) */}
                  <div 
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-500 to-rose-400 text-white p-6 rounded-3xl flex flex-col justify-between shadow-md rotate-y-180"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-pink-100">Alasan Kita</span>
                      <Sparkles size={16} className="text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
                    </div>
                    
                    <p className="text-xs font-medium leading-relaxed italic text-white/95 text-center px-2">
                      “Ini hal tulus dari hati aku. Semoga kamu selalu ingat betapa berartinya kamu bagi aku ya, Dedek.”
                    </p>

                    <span className="text-[9px] font-mono uppercase tracking-widest text-pink-200 text-center">Ketuk untuk kembali</span>
                  </div>

                </motion.div>
              </div>
            );
          })}

          {/* User editable additions render block */}
          {customReasons.map((text, idx) => (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={idx}
              className="w-full h-44 bg-gradient-to-b from-rose-50 to-pink-50/50 border border-dashed border-pink-300 p-6 rounded-3xl flex flex-col justify-between shadow-inner"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-rose-500 font-bold">Alasan Tambahan</span>
                <Heart size={14} className="text-rose-500 animate-pulse" fill="currentColor" />
              </div>
              <p className="font-serif italic text-rose-800 font-semibold text-xs leading-relaxed text-center">
                “{text}”
              </p>
              <span className="text-[9px] font-mono text-rose-400 text-center uppercase tracking-wider">Dibuat khusus untuk Khanza</span>
            </motion.div>
          ))}

          {/* ADD REASON PLACEHOLDER / INTERACTIVE BUTTON */}
          {isVicko && (
            <div className="w-full h-44 border-2 border-dashed border-pink-200 hover:border-pink-400/50 rounded-3xl flex flex-col items-center justify-center p-6 transition-all duration-300">
              <AnimatePresence mode="wait">
                {!showInput ? (
                  <motion.button
                    key="trigger-add"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowInput(true)}
                    className="flex flex-col items-center text-rose-400 hover:text-rose-600 transition group cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-full bg-pink-50 text-rose-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition mb-2">
                      <Plus size={18} />
                    </div>
                    <span className="text-xs font-semibold tracking-wide">Tulis Alasan Lainnya</span>
                  </motion.button>
                ) : (
                  <motion.form
                    key="add-form"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onSubmit={handleAddReason}
                    className="w-full flex flex-col justify-between h-full"
                  >
                    <p className="text-[10px] font-mono text-rose-500 uppercase tracking-widest text-center">Tulis rasa syukurmu</p>
                    <textarea
                      placeholder="Contoh: Karena kamu selalu wangi Plossa..."
                      value={newReasonInput}
                      onChange={(e) => setNewReasonInput(e.target.value)}
                      className="w-full bg-white/80 p-2.5 rounded-xl border border-pink-100 focus:border-pink-400 text-xs text-rose-950 focus:outline-none resize-none h-16"
                    />
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        onClick={() => setShowInput(false)}
                        className="px-3 py-1 text-[10px] text-rose-400 uppercase font-bold"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1 bg-gradient-to-r from-pink-400 to-rose-400 text-white text-[10px] font-bold rounded-lg shadow-sm"
                      >
                        Simpan
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
