import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { theme } from "../theme";
import { useRecoilValue } from "recoil";
import { isDartAtom } from "../atoms";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Candle({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDartAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const getData = data ?? [];
  let chartData = null;
  if (Array.isArray(getData)) {
    chartData = getData?.map((v) => {
      return {
        x: v.time_close,
        y: [v.open, v.high, v.low, v.close],
      };
    });
  }

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : chartData ? (
        <ApexChart
          type="candlestick"
          series={[{ data: chartData }]}
          options={{
            theme: {
              mode: isDark ? "light" : "dark",
            },
            chart: {
              height: 400,
              width: 400,
              background: "transparent",
              toolbar: { show: false },
            },

            tooltip: {
              y: {
                formatter: (value) =>
                  `$${Number(value.toFixed(2)).toLocaleString()}`,
              },
            },

            grid: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              type: "datetime",
            },

            yaxis: {
              labels: {
                show: false,
              },
            },
          }}
        />
      ) : (
        <div>Data is not found.</div>
      )}
    </div>
  );
}

export default Candle;
