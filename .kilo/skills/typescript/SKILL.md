---
name: typescript
description: TypeScript best practices for this Astro project. Use when writing TypeScript in .astro frontmatter or .ts files, defining interfaces or types, using the @ path alias, fixing type errors, typing Astro props, importing types, or asking about tsconfig, strict mode, type inference, or TypeScript patterns in this codebase.
metadata:
  version: 1.0.0
  project: multilaunch
---

# TypeScript Guide

This project uses **TypeScript in strict mode** (`extends: "astro/tsconfigs/strict"`). All `.astro` component frontmatter is TypeScript. Standalone logic lives in `.ts` files under `src/lib/`.

## tsconfig

Key settings in `tsconfig.json`:
- `extends: "astro/tsconfigs/strict"` — enables strict null checks, no implicit any, etc.
- `baseUrl: "."` with `paths: { "@/*": ["src/*"] }` — `@` resolves to `src/`
- `include: [".astro/types.d.ts", "**/*"]`

## Path Alias

Always use `@/` for imports from `src/`:

```typescript
// CORRECT
import getTranslations from '@/lib/translations';
import Header from '@/components/Header.astro';

// WRONG — avoid relative paths for src/ files
import getTranslations from '../../lib/translations';
```

## Typing Astro Props

Define a `Props` interface in every `.astro` component frontmatter:

```astro
---
interface Props {
  title: string;           // required string
  count?: number;          // optional number (undefined by default)
  variant?: 'primary' | 'secondary'; // union literal type
  class?: string;          // class passthrough pattern
  children?: any;          // for slot content (rarely needed)
}

const {
  title,
  count = 0,
  variant = 'primary',
  class: className = '',
} = Astro.props;
---
```

## Common Utility Types

```typescript
// Make all properties optional
type PartialBrand = Partial<Brand>;

// Pick specific fields
type BrandPreview = Pick<Brand, 'name' | 'slug' | 'logo'>;

// Record type for key-value maps
const translations: Record<string, string> = {};

// Non-nullable assertion (use sparingly — prefer null checks)
const el = document.getElementById('app')!;

// Type narrowing with guards
function isString(val: unknown): val is string {
  return typeof val === 'string';
}
```

## Typing Translation Data

The project's translations pattern in `src/lib/translations.ts`:

```typescript
export interface Translations {
  tagline: string;
  description: string;
  // add new fields here
}

const translations: Record<string, Translations> = {
  en: { tagline: '...', description: '...' },
  es: { tagline: '...', description: '...' },
};

export default function getTranslations(locale: string): Translations {
  return translations[locale] ?? translations['en']!;
}
```

When adding new translatable fields:
1. Add the field to the `Translations` interface
2. Add the value for every locale (`en`, `es`, `fr`, `de`, `nl`, `pl`)
3. TypeScript will error if any locale is missing the field

## Environment Variables

Use `import.meta.env` with type safety. For static builds, env vars are baked in at build time:

```typescript
// Accessing env vars (typed via vite's ImportMeta)
const token = import.meta.env.DATOCMS_API_TOKEN;

// Type assertion when you're certain it's set
const token = import.meta.env.DATOCMS_API_TOKEN as string;
```

To add type declarations for custom env vars, create `src/env.d.ts`:

```typescript
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DATOCMS_API_TOKEN: string;
  // add more env vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

## Type Imports

Use `import type` for type-only imports to avoid runtime overhead:

```typescript
import type { Translations } from '@/lib/translations';
import type { ImageMetadata } from 'astro';
```

## Strict Mode Patterns

With strict mode enabled, these patterns are enforced:

**No implicit any:**
```typescript
// WRONG
function process(data) { ... }

// CORRECT
function process(data: unknown): void { ... }
```

**Null checks required:**
```typescript
// WRONG (strict mode errors)
const len = someString.length; // if someString could be undefined

// CORRECT
const len = someString?.length ?? 0;
```

**Non-null assertion (use sparingly):**
```typescript
// Only use ! when you're 100% certain the value exists
const el = document.querySelector('.app')!;
```

## Troubleshooting

**Error: Property 'X' does not exist on type 'Props'**
- Add the property to the `Props` interface in the component frontmatter.

**Error: Type 'undefined' is not assignable to type 'string'**
- Provide a default value when destructuring: `const { val = '' } = Astro.props`
- Or mark it optional in Props: `val?: string`

**Error: Cannot find module '@/...'**
- Verify `tsconfig.json` has the `@` path alias configured.
- Run `bun run astro sync` to regenerate `.astro/types.d.ts`.

**Error: Object is possibly 'undefined'**
- Use optional chaining: `obj?.property`
- Or add a null check: `if (obj) { ... }`
