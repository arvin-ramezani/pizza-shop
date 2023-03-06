import React, { FC, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, PanInfo, Variants } from 'framer-motion';
import { MdDelete } from 'react-icons/md';

import { ICartItem as CartItemProps } from '@/utils/types/cart/cart.interface';
import { theme } from '@/utils/theme.styled';
import ButtonSm from '../ui/button-sm/button-sm';
import ConfirmModal from '../ui/confirm-modal/confirm-modal';
import EditCartitem from '../edit-cartitem/edit-cartitem';
import {
  CartItemContainer,
  ItemName,
  ItemPrice,
  ItemPriceText,
  PriceContainer,
  Quantity,
  QuantityPrice,
  StyledCartItem,
  StyledIconButton,
  StyledImage,
} from '@/styles/components/cart-item.styled';
import useAddToCart from '@/hooks/useAddToCart';
import priceToText from '@/utils/common/priceTextSeperator';

const cartItemVariants: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
    rotate: -20,
  },
  visible: {
    x: 0,
    opacity: 1,
    rotate: 0,
  },
  exit: {
    x: 100,
    opacity: 0,
  },
};

const CartItem: FC<CartItemProps> = ({
  image,
  name,
  price,
  quantity: initialQuantity,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditQuantity, setShowEditQuantity] = useState(false);
  const {
    removeFromCart,
    editQuantity,
    addQuantity,
    removeQuantity,
    quantity,
    quantityAnimController,
    setQuantity,
    onCancelQuantity,
  } = useAddToCart({ name, price, image, quantity: initialQuantity });

  const onRemoveCartItemHandler = () => {
    setShowConfirmModal(true);
  };

  const toggleEditQuantity = () => {
    if (showEditQuantity) {
      onCancelQuantity();
      setShowEditQuantity(false);
      return;
    }

    setQuantity(initialQuantity);
    setShowEditQuantity(true);
  };

  const onDragHandler: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void = (_, info) => {
    setShowConfirmModal(true);
  };

  const onDragStart: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void = (e, info) => {
    if (info.offset.x < 0) {
      return e.preventDefault();
    }
  };

  // useLayoutEffect(() => {
  //   console.log(priceToText(price, initialQuantity), 'before', initialQuantity);
  //   setPriceToShow(() => priceToText(price, quantity));
  //   console.log(priceToShow, 'price after', initialQuantity);
  // }, [initialQuantity]);

  let confirmModalBodyContent = (
    <p>
      <strong>{name}</strong>،<strong> {initialQuantity} عدد</strong>، از سبد
      خرید شما
      <strong> حذف </strong> شود ؟
    </p>
  );

  return (
    <StyledCartItem
      drag="x"
      // dragElastic={1}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={onDragHandler}
      onDragStart={onDragStart}
    >
      <CartItemContainer as={motion.div} variants={cartItemVariants} layout>
        <ConfirmModal
          modalBody={confirmModalBodyContent}
          onConfirm={removeFromCart}
          onCancel={setShowConfirmModal}
          show={showConfirmModal}
        />

        <ItemName>
          <StyledImage src={image} alt={name} width={60} height={60} />
          <h4>{name}</h4>
          <PriceContainer>
            <p>{priceToText(price)}</p>
            {/* <Image
              src={'/images/price.svg'}
              alt="تومان"
              width={22}
              height={26}
            /> */}
            تومان
          </PriceContainer>
        </ItemName>
        <QuantityPrice>
          <Quantity>{`${initialQuantity} عدد`}</Quantity>
          <ItemPriceText>قابل پرداخت</ItemPriceText>
          <ItemPrice>{priceToText(price, initialQuantity)}</ItemPrice>
        </QuantityPrice>
        <StyledIconButton
          ariaLabel="remove from cart"
          onClick={onRemoveCartItemHandler}
          tapEffect
        >
          {/* <CloseIcon size={'1.6rem'} /> */}
          <MdDelete color={theme.colors.dark} size={'1.6rem'} />
        </StyledIconButton>
        <ButtonSm
          text={showEditQuantity ? 'بستن' : 'ویرایش'}
          color={showEditQuantity ? theme.colors.blue : theme.colors.primary}
          onClick={toggleEditQuantity}
          style={{ zIndex: 1 }}
        />
      </CartItemContainer>
      <AnimatePresence>
        {showEditQuantity && (
          <EditCartitem
            addQuantity={addQuantity}
            removeQuantity={removeQuantity}
            toggleHandler={toggleEditQuantity}
            quantityAnimController={quantityAnimController}
            currentQuantity={quantity}
            initialQuantity={initialQuantity}
            onEdit={editQuantity}
          />
        )}
      </AnimatePresence>
    </StyledCartItem>
  );
};

export default CartItem;
