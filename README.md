# Distillation Labs Website

![Distillation Labs preview](public/images/image.png)

Multilingual marketing site for Distillation Labs built with Astro and Tailwind CSS. The project includes the localized home page, about page, products overview, and product/docs pages for Contextro and Agentyc, with language-prefixed routes and a safe redirect from the root path to `/en/`.

## Stack

- Astro 6
- Tailwind CSS 4
- Bun
- Netlify static deployment

## What's included

- Localized home page in six languages: en, es, fr, de, nl, and pl
- Product page for Contextro
- Documentation page for Contextro
- Product page for Agentyc
- Documentation page for Agentyc
- Localized products overview page
- Localized about page
- Language switcher in the navigation
- Page-level metadata and canonical tags
- Root redirect from / to /en/

## Main routes

- / redirects to /en/
- /en/
- /es/
- /fr/
- /de/
- /nl/
- /pl/
- /[locale]/about
- /[locale]/products
- /[locale]/contextro
- /[locale]/contextro/docs
- /[locale]/agentyc
- /[locale]/agentyc/docs

## Local development

### Requirements

- Bun

### Commands

```bash
bun install
bun dev
bun run build
bun run preview
```

## Structure

```text
.
├── public/
│   ├── images/
│   └── scripts/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   └── styles/
├── astro.config.mjs
├── middleware.ts
└── package.json
```

## Routing notes

- The default locale is en.
- All public pages use a language prefix.
- The root route always redirects to /en/ to avoid locale-less paths.

## Content notes

- `src/lib/translations.ts` contains shared localized UI labels and short product copy.
- `src/lib/pageContent.ts` contains the long-form localized content for about, product, and docs pages.
- `src/lib/productsContent.ts` contains the localized long-form content for the `/[locale]/products` overview page.
- `src/layouts/Layout.astro` owns shared metadata tags, canonical URL generation, and the locale-aware `<html lang>` attribute.
