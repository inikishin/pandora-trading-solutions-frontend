import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import { wrapper } from '@/store';
import '@/styles/globals.css';


export default function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore({ ...pageProps });

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
