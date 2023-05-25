import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_LSDE_STATE } from '@/store/utils';
import type { LSDEState } from '@/store/utils';
import { DailyServices } from "@/store/daily/services";
import type { TickerDTO, TickersDTO } from "@/models/ticker.dto";
import type { TimeframesDTO } from "@/models/timeframe.dto";
import type { ScreenerDTO } from "@/models/screener.dto";

type DailyState = {
  ticker: LSDEState<TickerDTO>,
  tickers: LSDEState<TickersDTO>,
  timeframes: LSDEState<TimeframesDTO>,
  tickerScreener: LSDEState<ScreenerDTO>,
};

const initialState: DailyState = {
  ticker: DEFAULT_LSDE_STATE,
  tickers: DEFAULT_LSDE_STATE,
  timeframes: DEFAULT_LSDE_STATE,
  tickerScreener: DEFAULT_LSDE_STATE,
}

const {
  getTickers,
  getTicker,
  getTimeframes,
  getTickerScreener,
} = DailyServices;

export const DailySlice = createSlice({
  name: 'daily',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTickers.pending, (state) => {
      state.tickers.isLoading = true;
      state.tickers.error = null;
      state.tickers.isSuccess = false;
    });
    builder.addCase(getTickers.fulfilled, (state, { payload }) => {
      state.tickers.isLoading = false;
      state.tickers.isSuccess = true;
      state.tickers.data = payload;
    });
    builder.addCase(getTickers.rejected, (state, { payload }) => {
      state.tickers.isLoading = false;
      state.tickers.error = payload as string;
    });

    builder.addCase(getTicker.pending, (state) => {
      state.ticker.isLoading = true;
      state.ticker.error = null;
      state.ticker.isSuccess = false;
    });
    builder.addCase(getTicker.fulfilled, (state, { payload }) => {
      state.ticker.isLoading = false;
      state.ticker.isSuccess = true;
      state.ticker.data = payload;
    });
    builder.addCase(getTicker.rejected, (state, { payload }) => {
      state.ticker.isLoading = false;
      state.ticker.error = payload as string;
    });

    builder.addCase(getTimeframes.pending, (state) => {
      state.timeframes.isLoading = true;
      state.timeframes.error = null;
      state.timeframes.isSuccess = false;
    });
    builder.addCase(getTimeframes.fulfilled, (state, { payload }) => {
      state.timeframes.isLoading = false;
      state.timeframes.isSuccess = true;
      state.timeframes.data = payload;
    });
    builder.addCase(getTimeframes.rejected, (state, { payload }) => {
      state.timeframes.isLoading = false;
      state.timeframes.error = payload as string;
    });

    builder.addCase(getTickerScreener.pending, (state) => {
      state.tickerScreener.isLoading = true;
      state.tickerScreener.error = null;
      state.tickerScreener.isSuccess = false;
    });
    builder.addCase(getTickerScreener.fulfilled, (state, { payload }) => {
      state.tickerScreener.isLoading = false;
      state.tickerScreener.isSuccess = true;
      state.tickerScreener.data = payload;
    });
    builder.addCase(getTickerScreener.rejected, (state, { payload }) => {
      state.tickerScreener.isLoading = false;
      state.tickerScreener.error = payload as string;
    });
  },
});
