'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, MapPin, Users, Shield } from 'lucide-react';
import { ScrollReveal } from '@/components/common/ScrollReveal';
import { TiltCard } from '@/components/common/TiltCard';
import { MagneticButton } from '@/components/common/MagneticButton';
import { Modal } from '@/components/common/Modal';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { missions, Mission } from '@/data/missions';

export function FeaturedMissions() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 cosmic-bg opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-2 rounded-full glass text-cyan-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Featured Expeditions
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-white">Choose Your </span>
            <span className="gradient-text">Adventure</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            From lunar getaways to Mars expeditions, discover our handcrafted journeys 
            designed for the ultimate space exploration experience.
          </p>
        </ScrollReveal>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {missions.map((mission, index) => (
            <ScrollReveal key={mission.id} delay={index * 0.1}>
              <TiltCard className="h-full">
                <motion.div
                  className={`relative h-full min-h-[450px] rounded-2xl overflow-hidden bg-gradient-to-br ${mission.gradient} glass border border-white/10`}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={mission.image}
                      alt={mission.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Destination Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass text-xs text-white/80">
                      <MapPin className="w-3 h-3 inline mr-1" />
                      {mission.destination}
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full glass text-xs text-white/80">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {mission.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{mission.title}</h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">{mission.subtitle}</p>

                    {/* Features */}
                    <div className="flex gap-4 mb-6">
                      {mission.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="text-center">
                          <span className="text-2xl">{feature.icon}</span>
                          <p className="text-xs text-white/50 mt-1">{feature.title}</p>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-white/50">Starting from</p>
                        <p className="text-2xl font-bold text-cyan-400">{mission.price}</p>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-white/60">
                        <Users className="w-4 h-4" />
                        <span>Limited seats</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => setSelectedMission(mission)}
                        className="flex-1 py-3 rounded-xl glass hover:bg-white/10 transition-colors text-sm font-medium text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Details
                      </motion.button>
                      <Link href="/book" className="flex-1">
                        <MagneticButton size="sm" className="w-full">
                          Book Now
                        </MagneticButton>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Link */}
        <ScrollReveal className="text-center mt-12">
          <Link href="/book">
            <motion.button
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors group"
              whileHover={{ x: 5 }}
            >
              <span>View all missions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </ScrollReveal>
      </div>

      {/* Mission Detail Modal */}
      <Modal
        isOpen={!!selectedMission}
        onClose={() => setSelectedMission(null)}
        size="lg"
      >
        {selectedMission && (
          <div className="space-y-6">
            {/* Header */}
            <div className="relative h-48 -mx-6 -mt-6 rounded-t-2xl overflow-hidden">
              <Image
                src={selectedMission.image}
                alt={selectedMission.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h3 className="text-2xl font-bold text-white">{selectedMission.title}</h3>
                <p className="text-white/60">{selectedMission.subtitle}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70">{selectedMission.description}</p>

            {/* Highlights */}
            <div>
              <h4 className="text-white font-semibold mb-3">Highlights</h4>
              <ul className="space-y-2">
                {selectedMission.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-2 text-white/60"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Shield className="w-4 h-4 text-cyan-400" />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-4">
              {selectedMission.features.map((feature, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl glass text-center"
                >
                  <span className="text-3xl">{feature.icon}</span>
                  <p className="text-white font-medium mt-2">{feature.title}</p>
                  <p className="text-white/50 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-white/50 text-sm">Starting from</p>
                <p className="text-3xl font-bold gradient-text">{selectedMission.price}</p>
              </div>
              <Link href="/book">
                <MagneticButton>
                  Book This Mission
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export default FeaturedMissions;
