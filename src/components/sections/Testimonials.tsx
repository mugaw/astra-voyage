'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const testimonials = [
  {
    id: 1,
    name: 'Alexandra Chen',
    role: 'Lunar Escape Pioneer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    content: 'The lunar sunrise is something no photograph can capture. ASTRA VOYAGE made my childhood dream come true with unparalleled luxury and safety.',
    rating: 5,
    mission: 'Moon - 2024',
  },
  {
    id: 2,
    name: 'James Mitchell',
    role: 'Orbital Station Guest',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    content: '16 sunrises in a single day changes your perspective on everything. The zero-gravity dining experience was absolutely extraordinary.',
    rating: 5,
    mission: 'Orbital Station - 2024',
  },
  {
    id: 3,
    name: 'Dr. Sarah Williams',
    role: 'Mars Pioneer Candidate',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    content: 'The training program prepared me perfectly for my upcoming Mars mission. The attention to detail and astronaut support is world-class.',
    rating: 5,
    mission: 'Mars Training - 2024',
  },
  {
    id: 4,
    name: 'Michael Torres',
    role: 'Venus Atmospheric Tour',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    content: 'Seeing Venus up close, floating in its golden clouds, was the most surreal experience of my life. ASTRA VOYAGE delivers on every promise.',
    rating: 5,
    mission: 'Venus Tour - 2023',
  },
];

const stats = [
  { value: '4.9/5', label: 'Average Rating' },
  { value: '2,450+', label: 'Happy Travelers' },
  { value: '127', label: 'Successful Missions' },
  { value: '100%', label: 'Would Recommend' },
];

export function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Stories from </span>
            <span className="gradient-text">Space Pioneers</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Hear from those who have experienced the extraordinary. Our guests return 
            with stories that redefine what&apos;s possible.
          </p>
        </ScrollReveal>

        {/* Stats Bar */}
        <ScrollReveal className="mb-16">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={testimonial.id} delay={index * 0.1}>
              <motion.div
                className="relative p-6 md:p-8 rounded-2xl glass border border-white/10 hover:border-cyan-500/30 transition-all group"
                whileHover={{ y: -5 }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 text-purple-500/20">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/70 mb-6 italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white font-medium">{testimonial.name}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                      {testimonial.mission}
                    </span>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Trust Indicators */}
        <ScrollReveal className="mt-16">
          <div className="flex flex-wrap items-center justify-center gap-8 text-white/40">
            <span className="text-sm">Featured in:</span>
            <div className="flex flex-wrap items-center gap-8">
              {['NASA', 'SpaceX', 'Forbes', 'TechCrunch', 'Wired'].map((brand, index) => (
                <motion.span
                  key={brand}
                  className="text-lg font-semibold hover:text-cyan-400 transition-colors cursor-pointer"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {brand}
                </motion.span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Testimonials;
