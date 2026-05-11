# Copilot instructions

## Build and run

- `bun install` — install dependencies.
- `bun dev` — start the Astro dev server.
- `bun run build` — production build.
- `bun run preview` — preview the built site locally.
- `bun run astro` — run the Astro CLI directly.

There is no dedicated lint or test script in `package.json` yet, so there is no single-test command to run.

## Architecture

- This is an Astro 6 marketing site for Distillation Labs with Tailwind CSS 4 and a Netlify static deployment.
- Routes are locale-prefixed for `en`, `es`, `fr`, `de`, `nl`, and `pl`; `/` redirects to `/en/`.
- `src/pages/[locale]/index.astro` and the `contextro` pages generate static paths for every locale with `getStaticPaths()`.
- `src/layouts/Layout.astro` provides the shared shell: header, main container, theme variables, and the shared `Line` divider.
- `src/lib/i18n.js` centralizes locale helpers; `src/lib/translations.ts` stores locale copy and locale display names.
- The root page redirects to `/en/`; public pages use locale-prefixed routes.
- Shared UI lives in `src/components/`; most components are presentational Astro components styled with Tailwind utilities plus a few custom classes from `src/styles/global.css`.

## Conventions

- Use the `@/` alias for imports from `src/`.
- Keep locale-aware links and routing helpers consistent with `astro:i18n` (`getRelativeLocaleUrl`, `Astro.currentLocale`, `Astro.params.locale`).
- When adding new public pages, decide whether they need a locale prefix and wire them through `getStaticPaths()` if they do.
- Import `src/styles/style.css` from page files that need the shared theme; that file pulls in `global.css`.
- Reuse the existing visual language: mono-heavy typography, uppercase labels, border/card panels, and the `corner-effect` / `corner` pattern for primary actions.
- Keep interactive client-side JavaScript scoped to the page or component that needs it; the home page’s ASCII logo animation is an example of a local inline script.
