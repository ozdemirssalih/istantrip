// Verified Unsplash CDN images. All tested to return 200.

const IMG = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&auto=format&fit=crop`;

export const stock = {
  hero: {
    bosphorus: IMG('1524231757912-21f4fe3a7200', 1920),
    galata: IMG('1520250497591-112f2f40a3f4', 1920),
    sultanahmet: IMG('1541432901042-2d8bd64b4a9b', 1920),
    dome: IMG('1584132915807-fd1f5fbc078f', 1920),
    yacht: IMG('1596436889106-be35e843f974', 1920),
    street: IMG('1527838832700-5059252407fa', 1920),
    tram: IMG('1518391846015-55a9cc003b25', 1920),
    luxury: IMG('1523805009345-7448845a9e53', 1920),
  },
  gallery: [
    IMG('1524231757912-21f4fe3a7200', 1200),
    IMG('1520250497591-112f2f40a3f4', 1200),
    IMG('1541432901042-2d8bd64b4a9b', 1200),
    IMG('1584132915807-fd1f5fbc078f', 1200),
    IMG('1596436889106-be35e843f974', 1200),
    IMG('1527838832700-5059252407fa', 1200),
    IMG('1566073771259-6a8506099945', 1200),
    IMG('1533106497176-45ae19e68ba2', 1200),
  ],
  transfer: {
    hero: IMG('1494526585095-c41746248156', 1920),
    car: IMG('1503676260728-1c00da094a0b', 1600),
  },
  about: {
    hero: IMG('1533089860892-a7c6f0a88666', 1920),
    guide: IMG('1518098268026-4e89f1a2cd8e', 1200),
  },
  poster: IMG('1524231757912-21f4fe3a7200', 1920),
} as const;

export const HERO_VIDEO = '/hero.mp4';
