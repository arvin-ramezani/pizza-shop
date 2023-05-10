import { TransformPlacesArgsTypes } from '../types/place/place.types';

export default function ({
  name,
  address,
  user,
  location,
  _id,
}: TransformPlacesArgsTypes) {
  return {
    id: _id,
    user,
    placeName: name,
    placeAddress: address,
    placeLocation: location?.coordinates[0] && {
      lng: location?.coordinates[0],
      lat: location?.coordinates[1],
    },
  };
}
