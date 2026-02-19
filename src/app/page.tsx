'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { FeaturedMissions } from '@/components/sections/FeaturedMissions';
import { About } from '@/components/sections/About';
import { Stats } from '@/components/sections/Stats';
import { Testimonials } from '@/components/sections/Testimonials';
import { CTA } from '@/components/sections/CTA';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { CustomCursor } from '@/components/common/CustomCursor';
import { EasterEgg } from '@/components/common/EasterEgg';
import { useLenis } from '@/hooks/useLenis';
import { useStore } from '@/store/useStore';

// Dynamic import for heavy components
const SpaceScene = dynamic(
  () => import('@/components/3d/SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
);

export default function Home() {
  const { isLoading, showEasterEgg } = useStore();
  useLenis();

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Custom Cursor - Desktop Only */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Easter Egg Modal */}
      <EasterEgg />

      {/* Main Content */}
      <motion.main
        className={`relative min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      >
        {/* Navigation */}
        <Navigation />

        {/* Hero Section */}
        <Hero />

        {/* Divider */}
        <div className="section-divider" />

        {/* Featured Missions */}
        <FeaturedMissions />

        {/* Divider */}
        <div className="section-divider" />

        {/* About Section */}
        <About />

        {/* Divider */}
        <div className="section-divider" />

        {/* Stats Section */}
        <Stats />

        {/* Divider */}
        <div className="section-divider" />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Divider */}
        <div className="section-divider" />

        {/* CTA Section */}
        <CTA />

        {/* Footer */}
        <Footer />
      </motion.main>
    </>
  );
}
