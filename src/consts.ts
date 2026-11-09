// ---------------------------------------------------------------------------
// All site branding lives here. Change these values to make the blog yours.
// ---------------------------------------------------------------------------
export const SITE = {
  /** Shown in the header, page titles and RSS. */
  title: 'Yiğit Selçuk Göç',
  /** One line that explains the blog. */
  tagline:
    'Software engineer. Notes on code, systems, and the craft of building things.',
  description:
    'The personal blog of Yiğit Selçuk Göç: notes on software, systems, and the craft of building things.',
  author: 'Yiğit Selçuk Göç',
  /** TODO: replace with your GitHub profile. */
  github: 'https://github.com/yourhandle',
  /** Used for canonical URLs. Keep this in sync with astro.config.mjs. */
  url: 'https://example.com',
} as const;

/** localStorage key for the saved light/dark preference. */
export const THEME_STORAGE_KEY = 'ysg:theme';
