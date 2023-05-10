import { Place, PlaceAttrs } from '@/models/Place';
import { UserDoc } from '@/models/User';
import dbConnect from '@/utils/db/dbConnect';
import transformUserPlacesResponse from '@/utils/transform-api-response/transform-user-places-response';
import {
  IPlace,
  IPlaceToEditBody,
  TransformPlacesArgsTypes,
} from '@/utils/types/place/place.types';
import placeSchema from '@/utils/yup-schema/place.schema';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

interface PlaceApiRequest extends NextApiRequest {
  body: (IPlace & IPlaceToEditBody) | '';
}

export async function usersPlacesGetHandler(
  req: PlaceApiRequest,
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

    const places = await Place.find({ user: session?.sub });

    const transformedPlaces = places.map((address) =>
      transformUserPlacesResponse(address)
    );

    res.status(200).json(transformedPlaces);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

export async function usersPlacesPostHandler(
  req: PlaceApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    const isBodyValid = await placeSchema.isValid([req.body]);
    if (!isBodyValid) {
      return res.status(422).json({ message: 'Invalid place inputs' });
    }

    const { placeAddress, placeName, placeLocation } = req.body as IPlace;
    const userId = session?.sub;

    await dbConnect();

    const existPlace = await Place.find({ user: userId, name: placeName });
    if (existPlace.length > 0) {
      return res
        .status(400)
        .json({ message: `Place with name ${placeName} is already exist !` });
    }

    const placeToCreate = {
      user: userId as UserDoc['_id'],
      name: placeName,
      address: placeAddress,
      ...(placeLocation && {
        location: {
          type: 'Point',
          coordinates: [placeLocation.lng, placeLocation.lat],
        },
      }),
    };

    const createdPlace = Place.build(placeToCreate as PlaceAttrs);
    await createdPlace.save();

    const transformedPlace = transformUserPlacesResponse(
      createdPlace as TransformPlacesArgsTypes
    );

    res.status(201).json(transformedPlace);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

export async function usersPlacesPatchHandler(
  req: PlaceApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    if (req.body === '') return;

    const { placeAddress, placeName, id, placeLocation } = req.body;

    const isBodyValid = await placeSchema.isValid([req.body]);
    if (!isBodyValid || !id) {
      return res.status(422).json({ message: 'Invalid place inputs' });
    }

    await dbConnect();

    let placeToEdit = await Place.findById(id);
    if (!placeToEdit) {
      res.status(404).json({ message: 'Place not found !' });
      return;
    }

    placeToEdit.name = placeName;
    placeToEdit.address = placeAddress;

    placeLocation &&
      (placeToEdit.location = {
        type: 'Point',
        coordinates: [placeLocation?.lng, placeLocation?.lat],
      });

    await placeToEdit.save();

    res.status(200).json(placeToEdit);
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}

export async function usersPlacesDeleteHandler(
  req: PlaceApiRequest,
  res: NextApiResponse
) {
  try {
    const secret = process.env.JWT_SECRET;
    const session = await getToken({ req, secret });
    if (!session) {
      res.status(401).json({ message: 'You are not authenticated' });
      return;
    }

    if (req.body === '' || !req.body.id) {
      return res.status(422).json({ message: 'Invalid place inputs' });
    }

    await dbConnect();
    const placeToDelete = await Place.findById(req.body.id);

    await placeToDelete?.delete();

    res.status(200).json({ message: 'Place deleted successfully' });
    return;
    return;
  } catch (error) {
    res.status(500).json({ message: 'Somethin went wrong !' });
  }
}
