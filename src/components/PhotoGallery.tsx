import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Photo } from '../types';
import { photos } from '../data/photos';
import { Maximize2, X, ChevronLeft, ChevronRight, Shuffle, Heart, Eye } from 'lucide-react';

export default function PhotoGallery() {
  const [visibleCount, setVisibleCount] = useState(12);
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['photo_001', 'photo_008', 'photo_025']); // Pre-marked favorites

  // Get active photo index in the entire list of 100 photos
  const activeIndex = activePhoto ? photos.findIndex(p => p.id === activePhoto.id) : -1;

  // Key handlers for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activePhoto) return;
      if (e.key === 'Escape') setActivePhoto(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhoto, activeIndex]);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 12, photos.length));
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActivePhoto(photos[activeIndex - 1]);
    } else {
      setActivePhoto(photos[photos.length - 1]); // Loop to end
    }
  };

  const handleNext = () => {
    if (activeIndex < photos.length - 1) {
      setActivePhoto(photos[activeIndex + 1]);
    } else {
      setActivePhoto(photos[0]); // Loop to start
    }
  };

  const selectRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * photos.length);
    setActivePhoto(photos[randomIndex]);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening lightbox
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <section id="galeri" className="py-24 bg-gradient-to-b from-rose-50/10 via-white to-pink-50/20 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <span className="text-xs font-mono text-rose-500 uppercase tracking-widest pl-1">Galeri Hubungan</span>
            <h2 className="font-serif text-3xl md:text-5xl font-extrabold text-rose-900 mt-1">
              Setiap Foto Punya Cerita<br className="hidden sm:inline" /> untuk Kisah Kita
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-rose-400 mt-4 rounded-full md:mx-0 mx-auto"></div>
          </div>

          {/* Random memory trigger */}
          <button
            onClick={selectRandomPhoto}
            className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white font-semibold text-sm rounded-2xl shadow-md hover:shadow-pink-300/30 active:scale-95 transition cursor-pointer"
          >
            <Shuffle size={16} />
            <span>Pilih Ingatan Acak</span>
          </button>
        </div>

        {/* Masonry Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {photos.slice(0, visibleCount).map((photo) => {
            const isFav = favorites.includes(photo.id);

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => setActivePhoto(photo)}
                className="break-inside-avoid relative bg-white p-3 rounded-2xl border border-pink-100/50 shadow-md shadow-pink-100/10 cursor-pointer group hover:scale-[1.03] transition-all duration-300"
              >
                {/* Polaroid Frame Visual */}
                <div className="relative rounded-lg overflow-hidden bg-rose-50/20 aspect-[3/4]">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    onError={(e) => {
                      const currentSrc = e.currentTarget.src;
                      if (photo.src.startsWith('/photos/') && !currentSrc.includes('/assets/photos/')) {
                        e.currentTarget.src = photo.src.replace('/photos/', '/assets/photos/');
                      } else if (photo.src.startsWith('/assets/photos/') && !currentSrc.includes('/photos/')) {
                        e.currentTarget.src = photo.src.replace('/assets/photos/', '/photos/');
                      } else if (photo.fallbackSrc && e.currentTarget.src !== photo.fallbackSrc) {
                        e.currentTarget.src = photo.fallbackSrc;
                      }
                    }}
                    loading="lazy"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {/* Glass shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Hover visual quick actions */}
                  <div className="absolute inset-0 bg-rose-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <div className="p-2.5 bg-white/90 backdrop-blur rounded-full text-rose-600 shadow-md">
                      <Maximize2 size={16} />
                    </div>
                  </div>

                  {/* Favorite marker in corner */}
                  <button
                    onClick={(e) => toggleFavorite(photo.id, e)}
                    className={`absolute top-3 right-3 p-2 rounded-full border backdrop-blur transition-all duration-300 ${
                      isFav 
                        ? 'bg-rose-500/95 text-white border-rose-400 shadow-sm' 
                        : 'bg-white/70 hover:bg-white text-rose-400 border-white/20'
                    }`}
                  >
                    <Heart size={14} fill={isFav ? "white" : "transparent"} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Trigger Button */}
        {visibleCount < photos.length && (
          <div className="text-center mt-16">
            <button
              onClick={loadMore}
              className="px-8 py-3.5 bg-white border border-pink-100 hover:bg-pink-50 text-rose-700 font-bold text-sm rounded-2xl shadow-sm hover:shadow-pink-100/50 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              Tampilkan Foto Lain
            </button>
            <p className="text-[10px] text-rose-400/80 mt-2 font-mono uppercase tracking-wider">
              Menampilkan {visibleCount} dari {photos.length} Kenangan Kita
            </p>
          </div>
        )}

      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Close touch zones */}
            <div className="absolute inset-0" onClick={() => setActivePhoto(null)} />

            {/* Top Bar Controls */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-white">
              <span className="font-mono text-xs text-pink-300/80 uppercase tracking-widest">
                Ingatan {activePhoto.id.replace('photo_', '#')} / {photos.length}
              </span>
              
              <div className="flex gap-4">
                <button
                  onClick={(e) => toggleFavorite(activePhoto.id, e)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition"
                >
                  <Heart size={18} fill={favorites.includes(activePhoto.id) ? "white" : "transparent"} />
                </button>
                <button
                  onClick={() => setActivePhoto(null)}
                  className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Slider Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 md:left-8 p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition z-10 cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-4 md:right-8 p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition z-10 cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content Display */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-3xl w-full max-h-[80vh] flex flex-col items-center justify-center z-10 pointer-events-none"
            >
              <img
                src={activePhoto.src}
                alt={activePhoto.alt}
                onError={(e) => {
                  const currentSrc = e.currentTarget.src;
                  if (activePhoto.src.startsWith('/photos/') && !currentSrc.includes('/assets/photos/')) {
                    e.currentTarget.src = activePhoto.src.replace('/photos/', '/assets/photos/');
                  } else if (activePhoto.src.startsWith('/assets/photos/') && !currentSrc.includes('/photos/')) {
                    e.currentTarget.src = activePhoto.src.replace('/assets/photos/', '/photos/');
                  } else if (activePhoto.fallbackSrc && e.currentTarget.src !== activePhoto.fallbackSrc) {
                    e.currentTarget.src = activePhoto.fallbackSrc;
                  }
                }}
                className="max-w-full max-h-[65vh] object-contain rounded-2xl shadow-2xl pointer-events-auto select-none"
              />
              
              {/* Image Description Block */}
              <div className="text-center text-white mt-6 max-w-xl pointer-events-auto px-4">
                <h3 className="text-lg font-serif font-bold text-pink-100">{activePhoto.alt}</h3>
                <p className="text-sm text-slate-300 mt-2 italic">"{activePhoto.caption}"</p>
                <p className="text-[10px] text-pink-300/60 uppercase font-mono tracking-widest mt-4">
                  Terima kasih sudah mengukir memori ini bersama aku ❤
                </p>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
