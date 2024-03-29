import { NextApiResponse, NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import mongoose from 'mongoose';

import { Order } from '@/models/Order';
import dbConnect from '@/utils/db/dbConnect';
import createOrderSchema from '@/utils/yup-schema/orders.schema';
import { IFoodOrder, IOrdersApiReq } from '@/utils/types/order/order.types';

interface UserOrdersApiRequest extends NextApiRequest {
  body: IOrdersApiReq;
}

export async function usersOrdersGetHandler(
  req: UserOrdersApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    await dbConnect();

    const userId = req.query.userId;
    const page = req.query.page || 1;
    const itemsPerPage = 6;
    const skipItems = (+page - 1) * itemsPerPage;
    // Query Params
    const query = {
      user: userId,
    };

    const isValidUserId = mongoose.isValidObjectId(userId);

    if (!isValidUserId) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }

    if (userId !== session.sub) {
      res.status(403).json({ message: 'You are not authorized' });
      return;
    }

    const count = await Order.countDocuments(query);

    const orders = await Order.find(query)
      .limit(itemsPerPage)
      .skip(skipItems)
      .populate('placeId')
      .sort({ _id: -1 });

    const pageCount = Math.ceil(count / itemsPerPage);

    res.status(200).json({
      pagination: {
        count,
        pageCount,
      },
      orders,
    });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

export async function usersOrdersPostHandler(
  req: UserOrdersApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    const isValidBody = await createOrderSchema.isValid(req.body);
    if (!isValidBody) {
      return res.status(400).json({ message: 'Bad Request Happened !' });
    }

    const {
      cartFoods,
      totalPrice,
      placeId,
      place,
      deliveredAt,
      paidAt,
      isDelivered,
      isPaid,
    } = req.body;

    const transformedCartFoods: IFoodOrder[] = cartFoods.map((food) => ({
      foodName: food.name,
      foodPrice: food.price,
      coverImage: food.image,
      quantity: food.quantity,
    }));

    let order;
    if (place?.placeName) {
      order = Order.build({
        user: session.sub!,
        foods: transformedCartFoods,

        place: {
          placeName: place.placeName,
          placeAddress: place.placeAddress,
          placeLocation: {
            type: 'Point',
            coordinates: [place.placeLocation?.lng!, place.placeLocation?.lat!],
          },
        },

        totalPrice,
        deliveredAt,
        paidAt,
        isDelivered,
        isPaid,
      });

      await order.save();
    } else if (typeof placeId === 'string') {
      order = Order.build({
        user: session.sub!,

        foods: transformedCartFoods,

        placeId,
        totalPrice,
        deliveredAt,
        paidAt,
        isDelivered,
        isPaid,
      });
      order.createdAt = new Date(0);

      await order.save();
    }

    if (!order) return; // Just for TypeScript;

    return res.status(201).json({ id: order.id });
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}
