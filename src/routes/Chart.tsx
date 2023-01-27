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

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDartAtom);

  return (
    <div>
      {isLoading ? (
        "Loading Chart... "
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "closed value",
              data: data?.map((price) => price.close) ?? [],
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },

            theme: {
              mode: isDark ? "light" : "dark",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },

            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: {
                show: true,
              },
              labels: {
                show: true,
              },

              categories: data?.map((price) =>
                new Date(parseInt(price.time_close) * 1000).toISOString()
              ),
              type: "datetime",
            },

            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#0be881", "#8c7ae6"],
                stops: [0, 100],
              },
            },
            colors: ["#0fbcf9", "#487eb0"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
