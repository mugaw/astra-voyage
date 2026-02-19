'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';

export function EasterEgg() {
  const { showEasterEgg, resetStarClick } = useStore();

  const handleClose = useCallback(() => {
    resetStarClick();
  }, [resetStarClick]);

  // Auto-hide after 5 seconds
  useEffect(() => {
    if (showEasterEgg) {
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showEasterEgg, handleClose]);

  return (
    <AnimatePresence>
      {showEasterEgg && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="glass-dark p-8 rounded-2xl text-center max-w-md mx-4"
            initial={{ scale: 0.5, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 50 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              🌟
            </motion.div>
            <h3 className="text-2xl font-bold gradient-text mb-2">
              Secret Discovery!
            </h3>
            <p className="text-white/70">
              You&apos;ve discovered the cosmic secret! As a reward, here&apos;s a 
              <span className="text-cyan-400 font-bold"> 10% discount </span>
              on your first mission. Use code: 
            </p>
            <p className="mt-3 text-xl font-mono text-purple-400 bg-purple-900/30 px-4 py-2 rounded-lg">
              STARFINDER10
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EasterEgg;
