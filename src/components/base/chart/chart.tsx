import React, { useEffect, useRef } from "react";
import {createChart, IChartApi, UTCTimestamp} from 'lightweight-charts';

type QuoteType = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
}
type ChartType = {
  data: Array<QuoteType>;
};

export const Chart: React.FC<ChartType> = ({ data }) => {
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
