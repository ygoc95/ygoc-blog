import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** All published posts, newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** A rough estimate based on the raw Markdown body. */
export function readingTime(body: string | undefined): number {
  const words = (body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Absolute, human-readable date. Rendered as relative time by a tiny script. */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function shortDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export interface TagInfo {
  slug: string;
  name: string;
  count: number;
}

/** Unique tags across the given posts, most used first. */
export function collectTags(posts: Post[]): TagInfo[] {
  const tags = new Map<string, TagInfo>();
  for (const post of posts) {
    for (const name of post.data.tags) {
      const slug = slugify(name);
      const existing = tags.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        tags.set(slug, { slug, name, count: 1 });
      }
    }
  }
  return [...tags.values()].sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name),
  );
}
