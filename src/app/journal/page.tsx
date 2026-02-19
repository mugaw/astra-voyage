'use client';

import { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Tag, ChevronRight, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MagneticButton } from '@/components/common/MagneticButton';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { CustomCursor } from '@/components/common/CustomCursor';
import { useLenis } from '@/hooks/useLenis';
import { useStore } from '@/store/useStore';
import { journalEntries, getAllTags, JournalEntry } from '@/data/journal';

// Dynamic 3D Scene
const SpaceScene = dynamic(
  () => import('@/components/3d/SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
);

function JournalHero() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#0a0a0f]" />}>
          <SpaceScene />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient z-10" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Date Ticker */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Calendar className="w-5 h-5 text-cyan-400" />
            <span className="text-white/80 font-mono">{formattedDate}</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white">Daily Orbit</span>
            <span className="block gradient-text">Logs</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Follow our journey through the cosmos. Daily updates from missions, 
            training facilities, and the frontiers of space exploration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function JournalCard({ entry, index }: { entry: JournalEntry; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden glass border border-white/10 hover:border-cyan-500/30 transition-all">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            <Image
              src={entry.image}
              alt={entry.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 md:bg-gradient-to-t md:from-black/50 md:to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {entry.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {entry.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {entry.author}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
              {entry.title}
            </h2>

            {/* Description */}
            <p className={`text-white/60 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
              {isExpanded ? entry.content : entry.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300"
                >
                  <Tag className="w-3 h-3 inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Read More */}
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function JournalPage() {
  const { isLoading } = useStore();
  const [selectedTag, setSelectedTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useLenis();

  const tags = ['All', ...getAllTags()];

  const filteredEntries = useMemo(() => {
    if (selectedTag === 'All') return journalEntries;
    return journalEntries.filter((entry) => entry.tags.includes(selectedTag));
  }, [selectedTag]);

  const paginatedEntries = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEntries.slice(start, start + itemsPerPage);
  }, [filteredEntries, currentPage]);

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);

  return (
    <>
      <LoadingScreen />
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      <motion.main
        className={`relative min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
      >
        <Navigation />
        <JournalHero />

        {/* Journal Content */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            {/* Tag Filter */}
            <ScrollReveal className="mb-12">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Tag className="w-5 h-5 text-white/50 mr-2" />
                {tags.map((tag) => (
                  <motion.button
                    key={tag}
                    onClick={() => {
                      setSelectedTag(tag);
                      setCurrentPage(1);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                        : 'glass text-white/70 hover:text-white hover:border-cyan-500/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>

            {/* Journal Entries */}
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {paginatedEntries.map((entry, index) => (
                  <JournalCard key={entry.id} entry={entry} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <ScrollReveal className="flex items-center justify-center gap-4 mt-12">
                <motion.button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 text-white rotate-180" />
                </motion.button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                          : 'glass text-white/70 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {i + 1}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-full glass disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </motion.button>
              </ScrollReveal>
            )}

            {/* Subscribe CTA */}
            <ScrollReveal className="mt-20">
              <div className="relative p-8 md:p-12 rounded-3xl glass border border-white/10 overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
                <div className="relative">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Never Miss an Update
                  </h3>
                  <p className="text-white/60 mb-6 max-w-lg mx-auto">
                    Subscribe to receive mission updates, space news, and exclusive 
                    content directly in your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 rounded-xl glass border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none transition-colors"
                    />
                    <MagneticButton>
                      Subscribe
                      <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </motion.main>
    </>
  );
}
