export type CoinDetails = {
  id: string;
  name: string;
  symbol: string;
  last_updated: string;

  image: {
    large: string;
  };

  description: {
    en: string;
  };

  market_cap_rank: number | null;

  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };

    price_change_24h: number;
    price_change_percentage_24h: number;

    circulating_supply: number;
    total_supply: number | null;

    ath: { usd: number };
    ath_date: { usd: string };
    atl: { usd: number };
    atl_date: { usd: string };
  };

  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
  };

  categories: string[];
};
