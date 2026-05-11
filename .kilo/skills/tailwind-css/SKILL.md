---
name: tailwind-css
description: Tailwind CSS v4 best practices for this project. Use when adding or editing Tailwind utility classes in .astro templates, customizing the design system with @theme, adding custom colors or fonts, configuring dark mode, writing responsive styles, or asking about Tailwind v4 syntax, @import, CSS variables, or why there is no tailwind.config.js.
metadata:
  version: 1.0.0
  project: multilaunch
---

# Tailwind CSS v4 Guide

This project uses **Tailwind CSS v4.3.0** integrated via the `@tailwindcss/vite` plugin. There is **no `tailwind.config.js`** — all configuration is CSS-first using the `@theme` directive.

## Setup (Already Configured)

The integration is already wired up in `astro.config.mjs`:

```javascript
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
```

And the CSS entry point imports Tailwind:

```css
/* src/styles/global.css or style.css */
@import "tailwindcss";
```

Do not create a `tailwind.config.js` or `postcss.config.js` — Tailwind v4 uses the Vite plugin, not PostCSS.

## Applying Utility Classes

Apply classes directly in `.astro` templates:

```astro
<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md">
  <h2 class="text-xl font-bold text-gray-900">Title</h2>
  <p class="text-sm text-gray-500">Description</p>
</div>
```

## Customizing the Theme (@theme)

In Tailwind v4, customize design tokens in CSS using `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Custom colors — available as bg-brand-500, text-brand-500, etc. */
  --color-brand-500: oklch(0.62 0.24 259);
  --color-brand-600: oklch(0.54 0.25 262);

  /* Custom fonts — available as font-display */
  --font-display: "Inter", sans-serif;

  /* Custom spacing — extends the spacing scale */
  --spacing-18: 4.5rem;

  /* Custom breakpoints */
  --breakpoint-3xl: 120rem;
}
```

**Do NOT use** `@layer` to extend theme — use `@theme` only. This is a v4 breaking change from v3.

## Dark Mode

This project has a `ThemeSwitcher.astro` component. Dark mode is implemented using CSS custom properties or the `dark:` variant. To use class-based dark mode:

```css
@import "tailwindcss";

/* Enable class-based dark mode */
@variant dark (&:where(.dark, .dark *));
```

Then use `dark:` variant in templates:

```astro
<div class="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  Content
</div>
```

## Responsive Design

Use breakpoint prefixes. Tailwind v4 defaults:
- `sm:` — 40rem (640px)
- `md:` — 48rem (768px)
- `lg:` — 64rem (1024px)
- `xl:` — 80rem (1280px)
- `2xl:` — 96rem (1536px)

Mobile-first approach (no prefix = all sizes, add prefix for larger):

```astro
<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
```

## Adding Custom Styles with @layer

For component-level CSS that needs to coexist with Tailwind:

```css
@import "tailwindcss";

@layer components {
  .corner-effect {
    position: relative;
  }
  .corner-effect::before {
    content: '';
    position: absolute;
    /* custom styles */
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}
```

## CSS Variables in Tailwind v4

All theme variables become CSS custom properties on `:root`:

```css
/* Use theme tokens in custom CSS */
.custom-element {
  color: var(--color-brand-500);
  font-size: var(--text-lg);
  padding: calc(var(--spacing) * 4); /* = 1rem with default --spacing: 0.25rem */
}
```

## Arbitrary Values

Use square brackets for one-off values not in the theme:

```astro
<div class="top-[117px] w-[calc(100%-2rem)] bg-[#1a1a2e]">
```

## Common Patterns in This Project

The project uses a monochrome/dark design. Common patterns seen:

```astro
<!-- Card with border -->
<div class="border border-border bg-card p-6">

<!-- Muted text -->
<p class="text-xs text-muted uppercase tracking-widest">

<!-- Mono font for code/labels -->
<span class="font-mono text-sm">

<!-- Grid layout with col-start -->
<div class="col-start-2 grid">
```

## Troubleshooting

**Classes not applying / utility class missing**
- Ensure `@import "tailwindcss"` is at the top of the CSS file.
- Check that the CSS file is imported in the layout component.
- Tailwind v4 scans source files automatically via the Vite plugin — no content config needed.

**Custom color not generating utilities**
- Define it in `@theme` with the correct namespace: `--color-name-shade: value`
- Avoid defining colors in `:root` — they won't generate utility classes.

**Dark mode classes not working**
- Ensure the dark mode variant is configured: `@variant dark (&:where(.dark, .dark *))` in the CSS.
- Check that the `dark` class is toggled on `<html>` or `<body>`.

**tailwind.config.js changes have no effect**
- This project does NOT use `tailwind.config.js`. All config belongs in CSS with `@theme`.
