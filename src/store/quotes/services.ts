import { createAsyncThunk } from "@reduxjs/toolkit";

import api from '@/api';
import { QuotesResponseDTO } from "@/models/quotes.dto";
import { handleError } from '@/store/utils';

type QuotesQueryParams = {
  periodFrom?: Date;
  periodTo?: Date;
  offset?: number;
  limit?: number;
}
type QuotesPathParams = {
  ticker: string;
  timeframe: string;
}

type QuotesParams = {
  path: QuotesPathParams;
  query: QuotesQueryParams;
}

export const QuotesServices = {
  getQuotes: createAsyncThunk<QuotesResponseDTO, QuotesParams, { rejectValue: string }>(
    'quotes/getTimeframes',
    async (params, { rejectWithValue }) => {
      try {
        const response = await api.quotes.get(
          `quotes/${params.path.ticker}/${params.path.timeframe}`,
          {params: params.query},
          );

        return response.data;
      } catch (error) {
        return rejectWithValue(handleError(error));
      }
    },
  ),
};
