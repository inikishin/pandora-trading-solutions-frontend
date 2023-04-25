import React from "react";

import { Chart } from "@/components/base/chart/chart";
import {useChartSection} from "@/components/sections/daily-item/chart/hooks";

type ChartSectionType = {
  ticker: string | null;
  timeframe: string | null;
}

export const ChartSection: React.FC<ChartSectionType> = ({ ticker, timeframe }) => {
  const { quotes, convertedQuotes } = useChartSection({ ticker, timeframe });

  return !quotes.data || quotes.isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="h-96 mx-3">
      <Chart data={convertedQuotes} />
    </div>
  );
};
