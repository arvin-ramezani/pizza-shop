import { PlaceDoc } from '@/models/Place';
import { Types } from 'mongoose';
import { Coordinates } from '../map/map.types';

export interface IPlaceInputs {
  placeName: string;
  placeAddress: string;
}

export interface IPlace {
  placeName: string;
  placeAddress: string;
  placeLocation?: Coordinates;
}

export interface IPlaceApiResponse extends IPlace {
  id?: string;
  user: string;
}

export interface IPlaceToEditBody extends IPlace {
  id?: string;
}

export type TransformPlacesArgsTypes = PlaceDoc & {
  _id: Types.ObjectId;
};
