import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { cartSelector, clearCart } from '@/redux/features/cartSlice';
import CartItem from '@/components/cart-item/cart-item';
import CartDetails from '@/components/cart-details/cart-details';
import PrimaryButton from '@/components/ui/primary-button/primary-button';
import { theme } from '@/utils/theme.styled';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { setLoader } from '@/redux/features/loadingBarSlice';
import { useDispatch } from 'react-redux';
import { CartItemsContainer, Container } from '@/styles/pages/cart-page.styled';
import { NextPage } from 'next';
import { useAddOrderMutation } from '@/redux/features/apiSlice';
import ConfirmModal from '@/components/ui/confirm-modal/confirm-modal';
import { toast } from 'react-toastify';
import { IPlace } from '@/utils/types/place/place.types';

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

const Cart: NextPage = () => {
  const { cartItems, totalPrice, cartLength } = useAppSelector(cartSelector);
  const { data: userData, status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [addOrder, { isSuccess }] = useAddOrderMutation();
  const [orderPlace, setOrderPlace] = useState<string | IPlace | undefined>(
    undefined
  );
  const [showOrderConfirmModal, setShowOrderConfirmModal] = useState(false);

  const createOrderHandler = async () => {
    console.log(orderPlace, 'orderplace');
    if (!orderPlace) return;
    try {
      let res;
      if (typeof orderPlace === 'string') {
        res = await addOrder({
          userId: userData?.user?.id!,
          cartFoods: cartItems,
          cartLength: cartLength,
          totalPrice,
          placeId: orderPlace,
        }).unwrap();
      } else {
        res = await addOrder({
          userId: userData?.user?.id!,
          cartFoods: cartItems,
          cartLength: cartLength,
          totalPrice,
          place: orderPlace,
        }).unwrap();
      }

      if (res.id) {
        toast(<p>سفارش شما با موفقیت ثبت شد.</p>, {
          type: 'success',
          position: 'top-center',
        });

        dispatch(clearCart());

        router.push(`/`);
      }

      // toast(
      //   <p>
      //     سفارش شما ثبت شد. برای مشاهده و پیگیری وارد <strong>پروفایل</strong>{' '}
      //     شوید.
      //   </p>,
      //   { type: 'success', autoClose: false, position: 'top-center' }
      // );
    } catch (error) {
      console.log(error);
    }
  };

  if (status === 'unauthenticated') {
    router?.replace('/');
  }

  useEffect(() => {
    dispatch(setLoader(100));
  }, []);

  return (
    <Container>
      <ConfirmModal
        show={showOrderConfirmModal}
        onConfirm={createOrderHandler}
        onCancel={setShowOrderConfirmModal.bind(null, false)}
        modalBody={<p>سفارش ثبت شود ؟</p>}
      />

      <CartDetails
        totalPrice={totalPrice}
        totalQuantity={cartLength}
        onAddOrder={setShowOrderConfirmModal.bind(null, true)}
        addOrderPlace={setOrderPlace}
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
