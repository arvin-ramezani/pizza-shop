import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { ICartItem } from '@/utils/types/cart/cart.interface';

export interface cartState {
  cartItems: ICartItem[];
  cartLength: number;
  totalPrice: number;
}

const initialState: cartState = {
  cartItems: [],
  cartLength: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      let itemExist = state.cartItems.find(
        (item) => item.name === action.payload.name
      );

      if (!itemExist) {
        state.cartItems.push(action.payload);
        state.cartLength += action.payload.quantity;
        state.totalPrice += action.payload.quantity * action.payload.price;
        return;
      }

      state.totalPrice -= itemExist.price * itemExist.quantity;
      state.cartLength -= itemExist.quantity;

      itemExist = {
        ...itemExist,
        quantity: action.payload.quantity,
      };

      state.totalPrice += itemExist.quantity * itemExist.price;
      state.cartLength += itemExist.quantity;
      state.cartItems = state.cartItems.map((item) => {
        return item.name === itemExist!.name ? itemExist : item;
      }) as ICartItem[];
    },

    removeFromCart: (state, action: PayloadAction<ICartItem['name']>) => {
      const toRemoveItem = state.cartItems.find(
        (item) => item.name === action.payload
      )!;
      if (!toRemoveItem) return;

      state.cartItems = state.cartItems.filter(
        (item) => item.name !== toRemoveItem.name
      );
      state.cartLength -= toRemoveItem.quantity;
      state.totalPrice -= toRemoveItem.price * toRemoveItem.quantity;
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.cartLength = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartSelector = (state: RootState) => state.cart;
export const cartLengthSelector = (state: RootState) => state.cart.cartLength;

export default cartSlice.reducer;
