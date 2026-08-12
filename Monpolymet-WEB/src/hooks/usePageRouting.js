import { useCallback, useEffect, useState } from 'react';

// Maps the browser URL path to the internal page id and back. Home lives at
// the root; every other page gets a matching top-level path.
const PATH_TO_PAGE = {
  '/': 'home',
  '/about': 'about',
  '/companies': 'companies',
  '/csr': 'csr',
  '/environment': 'hse',
  '/hse': 'hse',
  '/news': 'news',
  '/careers': 'careers',
  '/contact': 'contact',
  '/procurement': 'procurement',
  '/admin': 'admin',
};

const PAGE_TO_PATH = {
  'home': '/',
  'about': '/about',
  'companies': '/companies',
  'csr': '/csr',
  'hse': '/hse',
  'environment': '/hse',
  'news': '/news',
  'careers': '/careers',
  'contact': '/contact',
  'procurement': '/procurement',
  'admin': '/admin',
};

// Resolve the current URL to a known page id, ignoring a trailing slash and
// falling back to home for anything unrecognized.
function pageFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path.startsWith('/post/')) {
    return 'post';
  }
  return PATH_TO_PAGE[path] ?? 'home';
}

function paramFromLocation() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path.startsWith('/post/')) {
    return path.split('/post/')[1];
  }
  return null;
}

export function usePageRouting() {
  const [currentPage, setCurrentPage] = useState(pageFromLocation);
  const [pageParam, setPageParam] = useState(paramFromLocation);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(pageFromLocation());
      setPageParam(paramFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((id, param = null) => {
    let cleanId = typeof id === 'string' ? id.replace(/^\//, '') : id;
    if (cleanId === 'environment') cleanId = 'hse';

    setCurrentPage(cleanId);
    setPageParam(param);
    
    let path = PAGE_TO_PATH[cleanId] ?? (cleanId ? `/${cleanId}` : '/');
    if (cleanId === 'post' && param) {
      path = `/post/${param}`;
    }
    
    if (path !== window.location.pathname) {
      window.history.pushState({ page: cleanId, param }, '', path);
      window.scrollTo(0, 0);
    }
  }, []);

  return [currentPage, navigate, pageParam];
}
