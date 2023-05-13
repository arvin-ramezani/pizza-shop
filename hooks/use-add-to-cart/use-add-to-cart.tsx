import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toast } from 'react-toastify';
import { useAnimationControls } from 'framer-motion';
import { useState } from 'react';

import {
  addToCart as addToCartReducer,
  cartSelector,
  removeFromCart as removeFromCartReducer,
} from '@/redux/features/cartSlice';
import { ICartItem } from '@/utils/types/cart/cart.interface';
import { foodItemVariants } from './use-add-to-cart.variants';

interface UseAddToCartProps {
  name: ICartItem['name'];
  price: ICartItem['price'];
  image: ICartItem['image'];
  quantity?: ICartItem['quantity'];
}

const useAddToCart = ({
  name,
  price,
  image,
  quantity: initialQuantity,
}: UseAddToCartProps) => {
  const { cartItems } = useAppSelector(cartSelector);
  const [isInCart, setIsInCart] = useState<ICartItem | false>(
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
