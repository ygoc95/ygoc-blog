// ---------------------------------------------------------------------------
// All site branding lives here. Change these values to make the blog yours.
// ---------------------------------------------------------------------------
export const SITE = {
  /** Shown in the header and page titles. */
  title: 'ygoc-blog',
  description: 'The personal blog of Yiğit Selçuk Göç.',
  author: 'Yiğit Selçuk Göç',
  github: 'https://github.com/ygoc95',
  /** Canonical site URL, including the GitHub Pages base path. */
  url: 'https://ygoc95.github.io/ygoc-blog',
} as const;

/** localStorage key for the saved light/dark preference. */
export const THEME_STORAGE_KEY = 'ygoc:theme';
