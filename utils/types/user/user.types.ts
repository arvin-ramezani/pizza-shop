import { IPlaceApiResponse } from '../place/place.types';

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  image?: string;
}

export interface IGetMeApiResponse {
  user: IUser;
  userPlaces: IPlaceApiResponse[];
}
