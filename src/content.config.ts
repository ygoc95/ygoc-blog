import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  // Every .md file in src/content/posts becomes a post.
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(120),
    description: z.string().max(300),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    /** Static baseline for the front-page points counter (local upvotes add 1). */
    points: z.number().int().nonnegative().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
