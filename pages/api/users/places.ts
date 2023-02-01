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
import placeSchema from '@/utils/yup-schema/placeSchema';
import { UserDoc } from '@/models/User';
import transformUserPlacesResponse from '@/utils/transform-api-response/transform-user-places-response';
import { TransformPlacesArgsTypes } from '@/utils/types/place/place.types';
import nextConnect from 'next-connect';
import {
  usersPlacesDeleteHandler,
  usersPlacesGetHandler,
  usersPlacesPatchHandler,
  usersPlacesPostHandler,
} from './places-handlers';

interface PlaceApiRequest extends NextApiRequest {
  body: (IPlace & IPlaceToEditBody) | '';
}

const usersPlacesRoutes = nextConnect<PlaceApiRequest, NextApiResponse>({
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

usersPlacesRoutes.get(usersPlacesGetHandler);
usersPlacesRoutes.post(usersPlacesPostHandler);
usersPlacesRoutes.patch(usersPlacesPatchHandler);
usersPlacesRoutes.delete(usersPlacesDeleteHandler);

export default usersPlacesRoutes;
