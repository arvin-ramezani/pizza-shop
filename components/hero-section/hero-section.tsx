import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import {
  Container,
  StyledHeader,
  StyledUserName,
  TextContainer,
  Wrapper,
} from '@/styles/components/hero-section.styled';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import PrimaryButton from '../ui/primary-button/primary-button';
import { toggleModal } from '../../redux/features/authSlice';
import { cartLengthSelector } from '@/redux/features/cartSlice';

const HeroSection = () => {
  const cartLength = useAppSelector(cartLengthSelector);
  const dispatch = useAppDispatch();
  const { status, data: userData } = useSession();
  const userName = userData?.user?.name;

  const router = useRouter();

  const buttonClickHandler = () => {
    if (status === 'authenticated' && cartLength >= 1) {
      router.push('cart');
      return;
    }

    if (status === 'authenticated' && cartLength < 1) {
      toast(<p>سبد خرید شما خالی است</p>, { type: 'warning' });
      return;
    }

    if (status === 'unauthenticated') {
      console.log('click');
      dispatch(toggleModal());
      return;
    }
  };

  let buttonText =
    status !== 'authenticated' ? 'ثبت نام / ورود' : 'مشاهده سبد خرید';

  if (cartLength < 1 && status === 'authenticated') {
    buttonText = 'سبد خرید خالی است';
  }
  return (
    <>
      <Wrapper>
        <Container>
          <TextContainer>
            <StyledHeader>خوش آمدید</StyledHeader>

            {status === 'authenticated' && (
              <StyledUserName>{userName} عزیز</StyledUserName>
            )}

            <PrimaryButton
              text={buttonText}
              onClick={buttonClickHandler}
              disabled={status === 'loading'}
              fullWidth
            />
          </TextContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default HeroSection;
