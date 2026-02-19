'use client';

import { motion } from 'framer-motion';
import { Rocket, Users, Building, Shield } from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';

const stats = [
  {
    icon: Rocket,
    value: 127,
    suffix: '',
    label: 'Successful Missions',
    description: 'Completed expeditions to orbit, Moon, and beyond',
  },
  {
    icon: Users,
    value: 2450,
    suffix: '+',
    label: 'Space Tourists',
    description: 'Happy adventurers who experienced space',
  },
  {
    icon: Building,
    value: 12,
    suffix: '',
    label: 'Orbital Research Labs',
    description: 'Active stations for scientific discovery',
  },
  {
    icon: Shield,
    value: 98,
    suffix: '%',
    label: 'Safety Record',
    description: 'Industry-leading mission success rate',
  },
];

export function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted by Thousands of <span className="gradient-text">Space Explorers</span>
          </h2>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 0.1}>
              <motion.div
                className="relative p-6 md:p-8 rounded-2xl glass border border-white/10 text-center group hover:border-cyan-500/30 transition-all"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform"
                  initial={{ rotate: -10 }}
                  whileHover={{ rotate: 0 }}
                >
                  <stat.icon className="w-7 h-7 text-cyan-400" />
                </motion.div>

                {/* Counter */}
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold gradient-text">
                    <AnimatedCounter target={stat.value} duration={2500} />
                  </span>
                  <span className="text-4xl md:text-5xl font-bold gradient-text">{stat.suffix}</span>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-white mb-1">{stat.label}</h3>
                <p className="text-white/50 text-sm">{stat.description}</p>

                {/* Decorative Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal className="text-center mt-16">
          <motion.p
            className="text-white/60 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join the next generation of space explorers
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#0a0a0f] overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${i % 2 ? '#7c3aed' : '#06b6d4'}, ${i % 2 ? '#06b6d4' : '#7c3aed'})`,
                  }}
                />
              ))}
            </div>
            <span className="text-white/80">
              <strong className="text-cyan-400">2,450+</strong> people have already booked their journey
            </span>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default Stats;
