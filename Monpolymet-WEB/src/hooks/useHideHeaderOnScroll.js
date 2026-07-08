import { useEffect, useRef, useState } from 'react';

/**
 * Hides the header when the user scrolls down past `threshold` and reveals
 * it again when they scroll up. Above the threshold the header is always shown.
 */
export function useHideHeaderOnScroll(threshold = 120) {
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > threshold) {
        setShowHeader(currentScrollY <= lastScrollY.current);
      } else {
        setShowHeader(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return showHeader;
}
