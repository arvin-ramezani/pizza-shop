import { motion, Variants } from 'framer-motion';
import React, { FC, useEffect, useState } from 'react';
import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';
import { useSession } from 'next-auth/react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

import IconButton from '@/components/ui/icon-button/icon-button';
import OutlineButton from '@/components/ui/outline-button/outline-button';
import PrimaryButton from '@/components/ui/primary-button/primary-button';
import { IFood } from '@/utils/types/foods/food.interface';
import ConfirmModal from '../ui/confirm-modal/confirm-modal';
import useAddToCart from '@/hooks/use-add-to-cart/use-add-to-cart';
import {
  Container,
  PriceContainer,
  QuantityCounter,
  QuantityText,
  QuantityTitle,
  StyledButtonWrapper,
  StyledPrice,
} from '@/styles/components/add-to-cart-block.styled';
import { theme } from '@/utils/theme.styled';
import { useAddLikeMutation } from '@/redux/features/apiSlice';
import { foodItemVariants } from './add-to-cart-block.variants';

interface AddToCartProps {
  name: IFood['name'];
  price: IFood['price'];
  image: IFood['coverImage'];
  likes: string[];
}

const AddToCartBlock: FC<AddToCartProps> = ({ price, name, image, likes }) => {
  const { status, data: currentUser } = useSession();
  const {
    addToCart,
    removeFromCart,
    quantity,
    quantityAnimController,
    isInCart,
    addQuantity,
    removeQuantity,
  } = useAddToCart({ name, price, image });
  const [isAlreadyLike, setIsAlreadyLike] = useState(
    !!likes?.find((email) => email === currentUser?.user?.email)
  );
  const [addLike] = useAddLikeMutation();

  const [showRemoveItemConfirmModal, setshowRemoveItemConfirmModal] =
    useState(false);

  const onDeleteFromCart = () => {
    setshowRemoveItemConfirmModal(true);
  };

  const removeFromCartHandler = () => {
    removeFromCart();
    setshowRemoveItemConfirmModal(false);
  };

  const addLikeHandler = async () => {
    if (status !== 'authenticated') return;
    try {
      setIsAlreadyLike((prev) => !prev);

      const res = await addLike({
        userEmail: currentUser?.user?.email!,
        foodName: name,
      });
    } catch (error) {
      console.log(error, 'like error');
    }
  };

  let addToCartBtnText =
    status === 'authenticated' ? 'افزودن به سبد' : 'لطفا وارد شوید';

  let confirmModalBodyContent = <p>از سبد خرید حذف شود ؟</p>;

  useEffect(() => {
    if (!likes || !currentUser) return;
    setIsAlreadyLike(
      !!likes?.find((email) => email === currentUser?.user?.email)
    );
  }, [likes, currentUser?.user?.email]);

  return (
    <Container variants={foodItemVariants}>
      <ConfirmModal
        modalBody={confirmModalBodyContent}
        onConfirm={removeFromCartHandler}
        onCancel={() => setshowRemoveItemConfirmModal(false)}
        show={showRemoveItemConfirmModal}
        key="foodItemConfirmModal"
      />
      <QuantityTitle>تعداد</QuantityTitle>
      <QuantityCounter data-testid="quantityCounterBlock">
        <IconButton
          ariaLabel="add quantity"
          onClick={addQuantity}
          disabled={!!isInCart}
          tapEffect
        >
          <IoMdAddCircleOutline color={'#9747FF'} size={'1.6rem'} />
        </IconButton>

        <QuantityText animate={quantityAnimController}>{quantity}</QuantityText>

        <IconButton
          ariaLabel="remove quantity"
          onClick={removeQuantity}
          disabled={!!isInCart || quantity <= 1}
          tapEffect
        >
          <IoMdRemoveCircleOutline color={'#9747FF'} size={'1.6rem'} />
        </IconButton>
        <PriceContainer>
          <StyledPrice>{`${price}.000`}</StyledPrice>
          تومان
        </PriceContainer>
      </QuantityCounter>
      <StyledButtonWrapper as={motion.div}>
        {isAlreadyLike ? (
          <IconButton onClick={addLikeHandler} tapEffect>
            <BsHeartFill size="1.4rem" color={theme.colors.primary} />
          </IconButton>
        ) : (
          <IconButton
            style={{ outline: 'none' }}
            tapEffect
            onClick={addLikeHandler}
          >
            <BsHeart size="1.4rem" color={theme.colors.primary} />
          </IconButton>
        )}

        {isInCart ? (
          <OutlineButton fullWidth onClick={onDeleteFromCart} text="حذف" />
        ) : (
          <PrimaryButton
            onClick={addToCart as () => void}
            text={addToCartBtnText}
            disabled={status !== 'authenticated'}
            fullWidth
          />
        )}
      </StyledButtonWrapper>
    </Container>
  );
};

export default AddToCartBlock;
