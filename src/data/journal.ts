export interface JournalEntry {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  tags: string[];
  author: string;
  readTime: string;
  content: string;
}

export const journalEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'First Commercial Lunar Landing Success',
    date: '2024-03-15',
    description: 'Our Lunar Escape mission successfully touched down near the Shackleton crater, marking a historic milestone in commercial space tourism.',
    image: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80',
    tags: ['Moon', 'Milestone', 'Success'],
    author: 'Dr. Sarah Chen',
    readTime: '5 min',
    content: 'Today marks an extraordinary achievement in the history of commercial space travel. Our Lunar Escape mission, carrying 12 private citizens, has successfully landed near the Shackleton crater on the lunar south pole...'
  },
  {
    id: '2',
    title: 'Stunning Views from Orbital Station',
    date: '2024-03-12',
    description: 'Guests aboard our orbital station captured breathtaking images of Earth\'s aurora from 400km above the surface.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&q=80',
    tags: ['Orbital', 'Photography', 'Earth'],
    author: 'Captain James Mitchell',
    readTime: '3 min',
    content: 'The view from our orbital station never ceases to amaze. Last night, guests were treated to a spectacular display of the aurora borealis and aurora australis simultaneously visible from our unique vantage point...'
  },
  {
    id: '3',
    title: 'Mars Training Center Expansion',
    date: '2024-03-10',
    description: 'We\'re excited to announce the expansion of our Mars training facility, now featuring advanced simulation environments.',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&q=80',
    tags: ['Mars', 'Training', 'Announcement'],
    author: 'Dr. Michael Torres',
    readTime: '4 min',
    content: 'Our Mars Pioneer program just got even better. We\'ve completed a major expansion of our training facility, adding three new simulation environments that replicate the Martian surface with unprecedented accuracy...'
  },
  {
    id: '4',
    title: 'SpaceX Partnership Announcement',
    date: '2024-03-08',
    description: 'ASTRA VOYAGE announces extended partnership with SpaceX for next-generation Starship missions.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&q=80',
    tags: ['Partnership', 'SpaceX', 'Starship'],
    author: 'CEO Elena Vasquez',
    readTime: '6 min',
    content: 'We are thrilled to announce an extended partnership with SpaceX that will see our Mars Pioneer missions transition to the revolutionary Starship vehicle, reducing transit time and increasing payload capacity...'
  },
  {
    id: '5',
    title: 'Zero-Gravity Culinary Experience',
    date: '2024-03-05',
    description: 'Our Michelin-trained chefs reveal the secrets behind creating gourmet meals in zero gravity.',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=800&q=80',
    tags: ['Cuisine', 'Experience', 'Orbital'],
    author: 'Chef Antoine Dubois',
    readTime: '4 min',
    content: 'Cooking in space presents unique challenges, but our culinary team has mastered the art of creating memorable dining experiences in zero gravity. From specially designed containers to innovative preparation techniques...'
  },
  {
    id: '6',
    title: 'Astronaut Training: What to Expect',
    date: '2024-03-01',
    description: 'A comprehensive guide to our world-class astronaut training program for all mission participants.',
    image: 'https://images.unsplash.com/photo-1454789548928-efd52dc4031?w=800&q=80',
    tags: ['Training', 'Guide', 'Preparation'],
    author: 'Training Director Mark Stevens',
    readTime: '8 min',
    content: 'Every ASTRA VOYAGE mission begins with our comprehensive training program. From physical conditioning to emergency procedures, our training ensures you\'re fully prepared for the adventure of a lifetime...'
  }
];

export const getJournalEntryById = (id: string): JournalEntry | undefined => {
  return journalEntries.find(entry => entry.id === id);
};

export const getJournalEntriesByTag = (tag: string): JournalEntry[] => {
  return journalEntries.filter(entry => entry.tags.includes(tag));
};

export const getAllTags = (): string[] => {
  const tags = new Set<string>();
  journalEntries.forEach(entry => {
    entry.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags);
};
