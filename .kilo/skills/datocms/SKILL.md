---
name: datocms
description: DatoCMS headless CMS integration best practices. Use when fetching content from DatoCMS, writing GraphQL queries, using the DATOCMS_API_TOKEN, handling localization in CMS data, working with images from DatoCMS, querying records, understanding content models, or troubleshooting DatoCMS API errors.
metadata:
  version: 1.0.0
  project: multilaunch
---

# DatoCMS Guide

This project uses **DatoCMS** as a headless CMS. Content is fetched at build time via the **GraphQL Content Delivery API** using `DATOCMS_API_TOKEN`. The project ID is `150921` (MultiLaunch template).

## API Endpoint

```
https://graphql.datocms.com/
```

All requests use `POST` with a JSON body. Authentication via Bearer token.

## Making a Request

### Basic Fetch Pattern

```typescript
async function datocmsRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${import.meta.env.DATOCMS_API_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`DatoCMS error: ${response.status} ${response.statusText}`);
  }

  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(errors)}`);
  }
  return data as T;
}
```

### In Astro Frontmatter (Build Time)

```astro
---
const { allBrands } = await datocmsRequest<{ allBrands: Brand[] }>(`
  query AllBrands {
    allBrands {
      id
      name
      slug
      logo {
        url
        alt
        width
        height
      }
    }
  }
`);
---

{allBrands.map(brand => (
  <div>{brand.name}</div>
))}
```

## Localization

DatoCMS supports per-field localization. This project uses 6 locales: `en`, `es`, `fr`, `de`, `nl`, `pl`.

**Query localized content by locale:**

```graphql
query AllBrandsLocalized($locale: SiteLocale) {
  allBrands(locale: $locale) {
    id
    name         # returns locale-specific value
    description  # returns locale-specific value
  }
}
```

**Pass the current locale as a variable:**

```astro
---
const locale = Astro.currentLocale ?? 'en';
const { allBrands } = await datocmsRequest(`...query...`, { locale });
---
```

**Fallback locales:** Configure in DatoCMS settings. The API returns the fallback value if the requested locale is missing.

## Common Query Patterns

**Fetch all records:**
```graphql
query {
  allBrands {
    id
    name
    slug
  }
}
```

**Fetch a single record by slug:**
```graphql
query BrandBySlug($slug: String!) {
  brand(filter: { slug: { eq: $slug } }) {
    id
    name
    description
  }
}
```

**Pagination:**
```graphql
query BrandsPaginated($skip: IntType, $first: IntType) {
  allBrands(skip: $skip, first: $first) {
    id
    name
  }
  _allBrandsMeta {
    count
  }
}
```

**Ordering:**
```graphql
query {
  allBrands(orderBy: name_ASC) {
    id
    name
  }
}
```

## Images

DatoCMS serves images via a CDN. Query image fields with `url`, `alt`, `width`, `height`:

```graphql
query {
  allBrands {
    logo {
      url
      alt
      width
      height
      # Responsive image with transformations:
      responsiveImage(imgixParams: { auto: format, fit: crop, w: 400, h: 300 }) {
        src
        srcSet
        sizes
        width
        height
        alt
        base64
      }
    }
  }
}
```

Use `responsiveImage` for optimized images with automatic format selection.

## Environment Variable

CRITICAL: The API token must be set in the environment:

```bash
# .env (local development)
DATOCMS_API_TOKEN=your-read-only-token-here
```

In Netlify, set `DATOCMS_API_TOKEN` in Site configuration > Environment variables.

Use the **read-only Content Delivery API token** (not the full-access CMA token).

## TypeScript Types

Define interfaces for your CMS models:

```typescript
interface DatoCMSImage {
  url: string;
  alt: string | null;
  width: number;
  height: number;
}

interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: DatoCMSImage | null;
  description?: string;
}
```

## Troubleshooting

**Error: 401 Unauthorized**
- Check that `DATOCMS_API_TOKEN` is set in `.env` (local) or Netlify env vars (production).
- Verify you're using the CDA (read-only) token, not the CMA token.

**Error: Field 'X' doesn't exist on type 'Y'**
- The field name may differ from what you expect. Use the DatoCMS GraphQL Explorer at `https://graphql.datocms.com/` (add `Authorization: Bearer TOKEN` header) to explore your schema.

**Missing locale data / null values**
- The locale may not be configured in DatoCMS for that field.
- Add a fallback: `brand.name ?? 'Untitled'`

**Rate limiting**
- DatoCMS CDA has generous limits. If you hit them, add request caching or use `getStaticPaths` to batch requests.

**Build fails with GraphQL syntax error**
- GraphQL queries must use double quotes for strings: `{ brand(filter: { slug: { eq: "my-slug" } }) }`
- Test your query in the DatoCMS GraphQL Explorer first.
