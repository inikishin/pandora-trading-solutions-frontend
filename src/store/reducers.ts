import { dailySlice } from './daily';
import { quotesSlice } from './quotes';

const rootReducer = {
  daily: dailySlice,
  quotes: quotesSlice,
};

export default rootReducer;
