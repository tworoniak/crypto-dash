import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { CoinMarket, MarketOrder } from '../types/coingecko';

const API_URL = import.meta.env.VITE_COINS_API_URL;

async function fetchMarkets(
  limit: number,
  sortBy: MarketOrder,
): Promise<CoinMarket[]> {
  const res = await fetch(
    `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`,
  );

  if (!res.ok) throw new Error(`CoinGecko error (${res.status})`);

  const data: CoinMarket[] = await res.json();
  return data;
}

export function useMarkets(limit: number, sortBy: MarketOrder) {
  return useQuery({
    queryKey: ['markets', { limit, sortBy }],
    queryFn: () => fetchMarkets(limit, sortBy),

    // v5 way to "keep previous data"
    placeholderData: keepPreviousData,

    // optional but nice:
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: 2,
  });
}
