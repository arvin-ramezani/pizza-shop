import { IFoodOrder, OrderAttrs } from '@/utils/types/order/order.types';
import { IPlace } from '@/utils/types/place/place.types';
import mongoose from 'mongoose';

// Order collection properties and methods.
// Order model interface
export interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// What properties a single Order has.
// Order DOC interface
export interface OrderDoc extends mongoose.Document {
  user: string;
  foods: IFoodOrder[];
  totalPrice: number;
  isPaid?: boolean;
  isDelivered?: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  placeId?: string;
  place?: {
    placeName: string;
    placeAddress: string;
    placeLocation: {
      type: string;
      coordinates: [number, number];
    };
  };

  created_at: Date;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    foods: [
      {
        foodName: String,
        foodPrice: String,
        quantity: Number,
        coverImage: String,
      },
    ],
    totalPrice: Number,
    placeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place',
    },
    place: {
      placeName: { type: String },
      placeAddress: { type: String },
      placeLocation: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: {
          type: [Number],
        },
      },
    },
    isPaid: { type: Boolean, required: true, default: false },
    isDelivered: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__V;
      },
      versionKey: false,
    },
  }
);

// DeprecationWarning for mongoose 7.
mongoose.set('strictQuery', true);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  // const createdAt = new Date(0);
  // console.log(createdAt, 'createdAt');
  // return new Order({
  //   ...attrs,
  //   created_at: new Date(0),
  // });

  return new Order(attrs);
};

const Order =
  (mongoose.models.Order as OrderModel) ||
  mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
