import { getAllByRole, render, screen, within } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import userEvent from '@testing-library/user-event';

import { theme } from '../../utils/theme.styled';
import AuthModal from '../../components/auth-modal/auth-modal';
import setup from '../../utils/tests/user-event-setup';

const authModalProps = {
  onClose: jest.fn(),
  show: false,
};

describe('AuthModal', () => {
  // beforeEach(() => {
  //   render(
  //     <ThemeProvider theme={theme}>
  //       <AuthModal {...authModalProps} />
  //     </ThemeProvider>
  //   );
  // });

  test('all inputs should be empty at first', async () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...authModalProps} />
      </ThemeProvider>
    );

    const firstName = screen.getByRole('textbox', { name: 'firstName' });
    const lastName = screen.getByRole('textbox', { name: 'lastName' });
    const email = screen.getByRole('textbox', { name: 'email' });
    const phone = screen.getByRole('textbox', { name: 'phone' });
    const password = screen.getByLabelText('password');
    const confirmPassword = screen.getByLabelText('confirmPassword');
    const address = screen.getByRole('textbox', { name: 'address' });

    expect(firstName.closest('input')?.value).toBe('');
    expect(lastName.closest('input')?.value).toBe('');
    expect(email.closest('input')?.value).toBe('');
    expect(phone.closest('input')?.value).toBe('');
    expect(password.closest('input')?.value).toBe('');
    expect(confirmPassword.closest('input')?.value).toBe('');
    expect(address.closest('textarea')?.value).toBe('');
  });

  test('should switch to signin when user click "وارد شوید" link', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...authModalProps} />
      </ThemeProvider>
    );
    let firstName = screen.queryByRole('textbox', { name: 'firstName' });
    let lastName = screen.queryByRole('textbox', { name: 'lastName' });
    let email = screen.queryByRole('textbox', { name: 'email' });
    let phone = screen.queryByRole('textbox', { name: 'phone' });
    let password = screen.queryByLabelText('password');
    let confirmPassword = screen.queryByLabelText('confirmPassword');
    let address = screen.queryByRole('textbox', { name: 'address' });

    let signinLink = screen.getByRole('link', { name: 'وارد شوید' });
    let signupLink = screen.queryByRole('link', { name: 'ثبت نام' });

    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(address).toBeInTheDocument();

    expect(signinLink).toBeInTheDocument();
    expect(signupLink).not.toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'وارد شوید' }));

    expect(
      screen.queryByRole('link', { name: 'وارد شوید' })
    ).not.toBeInTheDocument();

    expect(screen.queryByRole('link', { name: 'ثبت نام' })).toBeInTheDocument();

    firstName = screen.queryByRole('textbox', { name: 'firstName' });
    lastName = screen.queryByRole('textbox', { name: 'lastName' });
    email = screen.queryByRole('textbox', { name: 'email' });
    phone = screen.queryByRole('textbox', { name: 'phone' });
    password = screen.queryByLabelText('password');
    confirmPassword = screen.queryByLabelText('confirmPassword');
    address = screen.queryByRole('textbox', { name: 'address' });

    expect(firstName).not.toBeInTheDocument();
    expect(lastName).not.toBeInTheDocument();
    expect(phone).not.toBeInTheDocument();
    expect(confirmPassword).not.toBeInTheDocument();
    expect(address).not.toBeInTheDocument();

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  test('should show error message if firstName is empty', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...authModalProps} />
      </ThemeProvider>
    );
    const signupBtn = screen.getByRole('button', { name: 'ثبت نام' });

    await user.click(signupBtn);

    expect(
      await screen.findByText(/نام نمیتواند خالی باشد/i)
    ).toBeInTheDocument();
  });

  test('should show Email error message if firstName provided but email not provided', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...authModalProps} />
      </ThemeProvider>
    );
    const firstName = screen.getByRole('textbox', { name: 'firstName' });
    const signupBtn = screen.getByRole('button', { name: 'ثبت نام' });

    await user.type(firstName, 'John');
    await user.click(signupBtn);

    expect(
      await screen.findByText(/ایمیل نمیتواند خالی باشد/i)
    ).toBeInTheDocument();
  });

  test('should show error message if email is invalid ', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...authModalProps} />
      </ThemeProvider>
    );
    const firstName = screen.getByRole('textbox', { name: 'firstName' });
    const email = screen.getByRole('textbox', { name: 'email' });
    const signupBtn = screen.getByRole('button', { name: 'ثبت نام' });

    await user.type(firstName, 'John');
    await user.type(email, 'Johngmail.com');
    await user.click(signupBtn);

    expect(await screen.findByText(/ایمیل معتبر نیست/i)).toBeInTheDocument();
  });

  test('should show error message if password and confirmPassword did not match ', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...authModalProps} />
      </ThemeProvider>
    );
    const firstName = screen.getByRole('textbox', { name: 'firstName' });
    const email = screen.getByRole('textbox', { name: 'email' });
    const password = screen.getByLabelText('password');
    const confirmPassword = screen.getByLabelText('confirmPassword');
    const signupBtn = screen.getByRole('button', { name: 'ثبت نام' });

    await user.type(firstName, 'John');
    await user.type(email, 'John@gmail.com');
    await user.type(password, 'password');
    await user.type(confirmPassword, 'confirmPassword');
    await user.click(signupBtn);

    expect(await screen.findByText(/passwords not match/i)).toBeInTheDocument();
  });

  test('should show error message if address field did not provided', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...authModalProps} />
      </ThemeProvider>
    );
    const firstName = screen.getByRole('textbox', { name: 'firstName' });
    const email = screen.getByRole('textbox', { name: 'email' });
    const password = screen.getByLabelText('password');
    const confirmPassword = screen.getByLabelText('confirmPassword');
    const signupBtn = screen.getByRole('button', { name: 'ثبت نام' });

    await user.type(firstName, 'John');
    await user.type(email, 'John@gmail.com');
    await user.type(password, 'password');
    await user.type(confirmPassword, 'password');

    await user.click(signupBtn);

    expect(screen.queryByText(/passwords not match/i)).not.toBeInTheDocument();

    // expect(
    // await screen.queryByText(/passwords not match/i)
    // ).toBeInTheDocument();

    expect(
      await screen.findByText(/آدرس نمیتواند خالی بماند/i)
    ).toBeInTheDocument();
  });

  test('should call onClose prop if close icon clicked', async () => {
    const user = userEvent.setup();

    const newModalProps = {
      ...authModalProps,
      onClose: jest.fn(),
    };

    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...newModalProps} />
      </ThemeProvider>
    );
    await user.click(screen.getByRole('close-icon'));
    expect(newModalProps.onClose).toBeCalled();
  });

  test('should call onClose prop if "لغو" button clicked', async () => {
    const user = userEvent.setup();

    const newModalProps = {
      ...authModalProps,
      onClose: jest.fn(),
    };

    render(
      <ThemeProvider theme={theme}>
        <AuthModal {...newModalProps} />
      </ThemeProvider>
    );
    await user.click(screen.getByRole('button', { name: 'لغو' }));

    expect(newModalProps.onClose).toBeCalled();
    // console.log(screen.getByRole('button', { name: 'لغو' }));
  });

  describe('Signin Component', () => {
    beforeEach(() => {});

    test('USEREVENT UPDATE', () => {
      // setup function
      const { user } = setup(
        <ThemeProvider theme={theme}>
          <AuthModal {...authModalProps} />
        </ThemeProvider>
      );
    });
  });
});
