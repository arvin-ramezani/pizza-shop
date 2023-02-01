import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import fs from 'fs';

import runMulterMiddleware, { upload } from '@/middleware/multer-middleware';
import { Place } from '@/models/Place';
import { User } from '@/models/User';
import dbConnect from '@/utils/db/dbConnect';
import transformUserPlacesResponse from '@/utils/transform-api-response/transform-user-places-response';
import { patchBodySchema } from '@/utils/yup-schema/userSchema';

interface PatchApiRequest extends NextApiRequest {
  body: {
    image?: 'DELETE';
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
  };
  file?: Express.Multer.File;
}

export async function usersGetHandler(
  req: NextApiRequest,
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
    const user = await User.findById(session?.sub);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const userPlaces = await Place.find({ user: user?._id });
    const transformedUserPlaces = userPlaces.map((place) =>
      transformUserPlacesResponse(place)
    );

    res.status(200).json({ user, userPlaces: transformedUserPlaces });
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

export async function usersPatchHandler(
  req: PatchApiRequest,
  res: NextApiResponse
) {
  try {
    await runMulterMiddleware(req, res, upload.single('image'));

    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    await dbConnect();
    const user = await User.findById(session?.sub);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isValid = await patchBodySchema.isValid(req.body);
    if (!isValid) {
      return res.status(422).json({ message: 'Invalid inputs' });
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;

    if (req.file) {
      user.image && fs.unlink(user.image, (err) => console.log(err));

      user.image = req.file.path;
    } else if (req.body.image === 'DELETE') {
      user.image && fs.unlink(user.image, (err) => console.log(err));
      user.image = undefined;
    }

    await user.save();
    res.status(200).json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}
