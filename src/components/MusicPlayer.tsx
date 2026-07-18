import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Music, ChevronUp, ChevronDown, Radio } from 'lucide-react';

interface MusicPlayerProps {
  playImmediately?: boolean;
}

export default function MusicPlayer({ playImmediately = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMini, setIsMini] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sweet background instrumental as out-of-the-box working placeholder
  const audioSource = "/semua-lagu-cinta.mp3"; 
  // Fallback royalty-free beautiful piano acoustic track if local asset is not uploaded yet
  const fallbackSource = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3";

  useEffect(() => {
    const audio = new Audio(audioSource);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Handle load and errors gracefully
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration || 180);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    // If local asset fails, try fallback on fatal errors
    audio.addEventListener('error', () => {
      const err = audio.error;
      console.log("Audio event error triggered:", err ? { code: err.code, message: err.message } : "No details");
      // Only trigger fallback if the error is a real fatal loading error (code 3 = DECODE, code 4 = SRC_NOT_SUPPORTED)
      if (err && (err.code === 3 || err.code === 4)) {
        if (audio.src.includes(audioSource)) {
          console.log("Using backup romantic instrumental track due to fatal audio error...");
          audio.src = fallbackSource;
          audio.load();
          if (isPlaying) {
            audio.play().catch(e => console.log("Playback blocked by browser:", e));
          }
        }
      }
    });

    // Detect scroll to toggle mini docking
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsMini(true);
      } else {
        setIsMini(false);
        setIsExpanded(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Initial triggers
    if (playImmediately) {
      setIsPlaying(true);
      audio.play().catch((err) => {
        console.log("Playback delayed until user interaction:", err);
        setIsPlaying(false);
      });
    }

    return () => {
      audio.pause();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync state
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div id="persistent-music-player" className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-40">
      <AnimatePresence mode="wait">
        {!isMini ? (
          // Standard full featured music player in Hero
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-80 bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-pink-100 shadow-xl shadow-pink-200/20"
          >
            <div className="flex items-center gap-4">
              {/* Spinning Vinyl Cover */}
              <div className="relative w-16 h-16 rounded-full flex-shrink-0 overflow-hidden bg-pink-100 border border-pink-200 shadow-inner flex items-center justify-center">
                <motion.div
                  animate={isPlaying ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
                  className="w-14 h-14 rounded-full bg-slate-950 border-2 border-pink-200 flex items-center justify-center relative shadow-md"
                >
                  <div className="w-4 h-4 rounded-full bg-pink-200 absolute z-10 border border-pink-300"></div>
                  {/* Vinyl grooves */}
                  <div className="w-10 h-10 rounded-full border border-slate-800/50 absolute"></div>
                  <div className="w-8 h-8 rounded-full border border-slate-800/40 absolute"></div>
                </motion.div>
                <div className="absolute top-1 right-1">
                  <span className="flex h-2 w-2 relative">
                    {isPlaying && (
                      <>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Title & Equalizer */}
              <div className="flex-1 min-w-0">
                <h4 className="font-serif text-rose-800 font-bold truncate text-sm">Semua Lagu Cinta</h4>
                <p className="text-rose-400 text-xs truncate">Sal Priadi</p>
                
                {/* Equalizer Waveform */}
                <div className="flex items-end gap-[3px] h-4 mt-2">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-[3px] bg-rose-400 rounded-full"
                      animate={isPlaying ? {
                        height: [4, [8, 16, 12, 6][i % 4], 4]
                      } : { height: 4 }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.8 + (i * 0.15),
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="mt-4">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full accent-pink-500 h-1 bg-pink-100 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-rose-400 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-3 pt-2 border-t border-pink-50/50">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-full hover:bg-pink-50 text-rose-600 transition"
                >
                  {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    setIsMuted(false);
                  }}
                  className="w-16 accent-pink-400 h-0.5 bg-pink-50 rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={togglePlay}
                className="p-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full shadow-md shadow-pink-200/50 hover:scale-105 active:scale-95 transition"
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>
            </div>
          </motion.div>
        ) : (
          // Collapsed / Docked Mini Player in corner
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-end"
          >
            {/* Expanded micro controls panel */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="bg-white/90 backdrop-blur-md p-3 rounded-2xl border border-pink-100 shadow-lg mb-2 w-48 text-center"
                >
                  <p className="text-[10px] font-mono text-rose-400 uppercase tracking-wider">Now Playing</p>
                  <h5 className="font-serif font-bold text-rose-800 text-xs truncate mt-0.5">Semua Lagu Cinta</h5>
                  <p className="text-[10px] text-rose-500 truncate mb-2">Sal Priadi</p>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-pink-50 h-1 rounded-full overflow-hidden mb-3">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-rose-400 h-full"
                      style={{ width: `${(currentTime / (duration || 100)) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="p-2 bg-pink-100 hover:bg-pink-200 text-pink-600 rounded-full transition"
                    >
                      {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-2 bg-pink-50 hover:bg-pink-100 text-pink-500 rounded-full transition"
                    >
                      {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Miniature Trigger Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group relative flex items-center gap-2 p-3 bg-gradient-to-r from-pink-400/95 to-rose-400/95 backdrop-blur text-white rounded-full shadow-lg shadow-pink-300/30 hover:scale-110 transition cursor-pointer"
            >
              {/* Spinning music icon */}
              <motion.div
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ repeat: Infinity, duration: 6, ease: 'linear' }}
              >
                <Music size={16} />
              </motion.div>

              {isPlaying && (
                <span className="flex gap-[2px] h-3 items-end">
                  <span className="w-[2px] bg-white h-2 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                  <span className="w-[2px] bg-white h-3 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  <span className="w-[2px] bg-white h-1.5 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></span>
                </span>
              )}

              {isExpanded ? <ChevronDown size={12} className="ml-0.5 opacity-70" /> : <ChevronUp size={12} className="ml-0.5 opacity-70" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
