import { getToken } from 'next-auth/jwt';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Place, PlaceAttrs, PlaceDoc } from '@/models/Place';
import dbConnect from '@/utils/db/dbConnect';
import {
  IPlace,
  IPlaceApiResponse,
  IPlaceToEditBody,
} from '@/utils/types/place/place.types';
import placeSchema from '@/utils/yup-schema/place.schema';
import { UserDoc } from '@/models/User';
import transformUserPlacesResponse from '@/utils/transform-api-response/transform-user-places-response';
import { TransformPlacesArgsTypes } from '@/utils/types/place/place.types';
import nextConnect from 'next-connect';
import {
  usersOrdersGetHandler,
  usersOrdersPostHandler,
} from './orders-handlers';

interface UserOrdersApiRequest extends NextApiRequest {
  body: any;
}

const usersOrdersRoutes = nextConnect<UserOrdersApiRequest, NextApiResponse>({
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

usersOrdersRoutes.get(usersOrdersGetHandler);
usersOrdersRoutes.post(usersOrdersPostHandler);

export default usersOrdersRoutes;
