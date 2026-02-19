'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Rocket, Image, BookOpen, Calendar } from 'lucide-react';

const navItems = [
  { href: '/', icon: Rocket, label: 'Home' },
  { href: '/galleries', icon: Image, label: 'Galleries' },
  { href: '/journal', icon: BookOpen, label: 'Journal' },
  { href: '/book', icon: Calendar, label: 'Book' },
];

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 md:hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <div className="flex items-center gap-1 p-2 rounded-2xl glass-dark border border-white/10">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive ? 'text-cyan-400' : 'text-white/60'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl"
                    layoutId="activeFloatingNav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon className="w-5 h-5 relative z-10" />
                <span className="text-xs relative z-10">{item.label}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default FloatingNav;
