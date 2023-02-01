import React, { useEffect } from 'react';

import { useAppSelector } from '@/redux/hooks';
import { cartSelector } from '@/redux/features/cartSlice';
import styled from 'styled-components';
import CartItem from '@/components/cart-item/cart-item';
import CartDetails from '@/components/cart-details/cart-details';
import PrimaryButton from '@/components/ui/primary-button/primary-button';
import { theme } from '@/utils/theme.styled';
import { useRouter } from 'next/router';
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  Variants,
} from 'framer-motion';
import { useSession } from 'next-auth/react';
import {
  loadingBarSelector,
  setLoader,
} from '@/redux/features/loadingBarSlice';
import { useDispatch } from 'react-redux';
import { CartItemsContainer, Container } from '@/styles/pages/cart-page.styled';
import { NextPage } from 'next';

const cartItemsContainerVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.3 },
  },
  exit: {
    opacity: 0,
  },
};

const cartEmptyVariants: Variants = {
  initial: { x: -100, opacity: 0 },
  animation: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 10 },
  },
};

// const cartItems = [
//   {
//     name: 'پیتزا ویژه',
//     image: '/images/pizza-image-2.jpg',
//     price: 150,
//     quantity: 2,
//   },
//   {
//     name: 'پیتزا پپرونی',
//     image: '/images/pizza-image-3.jpg',
//     price: 110,
//     quantity: 2,
//   },
// ];

const Cart: NextPage = () => {
  const { cartItems, totalPrice, cartLength } = useAppSelector(cartSelector);
  const { status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();

  const createOrderHandler = () => {
    console.log('TODO: create order');
  };

  if (status === 'unauthenticated') {
    router?.replace('/');
  }

  useEffect(() => {
    dispatch(setLoader(100));
  }, []);

  return (
    <Container>
      <CartDetails
        totalPrice={totalPrice}
        totalQuantity={cartLength}
        onClick={() => createOrderHandler}
      />

      <CartItemsContainer
        as={motion.div}
        variants={cartItemsContainerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
        key="cartContainer"
        layout={cartLength < 1 ? false : true}
      >
        <AnimatePresence>
          {cartLength < 1 ? (
            <>
              <motion.h2
                variants={cartEmptyVariants}
                initial="initial"
                animate="animation"
                key="cartIsEmptyText"
              >
                سبد خرید خالی است
              </motion.h2>
              <PrimaryButton
                key="cartIsEmptyBtn"
                text="بازگشت"
                color={theme.colors.blue}
                onClick={() => {
                  router.back();
                  dispatch(setLoader(80));
                }}
              />
            </>
          ) : (
            cartItems.map((item) => <CartItem key={item.name} {...item} />)
          )}
        </AnimatePresence>
      </CartItemsContainer>
    </Container>
  );
};

export default Cart;
