export type MarketOrder =
  | 'market_cap_desc'
  | 'market_cap_asc'
  | 'volume_desc'
  | 'volume_asc'
  | 'price_desc'
  | 'price_asc';

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;

  current_price: number;
  market_cap: number;
  total_volume: number;

  price_change_percentage_24h: number | null;
}
