'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Rocket, Satellite, Users, Award, Globe, Zap } from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';

const features = [
  {
    icon: Rocket,
    title: 'SpaceX Partnership',
    description: 'Exclusive access to Crew Dragon and Starship vehicles for safe, reliable space transport.',
  },
  {
    icon: Satellite,
    title: 'NASA Collaboration',
    description: 'Working alongside NASA with Artemis program integration and ISS mission support.',
  },
  {
    icon: Users,
    title: 'Expert Astronauts',
    description: 'Former NASA and ESA astronauts lead every mission with decades of experience.',
  },
  {
    icon: Award,
    title: 'Safety First',
    description: '98% success rate with rigorous safety protocols and redundant systems.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Launch facilities in Cape Canaveral, Boca Chica, and Baikonur Cosmodrome.',
  },
  {
    icon: Zap,
    title: 'Innovation Leader',
    description: 'Pioneering reusable rocket technology and sustainable space tourism.',
  },
];

const timeline = [
  { year: '2021', event: 'Founded with vision of accessible space travel' },
  { year: '2022', event: 'Partnership with SpaceX announced' },
  { year: '2023', event: 'First commercial lunar orbit mission' },
  { year: '2024', event: 'Mars Pioneer program launched' },
];

export function About() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-purple-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            About ASTRA VOYAGE
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Pioneering the </span>
            <span className="gradient-text">Final Frontier</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We are humanity&apos;s bridge to the stars. Founded by space industry veterans and backed by 
            leading aerospace partners, we make space tourism accessible, safe, and extraordinary.
          </p>
        </ScrollReveal>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Side */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80"
                  alt="Space Launch"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                className="absolute -bottom-6 -right-6 p-6 glass rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-4xl font-bold gradient-text">127+</p>
                <p className="text-white/60 text-sm">Successful Missions</p>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-purple-500/30 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-cyan-500/30 rounded-full" />
            </div>
          </ScrollReveal>

          {/* Content Side */}
          <ScrollReveal direction="right">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                NASA-Grade Excellence, SpaceX Innovation
              </h3>
              <p className="text-white/60">
                Our partnership with SpaceX provides access to the revolutionary Starship vehicle, 
                reducing Mars transit time to just 3 months. Combined with NASA&apos;s rigorous safety 
                standards from the Artemis program, we deliver an unmatched space tourism experience.
              </p>
              <p className="text-white/60">
                Every mission includes comprehensive astronaut training at our state-of-the-art 
                facilities, where you&apos;ll learn from former NASA astronauts and experience 
                zero-gravity simulations, emergency procedures, and mission-specific preparation.
              </p>

              {/* Timeline */}
              <div className="mt-8">
                <h4 className="text-white font-semibold mb-4">Our Journey</h4>
                <div className="space-y-3">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={item.year}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-cyan-400 font-mono text-sm w-12">{item.year}</span>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                      <span className="text-white/60 text-sm">{item.event}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <motion.div
                className="p-6 rounded-2xl glass border border-white/10 hover:border-cyan-500/30 transition-colors group"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Artemis & Starship Info */}
        <ScrollReveal className="mt-20">
          <div className="relative p-8 md:p-12 rounded-3xl glass border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full blur-3xl" />
            
            <div className="relative grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Artemis Program Integration
                </h3>
                <p className="text-white/60 mb-4">
                  NASA&apos;s Artemis program aims to return humans to the Moon and establish a 
                  sustainable presence. As an official partner, ASTRA VOYAGE integrates Artemis 
                  technology and protocols into our lunar missions, ensuring NASA-grade safety 
                  and access to lunar gateway facilities.
                </p>
                <p className="text-white/60">
                  Our lunar habitats are positioned near the lunar south pole, providing 
                  access to water ice deposits and continuous sunlight for power generation.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Starship Technology
                </h3>
                <p className="text-white/60 mb-4">
                  SpaceX&apos;s Starship represents the future of space transportation. This 
                  fully reusable spacecraft can carry up to 100 passengers to Mars, with 
                  in-orbit refueling enabling deep space missions. Our Mars Pioneer program 
                  leverages this revolutionary technology.
                </p>
                <p className="text-white/60">
                  Starship&apos;s vertical landing capability ensures safe, precise touchdowns 
                  on any planetary surface, from the Moon to Mars and beyond.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default About;
