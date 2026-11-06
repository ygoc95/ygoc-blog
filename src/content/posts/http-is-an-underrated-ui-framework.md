---
title: HTTP is an underrated UI framework
description: Links navigate. Forms mutate. The URL holds the state. The browser has been doing this for decades, and it is still very good at it.
date: 2026-06-03
tags: [web, design]
---

Hacker News is a masterclass in interface design that nobody calls interface design.

It is a table of links. Clicking a title navigates to a page. Clicking "comments" navigates to a thread. Submitting a reply is a form POST. Your position in the site is a URL you can bookmark, share, and reload. There is no client-side router, no global state store, and no loading spinner choreography.

It also loads instantly on a bad connection. That is not a coincidence.

## The browser already has a state model

We spend a lot of time reimplementing things the platform gives us for free:

- **Navigation** is a link. It updates the URL, pushes history, supports middle-click, and works with the back button.
- **Mutation** is a form. It submits data, handles encoding, and can redirect on success.
- **State** lives in the URL. Query parameters are shareable, bookmarkable, and survive a refresh.
- **Caching** is HTTP. `Cache-Control` is older than most JavaScript frameworks and considerably better documented.
- **Accessibility** is HTML. Buttons are focusable, labels are clickable, and screen readers already know what a `<nav>` is.

None of this requires a bundle. All of it works when JavaScript fails to load.

## A form is a state management library

Consider a filterable list. The modern reflex is `useState`, an effect, a fetch, and a loading skeleton. The platform-native version is a `<form method="get">` with a search input and a submit button. The server reads the query string, renders the filtered list, and returns HTML.

It is less impressive in a demo. It is more impressive in production, because:

1. The filtered view is a URL. People can share it.
2. The back button works.
3. There is no client cache to invalidate.
4. The initial render and the updated render use the same code path.

You can still add instant client-side filtering later as an enhancement. Start with the version that cannot break.

## Where the server-rendered model wins

This approach is especially good for:

- Content sites, dashboards, admin tools, and internal software.
- Anything where the data changes on the server and correctness matters more than animation.
- Teams where nobody wants to own a client-side state machine.

It is less good for:

- Editors, canvases, games, and drag-and-drop interfaces.
- Interactions that need to work offline.
- Views where every keystroke must update without a round trip.

That's fine. The error is not using JavaScript. The error is using it as the default for problems that were solved before it existed.

## Progressive enhancement is not nostalgia

The phrase sounds like a preference from 2009. It is actually a risk-management strategy.

If the HTML works without JavaScript, then a broken bundle is a degraded experience, not an outage. A slow network is a slightly slower page, not a blank screen. A crawler, a screen reader, or a text browser gets the same content as everyone else.

The modern tools for this are genuinely good. Astro ships HTML by default. HTMX lets you swap fragments without writing a client app. Server components move rendering back to where the data lives. None of these are a retreat from interactivity; they are a choice about where complexity belongs.

## The test I use

Before reaching for a client-side framework, I ask: *could this be a link or a form?*

If yes, make it a link or a form. If no, add JavaScript for that specific interaction and leave the rest of the page alone.

The result is usually smaller, faster, and easier to reason about. It also tends to look a lot like the sites we admired twenty years ago — not because they were primitive, but because they understood what the browser was for.

The platform is not a legacy system. It is the most deployed application runtime in the world, and it ships with a back button.
