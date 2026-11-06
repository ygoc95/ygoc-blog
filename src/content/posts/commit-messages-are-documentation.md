---
title: Commit messages are documentation
description: A diff shows what changed. The message explains why. Six months from now, only one of those will save you.
date: 2026-08-12
tags: [git, craft]
---

The most useful documentation in a repository is `git log`, and it is usually empty.

Open a random project and look at the last twenty commits. You will find `fix`, `update stuff`, `wip`, `address review comments`, and my favorite, `changes`. Each one is a tiny withdrawal from the team's memory. Individually, no big deal. In aggregate, the history becomes a list of events with no reasons attached.

Six months later, someone runs `git blame` on a strange line and finds a commit called `fix`. That's all they get.

## What a message is for

A diff shows *what* changed. The commit message explains *why*. The second part is the one that disappears when the author leaves, and it is the one a future reader actually needs.

Good commit messages answer questions that code cannot:

- Why was this approach chosen over the obvious one?
- What was broken before?
- What tradeoff was accepted?
- What is deliberately *not* included in this change?

## A format that scales

I use a simple convention, borrowed from Conventional Commits but applied loosely:

```text
fix(auth): reject refresh tokens at expiry boundary

The refresh endpoint compared the token's expiry with `<` instead of
`<=`, so a token expiring exactly at the boundary was accepted for
one more request. This was reachable in practice because the encoder
truncated milliseconds.

The fix uses `<=` and adds a regression test at the boundary. Tokens
that expired earlier were already rejected; behavior is otherwise
unchanged.

Refs: #482
```

The subject is short, imperative, and scoped. The body explains the bug, the fix, and the blast radius. A reviewer can read the message and know whether to be nervous.

You don't need this much ceremony for a typo fix. You do need it for anything that will make someone ask "why?" later.

## Write for the person doing archaeology

Before committing, I ask: if someone finds this commit in a blame view two years from now, with no access to the issue tracker, will they understand what I was thinking?

If the answer is no, add two sentences. It costs thirty seconds.

A useful trick is to write the message before the code. If you can't explain the change in a paragraph, you probably haven't decided what the change is yet. The message becomes a spec.

## Things that don't help

- **Restating the diff.** "Add a variable" is visible in the diff. Explain why the variable exists.
- **Blaming the reviewer.** "Fix tests after review" tells nobody anything. Say what the tests were missing.
- **Vague scope.** "Update API" could be anything. Name the endpoint and the behavior.
- **Links without context.** A ticket link is a bonus, not a substitute for a sentence. Ticket systems migrate; git history usually survives.

## History is a tool, not a diary

I don't think every commit needs to be a work of art. Small, obvious changes can have small, obvious messages. The goal is not perfect prose. The goal is that the history remains searchable and honest.

When I'm trying to understand an unfamiliar codebase, the first thing I do is read the last hundred commit subjects. It tells me what the team cares about, where the churn is, and which parts are scary. A repository with clear messages feels maintained. One with `wip` everywhere feels abandoned, even if it shipped yesterday.

The diff will tell you what the code does. The message is the only thing that will tell you why it does it that way.

Write the sentence. Future-you is already grateful.
