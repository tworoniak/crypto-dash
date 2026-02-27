import type { CoinDetails } from '../types/coinDetails';

const COIN_API_URL = import.meta.env.VITE_COIN_API_URL;

export async function fetchCoinDetails(id: string): Promise<CoinDetails> {
  const res = await fetch(`${COIN_API_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`CoinGecko error (${res.status})`);
  }

  const data: CoinDetails = await res.json();
  return data;
}
