# Portfolio — Steev Kundukulangara

A blog-first technical writing portfolio built with [Astro](https://astro.build), in a
NothingOS-inspired design language: pure black, hairline structure, dot-matrix display type,
and exactly one red.

Migrated from the Chirpy Jekyll blog at `kstevejose/myblog` — all 15 posts came across.

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

Create `src/content/posts/my-slug.md`. The filename becomes the URL
(`/posts/my-slug/`) — no date prefix.

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

Tags drive the filter buttons on `/posts` automatically. No config needed.

## Adding work, gallery or uses entries

All three are plain arrays in `src/data/site.ts` — add an object, it appears.
For the gallery, drop the file in `public/img/` first; GIF and MP4 both work.

## The design system

Everything keys off custom properties in `src/styles/global.css`:

```css
--bg      #000000    --fg        #ffffff
--surface #0a0a0a    --fg-muted  #8a8a8a
--line    #1f1f1f    --accent    #d71921   /* the only colour */
```

Reusable classes: `.dot` (dot-matrix type), `.label` (uppercase mono micro-label),
`.panel` + `.ticks` (hairline card with hover crosshairs), `.glyph` (the LED strip),
`.pill`, `.btn`, `.rise` (scroll reveal).

Fonts are Google Fonts: **Doto** for dot-matrix display, **Space Grotesk** for UI and body,
**JetBrains Mono** for labels.

## Deploying

**GitHub Pages** — `.github/workflows/deploy.yml` builds and deploys on every push to
`main`. Enable it once under *Settings → Pages → Source: GitHub Actions*.

**Vercel** — import the repo; it detects Astro with no configuration.

### Pointing the domain here

`site` in `astro.config.mjs` is already `https://stevekundukulangara.com`. When you are
ready to move the domain off the old Jekyll blog:

1. Add a `public/CNAME` file containing `stevekundukulangara.com`.
2. Remove the `CNAME` file from the `myblog` repo, so the two do not fight over it.
3. Repoint DNS if you moved to Vercel.

Until then this deploys to `kstevejose.github.io/<repo>/` and the old site keeps serving.
If you want the interim URL to work perfectly, set `base: '/<repo>'` in `astro.config.mjs`
while testing, and remove it when the domain moves over.

## Migrating more content

`migrate.mjs` at the repo root is the script that converted the Chirpy posts (front matter,
`assets/img` paths, H1 demotion, reading time). Point `SRC` at a Jekyll checkout and re-run
it if you need to pull anything else across.
