import { motion, useAnimationControls, Variants } from 'framer-motion';
import Image from 'next/image';
import React, { FC, useEffect, useState } from 'react';

import { clearCart } from '@/redux/features/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import {
  CartDetailsContainer,
  ClearCartBtnWrapper,
  CreateOrderContainer,
  QuantityContainer,
  StyledCartDetails,
  StyledDarkLayout,
  TotalPriceContainer,
} from '@/styles/components/cart-details.styled';
import { theme } from '@/utils/theme.styled';
import ButtonSm from '../ui/button-sm/button-sm';
import ConfirmModal from '../ui/confirm-modal/confirm-modal';
import PrimaryButton from '../ui/primary-button/primary-button';
import Places from '../places/places';

interface CartDetailsProps {
  totalPrice: number;
  totalQuantity: number;
  onAddOrder: () => void;
  addOrderPlace?: (placeId: string) => void;
}

const cartDetailsVariants: Variants = {
  containerInitial: { opacity: 0, x: -50 },
  containerAnimation: {
    opacity: 1,
    x: 0,
    transition: {
      when: 'beforeChildren',
      duration: 0.6,
      delay: 0.6,
    },
  },
  detailsTextInitial: { scale: 0 },
  detailsTextAnimation: {
    scale: [0, 1.4, 1],
    opacity: [0, 0.5, 1],
    transition: { type: 'spring' },
  },
};

const CartDetails: FC<CartDetailsProps> = ({
  totalQuantity,
  totalPrice,
  onAddOrder,
  addOrderPlace,
}) => {
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const dispatch = useAppDispatch();
  const textAnimController = useAnimationControls();

  const onClearCart = () => {
    setShowClearCartModal(false);
    dispatch(clearCart());
  };

  const onAddPlace = (placeId: string) => {
    addOrderPlace && addOrderPlace(placeId);
    return;
  };

  let confirmModalContent = <p>سبد خرید کاملا پاک میشود.</p>;

  useEffect(() => {
    textAnimController.start(cartDetailsVariants.detailsTextAnimation);
  }, [totalQuantity, totalPrice]);

  return (
    <StyledCartDetails
      as={motion.div}
      variants={cartDetailsVariants}
      initial="containerInitial"
      animate="containerAnimation"
      exit="containerAnimation"
    >
      <CartDetailsContainer>
        <ConfirmModal
          onCancel={() => setShowClearCartModal(false)}
          onConfirm={onClearCart}
          show={showClearCartModal}
          modalBody={confirmModalContent}
          buttonText="مطمعا هستید ؟"
        />
        <Image
          src="/images/shopping-cart/shopping-cart-background.webp"
          alt="shopping cart"
          fill
          style={{ zIndex: -1 }}
        />
        <StyledDarkLayout></StyledDarkLayout>
        <QuantityContainer>
          <h4>تعداد کل</h4>
          <motion.p
            variants={cartDetailsVariants}
            initial="initial"
            animate={textAnimController}
          >
            {totalQuantity} عدد
          </motion.p>
        </QuantityContainer>
        <TotalPriceContainer>
          <h4>مبلغ کل</h4>
          <motion.p
            variants={cartDetailsVariants}
            initial="initial"
            animate={textAnimController}
          >
            {totalPrice}.000 تومان
          </motion.p>
        </TotalPriceContainer>
        <ClearCartBtnWrapper>
          <ButtonSm
            disabled={!totalQuantity}
            color={theme.colors.blue}
            onClick={() => setShowClearCartModal(true)}
            text="پاک کردن سبد"
          />
        </ClearCartBtnWrapper>
      </CartDetailsContainer>
      <CreateOrderContainer>
        <Places onAddPlace={onAddPlace} selectable={true} />

        <PrimaryButton
          disabled={!totalQuantity}
          fullWidth
          onClick={onAddOrder}
          text="تکمیل خرید"
        />
      </CreateOrderContainer>
    </StyledCartDetails>
  );
};

export default CartDetails;
