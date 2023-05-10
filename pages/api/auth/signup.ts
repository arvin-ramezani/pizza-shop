import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { IPlace } from '@/utils/types/place/place.types';
import { User } from '@/models/User';
import dbConnect from '@/utils/db/dbConnect';
import { signupSchema } from '@/utils/zod-validation/auth/auth.schema';
import placeSchema from '@/utils/yup-schema/place.schema';
import { Place } from '@/models/Place';
import { UserAttrs } from '@/utils/types/auth.types';
import runMulterMiddleware, { upload } from '@/middleware/multer-middleware';

interface SignupApiRequest extends NextApiRequest {
  body: {
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    password: string;
    placeList: string;
  };
  file?: Express.Multer.File;
}

const authRoute = nextConnect<SignupApiRequest, NextApiResponse>({
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

async function signupHandler(req: SignupApiRequest, res: NextApiResponse) {
  try {
    await runMulterMiddleware(req, res, upload.single('image'));

    const isValid = await signupSchema.isValid(req.body);
    if (!isValid) {
      return res.status(422).json({ message: 'Invalid inputs' });
    }

    const { firstName, lastName, email, phone, password, placeList } = req.body;
    const parsedPlaceList: IPlace[] = JSON.parse(placeList as string);

    const isPlaceListValid = await placeSchema.isValid(parsedPlaceList);
    if (!isPlaceListValid) {
      return res.status(422).json({ message: 'Invalid places inputs' });
    }

    await dbConnect();

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: 'User already exist' });
    }

    const createdUser = User.build({
      firstName,
      lastName,
      email,
      phone,
      password,
      image: req.file?.path,
    } as UserAttrs);
    await createdUser.save();

    const createdPlaces = parsedPlaceList.map((place) => {
      let placeToCreate = {
        user: createdUser._id,
        name: place.placeName,
        address: place.placeAddress,
      };

      if (place.placeLocation?.lng && place.placeLocation?.lat) {
        return Place.build({
          ...placeToCreate,
          location: {
            type: 'Point',
            coordinates: [place.placeLocation.lng, place.placeLocation.lat],
          },
        });
      }

      return Place.build(placeToCreate);
    });

    await Place.insertMany(createdPlaces);
    res.status(201).json({ email: createdUser.email, id: createdUser.id });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

authRoute.post(signupHandler);

export default authRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
