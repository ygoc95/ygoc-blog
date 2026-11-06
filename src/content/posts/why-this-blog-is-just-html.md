---
title: Why this blog is just HTML
description: I have rebuilt this site more times than I have published posts. This version has the fewest moving parts, and that is the point.
date: 2026-11-04
tags: [meta, web]
---

I have rebuilt this site more times than I have published posts on it. Rails, a Next.js app with a database, a Gatsby phase I would rather not discuss. Each version had a dashboard, a deploy pipeline, and a growing pile of dependencies. Each version also had a bug that stopped me from writing.

This one is different. It is a folder of Markdown files, a build step, and static HTML. No database. No authentication. No server to keep alive at 3am.

Publishing is `git push`. That's it.

## A blog is a read-mostly artifact

Somewhere along the way, personal sites became applications. We added a CMS, then a comment system, then analytics, then a newsletter integration, then a build cache that took longer than the writing itself.

But think about what a blog actually does. It serves the same few dozen pages to everyone, changes a handful of times a month, and is read far more often than it is written. That is the ideal shape for a static site.

Every post here is a Markdown file with a little frontmatter:

```md
---
title: Why this blog is just HTML
date: 2026-11-04
tags: [meta, web]
---

I have rebuilt this site more times than...
```

That's the entire CMS. Adding a post means adding a file. Deleting a post means deleting a file. There is no migration to run, no schema to update, and no admin panel to forget the password to.

## Speed is a feature

The design is borrowed shamelessly from Hacker News: a thin teal header, small type, dense rows, and links that look like links. HN is not beautiful in the way a design portfolio is beautiful. It is beautiful in the way a well-made tool is beautiful. It loads instantly and gets out of the way.

I wanted the same thing. The pages are pre-rendered HTML with a little CSS. The only JavaScript is a couple of kilobytes for relative timestamps and a dark mode toggle. Reading this site does not require JavaScript at all.

That last part matters to me. I refuse to ship a framework to render a paragraph.

## The boring parts are the point

Under the hood:

- **Astro** compiles Markdown and components to static HTML.
- **RSS** and a **sitemap** are generated at build time.
- **No database**, no server runtime, no third-party scripts.
- **No analytics.** I don't know how many people read this, and I am at peace with that.

Static files can be hosted for free almost anywhere. If the host disappears, the `dist/` folder still works on a USB stick. Try doing that with a container and a managed Postgres instance.

## What I gave up

Honesty requires a list. There are no comments, no likes, no points, and no view counts. Search is just the archive page and your browser's find-in-page. If you want to tell me something, you have to write an actual email.

I considered adding a comment system for about ten minutes. Then I remembered that moderating comments is a second job, and that the best conversations about my writing happen over email anyway.

## The real lesson

The best personal site is the one you actually update. For years I optimized the stack and neglected the writing. The way to publish more, it turns out, is to make publishing boring.

So that's the plan: fewer parts, more posts. If you're reading this in a feed reader, thank you. You are exactly who this setup was built for.
