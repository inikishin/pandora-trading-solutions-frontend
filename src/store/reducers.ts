import { dailySlice } from './daily';
import { quotesSlice } from './quotes';
import { screenerSlice } from './screener';

const rootReducer = {
  daily: dailySlice,
  quotes: quotesSlice,
  screener: screenerSlice,
};

export default rootReducer;
