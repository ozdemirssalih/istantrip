import 'server-only';

const dictionaries = {
  tr: () => import('./dictionaries/tr.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  ar: () => import('./dictionaries/ar.json').then((m) => m.default),
  ru: () => import('./dictionaries/ru.json').then((m) => m.default),
} as const;

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = 'tr';

export const rtlLocales: Locale[] = ['ar'];
export const isRtl = (locale: Locale) => rtlLocales.includes(locale);

export const hasLocale = (locale: string): locale is Locale => locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
