const LOCALES = ["en", "es", "fr", "de", "nl", "pl"];

export default function getAvailableLocales() {
  return LOCALES;
}

export function getFallbackLocale() {
  return LOCALES[0];
}

export function getLocaleSlug(locale, path) {
  const slug = path.split("/").slice(2).join("/");
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}
