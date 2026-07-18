import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, Award, CheckCircle2, RotateCcw, Heart, Smile } from 'lucide-react';
import { birthdayContent } from '../data/birthdayContent';

export default function MiniQuiz() {
  const questions = birthdayContent.quizQuestions;
  
  // Quiz states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent double-clicks
    setSelectedOption(index);

    if (index === questions[currentQuestionIdx].correctAnswer) {
      setUserScore((prev) => prev + 10);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setUserScore(0);
    setShowResult(false);
  };

  // Personalized score feedback
  const getScoreFeedback = (score: number) => {
    if (score === 100) {
      return "Skor sempurna. Kamu pasti Khanza.";
    } else if (score >= 80) {
      return "Luar biasa, Sayang! Memori kamu sangat kuat untuk setiap ingatan kecil kita.";
    } else if (score >= 50) {
      return "Wah, cukup bagus, Dedek! Tidak apa-apa, yang penting kita bisa bikin kenangan baru yang lebih seru lagi.";
    } else {
      return "Tenang ya Sayang, tidak ada jawaban yang salah di sini. Semua kenangan itu tetap tersimpan aman di hati aku.";
    }
  };

  return (
    <section id="quiz" className="py-24 bg-white relative overflow-hidden flex flex-col items-center">
      
      {/* Background radial overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-100/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto px-6 w-full relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Mini Game Seru</span>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-900 mt-1">Seberapa Khanza Kamu Hari Ini?</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-4 rounded-full"></div>
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestionIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-b from-white to-pink-50/20 border border-pink-100/60 p-6 md:p-8 rounded-[32px] shadow-lg shadow-pink-200/10"
            >
              {/* Progress counter */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-mono text-rose-400 uppercase tracking-widest">
                  Pertanyaan {currentQuestionIdx + 1} dari {questions.length}
                </span>
                <span className="text-xs text-rose-600 font-bold font-mono">Skor: {userScore}</span>
              </div>

              {/* Progress Bar indicator */}
              <div className="w-full bg-pink-100/50 h-1 rounded-full overflow-hidden mb-8">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-rose-400 h-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question Statement */}
              <h3 className="font-serif text-rose-900 font-bold text-lg md:text-xl leading-relaxed mb-6">
                {questions[currentQuestionIdx].question}
              </h3>

              {/* Multiple Options list */}
              <div className="space-y-3.5 mb-8">
                {questions[currentQuestionIdx].options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === questions[currentQuestionIdx].correctAnswer;
                  const isWrongSelected = isSelected && !isCorrect;

                  let optionStyle = "bg-white/60 hover:bg-pink-50/50 text-rose-900 border-pink-100/70 hover:border-pink-300";
                  if (selectedOption !== null) {
                    if (isCorrect) {
                      optionStyle = "bg-emerald-500/10 text-emerald-800 border-emerald-500 font-semibold";
                    } else if (isWrongSelected) {
                      optionStyle = "bg-rose-500/10 text-rose-800 border-rose-400";
                    } else {
                      optionStyle = "bg-slate-50/40 text-slate-400 border-slate-100 pointer-events-none";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(idx)}
                      className={`w-full text-left p-4 rounded-2xl border transition text-sm flex items-center justify-between cursor-pointer outline-none ${optionStyle}`}
                    >
                      <span>{option}</span>
                      {selectedOption !== null && isCorrect && (
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next trigger */}
              {selectedOption !== null && (
                <motion.button
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleNext}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm rounded-2xl shadow-md hover:scale-[1.01] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>{currentQuestionIdx === questions.length - 1 ? "Lihat Hasil Skor" : "Pertanyaan Selanjutnya"}</span>
                </motion.button>
              )}

            </motion.div>
          ) : (
            // SCORE SUMMARY BLOCK
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-pink-100 p-8 rounded-[40px] shadow-xl text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center text-rose-600 mb-6 relative">
                <Award size={40} />
                <span className="absolute -top-1 -right-1 text-yellow-500 animate-pulse text-lg">★</span>
              </div>

              <span className="px-3 py-1 bg-pink-100 text-rose-600 font-mono text-[10px] uppercase font-bold rounded-full tracking-wider">
                Evaluasi Hasil
              </span>

              <h3 className="font-serif text-4xl font-extrabold text-rose-900 mt-4">
                {userScore} <span className="text-lg text-rose-400">/ 100</span>
              </h3>

              <p className="font-serif italic text-rose-850 text-sm leading-relaxed mt-4 mb-8 max-w-sm">
                “{getScoreFeedback(userScore)}”
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                <button
                  onClick={resetQuiz}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-pink-50 hover:bg-pink-100 text-rose-700 font-semibold text-xs rounded-xl transition cursor-pointer"
                >
                  <RotateCcw size={14} />
                  <span>Coba Lagi</span>
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
