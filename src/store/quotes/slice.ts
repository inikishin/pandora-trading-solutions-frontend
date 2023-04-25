import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_LSDE_STATE } from '@/store/utils';
import type { LSDEState } from '@/store/utils';
import { QuotesServices } from "@/store/quotes/services";
import type { QuotesDTO } from "@/models/quotes.dto";

type QuotesState = {
  quotes: LSDEState<QuotesDTO>,
};

const initialState: QuotesState = {
  quotes: DEFAULT_LSDE_STATE,
}

const { getQuotes } = QuotesServices;

export const QuotesSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getQuotes.pending, (state) => {
      state.quotes.isLoading = true;
      state.quotes.error = null;
      state.quotes.isSuccess = false;
    });
    builder.addCase(getQuotes.fulfilled, (state, { payload }) => {
      state.quotes.isLoading = false;
      state.quotes.isSuccess = true;
      state.quotes.data = payload.data;
    });
    builder.addCase(getQuotes.rejected, (state, { payload }) => {
      state.quotes.isLoading = false;
      state.quotes.error = payload as string;
    });
  },
});
