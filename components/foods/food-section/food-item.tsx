import Image from 'next/image';
import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
  useInView as useFramerInView,
} from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSession } from 'next-auth/react';

import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from 'react-icons/io';
import { FcLike } from 'react-icons/fc';
import router from 'next/router';
import {
  CommentsContainer,
  Container,
  FoodContent,
  FoodHeader,
  IntegredientText,
  LikeWrapper,
  PriceContainer,
  QuantityCounter,
  QuantityText,
  QuantityTitle,
  StyledButtonWrapper,
  StyledImageWrapper,
  StyledPrice,
  StyledFoodItem,
  StyledDetailsLink,
} from '@/styles/components/food-item.styled';
import { IFood } from '@/utils/types/foods/food.interface';
import ButtonSm from '../../ui/button-sm/button-sm';
import { theme } from '@/utils/theme.styled';
import PrimaryButton from '../../ui/primary-button/primary-button';
import IconButton from '@/components/ui/icon-button/icon-button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import OutlineButton from '@/components/ui/outline-button/outline-button';
import ConfirmModal from '@/components/ui/confirm-modal/confirm-modal';
import { setLoader } from '@/redux/features/loadingBarSlice';
import useAddToCart from '@/hooks/useAddToCart';
import { foodsSelector } from '@/redux/features/foodsSlice';

const foodItemVariants: Variants = {
  initial: { opacity: 0.6, x: -80, scale: 0.95 },
  animation: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: { x: 50, scale: 0.95 },
  // imgAnimation: { y: 50 },
  quantityCounterText: {
    scale: [0, 1.4, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 },
  },
  hoverItem: {
    // scale: 1.01,
    cursor: 'pointer',
    boxShadow: 'inset -1px 2px 4px 1px #ff7a008c',
    // transition: { duration: 0.3, type: 'tween' },
  },
};

const FoodItem: FC<IFood> = ({
  name,
  coverImage,
  integredients,
  price,
  slug,
}) => {
  const {
    addToCart,
    removeFromCart,
    quantity,
    quantityAnimController,
    isInCart,
    addQuantity,
    removeQuantity,
  } = useAddToCart({ name, price, image: coverImage });
  const framerRef = useRef<HTMLDivElement>(null);
  const inview = useFramerInView(framerRef);
  const { activeCategory, foods } = useAppSelector(foodsSelector);

  const animation = useAnimationControls();
  const foodDetailsAnimControl = useAnimationControls();
  // const { ref, inView } = useInView({ threshold: 0.2 });
  const [viewRef, inView] = useInView({
    threshold: 0.2,
  });

  const { status } = useSession();
  const [showRemoveItemConfirmModal, setshowRemoveItemConfirmModal] =
    useState(false);
  const dispatch = useAppDispatch();

  const onDeleteFromCart = () => {
    setshowRemoveItemConfirmModal(true);
  };

  let addToCartBtnText =
    status === 'authenticated' ? 'افزودن به سبد' : 'لطفا وارد شوید';

  let confirmModalBody = <p>از سبد خرید حذف شود ؟</p>;

  const onFoodItem = () => {
    console.log('click');
    foodDetailsAnimControl.start({
      display: 'inline-flex',
      // scale: [1.1, 1.3, 1],
      // fontSize: ['0.9rem', '1rem', '0.8rem'],
      x: [-16, 16, -10, 10, -6, 6, 0],
      transition: { duration: 0.6 },
    });
  };

  const onFoodDetails: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (!e.ctrlKey) {
      dispatch(setLoader(80));
    }
  };

  // useEffect(() => {
  //   if (foods.length < 1) return;
  //   console.log(name, inView);
  //   if (inView) {
  //     animation.start(foodItemVariants.animation);
  //   } else {
  //     animation.start(foodItemVariants.initial);
  //   }
  // }, [animation, inView, foods]);

  return (
    <AnimatePresence>
      <ConfirmModal
        modalBody={confirmModalBody}
        onConfirm={removeFromCart}
        onCancel={() => setshowRemoveItemConfirmModal(false)}
        show={showRemoveItemConfirmModal}
        key="deleteFoodItemConfirmModal" //AnimatePresenceKey
      />
      <StyledFoodItem
        ref={viewRef}
        as={motion.div}
        variants={foodItemVariants}
        // initial="initial"
        // animate={animation}
        // exit="exit"
        key={name + slug} //AnimatePresenceKey
      >
        <Container onClick={onFoodItem}>
          <StyledImageWrapper as={motion.div}>
            <Image
              src={coverImage}
              alt={name}
              width={100}
              height={100}
              style={{ borderRadius: '50%' }}
            />
          </StyledImageWrapper>
          <FoodContent
            // variants={foodItemVariants}
            as={motion.div}
            // initial={{ boxShadow: '-1px 2px 4px 1px #ff7a008c' }}
            // animate={{ boxShadow: '-1px 2px 4px 1px #ff7a008c' }}
            whileHover={{
              cursor: 'pointer',
              boxShadow: ' -3px 4px 4px 1px #ff730088',
            }}
            transition={{ duration: 0.3 }}
          >
            <FoodHeader>{name}</FoodHeader>
            <IntegredientText>
              {integredients}.
              <br />
              <motion.span animate={foodDetailsAnimControl}>
                <StyledDetailsLink
                  href={`foods/${slug}`}
                  onClick={onFoodDetails}
                >
                  مشاهده جزییات
                </StyledDetailsLink>
              </motion.span>
            </IntegredientText>

            <QuantityTitle>تعداد</QuantityTitle>
            <QuantityCounter data-testid="quantityCounterBlock">
              <IconButton
                ariaLabel="add quantity"
                onClick={addQuantity}
                disabled={!!isInCart}
                tapEffect
                boxShadow
                style={{ width: '25px', height: '25px' }}
              >
                <IoMdAddCircleOutline color={'#9747FF'} size={'1.6rem'} />
              </IconButton>

              <QuantityText animate={quantityAnimController}>
                {quantity}
              </QuantityText>

              <IconButton
                ariaLabel="remove quantity"
                onClick={removeQuantity}
                disabled={!!isInCart || quantity <= 1}
                tapEffect
                boxShadow
                style={{ width: '25px', height: '25px' }}
              >
                <IoMdRemoveCircleOutline color={'#9747FF'} size={'1.6rem'} />
              </IconButton>
              <PriceContainer>
                <StyledPrice>{`${price}.000`}</StyledPrice>
                <Image
                  src={'/images/price.svg'}
                  alt="تومان"
                  width={32}
                  height={38}
                />
              </PriceContainer>
            </QuantityCounter>

            <CommentsContainer>
              <ButtonSm text="مشاهده نظرات" color={theme.colors.blue} />
              <p>38</p>
              <LikeWrapper as={motion.div}>
                <IconButton
                  ariaLabel="like food"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  tapEffect
                >
                  <FcLike size={'2rem'} />
                </IconButton>
                <p>20</p>
              </LikeWrapper>
            </CommentsContainer>

            <StyledButtonWrapper as={motion.div}>
              {isInCart ? (
                <OutlineButton
                  fullWidth
                  onClick={onDeleteFromCart}
                  text="حذف"
                />
              ) : (
                <PrimaryButton
                  onClick={addToCart as () => void}
                  text={addToCartBtnText}
                  disabled={status !== 'authenticated'}
                  fullWidth
                />
              )}
            </StyledButtonWrapper>
          </FoodContent>
        </Container>
      </StyledFoodItem>
    </AnimatePresence>
  );
};

export default FoodItem;
