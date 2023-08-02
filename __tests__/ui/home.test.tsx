import { vi, expect, test } from 'vitest';
import { getByRole, render, screen, within } from '@testing-library/react';
import Home from '@/pages/index';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/utils/theme.styled';
import mockRouter from 'next-router-mock';

vi.mock('next/router', () => require('next-router-mock'));
vi.mock('react-map-gl');

// /////////////// How to test React, Redux & RTK Query ? ///////////////
// https://dev.to/ifeanyichima/-testing-components-with
// -a-request-for-rtk-query-using-msw-and-react-testing-library-5a8n

// @ts-ignore
global.IntersectionObserver = class IntersectionObserver {
  // @ts-ignore
  constructor(private func, private options) {}

  observe(element: HTMLElement) {
    this.func([{ isIntersecting: true, target: element }]);
  }

  disconnect() {
    return null;
  }

  unobserve() {
    return null;
  }
};

function renderComponent() {
  render(
    <Provider store={store}>
      <SessionProvider session={null}>
        <ThemeProvider theme={theme}>
          <Home categories={[]} foods={[]} />
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}

test('home', async () => {
  renderComponent();

  const mainHeading = await screen.findByRole('heading', {
    name: /خوش آمدید/i,
  });

  expect(mainHeading).toBeDefined();

  //   expect(
  //     main.getByRole('heading', { level: 1, name: /welcome to next\.js!/i })
  //   ).toBeDefined();

  //   const footer = within(screen.getByRole('contentinfo'));
  //   const link = within(footer.getByRole('link'));
  //   expect(link.getByRole('img', { name: /vercel logo/i })).toBeDefined();
});
