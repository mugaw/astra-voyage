export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  width: number;
  height: number;
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Earth from Orbit',
    description: 'A stunning view of Earth\'s curvature from 400km above',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    category: 'Earth',
    width: 800,
    height: 600
  },
  {
    id: '2',
    title: 'Lunar Surface',
    description: 'The desolate beauty of the Moon\'s surface',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80',
    category: 'Moon',
    width: 800,
    height: 1000
  },
  {
    id: '3',
    title: 'Mars Landscape',
    description: 'The red planet\'s rugged terrain captured by our rovers',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
    category: 'Mars',
    width: 800,
    height: 600
  },
  {
    id: '4',
    title: 'Nebula Dreams',
    description: 'A distant nebula painting the cosmos in vibrant colors',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    category: 'Nebula',
    width: 800,
    height: 1200
  },
  {
    id: '5',
    title: 'Rocket Launch',
    description: 'A Starship ascending into the cosmos',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80',
    category: 'Rockets',
    width: 800,
    height: 600
  },
  {
    id: '6',
    title: 'Astronaut Spacewalk',
    description: 'An astronaut conducting repairs outside the station',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80',
    category: 'Astronauts',
    width: 800,
    height: 1000
  },
  {
    id: '7',
    title: 'Galaxy Spiral',
    description: 'A magnificent spiral galaxy millions of light years away',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80',
    category: 'Galaxies',
    width: 800,
    height: 600
  },
  {
    id: '8',
    title: 'Orbital Sunset',
    description: 'The sun setting over Earth\'s horizon from space',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    category: 'Earth',
    width: 800,
    height: 600
  },
  {
    id: '9',
    title: 'Space Station',
    description: 'Our orbital station silhouetted against the Earth',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    category: 'Stations',
    width: 800,
    height: 600
  },
  {
    id: '10',
    title: 'Milky Way Panorama',
    description: 'Our galaxy stretching across the night sky',
    image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=800&q=80',
    category: 'Galaxies',
    width: 800,
    height: 1000
  },
  {
    id: '11',
    title: 'Lunar Module',
    description: 'Our lunar lander on the Moon\'s surface',
    image: 'https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?w=800&q=80',
    category: 'Moon',
    width: 800,
    height: 600
  },
  {
    id: '12',
    title: 'Mars Colony Concept',
    description: 'Artist rendering of our future Mars habitat',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
    category: 'Mars',
    width: 800,
    height: 600
  },
  {
    id: '13',
    title: 'Orion Nebula',
    description: 'The stellar nursery of the Orion constellation',
    image: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80',
    category: 'Nebula',
    width: 800,
    height: 1000
  },
  {
    id: '14',
    title: 'Crew Training',
    description: 'Astronauts preparing for their mission',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    category: 'Astronauts',
    width: 800,
    height: 600
  },
  {
    id: '15',
    title: 'Starship Assembly',
    description: 'The construction of our next-generation spacecraft',
    image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&q=80',
    category: 'Rockets',
    width: 800,
    height: 1000
  },
  {
    id: '16',
    title: 'Deep Space Nebula',
    description: 'A stunning view of distant cosmic clouds',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80',
    category: 'Nebula',
    width: 800,
    height: 1000
  },
  {
    id: '17',
    title: 'Space Station Interior',
    description: 'Inside our orbital habitat module',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    category: 'Stations',
    width: 800,
    height: 600
  },
  {
    id: '18',
    title: 'Lunar Rover',
    description: 'Exploring the Moon\'s surface in our rover',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80',
    category: 'Moon',
    width: 800,
    height: 600
  },
  {
    id: '19',
    title: 'Earth Rise',
    description: 'Earth rising over the lunar horizon',
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80',
    category: 'Earth',
    width: 800,
    height: 600
  },
  {
    id: '20',
    title: 'Spiral Galaxy',
    description: 'A magnificent spiral galaxy billions of light years away',
    image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800&q=80',
    category: 'Galaxies',
    width: 800,
    height: 600
  },
];

export const getGalleryImageById = (id: string): GalleryImage | undefined => {
  return galleryImages.find(img => img.id === id);
};

export const getGalleryImagesByCategory = (category: string): GalleryImage[] => {
  if (category === 'All') return galleryImages;
  return galleryImages.filter(img => img.category === category);
};

export const getAllCategories = (): string[] => {
  const categories = new Set<string>();
  galleryImages.forEach(img => categories.add(img.category));
  return ['All', ...Array.from(categories)];
};
