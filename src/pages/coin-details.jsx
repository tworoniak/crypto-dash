import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Spinner from "../components/Spinner.jsx";
import CoinChart from "../components/CoinChart.jsx";

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoinDetails();
  }, [id]);

  return (
    <div className="coin-details-container">
      {/* Coin Details Page for {id} */}
      <Link to="/">Back to Home</Link>
      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>
      {loading && <div>Loading...</div>}
      {error && <div className="error">❌ Error: {error}</div>}

      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split(". ")[0] + "."}</p>

          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
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
              Circulating Supply:{" "}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}{" "}
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()}
              on {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()}
              on {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>

          <CoinChart coinId={id} />

          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🌎 Official Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🧩 Blockchain Explorer
                </a>
              </p>
            )}
            {coin.links.official_forum_url[0] && (
              <p>
                <a
                  href={coin.links.official_forum_url[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💻 Community Forum
                </a>
              </p>
            )}
            {coin.categories.length > 0 && (
              <p>Categories: {coin.categories.join(", ")}</p>
            )}
          </div>
        </>
      )}
      {loading && <Spinner />}
      {error && <p>Error: {error}</p>}
      {!loading && !error && !coin && <p>Coin not found.</p>}
    </div>
  );
};

export default CoinDetailsPage;
