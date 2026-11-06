# stdout

A small personal blog with the density and attitude of Hacker News. Plain
Markdown in, static HTML out, a handful of kilobytes of JavaScript for relative
timestamps and the dark-mode toggle.

The name is a placeholder. Everything is set up so you can rename the site
without hunting through templates.

## Stack

- [Astro](https://astro.build) static site generation
- Markdown content collections with typed frontmatter (Zod)
- One hand-written stylesheet, no UI framework
- RSS feed and sitemap generated at build time
- No database, analytics, cookies, or third-party scripts

## Requirements

- Node.js **22.23.4 or newer** (required by Astro 7)
- npm

On Windows, if a newer Node is installed with Scoop but an older system Node is
still found first, put the Scoop version at the front of `PATH` for the session:

```powershell
$env:Path = "$env:USERPROFILE\scoop\apps\nodejs-lts\current;$env:Path"
node -v
```

Add that line to your PowerShell profile to make it permanent.

## Quick start

```sh
npm install
npm run dev
```

The dev server prints a local URL, usually <http://localhost:4321>.

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload          |
| `npm run build`   | Build the static site into `dist/`            |
| `npm run preview` | Serve the built site locally                  |
| `npm run check`   | Type-check Astro files and content            |

## Writing a post

Create a `.md` file in `src/content/posts/`. The filename becomes the URL slug
(`my-post.md` → `/posts/my-post/`). Start it with frontmatter:

```md
---
title: The title shown on the site
description: One sentence for the list, RSS, and social previews.
date: 2026-11-04
tags: [engineering, craft]
draft: false
---

Write the post here. Standard Markdown, fenced code blocks, tables, and
blockquotes all work.
```

| Field         | Required | Notes                                             |
| ------------- | -------- | ------------------------------------------------- |
| `title`       | yes      | Max 120 characters                                |
| `description` | yes      | Max 300 characters                                |
| `date`        | yes      | `YYYY-MM-DD`; used for sorting and relative time  |
| `tags`        | no       | Defaults to `[]`; each tag gets an archive page   |
| `draft`       | no       | `true` hides the post from lists, RSS, and builds |

Reading time is calculated from the post body, excluding fenced code blocks.
Drafts are filtered out everywhere, including tag pages and the feed.

## Project structure

```text
src/
  components/       Header, footer, and the Hacker News-style post list
  content/posts/    Markdown posts
  layouts/          Shared document shell, metadata, and small scripts
  pages/            Routes: home, archive, tags, about, 404, RSS
  styles/           The entire visual design
  utils/            Post queries, dates, tags, reading time
  consts.ts         Site name, tagline, author, links
public/             Favicon and robots.txt
```

## Make it yours

1. **Branding** — edit `src/consts.ts`. That controls the header name, tagline,
   author, email, GitHub link, and canonical URL.
2. **Domain** — update `site` in `astro.config.mjs`, plus the sitemap URL in
   `public/robots.txt`. Keep the URL in `src/consts.ts` in sync.
3. **Favicon** — replace `public/favicon.svg`.
4. **Colors and type** — the deep-teal/warm-paper palette and font stacks live
   at the top of `src/styles/global.css`. Change the custom properties there to
   re-theme both light and dark modes.
5. **Posts** — replace the five sample essays in `src/content/posts/` with your
   own. Delete them all and the front page shows an empty-state message.
6. **Theme storage** — if you rename the site, you can also change
   `THEME_STORAGE_KEY` in `src/consts.ts`. This only resets visitors' saved theme
   preference.

## Deploy

The build output is plain static files, so any static host works. Run:

```sh
npm run build
```

Then publish `dist/`. On Netlify, Vercel, or Cloudflare Pages, use `npm run
build` as the build command and `dist` as the output directory. No adapter or
server runtime is needed.

Set the real domain in `astro.config.mjs` before deploying so canonical URLs,
the RSS feed, and the sitemap point at the right place.

## How the small stuff works

- **No engagement counters.** Posts have no points, likes, or comments, and the
  front page is ordered by date rather than popularity.
- **Relative dates** ("2 days ago") are rendered by a tiny script. With
  JavaScript disabled, the absolute date is still visible.
- **Dark mode** is a `data-theme` attribute on `<html>`, saved in
  `localStorage`. The theme is applied before first paint to avoid a flash.
- **Code highlighting** uses Shiki with separate light and dark themes, switched
  by CSS rather than a rebuild.

## License

The written posts are © Yigit. The code is free to borrow, modify, and reuse.
