import { motion } from 'motion/react';
import { Milestone } from '../types';
import { birthdayContent } from '../data/birthdayContent';
import { Sparkles, Heart, HeartHandshake, Eye, MapPin, Bike, Calendar, GraduationCap, Compass, HelpCircle } from 'lucide-react';

interface TimelineSectionProps {
  timelineData: Milestone[];
}

export default function TimelineSection({ timelineData }: TimelineSectionProps) {

  // Function to render custom thematic vector icons matching the milestone
  const renderMilestoneIcon = (type: string, isOfficial: boolean) => {
    const iconClass = isOfficial 
      ? "text-white w-6 h-6 animate-pulse" 
      : "text-rose-600 w-5 h-5";

    switch (type) {
      case 'meet':
        return <Compass className={iconClass} />;
      case 'crush':
        return <Eye className={iconClass} />;
      case 'amusement':
        // Custom Kora-kora/Fairground feel
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18M5 12h14M12 3l7 9-7 9-7-9z" />
          </svg>
        );
      case 'hts':
        return <HelpCircle className={iconClass} />;
      case 'break':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        );
      case 'reunite':
        return <HeartHandshake className={iconClass} />;
      case 'indomaret':
        return <Bike className={iconClass} />;
      case 'official':
        return <Heart className={iconClass} fill={isOfficial ? "white" : "currentColor"} />;
      case 'school':
        return <GraduationCap className={iconClass} />;
      case 'celebrate':
        return <Sparkles className={iconClass} />;
      default:
        return <Calendar className={iconClass} />;
    }
  };

  return (
    <section id="cerita-kita" className="py-24 bg-white relative overflow-hidden">
      
      {/* Decorative vector background clouds */}
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-rose-50 rounded-full blur-3xl pointer-events-none opacity-60"></div>

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Perjalanan Memori</span>
          <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-rose-900 mt-2">18 Tahun Khanza dan Cerita Kita</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Timeline body with progressive scroll guideline representation */}
        <div className="relative">
          
          {/* Central Guideline */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-pink-100 -translate-x-[1px]"></div>

          <div className="space-y-16">
            {timelineData.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const isOfficial = milestone.iconType === 'official';

              return (
                <div 
                  key={milestone.id} 
                  className={`flex flex-col md:flex-row relative items-start ${isEven ? 'md:flex-row-reverse' : ''}`}
                >
                  
                  {/* Outer circle line intersection dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-4 shadow-md ${
                        isOfficial 
                          ? 'bg-gradient-to-tr from-pink-500 to-rose-500 border-pink-200' 
                          : 'bg-white border-pink-100'
                      }`}
                    >
                      {renderMilestoneIcon(milestone.iconType, isOfficial)}
                    </motion.div>
                  </div>

                  {/* Content card block */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40, y: 15 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                      className={`p-6 rounded-3xl border transition shadow-sm ${
                        isOfficial 
                          ? 'bg-gradient-to-tr from-rose-50/90 via-pink-50/90 to-rose-100/90 border-pink-200/60 shadow-pink-200/10' 
                          : 'bg-gradient-to-b from-white to-pink-50/10 border-pink-100/70'
                      }`}
                    >
                      {/* Year Indicator */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-3 py-1 text-[11px] font-mono rounded-full font-bold uppercase tracking-wider ${
                          isOfficial 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-pink-100 text-rose-700'
                        }`}>
                          {milestone.year}
                        </span>
                        {isOfficial && (
                          <span className="flex items-center gap-0.5 text-xs text-rose-600 font-bold font-serif">
                            <span>Momen Terindah!</span>
                            <Heart size={12} fill="currentColor" />
                          </span>
                        )}
                      </div>

                      <h3 className="font-serif text-lg md:text-xl font-bold text-rose-900 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-rose-800/80 text-sm leading-relaxed whitespace-pre-line">
                        {milestone.description}
                      </p>

                      {/* Milestone image if uploaded */}
                      {milestone.image && (
                        <div className="mt-4 overflow-hidden rounded-2xl border border-pink-100/50 shadow-md shadow-pink-100/10 bg-rose-50/20">
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            onError={(e) => {
                              // Hide the image container if not uploaded yet
                              const container = e.currentTarget.parentElement;
                              if (container) container.style.display = 'none';
                            }}
                            referrerPolicy="no-referrer"
                            className="w-full max-h-72 object-cover hover:scale-105 transition duration-500 cursor-pointer"
                          />
                        </div>
                      )}

                      {/* Theme-based tiny contextual illustrations */}
                      {milestone.iconType === 'amusement' && (
                        <div className="mt-4 p-3 bg-pink-100/30 rounded-2xl flex items-center gap-3 border border-pink-100/20">
                          <span className="text-xl">🎡</span>
                          <span className="text-xs text-rose-700 italic">“Naik kora-kora bikin pusing, tapi malah bikin perasaan kita makin bening.”</span>
                        </div>
                      )}

                      {milestone.iconType === 'indomaret' && (
                        <div className="mt-4 p-3 bg-rose-50/40 rounded-2xl flex items-center gap-3 border border-rose-100/20">
                          <span className="text-xl">🏪</span>
                          <span className="text-xs text-rose-700 italic">“Bersepeda ke Pasar Minggu dan modus mampir ke Indomaret paling bersejarah.”</span>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Empty placeholder block for desktop layout symmetry */}
                  <div className="hidden md:block w-1/2"></div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
