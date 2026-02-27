const API_URL = import.meta.env.VITE_COINS_API_URL;

// Your VITE_COINS_API_URL currently seems like:
// https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd
// (and then you append params)

export async function fetchMarkets({
  perPage = 10,
  page = 1,
  order = 'market_cap_desc',
  vsCurrency = 'usd',
  sparkline = false,
  ids, // optional: array or comma string for watchlist/pins
} = {}) {
  const url = new URL(API_URL);

  // If API_URL already includes some params, URL() will keep them.
  url.searchParams.set('vs_currency', vsCurrency);
  url.searchParams.set('order', order);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));
  url.searchParams.set('sparkline', String(sparkline));

  if (ids && (Array.isArray(ids) ? ids.length : String(ids).length)) {
    url.searchParams.set('ids', Array.isArray(ids) ? ids.join(',') : ids);
  }

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`CoinGecko error (${res.status})`);
  return res.json();
}
