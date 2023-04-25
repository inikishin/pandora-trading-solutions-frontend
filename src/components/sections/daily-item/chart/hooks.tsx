import { useEffect } from "react";
import { UTCTimestamp } from "lightweight-charts";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { quotesSelectors, quotesServices } from '@/store/quotes';
import { QuotesDTO } from "@/models/quotes.dto";

type ChartSectionHookType = {
  ticker: string | null;
  timeframe: string | null;
}

type ConvertedQuotesType = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export const useChartSection = ({ ticker, timeframe }: ChartSectionHookType) => {
  const quotes = useAppSelector(quotesSelectors.quotes);
  const dispatch = useAppDispatch();

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
  }
};