import { MouseEventHandler, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiCircle } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';

import {
  AnimateStyledPlace,
  PlaceMore,
  PLaceMoreWrapper,
  StyledActivePlace,
  StyledPlace,
  StyledDeactivePlace,
} from '@/styles/components/places.styled';
import { IPlace, IPlaceApiResponse } from '@/utils/types/place/place.types';
import { placeVariants } from '../places.variants';
import { placeMoreVariants } from './place-item.variants';
import { theme } from '@/utils/theme.styled';

interface PlaceProps {
  place: IPlaceApiResponse | IPlace;
  currentSelectedPlace: string | undefined;
  onPlaceHandler: (name: string) => void;
  onMoreButton: Function;
  selectable?: boolean;
}

function PlaceItem({
  place: { placeName },
  currentSelectedPlace,
  onPlaceHandler,
  onMoreButton,
  selectable,
}: PlaceProps) {
  const [isSelected, setIsSelected] = useState(
    currentSelectedPlace === placeName
  );

  useEffect(() => {
    if (!currentSelectedPlace) return;
    setIsSelected(currentSelectedPlace === placeName);
  }, [currentSelectedPlace]);

  return (
    <StyledPlace
      as={motion.div}
      variants={placeVariants}
      style={isSelected ? { zIndex: 1 } : { zIndex: 0 }}
      selectable={selectable ? 'true' : 'false'}
    >
      <AnimateStyledPlace
        variants={placeVariants}
        animate="activeAnimation"
        whileTap={'tap'}
        custom={isSelected}
        onClick={onPlaceHandler.bind(null, placeName)}
      >
        <span>{placeName}</span>

        {selectable && (
          <AnimatePresence>
            <StyledDeactivePlace
              key="placeCircleIcon"
              whileTap={{ scale: 0.6 }}
            >
              <BiCircle size="1.4rem" color={theme.colors.primary} />
            </StyledDeactivePlace>
            {isSelected && (
              <StyledActivePlace
                key="placeSelectedIcon"
                layout
                layoutId="activePlace"
              >
                <BsCheckCircleFill color={theme.colors.primary} size="1.4rem" />
              </StyledActivePlace>
            )}
          </AnimatePresence>
        )}
      </AnimateStyledPlace>

      <PLaceMoreWrapper
        onClick={onMoreButton as MouseEventHandler<HTMLDivElement>}
        variants={placeMoreVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ type: 'tween' }}
      >
        <PlaceMore variants={placeMoreVariants} whileTap="tap">
          بیشتر
        </PlaceMore>
      </PLaceMoreWrapper>
    </StyledPlace>
  );
}

export default PlaceItem;
