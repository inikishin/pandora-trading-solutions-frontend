import { createSlice } from '@reduxjs/toolkit';

import { DEFAULT_LSDE_STATE } from '@/store/utils';
import type { LSDEState } from '@/store/utils';
import { ScreenerServices } from "@/store/screener/services";
import type { ScreenerDTO } from "@/models/screener.dto";

type ScreenerState = {
  screenerData: LSDEState<ScreenerDTO>,
};

const initialState: ScreenerState = {
  screenerData: DEFAULT_LSDE_STATE,
}

const {
  getScreenerData,
} = ScreenerServices;

export const ScreenerSlice = createSlice({
  name: 'screener',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getScreenerData.pending, (state) => {
      state.screenerData.isLoading = true;
      state.screenerData.error = null;
      state.screenerData.isSuccess = false;
    });
    builder.addCase(getScreenerData.fulfilled, (state, { payload }) => {
      state.screenerData.isLoading = false;
      state.screenerData.isSuccess = true;
      state.screenerData.data = payload;
    });
    builder.addCase(getScreenerData.rejected, (state, { payload }) => {
      state.screenerData.isLoading = false;
      state.screenerData.error = payload as string;
    });
  },
});
