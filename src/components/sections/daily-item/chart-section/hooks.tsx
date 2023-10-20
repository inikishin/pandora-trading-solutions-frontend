// @ts-nocheck

import { useEffect, useState } from "react";
import { UTCTimestamp } from "lightweight-charts";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { quotesSelectors, quotesServices } from '@/store/quotes';
import { dailySelectors } from '@/store/daily';
import { Level } from "@/components/base/chart/chart";
import { QuotesDTO } from "@/models/quotes.dto";
import { Nullable } from "@/store/utils";
import { ChartOptions } from "./chart";

type ChartSectionHookType = {
  ticker: Nullable<string>;
  timeframe: Nullable<string>;
  options: ChartOptions;
}

type ConvertedQuotesType = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export const useChartSection = ({ ticker, timeframe, options }: ChartSectionHookType) => {
  const quotes = useAppSelector(quotesSelectors.quotes);
  const screener = useAppSelector(dailySelectors.tickerScreener);
  const dispatch = useAppDispatch();
  const [levels, setLevels] = useState<Level[]>([]);

  const convertQuotes: (data: QuotesDTO) => ConvertedQuotesType[] = (data: QuotesDTO) => {
    return data.map(
      (item) => (
        {
          time: new Date(item.date).getTime() / 1000 as UTCTimestamp,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }
      )).sort((a, b) => (a.time - b.time));
  };

  useEffect(() => {
    if (screener.data?.levels) {
      let levels: Level[] = [];
      if (options.murray) {
        levels = [...levels, ...screener.data.levels.murray.map((item) => (
          {
            price: item.value,
            title: item.name,
            color: '#26a69a',
            lineWidth: 1,
            lineStyle: 0,
            axisLabelVisible: true,
          }
        ))]
      }

      if (options.supportAndResistance) {
        levels = [...levels, ...screener.data.levels.support_and_resistance.map((item) => (
          {
            price: item.value,
            title: item.name,
            color: '#26a69a',
            lineWidth: 1,
            lineStyle: 0,
            axisLabelVisible: false,
          }
        ))]
      }
      console.log(levels);
      setLevels(levels);
    }
  }, [options, screener]);

  useEffect(() => {
    if (ticker && timeframe) {
      const quotesParams = {
        path: {
          ticker: ticker,
          timeframe: timeframe,
        },
        query: {
          limit: 120,
        }
      };
      dispatch(quotesServices.getQuotes(quotesParams));
    }
  }, [dispatch, ticker, timeframe]);

  return {
    quotes,
    convertedQuotes: quotes.data ? convertQuotes(quotes.data) : [],
    levels,
  }
};