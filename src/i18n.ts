import { createI18n } from 'vue-i18n';
import it from './locales/it';
import en from './locales/en';

export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];

export const DEFAULT_LOCALE: Locale = 'en';
const STORAGE_KEY = 'agromate-locale';

function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale);
}

/** The user's saved language, otherwise the browser's, otherwise the default one. */
function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (isLocale(saved)) return saved;
  } catch {
    // localStorage unavailable (e.g. private browsing): fall back to the browser language
  }
  for (const language of navigator.languages ?? [navigator.language]) {
    const code = language.slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return DEFAULT_LOCALE;
}

export const messages = { it, en } satisfies Record<Locale, typeof it>;

const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages,
});

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale;
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // the preference only lasts for the current session
  }
}

export default i18n;
