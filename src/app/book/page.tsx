'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Calendar, Users, MapPin, Mail, User, MessageSquare, 
  Send, CheckCircle, Rocket, Globe, Timer, Sparkles 
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MagneticButton } from '@/components/common/MagneticButton';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { CustomCursor } from '@/components/common/CustomCursor';
import { useLenis } from '@/hooks/useLenis';
import { useStore } from '@/store/useStore';

// Dynamic 3D Scene
const SpaceScene = dynamic(
  () => import('@/components/3d/SpaceScene').then((mod) => mod.SpaceScene),
  { ssr: false }
);

// Form Schema
const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  destination: z.string().min(1, 'Please select a destination'),
  departureDate: z.string().min(1, 'Please select a departure date'),
  passengers: z.number().min(1, 'At least 1 passenger required').max(10, 'Maximum 10 passengers'),
  experienceType: z.string().min(1, 'Please select an experience type'),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const destinations = [
  { value: 'moon', label: 'Lunar Escape - Moon', price: '$1,250,000' },
  { value: 'mars', label: 'Mars Pioneer - Mars', price: '$55,000,000' },
  { value: 'orbit', label: 'Orbital Station Stay', price: '$450,000' },
  { value: 'venus', label: 'Venus Atmospheric Tour', price: '$8,500,000' },
  { value: 'asteroid', label: 'Asteroid Mining Experience', price: '$3,200,000' },
];

const experienceTypes = [
  { value: 'luxury', label: 'Luxury', icon: Sparkles, desc: 'Premium amenities & suites' },
  { value: 'research', label: 'Research', icon: Globe, desc: 'Scientific missions' },
  { value: 'adventure', label: 'Adventure', icon: Rocket, desc: 'Thrilling experiences' },
];

function BookHero() {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
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
            className="inline-block px-4 py-2 rounded-full glass text-purple-400 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Begin Your Journey
          </motion.span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-white">Book Your</span>
            <span className="block gradient-text">Space Adventure</span>
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Reserve your seat on humanity&apos;s greatest adventure. Our booking specialists 
            will contact you within 24 hours to finalize your cosmic journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-md w-full mx-6 p-8 rounded-3xl glass border border-white/10 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Success Animation */}
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-2xl font-bold text-white mb-4">
              Booking Request Submitted!
            </h2>
            <p className="text-white/60 mb-6">
              Thank you for choosing ASTRA VOYAGE. Our mission specialists will contact 
              you within 24 hours to discuss your journey details.
            </p>

            <MagneticButton onClick={onClose} className="w-full">
              Continue Exploring
            </MagneticButton>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TimeToggle({ isMarsTime, onToggle }: { isMarsTime: boolean; onToggle: () => void }) {
  const earthTime = new Date();
  // Mars sol is about 24 hours 39 minutes
  const marsTime = new Date(earthTime.getTime() + (earthTime.getTime() % 88775));

  return (
    <div className="flex items-center gap-3 p-4 rounded-xl glass border border-white/10">
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-cyan-400" />
        <span className="text-white/50">Time:</span>
      </div>
      
      <div className="flex-1 flex items-center justify-center gap-2">
        <motion.button
          onClick={onToggle}
          className={`px-4 py-2 rounded-lg transition-all ${
            !isMarsTime ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/50'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          Earth
        </motion.button>
        <motion.button
          onClick={onToggle}
          className={`px-4 py-2 rounded-lg transition-all ${
            isMarsTime ? 'bg-purple-500/20 text-purple-400' : 'text-white/50'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          Mars
        </motion.button>
      </div>

      <div className="flex items-center gap-2">
        <Timer className="w-5 h-5 text-purple-400" />
        <span className="font-mono text-white">
          {isMarsTime 
            ? marsTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : earthTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
          }
        </span>
      </div>
    </div>
  );
}

function SeatAvailability({ destination }: { destination: string }) {
  const seats: Record<string, number> = {
    moon: 8,
    mars: 4,
    orbit: 12,
    venus: 6,
    asteroid: 10,
  };

  const availableSeats = destination ? seats[destination] || 0 : 0;

  return (
    <div className="p-4 rounded-xl glass border border-white/10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/60 text-sm">Seat Availability</span>
        <span className="text-cyan-400 font-medium">{availableSeats} seats left</span>
      </div>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
          initial={{ width: 0 }}
          animate={{ width: `${(availableSeats / 12) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

export default function BookPage() {
  const { isLoading } = useStore();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMarsTime, setIsMarsTime] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      passengers: 1,
    },
  });

  const selectedDestination = watch('destination');

  useLenis();

  const onSubmit = async (data: BookingFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Booking data:', data);
    setIsSubmitted(true);
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
        <BookHero />

        {/* Booking Form Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Time Toggle */}
                  <TimeToggle isMarsTime={isMarsTime} onToggle={() => setIsMarsTime(!isMarsTime)} />

                  {/* Personal Information */}
                  <div className="p-6 md:p-8 rounded-2xl glass border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-cyan-400" />
                      Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Full Name *</label>
                        <input
                          {...register('name')}
                          className={`w-full px-4 py-3 rounded-xl glass border ${
                            errors.name ? 'border-red-500' : 'border-white/20'
                          } bg-white/5 text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none transition-colors`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <motion.p
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.name.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Email Address *</label>
                        <input
                          {...register('email')}
                          type="email"
                          className={`w-full px-4 py-3 rounded-xl glass border ${
                            errors.email ? 'border-red-500' : 'border-white/20'
                          } bg-white/5 text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none transition-colors`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <motion.p
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.email.message}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mission Details */}
                  <div className="p-6 md:p-8 rounded-2xl glass border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-purple-400" />
                      Mission Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Destination */}
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Destination *</label>
                        <select
                          {...register('destination')}
                          className={`w-full px-4 py-3 rounded-xl glass border ${
                            errors.destination ? 'border-red-500' : 'border-white/20'
                          } bg-white/5 text-white focus:border-cyan-500/50 focus:outline-none transition-colors`}
                        >
                          <option value="" className="bg-[#0a0a0f]">Select destination</option>
                          {destinations.map((dest) => (
                            <option key={dest.value} value={dest.value} className="bg-[#0a0a0f]">
                              {dest.label} - {dest.price}
                            </option>
                          ))}
                        </select>
                        {errors.destination && (
                          <motion.p
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.destination.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Departure Date */}
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Preferred Departure *</label>
                        <input
                          {...register('departureDate')}
                          type="date"
                          className={`w-full px-4 py-3 rounded-xl glass border ${
                            errors.departureDate ? 'border-red-500' : 'border-white/20'
                          } bg-white/5 text-white focus:border-cyan-500/50 focus:outline-none transition-colors`}
                        />
                        {errors.departureDate && (
                          <motion.p
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.departureDate.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Passengers */}
                      <div>
                        <label className="block text-white/60 text-sm mb-2">Number of Passengers *</label>
                        <input
                          {...register('passengers', { valueAsNumber: true })}
                          type="number"
                          min="1"
                          max="10"
                          className={`w-full px-4 py-3 rounded-xl glass border ${
                            errors.passengers ? 'border-red-500' : 'border-white/20'
                          } bg-white/5 text-white focus:border-cyan-500/50 focus:outline-none transition-colors`}
                        />
                        {errors.passengers && (
                          <motion.p
                            className="text-red-400 text-sm mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            {errors.passengers.message}
                          </motion.p>
                        )}
                      </div>

                      {/* Seat Availability */}
                      <div className="flex items-end">
                        <SeatAvailability destination={selectedDestination} />
                      </div>
                    </div>
                  </div>

                  {/* Experience Type */}
                  <div className="p-6 md:p-8 rounded-2xl glass border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Experience Type
                    </h3>

                    <div className="grid md:grid-cols-3 gap-4">
                      {experienceTypes.map((type) => (
                        <motion.label
                          key={type.value}
                          className={`relative p-4 rounded-xl cursor-pointer border transition-all ${
                            selectedExperience === type.value
                              ? 'border-cyan-500 bg-cyan-500/10'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <input
                            {...register('experienceType')}
                            type="radio"
                            value={type.value}
                            className="sr-only"
                            onChange={() => setSelectedExperience(type.value)}
                          />
                          <div className="flex flex-col items-center text-center">
                            <type.icon className="w-8 h-8 text-cyan-400 mb-2" />
                            <span className="text-white font-medium">{type.label}</span>
                            <span className="text-white/50 text-sm">{type.desc}</span>
                          </div>
                        </motion.label>
                      ))}
                    </div>
                    {errors.experienceType && (
                      <motion.p
                        className="text-red-400 text-sm mt-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {errors.experienceType.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Custom Message */}
                  <div className="p-6 md:p-8 rounded-2xl glass border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-green-400" />
                      Additional Requests
                    </h3>

                    <textarea
                      {...register('message')}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl glass border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-cyan-500/50 focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about any special requirements, dietary restrictions, or questions you have..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div className="flex justify-center">
                    <MagneticButton
                      size="lg"
                      disabled={isSubmitting}
                      className="min-w-[200px]"
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                      ) : (
                        <>
                          <span>Submit Booking</span>
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </MagneticButton>
                  </motion.div>

                  {/* Trust Badges */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Secure Booking
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      24/7 Support
                    </div>
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Free Cancellation
                    </div>
                  </div>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <Footer />
      </motion.main>

      {/* Success Modal */}
      <SuccessModal isOpen={isSubmitted} onClose={() => setIsSubmitted(false)} />
    </>
  );
}
