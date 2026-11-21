import { createI18n } from 'vue-i18n';
import en from './locales/en';

// The site is English-only for now: the Italian translation lives on the local `i18n` branch.
export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const messages = { en } satisfies Record<Locale, typeof en>;

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages,
});

export default i18n;
