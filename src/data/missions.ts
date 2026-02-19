export interface Mission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  duration: string;
  destination: string;
  highlights: string[];
  image: string;
  gradient: string;
  features: {
    icon: string;
    title: string;
    description: string;
  }[];
}

export const missions: Mission[] = [
  {
    id: 'lunar-escape',
    title: 'Lunar Escape',
    subtitle: 'A Journey to Earth\'s Celestial Companion',
    description: 'Experience the ultimate getaway on the Moon. Our Lunar Escape package offers 7 days of breathtaking views, low-gravity adventures, and exclusive crater exploration tours. Stay in our luxury lunar habitat with Earth-facing suites.',
    price: '$1,250,000',
    duration: '7 Days',
    destination: 'Moon',
    highlights: [
      'Private lunar suite with Earth view',
      'Guided crater exploration',
      'Low-gravity sports activities',
      'Stargazing from the Sea of Tranquility',
      'Professional photography session'
    ],
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80',
    gradient: 'from-purple-900/50 to-cyan-900/50',
    features: [
      { icon: '🏨', title: 'Luxury Habitat', description: '5-star accommodation with panoramic views' },
      { icon: '🚀', title: 'SpaceX Transport', description: 'Crew Dragon spacecraft' },
      { icon: '👨‍🚀', title: 'Expert Guides', description: 'Former NASA astronauts' }
    ]
  },
  {
    id: 'mars-pioneer',
    title: 'Mars Pioneer',
    subtitle: 'Be Among the First to Walk on Mars',
    description: 'Join the elite group of Mars pioneers. This 18-month expedition includes intensive astronaut training, a scenic transit through the solar system, and 6 months of Mars surface exploration. Contribute to humanity\'s greatest adventure.',
    price: '$55,000,000',
    duration: '18 Months',
    destination: 'Mars',
    highlights: [
      'Pre-flight astronaut training program',
      'Olympus Mons expedition',
      'Mars colony development participation',
      'Scientific research opportunities',
      'Historical documentation package'
    ],
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
    gradient: 'from-red-900/50 to-orange-900/50',
    features: [
      { icon: '🔬', title: 'Research Station', description: 'State-of-the-art Mars habitat' },
      { icon: '🛸', title: 'Starship', description: 'SpaceX Starship transport' },
      { icon: '📡', title: 'Live Connection', description: 'Real-time Earth communication' }
    ]
  },
  {
    id: 'orbital-station',
    title: 'Orbital Station Stay',
    subtitle: 'Luxury in Zero Gravity',
    description: 'Spend a week aboard our exclusive orbital station. Enjoy stunning 16 sunrises per day, gourmet space cuisine, and the unique experience of zero-gravity living. Perfect for those seeking a taste of space without the long commitment.',
    price: '$450,000',
    duration: '7 Days',
    destination: 'Low Earth Orbit',
    highlights: [
      'Private orbital suite',
      'Zero-gravity dining experience',
      'Spacewalk opportunity (optional)',
      'Earth observation deck',
      'VR entertainment center'
    ],
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    gradient: 'from-blue-900/50 to-purple-900/50',
    features: [
      { icon: '🌍', title: 'Earth Views', description: '360° panoramic observation' },
      { icon: '🍽️', title: 'Gourmet Cuisine', description: 'Michelin-trained space chefs' },
      { icon: '🎮', title: 'Entertainment', description: 'VR & gaming facilities' }
    ]
  }
];

export const getMissionById = (id: string): Mission | undefined => {
  return missions.find(mission => mission.id === id);
};
