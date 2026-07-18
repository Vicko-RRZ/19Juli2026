import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquareHeart, Glasses, Heart } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';

export default function RandomMessages() {
  const messages = birthdayContent.randomMessages;
  
  // Track state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [flyDirection] = useState<'left' | 'right' | 'up' | 'down'>('right');

  const handleNextMessage = () => {
    const nextIdx = (currentIdx + 1) % messages.length;

    let nextHistory = [...history];
    if (!nextHistory.includes(nextIdx)) {
      nextHistory.push(nextIdx);
    } else if (nextIdx === 0) {
      nextHistory = [0];
    }

    setCurrentIdx(nextIdx);
    setHistory(nextHistory);
  };

  // Maps slide direction into motion coordinates
  const getExitValue = () => {
    switch (flyDirection) {
      case 'left': return { x: -300, opacity: 0 };
      case 'right': return { x: 300, opacity: 0 };
      case 'up': return { y: -300, opacity: 0 };
      case 'down': return { y: 300, opacity: 0 };
    }
  };

  const getEnterValue = () => {
    switch (flyDirection) {
      case 'left': return { x: 300, opacity: 0 };
      case 'right': return { x: -300, opacity: 0 };
      case 'up': return { y: 300, opacity: 0 };
      case 'down': return { y: -300, opacity: 0 };
    }
  };

  return (
    <section id="pesan" className="py-24 bg-rose-50/20 relative overflow-hidden flex flex-col items-center">
      
      {/* Decorative stars */}
      <div className="absolute top-1/3 left-10 text-pink-300/40 animate-bounce text-2xl">✨</div>
      <div className="absolute bottom-1/3 right-10 text-pink-300/40 animate-pulse text-2xl">✨</div>

      <div className="max-w-4xl mx-auto px-6 w-full flex flex-col items-center">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Pesan Kecil Romantis</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-900 mt-1">Pesan Random dari Vicko yang Menul</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Swipe Card Container */}
        <div className="w-full max-w-lg relative h-72 mb-10 flex items-center justify-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={getEnterValue()}
              animate={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              exit={getExitValue()}
              transition={{ type: 'spring', damping: 20, stiffness: 120 }}
              className="absolute inset-0 bg-white border border-pink-100 p-8 rounded-3xl shadow-xl shadow-pink-200/20 flex flex-col justify-between items-center text-center"
            >
              {/* Graphic Motif */}
              <div className="text-pink-400 flex items-center gap-3">
                <Glasses size={20} className="animate-pulse" />
                <span className="text-rose-200 text-sm">❤</span>
                <MessageSquareHeart size={20} className="animate-bounce" />
              </div>

              {/* Message body */}
              <p className="font-serif italic text-base md:text-lg text-rose-900 leading-relaxed px-2">
                “{messages[currentIdx].text}”
              </p>

              {/* Progress Tracker dots */}
              <div className="flex gap-1.5 justify-center">
                {messages.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIdx 
                        ? 'w-4 bg-rose-500' 
                        : history.includes(i) 
                          ? 'w-1.5 bg-pink-300' 
                          : 'w-1.5 bg-pink-100'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

        {/* Trigger Button */}
        <button
          onClick={handleNextMessage}
          className="px-8 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm rounded-2xl shadow-md shadow-pink-300/30 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
        >
          <Sparkles size={16} />
          <span>Kasih Aku Pesan Lagi</span>
        </button>

      </div>
    </section>
  );
}
