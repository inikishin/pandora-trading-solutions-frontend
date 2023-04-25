import { QuotesSlice } from './slice';
import { QuotesServices } from './services';

export * as quotesSelectors from './selectors';
export const quotesServices = QuotesServices;
export const quotesSlice = QuotesSlice.reducer;
