import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

const root = (store: RootState) => store.quotes;

export const quotes = createSelector(root, (data) => data.quotes);
