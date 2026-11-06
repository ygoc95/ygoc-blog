---
title: Boring technology is a feature
description: Every dependency is a subscription to someone else's decisions. Spend your complexity budget where it actually buys something.
date: 2026-10-21
tags: [engineering, craft]
points: 217
---

The most reliable service I ever ran was a cron job.

It woke up every night, ran a shell script, wrote a report to disk, and emailed it. It had no queue, no orchestrator, no service mesh, and no dashboard. It ran for years. When it finally failed, the error was in a log file with a timestamp, and fixing it took ten minutes.

I have also worked on systems with a message broker, three microservices, and a distributed scheduler that did roughly the same job. They were more flexible. They were also more likely to wake me up.

## The complexity budget

Every project has a fixed amount of complexity it can absorb before it becomes unpleasant to change. Call it a budget. You can spend it on the part of the product that makes money, delights users, or is genuinely novel. Or you can spend it on plumbing.

Boring technology is how you keep plumbing cheap.

Postgres, SQLite, cron, plain HTTP, a monolith, a single machine, a text file: none of these are exciting, and that's the point. They are well understood. Their failure modes are documented. When something goes wrong, the answer is probably on a page written before you were born, by someone who has already suffered for you.

> Every dependency is a subscription to someone else's decisions — and the bill arrives during an incident.

## Boring is not the same as outdated

This is where the argument usually goes sideways. Boring does not mean refusing to learn anything new, or running an unpatched server from 2011. It means preferring the option whose behavior you can predict.

A boring choice has three properties:

1. **You can explain it to a new teammate in one sentence.**
2. **You can debug it at 3am without reading a changelog.**
3. **It fails in ways you have seen before.**

New technology often lacks all three. That doesn't make it bad. It makes it expensive.

## Spend your innovation tokens deliberately

There is a well-known essay by Dan McKinley called "Choose Boring Technology." The core idea is that you get a small number of innovation tokens, and you should spend them where they matter.

For most products, the differentiator is not the queue. It is not the build system. It is the thing the customer actually notices. Use boring tools for everything around that thing, and save your experiments for the center.

A useful exercise before adopting anything new: finish this sentence in one line.

> We are adopting **X** because it lets us **Y**, which we cannot reasonably do with **Z**.

If you can't finish it, you probably have a solution looking for a problem. If you can, write it down. Future-you will want to know why.

## The 3am test

I have a simple heuristic for architecture decisions: imagine the person who will debug this at 3am. They are tired. They have partial context. The person who wrote the code is on a plane.

Now ask: does this choice make their night shorter or longer?

A single Postgres database with a clear schema shortens the night. A event-driven pipeline with six retry policies and an ambiguous ownership boundary lengthens it. A cron job with a log file shortens it. A custom scheduler with a leader election bug lengthens it.

This is not an argument against scale. It is an argument against accidental scale — building for a load you don't have, with a team you don't have, for a problem you might never have.

## What to do on Monday

- Pick one piece of infrastructure you maintain and ask what it would cost to replace with the boring version.
- Write down the last three incidents you had. How many came from custom or bleeding-edge components?
- For your next new dependency, write the one-line justification above. If it feels silly, listen to that feeling.

The goal is not to be boring forever. The goal is to be boring everywhere that doesn't matter, so you have the energy to be interesting where it does.
