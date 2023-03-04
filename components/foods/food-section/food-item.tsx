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
  StyledTotalPrice,
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
import { foodsSelector, likeFood } from '@/redux/features/foodsSlice';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useAddLikeMutation } from '@/redux/features/apiSlice';
import CommentsModal from '@/components/comments-modal/comments-modal';
import priceToText from '@/utils/common/priceTextSeperator';

const foodItemVariants: Variants = {
  initial: { opacity: 0 },
  animation: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
  exit: { x: 50, scale: 0.95 },
  quantityCounterText: {
    scale: [0, 1.4, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 },
  },
  hoverItem: {
    boxShadow: 'inset -1px 2px 4px 1px #ff7a008c',
  },
};

const foodItemTotalPriceVariants: Variants = {
  initial: { opacity: 0.5, scale: 0.4 },
  animation: { opacity: 1, scale: [0.5, 1.2, 1] },
};

const FoodItem: FC<IFood> = ({
  name,
  coverImage,
  integredients,
  price,
  slug,
  likes,
  commentsLength,
}) => {
  const { status, data: currentUser } = useSession();

  const {
    addToCart,
    removeFromCart,
    quantity,
    quantityAnimController,
    isInCart,
    addQuantity,
    removeQuantity,
  } = useAddToCart({ name, price, image: coverImage });

  const { activeCategory, foods } = useAppSelector(foodsSelector);
  const [isAlreadyLike, setIsAlreadyLike] = useState(
    !!likes?.find((email) => email === currentUser?.user?.email)
  );
  const [likesLength, setLikesLength] = useState(likes.length);
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [addLike] = useAddLikeMutation();

  const animation = useAnimationControls();
  const foodItemTotalPriceAnimController = useAnimationControls();
  const foodDetailsAnimControl = useAnimationControls();
  const [viewRef, inView] = useInView({
    threshold: 0.2,
  });

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
    foodDetailsAnimControl.start({
      display: 'inline-flex',
      x: [-16, 16, -10, 10, -6, 6, 0],

      transition: { duration: 0.6 },
    });
  };

  const onFoodDetails: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.stopPropagation();
    if (!e.ctrlKey) {
      dispatch(setLoader(80));
    }
  };

  const addLikeHandler = async () => {
    if (status !== 'authenticated') return;
    try {
      setIsAlreadyLike((prev) => !prev);
      setLikesLength((prev) => (isAlreadyLike ? --prev : ++prev));
      dispatch(
        likeFood({
          foodName: name,
          userEmail: currentUser?.user?.email as string,
        })
      );
      await addLike({
        userEmail: currentUser?.user?.email!,
        foodName: name,
      });
    } catch (error) {
      console.log(error, 'like error');
    }
  };

  useEffect(() => {
    foodItemTotalPriceAnimController.start(
      foodItemTotalPriceVariants.animation
    );
  }, [quantity]);

  useEffect(() => {
    if (foods.length < 1) return;

    if (inView) {
      animation.start(foodItemVariants.animation);
    } else {
      animation.start(foodItemVariants.initial);
    }
  }, [animation, inView, foods]);

  useEffect(() => {
    if (!likes || !currentUser) return;
    setIsAlreadyLike(
      !!likes?.find((email) => email === currentUser?.user?.email)
    );
  }, [likes, currentUser]);

  return (
    <AnimatePresence>
      <CommentsModal
        show={showCommentsModal}
        onClose={setShowCommentsModal.bind(null, false)}
        foodSlug={slug}
      />
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
        initial="initial"
        animate={animation}
        exit="exit"
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
          <FoodContent as={motion.div} transition={{ duration: 0.3 }}>
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
                <StyledPrice>{priceToText(price)}</StyledPrice>
                <Image
                  src={'/images/price.svg'}
                  alt="تومان"
                  width={32}
                  height={38}
                />
                {quantity > 1 && (
                  <StyledTotalPrice
                    as={motion.p}
                    variants={foodItemTotalPriceVariants}
                    animate={foodItemTotalPriceAnimController}
                  >
                    {priceToText(price, quantity)}
                    <Image
                      src={'/images/price.svg'}
                      alt="تومان"
                      width={32}
                      height={38}
                    />
                  </StyledTotalPrice>
                )}
              </PriceContainer>
            </QuantityCounter>

            <CommentsContainer>
              <ButtonSm
                onClick={setShowCommentsModal.bind(null, true)}
                text="مشاهده نظرات"
                color={theme.colors.blue}
              />
              <p style={{ marginRight: '.3rem' }}>
                {commentsLength || 0}
                <span>نظر</span>
              </p>
              <LikeWrapper as={motion.div}>
                {isAlreadyLike ? (
                  <IconButton
                    ariaLabel="unlike food"
                    onClick={addLikeHandler}
                    tapEffect
                    style={{ outline: 'none' }}
                  >
                    <BsHeartFill size="1.6rem" color={theme.colors.primary} />
                  </IconButton>
                ) : (
                  <IconButton
                    ariaLabel="like food"
                    style={{ outline: 'none' }}
                    tapEffect
                    onClick={addLikeHandler}
                  >
                    <BsHeart size="1.6rem" color={theme.colors.primary} />
                  </IconButton>
                )}

                <p>{likesLength}</p>
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
