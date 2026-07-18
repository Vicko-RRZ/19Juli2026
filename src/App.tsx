import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Glasses, Heart, AlertTriangle } from 'lucide-react';

// Components
import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import LoginScreen from './components/LoginScreen';
import GiftIntro from './components/GiftIntro';
import CountdownScreen from './components/CountdownScreen';
import FloatingNav from './components/FloatingNav';
import HeroSection from './components/HeroSection';
import SuratPembuka from './components/SuratPembuka';
import TimelineSection from './components/TimelineSection';
import PhotoGallery from './components/PhotoGallery';
import RandomMessages from './components/RandomMessages';
import ReasonsSection from './components/ReasonsSection';
import InteractiveBag from './components/InteractiveBag';
import MiniQuiz from './components/MiniQuiz';
import AmplopDigital from './components/AmplopDigital';
import SuratUtama from './components/SuratUtama';
import FinalSurprise from './components/FinalSurprise';

// Easter Eggs
import { EasterEggSystem, HiddenGlassesIcon } from './components/EasterEggGlasses';

// Data
import { birthdayContent } from './data/birthdayContent';

export default function App() {
  const [authState, setAuthState] = useState<'loading' | 'unauthenticated' | 'authenticated'>('loading');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  
  const releaseDate = new Date('2026-07-19T00:00:00+07:00').getTime();
  const [isBeforeRelease, setIsBeforeRelease] = useState(() => Date.now() < releaseDate);
  
  const [giftState, setGiftState] = useState<'closed' | 'open'>('closed');
  const [playMusic, setPlayMusic] = useState(false);
  const [activeSection, setActiveSection] = useState('awal');
  const [foundGlassesIds, setFoundGlassesIds] = useState<number[]>([]);
  const [isError, setIsError] = useState(false);

  // Dynamic monitoring of release time
  useEffect(() => {
    if (!isBeforeRelease) return;
    const interval = setInterval(() => {
      if (Date.now() >= releaseDate) {
        setIsBeforeRelease(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isBeforeRelease, releaseDate]);

  // Scroll target shortcuts
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Check auth session on boot
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/check-auth');
        const data = await res.json();
        if (res.ok && data.authenticated) {
          setAuthState('authenticated');
          setCurrentUser(data.username);
          
          // Load existing gift status if previously opened in current browser session
          const previouslyOpened = sessionStorage.getItem('khanza_gift_opened') === 'true';
          if (previouslyOpened) {
            setGiftState('open');
          }
        } else {
          setAuthState('unauthenticated');
        }
      } catch (e) {
        console.error("Auth check failed:", e);
        // Fallback for offline or local preview sandbox convenience
        setAuthState('unauthenticated');
      }
    };

    checkAuth();
  }, []);

  // Monitor scroll positioning to update FloatingNav highlights dynamically
  useEffect(() => {
    if (authState !== 'authenticated' || giftState !== 'open') return;

    const sections = ['awal', 'cerita-kita', 'galeri', 'pesan', 'quiz', 'surat', 'kejutan'];
    
    const handleScrollUpdate = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollUpdate);
    return () => window.removeEventListener('scroll', handleScrollUpdate);
  }, [authState, giftState]);

  // Auth triggers
  const handleLoginSuccess = (username: string) => {
    setAuthState('authenticated');
    setCurrentUser(username);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    sessionStorage.removeItem('khanza_gift_opened');
    setAuthState('unauthenticated');
    setCurrentUser(null);
    setGiftState('closed');
    setPlayMusic(false);
  };

  const handleGiftOpened = (musicSetting: boolean) => {
    setGiftState('open');
    setPlayMusic(musicSetting);
    sessionStorage.setItem('khanza_gift_opened', 'true');
  };

  const handleFindGlasses = (id: number) => {
    if (!foundGlassesIds.includes(id)) {
      setFoundGlassesIds((prev) => [...prev, id]);
    }
  };

  // 1. Loading State Screen
  if (authState === 'loading') {
    return (
      <div className="fixed inset-0 z-50 bg-rose-50 flex flex-col items-center justify-center text-center px-4 select-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-pink-200"
        >
          <Glasses size={40} className="text-white" />
        </motion.div>
        <h3 className="font-serif text-xl font-bold text-rose-800 mt-6 animate-pulse">
          Sedang menyiapkan hadiah untuk Dedek...
        </h3>
        <p className="text-xs text-rose-500 mt-2 font-mono uppercase tracking-wider">Silakan tunggu sebentar ya Sayang</p>
      </div>
    );
  }

  // 2. Unauthenticated Login Screen
  if (authState === 'unauthenticated') {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  // 2.5 Countdown screen if logged in as Khanza before July 19, 2026
  const isVicko = currentUser && currentUser.trim().toLowerCase() === 'vicko';
  if (isBeforeRelease && !isVicko) {
    return <CountdownScreen onLogout={handleLogout} />;
  }

  // 3. Authenticated but Gift is Boxed
  if (giftState === 'closed') {
    return <GiftIntro onComplete={handleGiftOpened} />;
  }

  // 4. Fully Authenticated & Unlocked Experience
  return (
    <div className="relative min-h-screen bg-white text-slate-800 select-none antialiased">
      
      {/* Custom trail cursor for desktop */}
      <CustomCursor />

      {/* Floating Header / Mobile Bottom Navigation */}
      <FloatingNav onLogout={handleLogout} activeSection={activeSection} />

      {/* Persistent Audio player */}
      <MusicPlayer playImmediately={playMusic} />

      {/* Global Easter Egg discovery system and prizes */}
      <EasterEggSystem foundIds={foundGlassesIds} onFind={handleFindGlasses} />

      {/* MAIN SECTIONS STORYTELLING CHUNKS */}
      
      {/* SECTION 1: HERO CONTAINER */}
      <div className="relative">
        <HeroSection 
          onStartStory={() => scrollTo('cerita-kita')} 
          onGoToPhotos={() => scrollTo('galeri')} 
        />
        {/* Hidden Glasses 1: Hidden near Hero name badge */}
        <HiddenGlassesIcon id={1} foundIds={foundGlassesIds} onFind={handleFindGlasses} className="top-24 right-1/4" />
      </div>

      {/* SECTION 2: TYPEWRITER OPENING LETTER */}
      <SuratPembuka onComplete={() => scrollTo('cerita-kita')} />

      {/* SECTION 3: MILESTONE TIMELINE */}
      <div className="relative">
        <TimelineSection timelineData={birthdayContent.timeline} />
        {/* Hidden Glasses 2: Moved from deleted section */}
        <HiddenGlassesIcon id={2} foundIds={foundGlassesIds} onFind={handleFindGlasses} className="bottom-12 left-1/3" />
      </div>

      {/* SECTION 6: HIGH-FIDELITY MASONRY GALLERY (100 PHOTOS) */}
      <div className="relative">
        <PhotoGallery />
        {/* Hidden Glasses 3: Moved from deleted section */}
        <HiddenGlassesIcon id={3} foundIds={foundGlassesIds} onFind={handleFindGlasses} className="top-24 right-10" />
      </div>

      {/* SECTION 7: INTERACTIVE MESSAGES SWIPER CARDS */}
      <RandomMessages />

      {/* SECTION 8: 12 REASONS 3D FLIP CARDS */}
      <ReasonsSection isVicko={isVicko} />

      {/* SECTION 9: INTERACTIVE BACKPACK flatlay */}
      <div className="relative">
        <InteractiveBag />
        {/* Hidden Glasses 4: Hidden near the spilled bag background */}
        <HiddenGlassesIcon id={4} foundIds={foundGlassesIds} onFind={handleFindGlasses} className="top-1/4 left-1/4" />
      </div>

      {/* SECTION 10: MEMORY TRIVIA QUIZ */}
      <MiniQuiz />

      {/* SECTION 11: 6 ENVELOPES HARAPAN */}
      <AmplopDigital />

      {/* SECTION 12: MAIN BIRTHDAY ENVELOPE SEALS */}
      <div className="relative">
        <SuratUtama />
        {/* Hidden Glasses 5: Hidden next to Stamp in letters */}
        <HiddenGlassesIcon id={5} foundIds={foundGlassesIds} onFind={handleFindGlasses} className="top-28 right-12" />
      </div>

      {/* SECTION 13: GRAND FINALE SURPRISE CONTAINER */}
      <FinalSurprise 
        onScrollToTop={() => scrollTo('awal')}
        onScrollToGallery={() => scrollTo('galeri')}
        onScrollToLetter={() => scrollTo('surat')}
        onLogout={handleLogout}
      />

    </div>
  );
}
export { App };
