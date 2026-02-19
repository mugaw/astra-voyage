'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Shield, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { MagneticButton } from '@/components/common/MagneticButton';

const features = [
  { icon: Shield, label: '98% Safety Record', desc: 'Industry-leading protocols' },
  { icon: Clock, label: '24/7 Support', desc: 'Mission control always online' },
  { icon: Rocket, label: 'SpaceX Fleet', desc: 'Next-gen spacecraft' },
];

export function CTA() {
  const [stars, setStars] = useState<Array<{left: string, top: string, duration: number, delay: number}>>([]);
  useEffect(() => {
    setStars([...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    })));
  }, []);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent" />
      
      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <ScrollReveal>
          <div className="relative max-w-4xl mx-auto p-8 md:p-16 rounded-3xl glass border border-white/10 overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/30 to-transparent rounded-full blur-3xl" />

            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Limited Seats Available</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-white">Ready to Leave </span>
              <span className="gradient-text">Earth Behind?</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-white/60 mb-8 max-w-2xl">
              Join the elite group of space tourists who have experienced the ultimate adventure. 
              Book your consultation today and take the first step toward the stars.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{feature.label}</p>
                    <p className="text-white/50 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <MagneticButton size="lg">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </Link>
              <Link href="/galleries">
                <MagneticButton variant="secondary" size="lg">
                  <span>Explore Gallery</span>
                </MagneticButton>
              </Link>
            </div>

            {/* Urgency Text */}
            <motion.p
              className="mt-6 text-white/40 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              🚀 Next mission departs in <span className="text-cyan-400 font-mono">Q2 2025</span> — 
              Only <span className="text-purple-400 font-mono">8 seats</span> remaining
            </motion.p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default CTA;
