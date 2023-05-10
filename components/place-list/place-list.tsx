import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { IPlace } from '@/utils/types/place/place.types';
import Place from './place/place';
import { StyledPlaceList } from '@/styles/components/place-list.styled';

interface PlaceListProps {
  placeList: IPlace[];
  onDelete: Function;
}

const PlaceList: FC<PlaceListProps> = ({ placeList, onDelete }) => {
  return (
    <StyledPlaceList>
      <AnimatePresence>
        {placeList.map((place) => (
          <Place key={place.placeName} {...place} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </StyledPlaceList>
  );
};

export default PlaceList;
