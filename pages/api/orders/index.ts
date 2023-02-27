import nextConnect from 'next-connect';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

import createOrderSchema from '@/utils/yup-schema/orders.schema';
import { Order } from '@/models/Order';
import { IFoodOrder, IOrdersApiReq } from '@/utils/types/order/order.types';

const ordersRoutes = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.log(err, 'onError');
    res
      .status(500)
      .json({ message: 'Sorry something happened !' + err.message });
    return;
  },
  onNoMatch(req, res) {
    console.log(req, res, 'no match');
    res.status(405).json({ message: `Method ${req.method} not allowed !` });
    return;
  },
});

interface IOrdersPostRequest extends NextApiRequest {
  body: IOrdersApiReq;
}

async function ordersPostHandler(
  req: IOrdersPostRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    const isValid = await createOrderSchema.isValid(req.body);
    if (!isValid) {
      return res.status(400).json({ message: 'Bad Request Happened !' });
    }

    const {
      cartFoods,
      totalPrice,
      placeId,
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

    const order = Order.build({
      user: session.sub!,
      foods: transformedCartFoods,
      placeId,
      totalPrice,
      deliveredAt,
      paidAt,
      isDelivered,
      isPaid,
    });
    // await order.save();

    return res.status(201).json({ id: order.id });
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

async function ordersGetHandler(req: IOrdersPostRequest, res: NextApiResponse) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    const userId = req.query.userId;

    console.log(userId);

    return res.status(200);
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

ordersRoutes.post(ordersPostHandler);

export default ordersRoutes;
