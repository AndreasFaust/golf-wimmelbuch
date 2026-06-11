import type { LocaleObject } from "@nuxtjs/i18n";

export const APP_LOCALES = [
  { code: "de", name: "Deutsch", file: "de.json" },
  { code: "en", name: "English", file: "en.json" },
  { code: "fr", name: "Français", file: "fr.json" },
  { code: "es", name: "Español", file: "es.json" },
  { code: "it", name: "Italiano", file: "it.json" },
  { code: "nl", name: "Nederlands", file: "nl.json" },
  { code: "pt", name: "Português", file: "pt.json" },
  { code: "pl", name: "Polski", file: "pl.json" },
  { code: "cs", name: "Čeština", file: "cs.json" },
  { code: "sk", name: "Slovenčina", file: "sk.json" },
  { code: "hu", name: "Magyar", file: "hu.json" },
  { code: "hr", name: "Hrvatski", file: "hr.json" },
  { code: "sl", name: "Slovenščina", file: "sl.json" },
  { code: "da", name: "Dansk", file: "da.json" },
  { code: "sv", name: "Svenska", file: "sv.json" },
  { code: "nb", name: "Norsk", file: "nb.json" },
  { code: "fi", name: "Suomi", file: "fi.json" },
  { code: "lt", name: "Lietuvių", file: "lt.json" },
  { code: "lv", name: "Latviešu", file: "lv.json" },
  { code: "et", name: "Eesti", file: "et.json" },
  { code: "el", name: "Ελληνικά", file: "el.json" },
  { code: "ro", name: "Română", file: "ro.json" },
  { code: "bg", name: "Български", file: "bg.json" },
] satisfies LocaleObject[];

/** Maps app locale codes to @nuxt/ui/locale export keys when they differ. */
export const NUXT_UI_LOCALE_CODES: Record<string, string> = {
  nb: "nb_no",
};

export function getNuxtUiLocaleCode(code: string): string {
  return NUXT_UI_LOCALE_CODES[code] ?? code;
}

/** German language names for operator notifications. */
export const APP_LOCALE_GERMAN_NAMES: Record<string, string> = {
  de: "Deutsch",
  en: "Englisch",
  fr: "Französisch",
  es: "Spanisch",
  it: "Italienisch",
  nl: "Niederländisch",
  pt: "Portugiesisch",
  pl: "Polnisch",
  cs: "Tschechisch",
  sk: "Slowakisch",
  hu: "Ungarisch",
  hr: "Kroatisch",
  sl: "Slowenisch",
  da: "Dänisch",
  sv: "Schwedisch",
  nb: "Norwegisch",
  fi: "Finnisch",
  lt: "Litauisch",
  lv: "Lettisch",
  et: "Estnisch",
  el: "Griechisch",
  ro: "Rumänisch",
  bg: "Bulgarisch",
};

/** Site locale label in German for operator emails (e.g. "Französisch (fr)"). */
export function getAppLocaleDisplay(code: unknown): string {
  if (typeof code !== "string" || !code.trim()) return "Unbekannt";
  const name = APP_LOCALE_GERMAN_NAMES[code];
  return name ? `${name} (${code})` : code;
}

export const OG_LOCALE_MAP: Record<string, string> = {
  de: "de_DE",
  en: "en_US",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  nl: "nl_NL",
  pt: "pt_PT",
  pl: "pl_PL",
  cs: "cs_CZ",
  sk: "sk_SK",
  hu: "hu_HU",
  hr: "hr_HR",
  sl: "sl_SI",
  da: "da_DK",
  sv: "sv_SE",
  nb: "nb_NO",
  fi: "fi_FI",
  lt: "lt_LT",
  lv: "lv_LV",
  et: "et_EE",
  el: "el_GR",
  ro: "ro_RO",
  bg: "bg_BG",
};

export function getOgLocale(code: string): string {
  return OG_LOCALE_MAP[code] ?? OG_LOCALE_MAP.en;
}

export function getOgLocaleAlternates(currentCode: string): string[] {
  return Object.entries(OG_LOCALE_MAP)
    .filter(([code]) => code !== currentCode)
    .map(([, ogLocale]) => ogLocale);
}
