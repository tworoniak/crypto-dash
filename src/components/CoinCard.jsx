import { useNavigate } from 'react-router';
import { Star } from 'lucide-react';
import { useWatchlist } from '../hooks/useWatchlist';

const CoinCard = ({ coin }) => {
  const navigate = useNavigate();
  const { toggle, isInWatchlist } = useWatchlist();

  const inWatchlist = isInWatchlist(coin.id);

  return (
    <div
      className='coin-card relative cursor-pointer'
      onClick={() => navigate(`/coin/${coin.id}`)}
    >
      {/* ⭐ Watchlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggle(coin.id);
        }}
        className='absolute top-3 right-3'
      >
        <Star
          size={20}
          className={inWatchlist ? 'text-yellow-400 fill-yellow-400' : ''}
        />
      </button>

      <div className='coin-header'>
        <img src={coin.image} alt={coin.name} className='coin-image' />
        <div>
          <h2>{coin.name}</h2>
          <p className='symbol'>{coin.symbol.toUpperCase()}</p>
        </div>
      </div>

      <p className='price'>Price: ${coin.current_price.toLocaleString()}</p>

      <p
        className={
          coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'
        }
      >
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>

      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinCard;
