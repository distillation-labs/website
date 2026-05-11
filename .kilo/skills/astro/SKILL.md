---
name: astro
description: Best practices for building with Astro v6 on this project. Use when creating or editing .astro components, pages, layouts, or when working with i18n routing, Astro.props, slots, static data fetching, Astro.currentLocale, or asking about Astro component structure, frontmatter, template syntax, or file-based routing.
metadata:
  version: 1.0.0
  project: multilaunch
---

# Astro Development Guide

This project uses **Astro v6.3.1** with `output: "static"` (fully static build, no SSR). All components are native `.astro` files — no React, Vue, or other UI framework adapters are installed.

## Component Structure

Every `.astro` file has two parts separated by `---`:

```astro
---
// Frontmatter: TypeScript/JavaScript runs at BUILD TIME only
// Imports, data fetching, variable declarations go here
import SomeComponent from '@/components/SomeComponent.astro';
const { title } = Astro.props;
---

<!-- Template: HTML + Astro expressions -->
<h1>{title}</h1>
<SomeComponent />
```

- Code inside `---` fences runs server-side at build time. It never ships to the browser.
- Use `{expression}` in templates for dynamic values.
- Always use the `@` alias (`@/components/...`, `@/lib/...`) for imports from `src/`.

## TypeScript Props Interface

Always define a `Props` interface in component frontmatter:

```astro
---
interface Props {
  title: string;
  description?: string;
  class?: string;
}

const { title, description = '', class: className = '' } = Astro.props;
---
```

## Slots

Use `<slot />` for composable components:

```astro
<!-- Layout.astro -->
<div class="wrapper">
  <slot name="header" />
  <main><slot /></main>
  <slot name="footer" />
</div>

<!-- Usage -->
<Layout>
  <h1 slot="header">Page Title</h1>
  <p>Main content goes in the default slot.</p>
</Layout>
```

## i18n Routing (Critical)

This project uses **6 locales**: `en`, `es`, `fr`, `de`, `nl`, `pl` with `prefixDefaultLocale: true`. All URLs include the locale prefix (e.g., `/en/`, `/fr/`).

**Accessing current locale:**
```astro
---
const currentLocale = Astro.currentLocale ?? 'en';
---
```

**Generating locale-aware URLs:**
```astro
---
const getLocaleUrl = (path = '/') => {
  const normalizedPath = path === '/' ? '' : path;
  return `/${currentLocale}${normalizedPath}`;
};
---
<a href={getLocaleUrl('/about')}>About</a>
```

**Dynamic locale pages:** Place pages in `src/pages/[locale]/` to serve all locales. Use `getStaticPaths()` to generate paths:

```astro
---
export function getStaticPaths() {
  return ['en', 'es', 'fr', 'de', 'nl', 'pl'].map(locale => ({
    params: { locale },
  }));
}
const { locale } = Astro.params;
---
```

## Data Fetching

Since this is a static build, all fetching happens at build time in frontmatter:

```astro
---
// Fetch during build — result is baked into the HTML
const response = await fetch(`https://graphql.datocms.com/`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${import.meta.env.DATOCMS_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query: `{ allBrands { name } }` }),
});
const { data } = await response.json();
---
```

Never use `fetch` inside the template or in client-side `<script>` tags for CMS content — it won't have access to the server-side environment token.

## Client-Side Scripts

For interactive browser behavior, use `<script>` tags in templates:

```astro
<button id="toggle">Toggle</button>

<script>
  // This runs in the browser
  document.getElementById('toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
</script>
```

Scripts in `<script>` are bundled by Vite. Use `is:inline` to skip bundling.

## Styling

Apply Tailwind CSS utility classes directly in templates. Scoped styles use `<style>`:

```astro
<p class="text-sm text-muted">Content</p>

<style>
  /* Scoped to this component only */
  p { margin-top: 0; }
</style>
```

## Common Patterns

**Conditional rendering:**
```astro
{condition && <p>Shown when true</p>}
{condition ? <A /> : <B />}
```

**List rendering:**
```astro
<ul>
  {items.map(item => <li key={item.id}>{item.name}</li>)}
</ul>
```

**Dynamic classes:**
```astro
<div class:list={['base-class', { active: isActive }, extraClass]}>
```

## Troubleshooting

**Error: `Astro.currentLocale` is undefined**
- Ensure the page is under `src/pages/[locale]/` or the locale routing is configured.
- Fall back: `const locale = Astro.currentLocale ?? 'en'`

**Error: Environment variable undefined**
- For `output: "static"`, use `import.meta.env.VARIABLE_NAME` (not `process.env`).
- Ensure `.env` is set up with the variable or it's configured in Netlify.

**Build fails with missing module**
- Run `bun install` to install dependencies.
- Check that import paths use `@/` prefix for `src/` files.

**Component not re-rendering**
- Static sites build once. Dynamic data requires client-side fetch in `<script>` or a rebuild.
