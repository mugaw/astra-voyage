# ASTRA VOYAGE - Space Travel Agency Website

## Project Overview
A fully responsive, ultra-modern, cinematic Space Travel Agency website built with cutting-edge technologies.

## Tech Stack
- React 18 + Next.js 15 (App Router)
- Three.js + React Three Fiber + @react-three/drei (3D scenes)
- GSAP + Anime.js (Animations)
- Framer Motion (Page transitions & micro-interactions)
- TailwindCSS (Styling)
- Lenis (Smooth scrolling)
- Zustand (State management)
- React Hook Form + Zod (Form validation)
- Swiper.js (Carousels)
- Radix UI + ShadCN UI (Accessible UI components)

## Features Implemented

### Pages
1. **HOME Page**
   - Cinematic hero with 3D space scene (rotating Earth, Mars, stars, particles, orbiting satellite)
   - Featured Missions section with 3D tilt cards and modal details
   - About section with NASA/SpaceX partnership info
   - Stats section with animated counters
   - Testimonials section with guest reviews
   - CTA section with urgency messaging
   - Easter egg (click 5 stars to unlock discount code)

2. **GALLERIES Page**
   - 3D floating photo grid with space imagery
   - Category filters (All, Earth, Moon, Mars, Nebula, etc.)
   - Lightbox with zoom navigation
   - Masonry grid layout
   - 20 stunning space images

3. **JOURNAL Page**
   - Daily orbit logs with rotating satellite model
   - Tag filtering system
   - Expandable read-more entries
   - Pagination controls
   - Newsletter subscription CTA

4. **BOOK A SESSION Page**
   - Luxury booking form with validation
   - Earth/Mars time toggle
   - Seat availability indicator
   - Experience type selection (Luxury/Research/Adventure)
   - Success confirmation modal

### Global Features
- Space-themed loading screen with progress bar
- Custom animated cursor (desktop)
- Smooth scrolling with Lenis
- Glassmorphism cards with glow borders
- Magnetic buttons with hover effects
- Scroll-triggered reveal animations
- Responsive design for all devices
- Scroll progress indicator
- Scroll to top button
- Floating navigation (mobile)

### 3D Components
- **SpaceScene**: Main 3D canvas with lighting and controls
- **Earth**: Rotating Earth with clouds and atmosphere glow
- **Mars**: Mars planet with craters and polar caps
- **Stars**: 3000+ star particles with color variations
- **Particles**: Floating cosmic particles
- **Satellite**: Orbiting satellite model
- **Rocket**: Animated rocket with flame effects

### Design System
- Colors: Deep space black, cosmic purple gradients, electric blue accents, neon cyan highlights
- Typography: Large cinematic headings, clean body text
- Effects: Glassmorphism, glow borders, animated gradients, scroll progress

## File Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── galleries/page.tsx  # Galleries page
│   ├── journal/page.tsx    # Journal page
│   └── book/page.tsx       # Booking page
├── components/
│   ├── 3d/                 # 3D components (SpaceScene, Earth, Mars, Stars, Particles, Satellite, Rocket)
│   ├── common/             # Reusable components (MagneticButton, Modal, AnimatedCounter, etc.)
│   ├── layout/             # Navigation & Footer
│   ├── sections/           # Page sections (Hero, FeaturedMissions, About, Stats, Testimonials, CTA)
│   └── ui/                 # ShadCN UI components
├── data/                   # Mission, gallery, journal data
├── store/                  # Zustand store
├── hooks/                  # Custom hooks
└── lib/                    # Utilities
```

## Performance Optimizations
- Dynamic imports for heavy 3D scenes
- Lazy loading images with next/image
- Suspense boundaries for async components
- Optimized mobile 3D quality
- Reduced bundle size with tree shaking

## Recent Additions
- Testimonials section with 4 guest reviews
- CTA section with urgency messaging
- Scroll progress indicator at top
- Scroll to top button
- Floating mobile navigation
- Enhanced gallery with 20 images
- Rocket 3D component with animated flames

---
Built with ❤️ for space enthusiasts
