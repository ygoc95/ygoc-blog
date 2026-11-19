/**
 * Prefix a root-relative path with Astro's configured base path.
 * External URLs and relative paths are returned unchanged.
 */
export function withBase(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path === '/' ? '/' : path}`;
}

/** Remove the deployment base from a pathname for active-link checks. */
export function withoutBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (!base) return pathname;
  if (pathname === base) return '/';
  return pathname.startsWith(`${base}/`) ? pathname.slice(base.length) : pathname;
}
