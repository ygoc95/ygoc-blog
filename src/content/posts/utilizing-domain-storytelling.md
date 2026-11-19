---
title: Utilizing Domain Storytelling — From Stories to Test Cases
description: How domain storytelling turns business narratives into a shared reference point for prioritizing and writing better E2E test cases.
date: 2025-07-15
tags: ["Domain Storytelling", "Domain Driven Design", "Testing"]
draft: false
---

## Introduction

Over the past few weeks, I’ve been researching resources related to DDD for a while. While browsing through generally accepted resources like books from Vaughn Vernon or Eric Evans, I came across a book called Domain Storytelling. It was written by Stefan Hofer and Henning Schwentner and published in 2021. There are multiple high quality conference videos and also a dedicated [website](https://domainstorytelling.org/) where you can check them out yourself.

## What is Domain Storytelling?

By the author’s own words: *“Domain Storytelling is a technique to transform domain knowledge into effective business software”*. To be more specific, it is a **collaborative modeling technique** that captures business processes through **narratives**, using a simple visual language consisting of actors (the people and systems involved), activities (what they do), and work objects (what they work with).

![A simple domain story for publishing this article](/images/posts/domain-storytelling/simple-domain-story.png)

*A simple domain story for publishing this article*

## What is the purpose?

The purpose of domain storytelling is very similar to any other DDD related techniques. It is to better understand business requirements, reduce any ambiguity and create **shared understanding** through collaborative story creation where domain experts and developers work together to map out how business processes work in real-world scenarios. From what I understood from the book, domain storytelling works mainly on problem space. It focuses on user journeys, business related workflows together with business experts to uncover hidden requirements and edge cases.

Another importance is that it can (and should) be used as a **visual documentation**. As new requirements emerge, your domain stories will likely be subject to change. As you update your stories, the domain stories will be providing a visual reference that new team members can quickly understand and existing members can use to validate system behavior.

![Animated GIF of Bugs Bunny and Daffy Duck in the Rabbit Season cartoon](/images/posts/domain-storytelling/rabbit-season.gif)

Before getting to the point of this article, one last benefit I think domain stories create is for **identification of bounded contexts**. Domain stories naturally identify where different business terms and rules apply, helping teams to spot context boundaries when the same terms mean different things in different scenarios.

## From Stories to Test Cases

What I want to focus on at this point is how teams/individuals leverage domain stories to create better E2E test cases. As I‘ve mentioned before, domain stories can be used as business documentation. They are created with direct domain experts and business people so that they can provide a reliable source for **requirements**. So we know what we prioritize mainly on our business processes. From that point you can start to create a **list of processes that context is involved in**.

## The Problem with E2E Tests

There is no way to test everything 100%. As simple as they may look, E2E tests are very hard to maintain. They generally depend on multiple services to operate together flawlessly. While testing even a simple endpoint generally depends on multiple test cases, E2E test exponentially increases in complexity with every service, endpoint, event, db call involved. So in reality, it is very important to prioritize **a specific number of high priority, high reward E2E cases and cover the rest with integration, unit test etc.**

## How Can Domain Stories Help?

![An example domain story for a cinema entrance control flow](/images/posts/domain-storytelling/entrance-control.png)

*An example from [domainstorytelling.org](https://domainstorytelling.org/)*

For example, let’s check the example for entrance control flow in the upper image. As can be seen in the 3rd flow that moviegoer shows a ticket to usher. Usher checks the ticket and grants entrance to the moviegoer. Imagine a case like this:

**Entrance Control — 1**

```gherkin
Given the moviegoer <any prerequisite for moviegoer to have>
When the moviegoer shows a ticket to usher
Then the usher checks the ticket
Then the usher grants entrance to the moviegoer
```

While this is very barebones and probably not enough for a test case it can be used as a starting point for a series of test cases and the team can build by referencing this point. Maybe you can start by dividing assertions into multiple cases

**Entrance Control — 1**

```gherkin
Given the moviegoer <any prerequisite for moviegoer to have>
When the moviegoer shows a ticket to usher
Then the usher checks the ticket
```

**Entrance Control — 2**

```gherkin
Given the moviegoer <any prerequisite for moviegoer to have>
When the moviegoer shows a ticket to usher
Then the usher grants entrance to the moviegoer
```

Then you start to think about flow 3 again and say: *“Hey, the ticket must have an purchaseId and also we have movies not available for kids!”*. Then you might have something like:

**Entrance Control — 1–1**

```gherkin
Given the moviegoer is 18+
Given the moviegoer has a ticket with purchaseId
When the moviegoer shows a ticket to usher
Then the usher checks the ticket
```

**Entrance Control — 1–2**

```gherkin
Given the moviegoer is not 18+
When the moviegoer shows a ticket to usher
Then the usher refuses the ticket
```

**Entrance Control — 1–3**

```gherkin
Given the moviegoer is 18+
Given the moviegoer has a ticket without purchaseId
When the moviegoer shows a ticket to usher
Then the usher refuses the ticket
```

You can see how the reference point we had in our domain story can evolve into multiple test cases. All of these details depend on your business requirements, your happy paths, failure cases and so on. **You can also prioritize your cases as their quantities increase.** So you will need to work closely with developers and business experts closely to validate your cases. However, you can always refer to related domain stories to get a visual representation of how the main flow operates.

## Conclusion

Domain Storytelling is not just a great tool for the developers, but also for developers in test, QA, analysts or any roles that need concrete business requirements. I plan on writing a separate article for domain story workshops/implementation. Also, there are many publicly available resources on domain storytelling.

---

*Originally published on [Medium](https://medium.com/@ygoc95/utilizing-domain-storytelling-from-stories-to-test-cases-51a2a5a8e8a0).*
