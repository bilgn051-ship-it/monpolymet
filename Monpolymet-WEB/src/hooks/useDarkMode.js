import { useEffect, useState } from 'react';

/**
 * Reads the persisted theme, keeps it in localStorage, and toggles the
 * `dark` class on the document element so global styles can react to it.
 */
export function useDarkMode() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
