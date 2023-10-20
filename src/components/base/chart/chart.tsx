import React, { useEffect, useRef } from "react";
import { createChart, IChartApi, UTCTimestamp } from 'lightweight-charts';
import { Nullable } from "@/store/utils";

type QuoteType = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}

export type Level = {
  price: number;
  color: string,
  lineWidth: 1 | 2 | 3 | 4,
  lineStyle: 0 | 1 | 2 | 3 | 4,
  axisLabelVisible: boolean,
  title: string,
};

type ChartType = {
  data: QuoteType[];
  levels?: Nullable<Level[]>;
};

export const Chart: React.FC<ChartType> = ({ data, levels }) => {
  const chartContainerRef = useRef<null | HTMLDivElement>(null);

  useEffect(
		() => {
      let chart: IChartApi | undefined = undefined;

      const handleResize = () => {
        if (chart && chartContainerRef && chartContainerRef.current) {
          chart.applyOptions({width: chartContainerRef.current.clientWidth});
        }
      };

      if (chartContainerRef && chartContainerRef.current) {
        chart = createChart(chartContainerRef.current);
        const mainSeries = chart.addCandlestickSeries();
        mainSeries.setData(data);

        if (levels) {
          levels.forEach((item) => {
            mainSeries.createPriceLine(item);
          })
        }
        chart.timeScale().fitContent();
      }
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
        if (chart) {
          chart.remove();
        }
			};
		},
		[data]
	);

  return (
    <div className="w-full h-full" ref={chartContainerRef} />
  );
};
