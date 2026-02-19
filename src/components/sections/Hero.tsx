'use client';

import { Suspense, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import { MagneticButton } from '@/components/common/MagneticButton';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { useStore } from '@/store/useStore';

// Dynamically import 3D scene for better performance
const SpaceScene = dynamic(
  () => import('@/components/3d/SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
);

// Simple hydration-safe mounted state
const emptySubscribe = () => () => {};
const getServerSnapshot = () => false;
const getClientSnapshot = () => true;

export function Hero() {
  const { incrementStarClick, starClickCount } = useStore();
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        {mounted && (
          <Suspense fallback={<div className="w-full h-full bg-[#0a0a0f]" />}>
            <SpaceScene />
          </Suspense>
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient z-10" />

      {/* Interactive Stars (Easter Egg) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={incrementStarClick}
            className="absolute pointer-events-auto cursor-pointer"
            style={{
              left: `${20 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          >
            <Star
              className={`w-4 h-4 text-yellow-400/30 hover:text-yellow-400 transition-colors ${
                i < starClickCount ? 'text-yellow-400' : ''
              }`}
              fill={i < starClickCount ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 container mx-auto px-6 text-center">
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-white/70">Now accepting bookings for 2025</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="block text-white">The Future of Travel</span>
              <span className="block gradient-text">is Beyond Earth</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
              Experience the ultimate luxury adventure. From lunar escapes to Mars expeditions, 
              we craft extraordinary journeys beyond imagination.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book">
                <MagneticButton size="lg">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>

              <motion.button
                className="flex items-center gap-3 px-6 py-3 text-white/80 hover:text-white transition-colors group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Play className="w-5 h-5 ml-1" />
                </div>
                <span>Watch Experience</span>
              </motion.button>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
    </section>
  );
}

export default Hero;
