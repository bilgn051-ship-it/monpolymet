import { useEffect, useState } from 'react';

/**
 * State backed by localStorage (JSON-serialized).
 *
 * @param {string} key            localStorage key
 * @param {*} initialValue        value used when nothing is stored yet
 * @param {(loaded: *, initial: *) => *} [sanitize]
 *        optional post-load hook to migrate/validate the stored value
 */
export function useLocalStorageState(key, initialValue, sanitize) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      const loaded = stored !== null ? JSON.parse(stored) : initialValue;
      return sanitize ? sanitize(loaded, initialValue) : loaded;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
