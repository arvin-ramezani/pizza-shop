import Header from '@/components/header/header';
import { store } from '@/redux/store';
import setup from '@/utils/tests/user-event-setup';
import { theme } from '@/utils/theme.styled';
import { render, screen } from '@testing-library/react';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

describe('Header', () => {
  let userEvent: UserEvent;

  beforeEach(() => {
    const { userEvent: userE } = setup(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </Provider>
    );
    userEvent = userE;
  });

  test('should show Logo', () => {
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  test('should show singin / signup button', () => {
    const authButton = screen.getByRole('button', { name: 'ورود / ثبت نام' });
    expect(authButton).toBeInTheDocument();
  });

  test('should open auth Modal if user clicked on signup/signin button', async () => {
    const authButton = screen.getByRole('button', { name: 'ورود / ثبت نام' });
    expect(authButton).toBeInTheDocument();

    userEvent.click(authButton);

    const emailInput = await screen.findByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();
  });
});
