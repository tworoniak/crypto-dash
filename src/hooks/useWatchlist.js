import { useState, useEffect } from 'react';

const KEY = 'crypto-watchlist';

export function useWatchlist() {
  const [ids, setIds] = useState(() => {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  function toggle(id) {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function isInWatchlist(id) {
    return ids.includes(id);
  }

  return { ids, toggle, isInWatchlist };
}
