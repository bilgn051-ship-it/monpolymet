import { useCallback, useEffect, useState } from 'react';

// Maps the browser URL path to the internal page id and back. Home lives at
// the root; every other page gets a matching top-level path.
const PATH_TO_PAGE = {
  '/': 'home',
  '/about': 'about',
  '/companies': 'companies',
  '/csr': 'csr',
  '/news': 'news',
  '/careers': 'careers',
  '/contact': 'contact',
  '/hse': 'hse',
  '/tour': 'tour',
  '/admin': 'admin',
};

const PAGE_TO_PATH = Object.fromEntries(
  Object.entries(PATH_TO_PAGE).map(([path, page]) => [page, path])
);

// Resolve the current URL to a known page id, ignoring a trailing slash and
// falling back to home for anything unrecognized.
function pageFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return PATH_TO_PAGE[path] ?? 'home';
}

/**
 * Keeps the visible page in sync with the browser URL.
 *
 * - The initial page is read from the URL, so deep links like `/about` and
 *   full-page refreshes land on the right page.
 * - Browser back/forward (popstate) restores the matching page.
 * - `navigate(id)` swaps the page and pushes the matching path so the URL
 *   always reflects what's on screen.
 *
 * Returns `[currentPage, navigate]`, a drop-in replacement for useState.
 */
export function usePageRouting() {
  const [currentPage, setCurrentPage] = useState(pageFromLocation);

  useEffect(() => {
    const handlePopState = () => setCurrentPage(pageFromLocation());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((id) => {
    setCurrentPage(id);
    const path = PAGE_TO_PATH[id] ?? '/';
    if (path !== window.location.pathname) {
      window.history.pushState({ page: id }, '', path);
    }
  }, []);

  return [currentPage, navigate];
}
