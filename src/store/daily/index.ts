import { DailySlice } from './slice';
import { DailyServices } from './services';

export * as dailySelectors from './selectors';
export const dailyServices = DailyServices;
export const dailySlice = DailySlice.reducer;
