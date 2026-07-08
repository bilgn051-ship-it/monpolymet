import { useCallback, useEffect, useState } from 'react';
import { api } from '../api/client';

/**
 * Loads a list endpoint and exposes { items, loading, error, reload }.
 * Used by every CRUD screen so fetch/loading/error handling stays uniform.
 */
export function useCollection(path) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    setLoading(true);
    api
      .get(path)
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [path]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, loading, error, reload };
}
