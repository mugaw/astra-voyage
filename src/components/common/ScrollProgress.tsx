'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-24 md:bottom-8 right-6 w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white/70 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 }),
        }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </>
  );
}

export default ScrollProgress;
