---
title: Read the error message
description: The bug had been open for two days. The error message said exactly what was wrong.
date: 2026-09-30
tags: [debugging, craft]
---

A few years ago I watched a team lose two days to a bug that was described, in plain English, on the first line of the log.

The error was `ECONNREFUSED 127.0.0.1:5432`. The application couldn't reach the database. The team had spent the first day convinced it was a network policy issue, because the previous quarter had a network policy issue. It was not a network policy issue. The database container had never started. The log line saying so was four lines above the one they kept pasting into chat.

I have made this mistake often enough to have rules about it.

## Read the whole thing

Not the first sentence. The whole message, including the last line, the nested cause, and the part that looks like a stack trace. Error messages are documentation written at the exact moment something went wrong, by the code that knows the most about it.

That sounds obvious. It is remarkable how often we skim.

When I catch myself thinking "I know what this means," I stop and read it out loud. The act of saying the words makes skipping harder.

## Find the first frame that is yours

Stack traces are usually read from the bottom, which is backwards. The bottom is the runtime's boilerplate. The useful part is the first frame that points at code you wrote.

In JavaScript, that's often the top few lines. In Python, it's the traceback frame just before the exception. In Go, it's the first frame outside the standard library. Start where your code begins and work outward.

Also read the cause chain. `Error: failed to start service: ... caused by: ... caused by: permission denied` is telling you a story with three chapters. The last chapter is usually the important one.

## Reproduce before you theorize

The urge to form a theory is strong. Resist it for five minutes and make the failure happen on demand instead.

A bug you can reproduce is a bug you can bisect. A bug you can bisect is a bug you can fix. A bug you can only describe is a conversation.

Write down the exact command, request, or sequence that triggers it. Include the environment. If it only happens on a colleague's machine, that difference is the bug.

## Check the boring explanation first

Before the exotic one, rule out:

- The service isn't running.
- You're editing a different file than the one being executed.
- The build is stale.
- You're on the wrong branch.
- The environment variable is empty.
- There is a typo in the hostname, port, table, or key.
- The migration ran on staging but not here.

These are not insulting possibilities. They are common. Most bugs are mundane, and the mundane ones are cheap to check.

## Change one thing at a time

When a hypothesis fails, revert the change before trying the next one. Debugging is a search problem, and a search is only useful if you know which variable moved.

The same applies to print statements and logging. Add one, observe, remove it. A screen full of `here1`, `here2`, `here3` is not instrumentation; it is archaeology for a civilization that lasted four minutes.

## Keep a trail

I write a short log while debugging: what I tried, what I expected, what happened. It feels wasteful until the third hour, when I can no longer remember whether I already tested the thing I'm about to test again.

A log also makes it possible to hand the bug to someone else without making them start from zero. That is a gift.

## The actual lesson

Error messages are not noise around the bug. They are the bug's testimony. The compiler, the runtime, and the library are all trying to tell you what happened, in the most precise language they have.

The two-day bug was solved in ten minutes once someone read four lines up. The fix was not clever. It was just paying attention.

Next time something breaks, before you open the browser or call a meeting, do the cheapest thing available: read the error message. All of it.
