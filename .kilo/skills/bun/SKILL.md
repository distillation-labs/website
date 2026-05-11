---
name: bun
description: Bun package manager and runtime best practices for this project. Use when installing packages, running scripts, managing dependencies, adding or removing packages, or asking about bun install, bun run, bun add, bun remove, bun.lock, or why to use bun instead of npm or yarn.
metadata:
  version: 1.0.0
  project: multilaunch
---

# Bun Guide

This project uses **Bun v1.2.5** as the package manager and runtime. The `packageManager` field in `package.json` is set to `bun@1.2.5`. Use `bun` for all package operations — do NOT use `npm`, `yarn`, or `pnpm`.

## Core Commands

```bash
# Install all dependencies (equivalent to npm install)
bun install

# Run a package.json script
bun run dev        # start dev server
bun run build      # production build → dist/
bun run preview    # preview the build locally

# Add a package (equivalent to npm install <pkg>)
bun add <package>
bun add -D <package>   # dev dependency

# Remove a package
bun remove <package>

# Execute a local binary (equivalent to npx)
bunx <command>

# Run the Astro CLI directly
bun run astro -- <command>   # e.g. bun run astro -- sync
```

## Scripts in This Project

Defined in `package.json`:

| Script | Command | Purpose |
|--------|---------|---------|
| `dev` | `astro dev` | Start local dev server |
| `build` | `astro build` | Build static site to `dist/` |
| `preview` | `astro preview` | Preview built site |
| `astro` | `astro` | Direct Astro CLI access |

## Lock File

Bun uses `bun.lock` (binary format). Always commit `bun.lock` to version control. Do not commit `package-lock.json` or `yarn.lock`.

When you see lock file conflicts:
```bash
# Resolve by deleting and reinstalling
rm bun.lock
bun install
```

## Adding Dependencies

```bash
# Install a runtime dependency
bun add @datocms/cda-client

# Install a dev dependency
bun add -D @types/node

# Install an exact version
bun add astro@6.3.1

# Install from a specific tag
bun add astro@latest
```

After adding, verify the package appears in `package.json` `dependencies` or `devDependencies`.

## Environment Variables

Bun automatically loads `.env` files. For this project:

```bash
# .env (not committed to git)
DATOCMS_API_TOKEN=your-token-here
```

Access in code via `import.meta.env.DATOCMS_API_TOKEN` (Astro/Vite convention).

## Bun vs Node Compatibility

Bun is designed as a Node.js drop-in replacement. For this Astro project:
- Astro scripts (`astro dev`, `astro build`) run via Bun automatically.
- Node.js APIs (`fs`, `path`, `process`) are supported.
- ESM imports are the default and preferred format.

## Troubleshooting

**Error: command not found: bun**
- Install Bun: `curl -fsSL https://bun.sh/install | bash`
- Or: `brew install oven-sh/bun/bun` (macOS)

**Error: lockfile mismatch / peer dependency warnings**
- Run `bun install` again — Bun usually resolves these automatically.

**Error: package not found after bun add**
- Check spelling: `bun add @package/name`
- Verify registry access: `bun install --verbose`

**npm/npx commands accidentally used**
- Replace `npm install` with `bun install`
- Replace `npm run <script>` with `bun run <script>`
- Replace `npx <cmd>` with `bunx <cmd>`
- The project will still work but bun.lock may be out of sync with package-lock.json
