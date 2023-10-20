import { createAsyncThunk } from "@reduxjs/toolkit";

import api from '@/api';
import { ScreenerDTO } from "@/models/screener.dto";
import { handleError } from '@/store/utils';

export const ScreenerServices = {
  getScreenerData: createAsyncThunk<ScreenerDTO[], void, { rejectValue: string }>(
    'screener/getScreenerData',
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.screener.get(`screener/?fields=ticker,on,calcs`);

        return response.data.data;
      } catch (error) {
        return rejectWithValue(handleError(error));
      }
    },
  ),
};
