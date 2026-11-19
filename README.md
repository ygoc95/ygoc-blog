# ygoc-blog

A quiet, text-first personal blog: plain Markdown in, static HTML out. Dark by
default, with a small switch for a warm light theme. No UI framework, no
database, no analytics, no cookie banner.

Live at <https://ygoc-blog.dev/>.

## Stack

- [Astro](https://astro.build) static site generation
- Markdown content collections with typed frontmatter (Zod)
- One hand-written stylesheet, no UI framework
- Sitemap generated at build time
- A few lines of JavaScript for the light/dark switch

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

The dev server prints a local URL, normally <http://localhost:4321/>.

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
description: One sentence for the list and social previews.
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
| `description` | yes      | Max 300 characters; shown under the title         |
| `date`        | yes      | `YYYY-MM-DD`; used for sorting and the archive    |
| `tags`        | no       | Defaults to `[]`; each tag gets an archive page   |
| `draft`       | no       | `true` hides the post from lists and builds       |

Reading time is calculated from the post body, excluding fenced code blocks.
Drafts are filtered out everywhere, including tag and archive pages.

Images in a post can live in `public/images/` and be referenced with a
root-relative path such as `/images/example.png`.

## Project structure

```text
src/
  components/       Header, footer, and the post list
  content/posts/    Markdown posts
  layouts/          Shared document shell, metadata, and theme switch
  pages/            Routes: home, archive, tags, 404
  styles/           The entire visual design
  utils/            Post queries and base-path helpers
  consts.ts         Site name, description, author, GitHub, canonical URL
public/             Favicon, robots.txt, and post images
.github/workflows/  GitHub Pages deployment
```

## Make it yours

1. **Branding** — edit `src/consts.ts`. That controls the header name,
   description, author, GitHub link, and canonical URL.
2. **Deployment URL** — `site` in `astro.config.mjs` controls canonical URLs.
   If you move to another domain, see [Custom domain](#custom-domain).
3. **GitHub** — set your profile URL in `src/consts.ts` (`SITE.github`).
4. **Favicon** — replace `public/favicon.svg`.
5. **Colors and type** — the dark/light palettes and font stacks live at the top
   of `src/styles/global.css`. Change the custom properties there to re-theme
   both modes.
6. **Posts** — add your `.md` files to `src/content/posts/`. The front page shows
   an empty-state message if you remove every post.
7. **Theme storage** — if you rename the site, you can also change
   `THEME_STORAGE_KEY` in `src/consts.ts`. This only resets visitors' saved theme
   preference.

## Deploy

Pushing to `main` builds and deploys the site with GitHub Actions to
<https://ygoc-blog.dev/>.

The workflow is `.github/workflows/deploy.yml`. It runs on every push to `main`
(or manually from the Actions tab), builds with Node 24, and publishes `dist/`
with `actions/deploy-pages`. The repository's Pages source is set to **GitHub
Actions**; no `gh-pages` branch is used.

For a local production build:

```sh
npm run build
npm run preview
```

### Custom domain

The site is served at <https://ygoc-blog.dev/>. The apex domain is the GitHub
Pages custom domain, and `www` is a CNAME record pointing to
`ygoc95.github.io`; GitHub redirects `www` to the apex.

A custom domain serves the site from the root, so `astro.config.mjs` has no
`base`. Canonical URLs come from `site` there and `SITE.url` in
`src/consts.ts`; the sitemap URL lives in `public/robots.txt`.

To move to another domain:

1. In the repository, open **Settings → Pages → Custom domain**, enter the
   domain, and save.
2. At your DNS provider:
   - Apex domain (`example.com`): add the A and AAAA records from GitHub's
     [custom domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
   - Subdomain (`blog.example.com` or `www.example.com`): add a CNAME record
     pointing to `ygoc95.github.io`.
3. Wait for the DNS check, then enable **Enforce HTTPS**. GitHub provisions the
   certificate automatically.
4. Set `site` in `astro.config.mjs`, `SITE.url` in `src/consts.ts`, and the
   sitemap URL in `public/robots.txt` to the new domain. Push to `main`.

No `CNAME` file is needed with a GitHub Actions deployment; GitHub stores the
custom domain in the Pages settings. The default `ygoc95.github.io/ygoc-blog/`
URL redirects to the custom domain.

## How the small stuff works

- **Dark by default.** The `data-theme` attribute on `<html>` starts as `dark`;
  the switch saves a light preference in `localStorage`. The saved value is
  applied before first paint to avoid a flash.
- **No engagement counters.** Posts have no points, likes, comments, or view
  counts. The front page is ordered by date.
- **Code highlighting** uses Shiki with separate light and dark themes, switched
  by CSS rather than a rebuild.
- **No email.** The only external contact link is GitHub, in the footer.

## License

The written posts are © Yiğit Selçuk Göç. The code is free to borrow, modify,
and reuse.
