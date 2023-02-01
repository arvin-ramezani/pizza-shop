import { screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import HomePage from '../../pages/index';
import { theme } from '../../utils/theme.styled';
import setup from '../../utils/tests/user-event-setup';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

describe('Home', () => {
  let userEvent: UserEvent;
  beforeEach(() => {
    const { userEvent: userE } = setup(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <HomePage categories={[]} foods={[]} />
        </ThemeProvider>
      </Provider>
    );

    // For useInView() to work
    mockAllIsIntersecting(true);
    userEvent = userE;
  });

  test('should have signup/sigin button', () => {
    expect(
      screen.getByRole('button', { name: /ثبت نام/i })
    ).toBeInTheDocument();
  });

  test('should not show Auth modal initially', () => {
    expect(
      screen.queryByRole('textbox', { name: /firstName/i })
    ).not.toBeInTheDocument();
  });

  test('should open Auth modal when user click on "ثبت نام" button', async () => {
    expect(
      screen.queryByRole('textbox', { name: /firstName/i })
    ).not.toBeInTheDocument();

    const authBtn = screen.getByRole('button', { name: /ثبت نام/i });
    await userEvent.click(authBtn);

    expect(
      await screen.findByRole('textbox', { name: /firstName/i })
    ).toBeInTheDocument();
  });
});
