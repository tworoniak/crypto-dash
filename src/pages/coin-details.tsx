import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';
import type { CoinDetails } from '../types/coinDetails';

const API_URL = import.meta.env.VITE_COIN_API_URL;

type RouteParams = {
  id: string;
};

const CoinDetailsPage = () => {
  const { id } = useParams<RouteParams>();

  if (!id) {
    return <div className='error'>Invalid coin ID.</div>;
  }

  const [coin, setCoin] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setCoin(null);
      setLoading(false);
      setError('Missing coin id.');
      return;
    }

    const controller = new AbortController();

    const fetchCoinDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`CoinGecko error (${response.status})`);
        }

        const data: CoinDetails = await response.json();
        setCoin(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();

    return () => controller.abort();
  }, [id]);

  const title = coin
    ? `${coin.name} (${coin.symbol.toUpperCase()})`
    : 'Coin Details';

  // small helper: avoid crashing on empty descriptions
  const description = (() => {
    const text = coin?.description?.en?.trim();
    if (!text) return '';

    const parts = text.split('. ');
    const firstSentence = parts[0];

    if (!firstSentence) return '';

    return firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
  })();

  return (
    <div className='coin-details-container'>
      <Link to='/'>Back to Home</Link>
      <h1 className='coin-details-title'>{title}</h1>

      {loading && <Spinner />}

      {!loading && error && <div className='error'>❌ Error: {error}</div>}

      {!loading && !error && !coin && <p>Coin not found.</p>}

      {!loading && !error && coin && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className='coin-details-image'
          />

          {description && <p>{description}</p>}

          <div className='coin-details-info'>
            <h3>Rank: #{coin.market_cap_rank ?? 'N/A'}</h3>
            <h3>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              24 Price Change: ${coin.market_data.price_change_24h.toFixed(2)} (
              {coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{' '}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{' '}
              {coin.market_data.total_supply?.toLocaleString() ?? 'N/A'}
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{' '}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>

          {/* id is guaranteed here */}
          <CoinChart coinId={id} />

          <div className='coin-details-links'>
            {coin.links.homepage[0] && (
              <p>
                <a
                  href={coin.links.homepage[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  🌎 Official Website
                </a>
              </p>
            )}

            {coin.links.blockchain_site[0] && (
              <p>
                <a
                  href={coin.links.blockchain_site[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  🧩 Blockchain Explorer
                </a>
              </p>
            )}

            {coin.links.official_forum_url[0] && (
              <p>
                <a
                  href={coin.links.official_forum_url[0]}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  💻 Community Forum
                </a>
              </p>
            )}

            {coin.categories.length > 0 && (
              <p>Categories: {coin.categories.join(', ')}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CoinDetailsPage;
