import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

type Props = {
  coinId: string;
};

type MarketChartResponse = {
  prices: [number, number][]; // [timestampMs, price]
};

const API_URL = import.meta.env.VITE_COIN_API_URL;

type LinePoint = { x: number; y: number };

const options: ChartOptions<'line'> = {
  responsive: true,
  plugins: {
    legend: { display: false },
    tooltip: { mode: 'index', intersect: false },
  },
  scales: {
    x: {
      type: 'time',
      time: { unit: 'day' },
      ticks: { autoSkip: true, maxTicksLimit: 7 },
    },
    y: {
      ticks: {
        callback: (value) => `$${Number(value).toLocaleString()}`,
      },
    },
  },
};

const CoinChart = ({ coinId }: Props) => {
  const [chartData, setChartData] = useState<ChartData<
    'line',
    LinePoint[]
  > | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!coinId) return;

    const controller = new AbortController();

    async function fetchPrices() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${API_URL}/${coinId}/market_chart?vs_currency=usd&days=7`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error(`CoinGecko error (${res.status})`);

        const data: MarketChartResponse = await res.json();

        const prices: LinePoint[] = data.prices.map(([ts, price]) => ({
          x: ts,
          y: price,
        }));

        setChartData({
          datasets: [
            {
              label: 'Price (USD)',
              data: prices,
              fill: true,
              pointRadius: 0,
              tension: 0.3,
              // Keep your colors if you want; TS doesn't care about these.
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.2)',
            },
          ],
        });
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unknown error');
        setChartData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPrices();

    return () => controller.abort();
  }, [coinId]);

  if (loading) return <div>Loading chart...</div>;
  if (error)
    return <div className='error'>❌ Error loading chart: {error}</div>;
  if (!chartData) return null;

  return (
    <div style={{ marginTop: '30px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CoinChart;
