import { useEffect, useMemo, useState } from 'react';

const KEY = 'crypto-watchlist';

function readStringArray(key: string): string[] {
  const raw = localStorage.getItem(key);
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    // Keep only strings
    return parsed.filter((x): x is string => typeof x === 'string');
  } catch {
    return [];
  }
}

function writeStringArray(key: string, value: string[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function useWatchlist() {
  const [ids, setIds] = useState<string[]>(() => readStringArray(KEY));

  // Persist changes
  useEffect(() => {
    writeStringArray(KEY, ids);
  }, [ids]);

  const set = useMemo(() => new Set(ids), [ids]);

  function isInWatchlist(id: string): boolean {
    return set.has(id);
  }

  function add(id: string) {
    setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }

  function remove(id: string) {
    setIds((prev) => prev.filter((x) => x !== id));
  }

  function toggle(id: string) {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function clear() {
    setIds([]);
  }

  return { ids, add, remove, toggle, clear, isInWatchlist };
}
