import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import NotFoundPage from './pages/not-found';
import CoinDetailsPage from './pages/coin-details';
import ScrollToTopButton from './components/ScrollToTopButton';
import type { CoinMarket, MarketOrder } from './types/coingecko';

const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState<CoinMarket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<MarketOrder>('market_cap_desc');

  useEffect(() => {
    const controller = new AbortController();

    const fetchCoins = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_URL}&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`,
          { signal: controller.signal },
        );

        if (!response.ok)
          throw new Error(`CoinGecko error (${response.status})`);

        const data: CoinMarket[] = await response.json();
        setCoins(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
    return () => controller.abort();
  }, [limit, sortBy]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/coin/:id' element={<CoinDetailsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <ScrollToTopButton />
    </>
  );
};

export default App;
