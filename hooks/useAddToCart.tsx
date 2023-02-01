import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import {
  addToCart as addToCartReducer,
  cartSelector,
  removeFromCart as removeFromCartReducer,
} from '@/redux/features/cartSlice';
import { CartItem } from '@/utils/types/cart/cart.interface';
import { toast } from 'react-toastify';
import { FC, MouseEvent, useEffect, useMemo, useState } from 'react';
import { useAnimationControls, Variants } from 'framer-motion';

interface UseAddToCartProps {
  name: CartItem['name'];
  price: CartItem['price'];
  image: CartItem['image'];
  quantity?: CartItem['quantity'];
}

const foodItemVariants: Variants = {
  initial: { opacity: 0, x: -50 },
  animation: {
    x: 0,
    opacity: 1,
  },
  quantityCounterText: {
    scale: [0, 1.4, 1],
    opacity: [0, 1],
    transition: { duration: 0.3 },
  },
};

const useAddToCart = ({
  name,
  price,
  image,
  quantity: initialQuantity,
}: UseAddToCartProps) => {
  const { cartItems } = useAppSelector(cartSelector);
  const [isInCart, setIsInCart] = useState<CartItem | false>(
    cartItems.find((item) => item.name === name) || false
  );
  const dispatch = useAppDispatch();
  const quantityAnimController = useAnimationControls();

  const [quantity, setQuantity] = useState(initialQuantity || 1);

  const onCancelQuantity = () => {
    if (!initialQuantity) return;

    setQuantity(initialQuantity);
  };

  const editQuantity = () => {
    dispatch(
      addToCartReducer({
        image,
        price,
        name,
        quantity,
      })
    );
    editQuantityNotify({ name, quantity });
  };

  const removeFromCart = () => {
    dispatch(removeFromCartReducer(name));

    setIsInCart(false);
  };

  const addToCart = () => {
    dispatch(
      addToCartReducer({
        image,
        price,
        quantity,
        name,
      })
    );
    setIsInCart({
      image,
      price,
      quantity,
      name,
    });
    addToCartNotify(name, quantity);
  };

  const addToCartNotify = (name: string, quantity: number) => {
    toast(
      <p>
        <strong>{name}</strong>،<strong> {quantity} عدد</strong>، به سبد خرید
        شما
        <strong> اضافه </strong> شد !
      </p>,
      { type: 'success', autoClose: 1500 }
    );
  };

  const editQuantityNotify = ({
    name,
    quantity,
  }: {
    name: string;
    quantity: number;
  }) =>
    toast(
      <p>
        <strong>{name}</strong>،<strong> {quantity} عدد</strong>، تغییر یافت.
      </p>,
      { type: 'success' }
    );

  const addQuantity = () => {
    quantityAnimController.start(foodItemVariants.quantityCounterText);

    setQuantity((prev) => prev + 1);
  };

  const removeQuantity = () => {
    quantityAnimController.start(foodItemVariants.quantityCounterText);

    setQuantity((prev) => {
      if (prev <= 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  return {
    addToCart,
    removeFromCart,
    quantity,
    addQuantity,
    removeQuantity,
    quantityAnimController,
    isInCart,
    editQuantity,
    setQuantity,
    onCancelQuantity,
  };
};

export default useAddToCart;
