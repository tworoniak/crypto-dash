import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import NotFoundPage from './pages/not-found';
import CoinDetailsPage from './pages/coin-details';
import ScrollToTopButton from './components/ScrollToTopButton';
import type { MarketOrder } from './types/coingecko';
import { useMarkets } from './hooks/useMarkets';

const App = () => {
  const [limit, setLimit] = useState<number>(10);
  const [filter, setFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<MarketOrder>('market_cap_desc');

  const {
    data: coins = [],
    isPending,
    isFetching,
    error,
  } = useMarkets(limit, sortBy);

  const errMsg =
    error instanceof Error ? error.message : error ? 'Unknown error' : null;

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
              loading={isPending} // initial load spinner
              // optional: show a small “refreshing” indicator in HomePage using isFetching
              error={errMsg}
              // you can also pass isFetching if you want
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
