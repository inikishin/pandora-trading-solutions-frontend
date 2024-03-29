import { createAsyncThunk } from "@reduxjs/toolkit";

import api from '@/api';
import { TickerDTO, TickersDTO } from "@/models/ticker.dto";
import { TimeframesDTO } from "@/models/timeframe.dto";
import { ScreenerDTO } from "@/models/screener.dto";
import { handleError } from '@/store/utils';

export const DailyServices = {
  getTimeframes: createAsyncThunk<TimeframesDTO, void, { rejectValue: string }>(
    'daily/getTimeframes',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.admin.get('timeframes');

        return response.data;
      } catch (error) {
        return rejectWithValue(handleError(error));
      }
    },
  ),

  getTickers: createAsyncThunk<TickersDTO, void, { rejectValue: string }>(
    'daily/getTickers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.admin.get('tickers');

        return response.data;
      } catch (error) {
        return rejectWithValue(handleError(error));
      }
    },
  ),

  getTicker: createAsyncThunk<TickerDTO, string, { rejectValue: string }>(
    'daily/getTicker',
    async (code, { rejectWithValue }) => {
      try {
        const response = await api.admin.get(`tickers/${code}`);

        return response.data;
      } catch (error) {
        return rejectWithValue(handleError(error));
      }
    },
  ),

  getTickerScreener: createAsyncThunk<ScreenerDTO, string, { rejectValue: string }>(
    'daily/getTickerScreener',
    async (ticker, { rejectWithValue }) => {
      try {
        const response = await api.screener.get(`screener/${ticker}`);

        return response.data;
      } catch (error) {
        return rejectWithValue(handleError(error));
      }
    },
  ),
};
