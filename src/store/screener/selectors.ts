import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

const root = (store: RootState) => store.screener;

export const screenerData = createSelector(root, (data) => data.screenerData);
