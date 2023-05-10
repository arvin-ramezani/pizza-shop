import { ICartItem } from '../cart/cart.interface';
import { IPlace } from '../place/place.types';

export interface IOrdersApiReq {
  cartFoods: ICartItem[];
  id?: string;
  totalPrice: number;
  placeId?: string;
  place?: IPlace;
  cartLength: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  userId: string;
}

interface IOrdersFoodsRes {
  coverImage: string;
  foodName: string;
  foodPrice: string;
  quantity: number;
  _id: string;
}

export interface IOrdersApiRes {
  foods: IOrdersFoodsRes[];
  id?: string;
  totalPrice: number;
  placeId: {
    address: string;
    id: string;
    location: { type: string; coordinates: [number, number] };
    name: string;
    user: string;
  };
  place?: {
    placeName: string;
    placeAddress: string;
    placeLocation: {
      type: string;
      coordinates: [number, number];
    };
  };
  cartLength: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  user: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IFoodOrder {
  foodName: string;
  foodPrice: number;
  quantity: number;
  coverImage: string;
}

export interface OrderAttrs {
  user: string;
  foods: IFoodOrder[];
  totalPrice: number;
  placeId?: string;
  place?: {
    placeName: string;
    placeAddress: string;
    placeLocation: {
      type: string;
      coordinates: [number, number];
    };
  };
  isPaid?: boolean;
  isDelivered?: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
}
