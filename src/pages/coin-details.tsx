import { Link, useParams } from 'react-router';
import Spinner from '../components/Spinner';
import CoinChart from '../components/CoinChart';
import { useCoinDetails } from '../hooks/useCoinDetails';

type RouteParams = { id: string };

const CoinDetailsPage = () => {
  const { id } = useParams<RouteParams>();

  if (!id) {
    return (
      <div className='coin-details-container'>
        <Link to='/'>Back to Home</Link>
        <div className='error'>Invalid coin ID.</div>
      </div>
    );
  }

  const { data: coin, isPending, isFetching, error } = useCoinDetails(id);

  const errMsg =
    error instanceof Error ? error.message : error ? 'Unknown error' : null;

  const description = (() => {
    const text = coin?.description?.en?.trim();
    if (!text) return '';
    const firstSentence = text.split('. ')[0] ?? '';
    if (!firstSentence) return '';
    return firstSentence.endsWith('.') ? firstSentence : `${firstSentence}.`;
  })();

  return (
    <div className='coin-details-container'>
      <Link to='/'>Back to Home</Link>

      <h1 className='coin-details-title'>
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : 'Coin Details'}
      </h1>

      {isPending && <Spinner />}

      {!isPending && errMsg && <div className='error'>❌ Error: {errMsg}</div>}

      {!isPending && !errMsg && !coin && <p>Coin not found.</p>}

      {!isPending && !errMsg && coin && (
        <>
          {isFetching && <div className='text-sm opacity-70'>Refreshing…</div>}

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
