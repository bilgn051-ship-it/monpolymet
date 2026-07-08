import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, inView]. `inView` flips to true the first time the referenced
 * element scrolls into the viewport (then the observer disconnects). Falls back
 * to true immediately where IntersectionObserver is unavailable.
 */
export function useInView(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px', ...options },
    );
    observer.observe(node);
    return () => observer.disconnect();
    // Observer is configured once on mount; options are read at that point.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
