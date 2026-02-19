'use client';

import { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MagneticButton } from '@/components/common/MagneticButton';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { CustomCursor } from '@/components/common/CustomCursor';
import { useLenis } from '@/hooks/useLenis';
import { useStore } from '@/store/useStore';
import { galleryImages, getAllCategories, GalleryImage } from '@/data/gallery';

// Dynamic 3D Scene
const SpaceScene = dynamic(
  () => import('@/components/3d/SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
);

function GalleryLightbox({
  image,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalImages,
}: {
  image: GalleryImage;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-full glass hover:bg-white/20 transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Image Counter */}
      <div className="absolute top-6 left-6 px-4 py-2 rounded-full glass text-white/80">
        {currentIndex + 1} / {totalImages}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full glass hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full glass hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Image */}
      <motion.div
        className="relative max-w-5xl max-h-[80vh] w-full mx-6"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden">
          <Image
            src={image.image}
            alt={image.title}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Image Info */}
        <motion.div
          className="absolute -bottom-20 left-0 right-0 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
          <p className="text-white/60">{image.description}</p>
          <span className="inline-block mt-2 px-3 py-1 rounded-full glass text-cyan-400 text-sm">
            {image.category}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function GalleryHero() {
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
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Cosmic Masterpieces
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white">Galleries of the</span>
            <span className="block gradient-text">Infinite Universe</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Explore breathtaking imagery from our missions, NASA archives, and the depths 
            of space captured by humanity&apos;s most advanced telescopes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function GalleriesPage() {
  const { isLoading } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useLenis();

  const categories = getAllCategories();
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return galleryImages;
    return galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const openLightbox = (image: GalleryImage, index: number) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const goToPrev = () => {
    const newIndex = lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(newIndex);
    setLightboxImage(filteredImages[newIndex]);
  };

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
        <GalleryHero />

        {/* Gallery Content */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            {/* Category Filter */}
            <ScrollReveal className="mb-12">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Filter className="w-5 h-5 text-white/50 mr-2" />
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white'
                        : 'glass text-white/70 hover:text-white hover:border-cyan-500/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </ScrollReveal>

            {/* Masonry Grid */}
            <motion.div
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="break-inside-avoid group"
                  >
                    <div
                      className="relative overflow-hidden rounded-2xl cursor-pointer"
                      onClick={() => openLightbox(image, index)}
                    >
                      <div
                        className="relative w-full"
                        style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
                      >
                        <Image
                          src={image.image}
                          alt={image.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                          <p className="text-white/60 text-sm line-clamp-2">{image.description}</p>
                        </div>
                        <div className="absolute top-4 right-4">
                          <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                            <ZoomIn className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Glow Border on Hover */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-cyan-500/50 transition-colors duration-300" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More */}
            <ScrollReveal className="text-center mt-12">
              <MagneticButton variant="secondary">
                Load More Images
              </MagneticButton>
            </ScrollReveal>
          </div>
        </section>

        <Footer />
      </motion.main>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <GalleryLightbox
            image={lightboxImage}
            onClose={closeLightbox}
            onPrev={goToPrev}
            onNext={goToNext}
            currentIndex={lightboxIndex}
            totalImages={filteredImages.length}
          />
        )}
      </AnimatePresence>
    </>
  );
}
