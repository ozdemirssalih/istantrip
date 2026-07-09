// Curated Unsplash stock imagery. All URLs use images.unsplash.com CDN.
// Loaded via next/image with remote pattern (configured in next.config.ts).

export const stock = {
  hero: {
    bosphorus: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1920&auto=format&fit=crop',
    galata: 'https://images.unsplash.com/photo-1541971297127-c4e6f5f1f0f0?w=1920&auto=format&fit=crop',
    sultanahmet: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1920&auto=format&fit=crop',
    balat: 'https://images.unsplash.com/photo-1568323554694-5cabf74ea9d5?w=1920&auto=format&fit=crop',
    yacht: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1920&auto=format&fit=crop',
    tram: 'https://images.unsplash.com/photo-1580047253193-c7c39f8e9e04?w=1920&auto=format&fit=crop',
    dome: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=1920&auto=format&fit=crop',
    street: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1920&auto=format&fit=crop',
  },
  gallery: [
    'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541971297127-c4e6f5f1f0f0?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568323554694-5cabf74ea9d5?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580047253193-c7c39f8e9e04?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1527838832700-5059252407fa?w=1200&auto=format&fit=crop',
  ],
  transfer: {
    hero: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1920&auto=format&fit=crop',
    car: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop',
  },
  about: {
    hero: 'https://images.unsplash.com/photo-1602931395636-13e1c34e2ed2?w=1920&auto=format&fit=crop',
    guide: 'https://images.unsplash.com/photo-1580047253193-c7c39f8e9e04?w=1200&auto=format&fit=crop',
  },
} as const;

export const HERO_VIDEO = '/hero.mp4';
