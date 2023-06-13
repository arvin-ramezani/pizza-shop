import React, { FC, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RiMapPinAddFill } from 'react-icons/ri';

import {
  StyledPlaceListContainer,
  StyledPlaces,
} from '@/styles/components/places.styled';
import { useGetUserPlacesQuery } from '@/redux/features/apiSlice';
import { IPlace } from '@/utils/types/place/place.types';
import { IPlaceApiResponse } from '@/utils/types/place/place.types';
import AddPlaceModal from '../ui/add-place-modal/add-place-modal';
import OutlineButton from '../ui/outline-button/outline-button';
import { placeListVariants } from './places.variants';
import PlaceItem from './place-item/place-item';

interface CartPlacesProps {
  selectable?: boolean;
  onAddPlace?: Function;
}

const Places: FC<CartPlacesProps> = ({ selectable, onAddPlace }) => {
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [mapEditMode, setMapEditMode] = useState(false);

  const {
    data,

    isLoading,
  } = useGetUserPlacesQuery();

  const [placeList, setPlaceList] = useState<IPlaceApiResponse[] | undefined>(
    data
  );

  let temporaryPlaces: IPlaceApiResponse[] = useMemo(() => [], []);

  const [currentSelectedPlace, setCurrentSelectedPlace] = useState<
    string | undefined
  >();
  const [initialModalPlace, setInitialModalPlace] = useState<
    IPlaceApiResponse | undefined
  >();

  const onPlaceHandler = (name: string) => {
    setCurrentSelectedPlace(() => name);
    onAddPlace &&
      onAddPlace(placeList?.find((place) => place.placeName === name));
  };

  const onAddTemporaryPlaceHandler = (place: IPlaceApiResponse) => {
    setPlaceList((prevList) => prevList && [place, ...prevList]);
    temporaryPlaces.push(place);
  };

  const onDeleteTemporaryPlaceHandler = (
    placeName: IPlaceApiResponse['placeName']
  ) => {
    temporaryPlaces = temporaryPlaces.filter(
      (tempPlace) => tempPlace.placeName !== placeName
    );

    setPlaceList(
      (prev) => prev?.filter((prevPlace) => prevPlace.placeName !== placeName)!
    );
  };

  const onPlaceMoreHandler = (place: IPlaceApiResponse) => {
    setInitialModalPlace(place);
    setMapEditMode(true);
    setShowAddPlaceModal((prev) => !prev);
  };

  useEffect(() => {
    if (!placeList || placeList?.length < 1) return;

    onAddPlace &&
      onAddPlace(
        placeList.find((place) => place.placeName === currentSelectedPlace)
      );
  }, [currentSelectedPlace]);

  useEffect(() => {
    if (!showAddPlaceModal) {
      setMapEditMode(false);
      setInitialModalPlace(undefined);
    }
  }, [showAddPlaceModal]);

  useEffect(() => {
    if (!data) return;
    if (temporaryPlaces.length > 0) {
      setPlaceList([...temporaryPlaces, ...data]);
    } else {
      setPlaceList(data);
    }

    placeList && setCurrentSelectedPlace(placeList[0]?.placeName);
  }, [isLoading, data]);

  useEffect(() => {
    if (!placeList || placeList.length < 1) return;
    placeList?.length > 0 && setCurrentSelectedPlace(placeList[0].placeName);

    onAddPlace && onAddPlace(placeList[0].id);
  }, [placeList]);

  if (isLoading) {
    return <span>بارگذاری...</span>;
  }

  if (!placeList) {
    return <></>;
  }

  return (
    <StyledPlaces
      variants={placeListVariants}
      initial="initial"
      animate="animation"
    >
      <AnimatePresence>
        {showAddPlaceModal && (
          <AddPlaceModal
            key="addPlaceModal"
            toggleModal={setShowAddPlaceModal}
            onAddTemporaryPlace={onAddTemporaryPlaceHandler}
            onDeleteTemporaryPlace={onDeleteTemporaryPlaceHandler}
            existPlacesNames={placeList?.map((place) => place.placeName)}
            initialPlace={initialModalPlace as IPlace & IPlaceApiResponse}
            editMode={mapEditMode}
          />
        )}
      </AnimatePresence>

      <StyledPlaceListContainer>
        <AnimatePresence>
          {placeList?.length === 0 && <h5>شما مکانی ذیره نکردید !</h5>}

          {placeList &&
            placeList?.map((place) => (
              <PlaceItem
                place={place}
                selectable={selectable}
                key={place.placeName}
                currentSelectedPlace={currentSelectedPlace}
                onPlaceHandler={onPlaceHandler}
                onMoreButton={onPlaceMoreHandler.bind(null, place)}
              />
            ))}
        </AnimatePresence>
      </StyledPlaceListContainer>

      <OutlineButton
        text="افزودن آدرس جدید"
        icon={<RiMapPinAddFill color={'red'} size="1.2rem" />}
        onClick={setShowAddPlaceModal.bind(null, (prev) => !prev)}
      />
    </StyledPlaces>
  );
};

export default Places;
