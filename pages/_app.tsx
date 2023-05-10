import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import localFont from 'next/font/local';

import {
  DefaultTheme,
  GlobalStyleComponent,
  ThemeProvider,
} from 'styled-components';

import { store } from '@/redux/store';
import Layout from '../components/layout/layout';
// import { GlobalStyle } from '../styles/global-styles.styled';
import { theme } from '../utils/theme.styled';
import ErrorBoundary from './error';

// Slick Slider Styles
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
// Import Swiper Styles
// import 'swiper/css';
import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-multi-carousel/lib/styles.css';
import { GlobalStyle } from '@/styles/global.styled';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// NextJs Font Optimizations
const myVazirLocalFont = localFont({
  src: [
    {
      path: '../public/fonts/vazir/Vazir-Thin.ttf',
      weight: '100',
    },
    {
      path: '../public/fonts/vazir/Vazir-Light.ttf',
      weight: '300',
    },
    {
      path: '../public/fonts/vazir/Vazir-Regular.ttf',
      weight: '400',
    },
    {
      path: '../public/fonts/vazir/Vazir-Medium.ttf',
      weight: '500',
    },
    {
      path: '../public/fonts/vazir/Vazir-Bold.ttf',
      weight: '700',
    },
    {
      path: '../public/fonts/vazir/Vazir-Black.ttf',
      weight: '900',
    },
  ],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  if (typeof document !== 'undefined') {
    document.body.classList.add(myVazirLocalFont.className);
  }

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider theme={theme}>
          {getLayout(
            <>
              <GlobalStyle localVazirFont={myVazirLocalFont} />
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
