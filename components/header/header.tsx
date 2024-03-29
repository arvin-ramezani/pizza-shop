import React, { useEffect, useState } from 'react';
import { TfiShoppingCart } from 'react-icons/tfi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useSession, signOut } from 'next-auth/react';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';

import OutlineButton from 'components/ui/outline-button/outline-button';
import { theme } from 'utils/theme.styled';
import AnimateAuthModal from '../ui/animate-auth-modal/animate-modal';
import IconButton from '../ui/icon-button/icon-button';
import { authSelector, toggleModal } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cartSelector } from '@/redux/features/cartSlice';
import ConfirmModal from '../ui/confirm-modal/confirm-modal';
import {
  loadingBarSelector,
  setLoader,
} from '@/redux/features/loadingBarSlice';
import {
  AuthButtonContainer,
  CartLengthNumber,
  CartLengthWrapper,
  Container,
  Logo,
  LogoWrapper,
  StyledUserNameLetter,
  Wrapper,
  WrapperIconButton,
} from '@/styles/components/header.styled';
import { useGetMeQuery } from '@/redux/features/apiSlice';
import { headerVariants } from './header.variants';

const Header = () => {
  const { cartLength } = useAppSelector(cartSelector);
  const { progress } = useAppSelector(loadingBarSelector);
  const { status } = useSession();
  const [showConfirmSignoutModal, setShowConfirmSignoutModal] = useState(false);
  const cartQuantityAnimController = useAnimationControls();
  const quantityWrapperAnimController = useAnimationControls();

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { data: user, refetch } = useGetMeQuery(undefined, {
    skip: status !== 'authenticated',
  });

  const [userImagePath, setUserImagePath] = useState<string>(
    user?.user.image || '/images/profile-images/default.png'
  );

  const toggleModalHandler = () => {
    dispatch(toggleModal());
  };

  const signoutHandler = () => {
    setShowConfirmSignoutModal(true);
  };

  const onSignOut = () => {
    setShowConfirmSignoutModal(false);

    if (router.pathname !== '/') {
      router.replace('/');
    }

    dispatch(setLoader(80));
    signOut();
  };

  const cartPageHandler = () => {
    if (cartLength < 1) {
      toast(<p>سبد خرید شما خالی است</p>, { type: 'warning' });
      return;
    }

    dispatch(setLoader(80));
    router.push('/cart');
  };

  const backRouterHandler = () => {
    dispatch(setLoader(80));
    router.back();
  };

  const profileRouteHandler = () => {
    dispatch(setLoader(80));
    router.push('/profile');
  };

  const homePageRouteHandler = () => {
    router.push('/');

    if (router.pathname != '/') {
      dispatch(setLoader(80));
    }
  };

  useEffect(() => {
    dispatch(setLoader(100));
    quantityWrapperAnimController.start(headerVariants.visible);
    cartQuantityAnimController.start(headerVariants.cartLentghAnimate);
  }, [router.pathname]);

  useEffect(() => {
    cartQuantityAnimController.start(headerVariants.cartLentghAnimate);
  }, [cartLength]);

  useEffect(() => {
    if (status !== 'authenticated') {
      return;
    }

    refetch();
    if (!user || !user.user.image) return;

    setUserImagePath(user?.user.image);
  }, [user, status]);

  return (
    <>
      <AnimateAuthModal />
      <ConfirmModal
        modalBody={<p>آیا مطمعا هستید ؟</p>}
        onConfirm={onSignOut}
        onCancel={() => setShowConfirmSignoutModal(false)}
        show={showConfirmSignoutModal}
      />

      <Wrapper>
        <LoadingBar
          progress={progress}
          onLoaderFinished={() => dispatch(setLoader(0))}
          color={theme.colors.primary}
          height={4}
        />

        <Container>
          <LogoWrapper onClick={homePageRouteHandler}>
            <Logo whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.6 }}>
              <Image src="/images/pizza-logo.svg" alt="pizza shop logo" fill />
            </Logo>
          </LogoWrapper>

          {status === 'authenticated' && router.pathname !== '/cart' && (
            <WrapperIconButton
              variants={headerVariants}
              animate={quantityWrapperAnimController}
            >
              <IconButton onClick={cartPageHandler} ariaLabel="cart" tapEffect>
                <TfiShoppingCart color={theme.colors.white} size="1.4rem" />
                <AnimatePresence>
                  <CartLengthWrapper as={motion.div}>
                    <CartLengthNumber
                      layout
                      animate={cartQuantityAnimController}
                    >
                      {cartLength}
                    </CartLengthNumber>
                  </CartLengthWrapper>
                </AnimatePresence>
              </IconButton>
            </WrapperIconButton>
          )}

          <AuthButtonContainer as={motion.div}>
            {status === 'authenticated' && router.pathname !== '/' && (
              <IconButton
                tapEffect
                onClick={backRouterHandler}
                id={'headerBackBtn'}
              >
                <IoMdArrowRoundBack size="1.6rem" color={theme.colors.blue} />
              </IconButton>
            )}

            {status === 'authenticated' && (
              <IconButton
                tapEffect
                boxShadow
                onClick={profileRouteHandler}
                style={{ margin: '0 .4rem' }}
              >
                {user?.user.image ? (
                  <img
                    src={`/${userImagePath}`}
                    alt="Profile Image"
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                    }}
                  />
                ) : (
                  <StyledUserNameLetter>
                    <span>{user?.user.firstName[0].toUpperCase()}</span>
                  </StyledUserNameLetter>
                )}
              </IconButton>
            )}

            {status === 'loading' && (
              <OutlineButton
                onClick={toggleModalHandler}
                text={'ورود / ثبت نام'}
                color={theme.colors.white}
                disabled
                style={{ paddingTop: 0 }}
              />
            )}

            {status === 'authenticated' && (
              <OutlineButton
                onClick={signoutHandler}
                text={'خروج'}
                color={theme.colors.white}
                style={{ paddingTop: 0 }}
              />
            )}

            {status === 'unauthenticated' && (
              <OutlineButton
                onClick={toggleModalHandler}
                text={'ورود / ثبت نام'}
                color={theme.colors.white}
                style={{ paddingTop: 0 }}
              />
            )}
          </AuthButtonContainer>
        </Container>
      </Wrapper>
    </>
  );
};

export default Header;
