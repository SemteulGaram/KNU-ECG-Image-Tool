import type { AppProps } from 'next/app';
// for CSP in emotion.js
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

const cache = createCache({ key: 'css', nonce: '3716246' });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}
