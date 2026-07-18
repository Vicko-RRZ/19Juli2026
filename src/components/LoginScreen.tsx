import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, Lock, Unlock, Key, Glasses, AlertCircle } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (username: string) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginState, setLoginState] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Username dan Kunci Rahasia tidak boleh kosong, Sayang.');
      setLoginState('error');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setLoginState('idle');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON Response received:", text);
        setErrorMessage(`Terjadi masalah koneksi atau server error (HTTP ${response.status}).`);
        setLoginState('error');
        return;
      }

      if (response.ok && data.success) {
        setLoginState('success');
        setTimeout(() => {
          onLoginSuccess(data.username);
        }, 1500); // Wait for padlock and light sweep animation
      } else {
        setErrorMessage(data.message || 'Sepertinya kunci rahasianya belum cocok. Coba diingat lagi, Dedek.');
        setLoginState('error');
      }
    } catch (err: any) {
      console.error("Login fetch error:", err);
      setErrorMessage(`Gagal menghubungi server. Periksa koneksi atau pastikan server aktif (${err.message || 'Error'}).`);
      setLoginState('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="login-container" className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-100 to-rose-200 relative overflow-hidden px-4 py-8">
      
      {/* Floating Sparkles & Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/40 rounded-full flex items-center justify-center text-pink-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + Math.random() * 4,
              delay: Math.random() * 2,
            }}
          >
            ❤
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
          className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden"
        >
          {/* Decorative glowing backdrops */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>

          {/* Icon Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            {/* Swinging glasses & heart logo */}
            <motion.div
              animate={loginState === 'error' ? {
                x: [0, -12, 10, -8, 6, -4, 2, 0],
                rotate: [0, -3, 3, -2, 2, -1, 1, 0]
              } : loginState === 'success' ? {
                scale: [1, 1.2, 1.1],
                y: [0, -8, 0]
              } : {
                y: [0, -4, 0]
              }}
              transition={loginState === 'error' ? { duration: 0.5 } : { repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-20 h-20 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-300/40 mb-4"
            >
              {loginState === 'success' ? (
                <Unlock size={38} className="animate-pulse" />
              ) : (
                <div className="relative">
                  <Glasses size={38} />
                  <motion.span 
                    animate={{ scale: [1, 1.3, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-2 -right-2 text-rose-200 text-xs"
                  >
                    ❤
                  </motion.span>
                </div>
              )}
            </motion.div>

            <h2 className="font-serif text-3xl font-extrabold text-rose-800 tracking-tight">Pintu Rahasia Khanza</h2>
            <p className="text-xs text-rose-500/80 mt-2 max-w-[280px]">
              Hadiah ini hanya boleh dibuka oleh satu Dedek berkacamata paling ikonik.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative">
            {/* Username field */}
            <div>
              <label className="block text-xs font-semibold text-rose-700/80 mb-1.5 uppercase tracking-wider pl-1">Siapa Namamu, Sayang?</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-rose-400">
                  @
                </span>
                <input
                  type="text"
                  placeholder="Khanza"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading || loginState === 'success'}
                  className="w-full pl-9 pr-4 py-3 bg-white/60 focus:bg-white/90 border border-pink-100 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-2xl text-rose-900 placeholder-rose-300 transition text-sm outline-none"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label className="block text-xs font-semibold text-rose-700/80 mb-1.5 uppercase tracking-wider pl-1">Kunci Rahasia (Password)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-rose-400">
                  <Key size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Masukkan kunci..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || loginState === 'success'}
                  className="w-full pl-9 pr-10 py-3 bg-white/60 focus:bg-white/90 border border-pink-100 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 rounded-2xl text-rose-900 placeholder-rose-300 transition text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-rose-400 hover:text-rose-600 transition"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="p-3 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-2.5 text-rose-700 text-xs shadow-inner"
                >
                  <AlertCircle size={16} className="mt-0.5 text-rose-500 flex-shrink-0" />
                  <p className="leading-relaxed">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || loginState === 'success'}
              className="w-full relative py-3 px-4 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 disabled:from-pink-300 disabled:to-rose-300 text-white font-semibold text-sm rounded-2xl shadow-md shadow-pink-200 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center overflow-hidden"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Memeriksa Kunci...</span>
                </div>
              ) : loginState === 'success' ? (
                <span className="flex items-center gap-1">
                  Gerbang Terbuka! <Unlock size={14} className="ml-1 animate-bounce" />
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Buka Hadiahnya <Lock size={14} className="ml-0.5" />
                </span>
              )}
              {/* Highlight Sweep effect */}
              {loginState === 'success' && (
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                />
              )}
            </button>
          </form>
        </motion.div>

        {/* Footnote privacy notification */}
        <p className="text-center text-[10px] text-rose-700/60 mt-6 max-w-xs mx-auto leading-relaxed">
          Tempat kecil ini hanya untuk Khanza.<br />Tolong jangan dibagikan ke orang lain ya, Sayang.
        </p>
      </div>
    </div>
  );
}
