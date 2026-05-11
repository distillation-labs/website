---
name: netlify
description: Netlify deployment best practices for this static Astro site. Use when deploying to Netlify, configuring netlify.toml, setting environment variables, troubleshooting build failures, configuring redirects or headers, or asking about build commands, publish directory, or Netlify-specific configuration for this project.
metadata:
  version: 1.0.0
  project: multilaunch
---

# Netlify Deployment Guide

This project deploys to **Netlify** as a **fully static site**. No SSR adapter is needed. The build output is in `dist/`.

## Current Configuration

`netlify.toml` (already configured):

```toml
[build]
command = "bun run build"
publish = "dist"
```

This tells Netlify to:
1. Run `bun run build` (which runs `astro build`)
2. Serve files from the `dist/` directory

## Environment Variables

The `DATOCMS_API_TOKEN` must be set in Netlify for production builds to succeed.

**Setting env vars in Netlify:**
1. Go to Site configuration > Environment variables
2. Add `DATOCMS_API_TOKEN` with your DatoCMS read-only CDA token
3. Set scope: "All scopes" (or at minimum: Production, Deploy previews)

**Local development:** Use `.env` file (never commit to git):

```bash
# .env
DATOCMS_API_TOKEN=your-token-here
```

## Redirects

Add redirects to `netlify.toml`:

```toml
[build]
command = "bun run build"
publish = "dist"

[[redirects]]
from = "/"
to = "/en/"
status = 302

[[redirects]]
from = "/old-path"
to = "/new-path"
status = 301
```

Or use a `public/_redirects` file (Netlify format):

```
/old-path  /new-path  301
/          /en/       302
```

## Custom Headers

Add HTTP headers via `netlify.toml`:

```toml
[[headers]]
for = "/*"
  [headers.values]
  X-Frame-Options = "DENY"
  X-Content-Type-Options = "nosniff"
  Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
for = "/assets/*"
  [headers.values]
  Cache-Control = "public, max-age=31536000, immutable"
```

Or use `public/_headers` file:

```
/*
  X-Frame-Options: DENY

/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

## Build Contexts

Configure different settings per deploy context:

```toml
[build]
command = "bun run build"
publish = "dist"

[context.production]
command = "bun run build"

[context.deploy-preview]
command = "bun run build"

[context.branch-deploy]
command = "bun run build"
```

## Deploy Previews

Netlify automatically creates preview deployments for pull requests. Each PR gets a unique URL. Environment variables set to "All scopes" or "Deploy previews" are available in these builds.

## Triggering Rebuilds for CMS Changes

Since this is a static site, content changes in DatoCMS won't update the site until a new build runs.

**Set up a DatoCMS build hook:**
1. In Netlify: Site configuration > Build hooks > Add build hook
2. Copy the webhook URL
3. In DatoCMS: Settings > Webhooks > Add webhook
4. Paste the Netlify hook URL, trigger on content publish

## Manual Deploy

To deploy manually from the CLI:

```bash
# Build first
bun run build

# Deploy with Netlify CLI (if installed)
bunx netlify deploy --prod --dir=dist
```

## Checking Build Logs

When a build fails:
1. Go to Netlify dashboard > Deploys
2. Click the failed deploy
3. Expand "Deploy log" to see the full output

Common failure points:
- Missing `DATOCMS_API_TOKEN`
- TypeScript type errors (strict mode)
- Missing dependencies (run `bun install` locally first)

## Troubleshooting

**Build fails with "DATOCMS_API_TOKEN is not defined"**
- Add the env var in Netlify Site configuration > Environment variables.
- Ensure the scope includes Production.

**404 on locale routes (e.g., /en/about)**
- For static sites with `prefixDefaultLocale: true`, ensure all locale pages are built.
- Add a redirect from `/` to `/en/` in `netlify.toml`.

**Old content showing after CMS update**
- Trigger a manual redeploy from Netlify dashboard.
- Or set up a DatoCMS webhook to auto-trigger rebuilds.

**Build succeeds locally but fails on Netlify**
- Check that all env vars are set in Netlify (local `.env` is not used in CI).
- Ensure `bun.lock` is committed — Netlify uses it to install exact versions.
- Check Node.js/Bun version compatibility in Netlify build settings.
