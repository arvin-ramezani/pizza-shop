import { IPlaceApiResponse } from '../place/place.types';

export interface IGetMeApiResponse {
  user: {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    image?: string;
  };
  userPlaces: IPlaceApiResponse[];
}
