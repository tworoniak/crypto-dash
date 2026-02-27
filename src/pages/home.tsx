import type { CoinMarket, MarketOrder } from '../types/coingecko';
import CoinCard from '../components/CoinCard';
import LimitSelector from '../components/LimitSelector';
import FilterInput from '../components/FilterInput';
import SortSelector from '../components/SortSelector';
import Spinner from '../components/Spinner';

type Props = {
  coins: CoinMarket[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  sortBy: MarketOrder;
  setSortBy: React.Dispatch<React.SetStateAction<MarketOrder>>;
  loading: boolean;
  error: string | null;
};

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
  loading,
  error,
}: Props) => {
  const filteredCoins = coins
    .filter((coin) => {
      const q = filter.toLowerCase();
      return (
        coin.name.toLowerCase().includes(q) ||
        coin.symbol.toLowerCase().includes(q)
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_asc':
          return a.market_cap - b.market_cap;
        case 'market_cap_desc':
          return b.market_cap - a.market_cap;
        case 'price_asc':
          return a.current_price - b.current_price;
        case 'price_desc':
          return b.current_price - a.current_price;
        case 'volume_asc':
          return a.total_volume - b.total_volume;
        case 'volume_desc':
          return b.total_volume - a.total_volume;
        default:
          return 0;
      }
    });

  return (
    <div>
      <h1>🚀 Welcome to Crypto Dash</h1>
      {loading && <Spinner />}
      {error && <div className='error'>Error: {error}</div>}

      <div className='top-controls'>
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length > 0 ? (
            filteredCoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p>No coins match your filter.</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
