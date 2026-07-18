import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Glasses, Bike, ShoppingBag, Zap, Key, Music, Heart, X } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';
import { BagItem } from '../types';

export default function InteractiveBag() {
  const items = birthdayContent.bagItems;
  const [selectedItem, setSelectedItem] = useState<BagItem | null>(null);

  // Maps custom Lucide icon strings to interactive React nodes
  const renderItemIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Glasses':
        return <Glasses className={className} />;
      case 'Bike':
        return <Bike className={className} />;
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Key':
        return <Key className={className} />;
      case 'Music':
        return <Music className={className} />;
      default:
        return <Heart className={className} />;
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-rose-50/20 via-white to-pink-50/10 relative">
      <div className="max-w-5xl mx-auto px-6 w-full text-center">
        
        {/* Header Block */}
        <div className="mb-16">
          <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Eksplorasi Tas Pink</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-900 mt-1">Mengintip Isi Tas Khanza</h2>
          <p className="text-rose-700/80 text-sm max-w-xl mx-auto mt-3">
            Tumpukan barang-barang wajib yang selalu ikut bertualang bareng Khanza. Setiap benda punya cerita rahasia tersendiri lho! Coba ketuk salah satu barangnya ya.
          </p>
        </div>

        {/* Scattered interactive flat-lay desk container */}
        <div className="bg-gradient-to-tr from-pink-50/50 via-white to-rose-50/50 rounded-[40px] border border-pink-100 p-8 md:p-12 shadow-xl shadow-pink-100/10 relative overflow-hidden min-h-[400px] flex items-center justify-center">
          
          <div className="absolute inset-0 bg-[radial-gradient(#fbcfe8_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl relative z-10">
            {items.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05, rotate: item.id === 'glasses' ? -3 : 3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedItem(item)}
                className={`flex flex-col items-center p-6 bg-gradient-to-b ${item.color} rounded-3xl shadow-md cursor-pointer border border-white/40`}
              >
                {/* Custom glowing bag item circle */}
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-rose-600 shadow-sm mb-4 relative">
                  {renderItemIcon(item.icon, "w-8 h-8")}
                  {item.id === 'glasses' && (
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-pink-500 text-[8px] text-white font-extrabold animate-bounce">
                      ★
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-rose-900 text-sm">{item.name}</h3>
                <p className="text-[10px] text-rose-700/70 mt-1">{item.description}</p>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Detailed Spotlight Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              {/* Tap backdrop to close */}
              <div className="absolute inset-0" onClick={() => setSelectedItem(null)} />

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white border border-pink-100 p-8 rounded-[32px] max-w-md w-full text-center relative z-10 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 p-2 bg-pink-50 hover:bg-pink-100 text-rose-500 rounded-full transition cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white mb-6 shadow-lg shadow-pink-300/40">
                  {renderItemIcon(selectedItem.icon, "w-10 h-10")}
                </div>

                <span className="px-3 py-1 bg-pink-100 text-rose-600 font-mono text-[10px] uppercase font-bold rounded-full tracking-wider">
                  Rahasia {selectedItem.name}
                </span>

                <h3 className="font-serif text-xl font-extrabold text-rose-900 mt-4 mb-4">{selectedItem.name}</h3>
                
                <p className="font-serif italic text-base text-rose-850 leading-relaxed bg-pink-50/50 p-4 rounded-2xl border border-pink-100/30">
                  “{selectedItem.detail}”
                </p>

                <div className="mt-6 flex items-center justify-center gap-1.5 text-[10px] text-rose-400 font-mono uppercase tracking-wider">
                  <span>I Love You 3000, Sayangku</span>
                  <Heart size={10} fill="currentColor" className="text-rose-500 animate-pulse" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
