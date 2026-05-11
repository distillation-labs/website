# Copilot instructions

## Build and run

```bash
bun install          # install dependencies
bun dev              # start dev server (http://localhost:4321)
bun run build        # production build → dist/
bun run preview      # preview the built site locally
```

No lint or test scripts exist yet.

## Architecture

Astro 6 static marketing site for Distillation Labs, deployed to Netlify (`netlify.toml` → `bun run build` / `dist/`).

**Route structure:**
- `src/pages/index.astro` — redirects `301` to `/en/`
- `src/pages/[locale]/index.astro` — home page for each locale
- `src/pages/[locale]/contextro/index.astro` — Contextro product page
- `src/pages/[locale]/contextro/docs.astro` — Contextro docs page
- Every `[locale]` page must export `getStaticPaths()` returning all 6 locales from `getAvailableLocales()`.

**i18n:**
- Locales: `en`, `es`, `fr`, `de`, `nl`, `pl`; default is `en`, all prefixed (including `/en/`).
- `src/lib/i18n.js` — `getAvailableLocales()`, `getFallbackLocale()`, `getLocaleSlug()`
- `src/lib/translations.ts` — `getTranslations(locale)` returns the `Translations` typed object; `LOCALE_NAMES` maps locale codes to display names. **Add every new copy key to all 6 locale objects here.**

**Layout:**
- `src/layouts/Layout.astro` wraps all pages. It accepts optional props: `logos`, `primaryColor` (overrides `--color-primary`), `showNav` (default `true`). It renders `<Header>`, a full-bleed `<main>`, and a trailing `<Line />`.

**Styling:**
- Tailwind CSS 4 via Vite plugin (no `tailwind.config.*` file).
- Theme tokens are defined in `src/styles/global.css` under `@theme`: `background`, `foreground`, `card`, `card-foreground`, `primary`, `primary-foreground`, `muted`, `border`.
- Page files import `../../styles/style.css` (which imports `global.css`). Do not import `global.css` directly.
- Custom utility classes in `global.css`: `corner-effect` / `corner` (animated bracket corners on hover), `product-card` / `product-overlay` / `product-pattern` (hover reveal effect), `sr-only`.

## Conventions

**Imports:** Use the `@/` alias for anything under `src/` (e.g. `import Layout from '@/layouts/Layout.astro'`).

**Locale-aware links:** Use `getRelativeLocaleUrl(locale, '/path')` from `astro:i18n` in page files. `Header.astro` uses its own inline `getLocaleUrl()` helper instead — keep that pattern only within the header.

**Adding a new page:**
1. Create it at `src/pages/[locale]/your-page.astro`.
2. Export `getStaticPaths()` using `getAvailableLocales()`.
3. Destructure `const { locale } = Astro.params` and pass it to `getRelativeLocaleUrl` for any internal links.
4. Import `../styles/style.css` (adjust depth as needed).

**Adding new translated copy:**
1. Add the key and type to the `Translations` interface in `translations.ts`.
2. Add the value for all 6 locale objects in the same file.
3. Access it as `const t = getTranslations(locale); t.yourKey`.

**Visual language:** Dark theme (`#0a0a0a` background). Sections use `border-b border-border` dividers. Cards use `bg-card` with `border border-border`. Typography is mono-heavy (`font-mono`, `uppercase`, tight `tracking-[0.2em]`). Primary CTAs use the `corner-effect` + `corner` span pattern. Secondary CTAs use `bg-card` instead of `bg-primary`. Use `<Line />` between major sections.

**Client-side JS:** Keep it scoped inline with `<script>` inside the relevant `.astro` file (see the ASCII logo animation in `[locale]/index.astro`). TypeScript is supported inside `<script>` blocks.
