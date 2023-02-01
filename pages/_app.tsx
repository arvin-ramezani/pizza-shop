import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';

import {
  DefaultTheme,
  GlobalStyleComponent,
  ThemeProvider,
} from 'styled-components';

import { store } from '@/redux/store';
import Layout from '../components/layout/layout';
import { GlobalStyle } from '../styles/global-styles.styled';
import { theme } from '../utils/theme.styled';
import ErrorBoundary from './error';

// Slick Slider Styles
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// Import Swiper Styles
// import 'swiper/css';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-multi-carousel/lib/styles.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          {getLayout(
            <>
              <GlobalStyle />
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </>
          )}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}
