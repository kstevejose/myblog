# Portfolio — Steev Kundukulangara

This is a blog-first technical writing portfolio built with [Astro](https://astro.build). The visual language is inspired by NothingOS: pure black surfaces, hairline structure, dot-matrix type, and a single red accent.

It also brings over the old Chirpy Jekyll blog at `kstevejose/myblog`, and all 15 posts were migrated.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built site
```

## Where things live

| What | Where |
| --- | --- |
| Blog posts | `src/content/posts/*.md` |
| Work, gallery, uses, profile | `src/data/site.ts` |
| Design tokens (colour, type, spacing) | `src/styles/global.css` |
| Article typography | `src/styles/prose.css` |
| Page templates | `src/pages/` |
| Images | `public/img/` |

## Adding a post

Create `src/content/posts/my-slug.md`. The filename becomes the URL (`/posts/my-slug/`) without a date prefix.

```markdown
---
title: "Your title"
description: "One line that shows in the feed and in search results"
date: 2026-01-15T10:00:00+05:30
tags: ["Concept", "Tutorial"]
cover: "/img/something.png"    # optional
coverAlt: "Alt text"           # optional
readingTime: 4                 # minutes
draft: false
---

Body starts here. Use `##` for section headings — `#` is reserved for the
page title, which is rendered from the front matter.
```

Tags power the filter buttons on `/posts` automatically. No extra config is needed.

## Adding work, gallery or uses entries

The three content types live in simple arrays in `src/data/site.ts`. Add an object and it shows up automatically.

For the gallery, put the image in `public/img/` first. GIF and MP4 files both work.

## The design system

The system is driven by custom properties in `src/styles/global.css`:

```css
--bg      #000000    --fg        #ffffff
--surface #0a0a0a    --fg-muted  #8a8a8a
--line    #1f1f1f    --accent    #d71921   /* the only colour */
```

Reusable classes include `.dot` for dot-matrix type, `.label` for uppercase mono micro-labels, `.panel` and `.ticks` for hairline cards with hover crosshairs, `.glyph` for the LED strip, `.pill`, `.btn`, and `.rise` for scroll reveal.

The type choices are Google Fonts: Doto for dot-matrix display, Space Grotesk for UI and body text, and JetBrains Mono for labels.

## Deploying

GitHub Pages: `.github/workflows/deploy.yml` builds and deploys on every push to `main`. Enable it once under Settings → Pages → Source: GitHub Actions.

Vercel: import the repo; Astro is detected without any extra configuration.

### Pointing the domain here

`site` in `astro.config.mjs` is already set to `https://stevekundukulangara.com`. When you are ready to move the domain away from the old Jekyll blog:

1. Add a `public/CNAME` file with `stevekundukulangara.com`.
2. Remove the `CNAME` file from the `myblog` repo so the two do not fight over it.
3. Repoint DNS if you moved to Vercel.

Until then, the site deploys to `kstevejose.github.io/<repo>/`, and the old site keeps serving. If you want the interim URL to work cleanly, set `base: '/<repo>'` in `astro.config.mjs` while testing, then remove it when the domain moves over.

## Migrating more content

`migrate.mjs` at the repo root is the script that converted the Chirpy posts, including front matter, `assets/img` paths, H1 demotion, and reading time. Point `SRC` at a Jekyll checkout and run it again if you want to pull more content across.
