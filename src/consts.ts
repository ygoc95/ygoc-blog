// ---------------------------------------------------------------------------
// All site branding lives here. Change these values to make the blog yours.
// ---------------------------------------------------------------------------
export const SITE = {
  /** Shown in the header, page titles and RSS. */
  title: 'stdout',
  /** One line that explains the blog. */
  tagline: 'Notes on software, systems, and the craft of building things.',
  description:
    'A personal blog about software, systems, and the craft of building things. Short reads, no trackers, no popups.',
  author: 'Yigit',
  email: 'hello@example.com',
  github: 'https://github.com/yourhandle',
  /** Used for canonical URLs. Keep this in sync with astro.config.mjs. */
  url: 'https://example.com',
} as const;

/** Seed value for the front-page "points" counter. Upvotes are stored locally. */
export const VOTE_STORAGE_KEY = 'stdout:votes';
export const THEME_STORAGE_KEY = 'stdout:theme';
