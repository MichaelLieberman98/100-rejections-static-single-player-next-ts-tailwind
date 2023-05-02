// src/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout';

import currentUser from '../data/currentUser.json';

// {...layoutProps}

export default function App({ Component, pageProps }: AppProps) {
  // const layoutProps = { isLoggedIn: currentUser._id >= 0 };
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}