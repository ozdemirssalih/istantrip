// Real Istanbul photos, sourced from Wikimedia Commons via Wikipedia REST API.
// Stored locally under /public/images/* — no external CDN dependency.

const H = (name: string) => `/images/hero/${name}.jpg`;
const T = (name: string) => `/images/tours/${name}.jpg`;
const HT = (name: string) => `/images/hotels/${name}.jpg`;

export const stock = {
  hero: {
    bosphorus: H('bosphorus'),
    galata: H('galata-tower'),
    sultanahmet: H('sultanahmet'),
    hagia: H('hagia-sophia'),
    blueMosque: H('blue-mosque'),
    balat: H('balat'),
    ortakoy: H('ortakoy'),
    grandBazaar: H('grand-bazaar'),
    topkapi: H('topkapi'),
    dolmabahce: H('dolmabahce'),
    basilica: H('basilica-cistern'),
    rumeli: H('rumeli-hisari'),
    karakoy: H('karakoy'),
    kadikoy: H('kadikoy'),
    yacht: H('bosphorus-yacht'),
    panorama: H('istanbul'),
  },
  gallery: [
    H('hagia-sophia'),
    H('galata-tower'),
    H('bosphorus'),
    H('balat'),
    H('blue-mosque'),
    H('ortakoy'),
    H('topkapi'),
    H('rumeli-hisari'),
  ],
  transfer: {
    hero: T('airport-vip'),
    car: H('istanbul'),
  },
  about: {
    hero: H('istanbul'),
    guide: H('sultanahmet'),
  },
  poster: H('hagia-sophia'),
} as const;

export const HERO_VIDEO = '/hero.mp4';
