import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Envelope } from '../types';
import { birthdayContent } from '../data/birthdayContent';
import { Sparkles, GraduationCap, HeartHandshake, ShieldCheck, Laugh, Calendar, X, MailOpen } from 'lucide-react';

export default function AmplopDigital() {
  const envelopes = birthdayContent.envelopes;
  const [activeEnvelope, setActiveEnvelope] = useState<Envelope | null>(null);

  // Maps theme icon strings to React nodes
  const renderIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Laugh':
        return <Laugh className={className} />;
      case 'Calendar':
        return <Calendar className={className} />;
      default:
        return <MailOpen className={className} />;
    }
  };

  return (
    <section className="py-24 bg-rose-50/20 relative overflow-hidden flex flex-col items-center">
      
      {/* Decorative vectors */}
      <div className="absolute top-10 left-12 w-20 h-20 bg-pink-100 rounded-full blur-xl pointer-events-none opacity-55"></div>

      <div className="max-w-6xl mx-auto px-6 w-full text-center">
        
        {/* Header block */}
        <div className="mb-16">
          <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Amplop Rahasia</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-900 mt-1">Amplop Harapan Digital</h2>
          <p className="text-rose-700/80 text-sm max-w-xl mx-auto mt-3">
            Di bawah ini ada enam amplop merah muda istimewa berisi doa tulus, harapan masa depan, komitmen kesetiaanku, dan pesan kocak untukmu. Silakan sentuh salah satu amplop untuk membukanya ya.
          </p>
        </div>

        {/* 3D Envelopes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {envelopes.map((env) => (
            <motion.div
              key={env.id}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveEnvelope(env)}
              className="flex flex-col items-center bg-white border border-pink-100 p-6 rounded-3xl shadow-md hover:shadow-xl shadow-pink-200/10 cursor-pointer relative overflow-hidden group transition"
            >
              {/* Closed Envelope tactile drawing */}
              <div className="relative w-full h-32 bg-rose-50/50 rounded-2xl border border-pink-100/40 flex items-center justify-center mb-4 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1/2 bg-pink-100/40 rounded-b-3xl"></div>
                {/* Triangular fold lines */}
                <svg className="absolute inset-0 w-full h-full text-pink-200/30" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 0 L50 65 L100 0" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M0 100 L50 65 L100 100" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>

                {/* Theme icon floating in center */}
                <div className="w-12 h-12 rounded-full bg-white text-rose-500 flex items-center justify-center shadow-md relative z-10 group-hover:scale-110 transition duration-300">
                  {renderIcon(env.icon, "w-6 h-6")}
                </div>
              </div>

              <h3 className="font-serif font-bold text-rose-900 text-sm">{env.title}</h3>
              <p className="text-[10px] text-rose-400 font-mono mt-1 uppercase tracking-wider">Ketuk untuk Membaca✉</p>
            </motion.div>
          ))}
        </div>

        {/* Letter opening slide-out sheet */}
        <AnimatePresence>
          {activeEnvelope && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              {/* Close tap-area */}
              <div className="absolute inset-0" onClick={() => setActiveEnvelope(null)} />

              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="bg-white border border-pink-100 p-8 rounded-[36px] max-w-md w-full relative z-10 shadow-2xl overflow-hidden"
              >
                {/* Visual paper lines */}
                <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-pink-100/30"></div>

                <button
                  onClick={() => setActiveEnvelope(null)}
                  className="absolute top-4 right-4 p-2 bg-pink-50 hover:bg-pink-100 text-rose-500 rounded-full transition cursor-pointer"
                >
                  <X size={16} />
                </button>

                <div className="mx-auto w-14 h-14 rounded-full bg-pink-100 text-rose-600 flex items-center justify-center mb-6 shadow-inner">
                  {renderIcon(activeEnvelope.icon, "w-6 h-6")}
                </div>

                <h3 className="font-serif text-xl font-extrabold text-rose-950 text-center mb-4">
                  {activeEnvelope.title}
                </h3>

                <p className="font-serif text-rose-850 text-base leading-loose text-left pl-6 pr-2 whitespace-pre-wrap">
                  {activeEnvelope.content}
                </p>

                <div className="mt-8 flex items-center justify-center gap-1.5 text-[10px] text-rose-400 font-mono uppercase tracking-wider border-t border-pink-50 pt-4">
                  <span>Dari Vicko yang menul, spesial untuk kamu ❤</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
