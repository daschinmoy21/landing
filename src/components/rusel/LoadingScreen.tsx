import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_WORDS = ['MicroVMs', 'Containers', 'Nix Engine', 'Deterministic'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter animation 000 -> 100 over ~2700ms with fallback timer for headless/background
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('noload')) {
      onComplete();
      return;
    }

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 2700;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = Math.pow(progress, 0.85);
      const currentCount = Math.floor(easedProgress * 100);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    // Fallback timer for headless browsers
    const fallbackTimer = setTimeout(() => {
      setCount(100);
      setTimeout(() => {
        onComplete();
      }, 400);
    }, duration + 500);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  // Word cycling every 900ms
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden"
    >
      {/* Top Left Label */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-xs text-muted uppercase tracking-[0.3em] font-mono flex items-center gap-2"
      >
        <span className="w-2 h-2 rounded-full accent-gradient inline-block" />
        RUSSEL PLATFORM
      </motion.div>

      {/* Center Rotating Words */}
      <div className="flex-1 flex items-center justify-center my-auto">
        <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.span
              key={ROTATING_WORDS[wordIndex]}
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -25, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display italic text-text-primary/90 text-center tracking-tight"
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Counter & Progress Bar */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-end items-baseline">
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl sm:text-8xl md:text-9xl font-display text-text-primary tabular-nums tracking-tighter"
          >
            {String(count).padStart(3, '0')}
          </motion.span>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[3px] bg-stroke/50 relative overflow-hidden rounded-full">
          <div
            className="h-full accent-gradient transition-transform duration-75 ease-out rounded-full"
            style={{
              transform: `scaleX(${count / 100})`,
              transformOrigin: 'left',
              boxShadow: '0 0 12px rgba(137, 170, 204, 0.45)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
