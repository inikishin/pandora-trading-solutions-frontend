import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

const root = (store: RootState) => store.daily;

export const ticker = createSelector(root, (data) => data.ticker);
export const tickers = createSelector(root, (data) => data.tickers);
export const timeframes = createSelector(root, (data) => data.timeframes);
