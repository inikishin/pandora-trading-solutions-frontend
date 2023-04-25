import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import reducers from './reducers';
const combinedReducer = combineReducers(reducers);

const reducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState: ReturnType<typeof combinedReducer> = {
      ...state,
      ...action.payload,
    };

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () => configureStore({ reducer });

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;

export const wrapper = createWrapper(makeStore, { debug: Boolean(process.env._STORE_DEBUG) });
