import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { BsCheckCircleFill, BsCheckLg } from 'react-icons/bs';
import { BiCircle } from 'react-icons/bi';

import {
  AnimateStyledPlace,
  PlaceMore,
  PLaceMoreWrapper,
  StyledActivePlace,
  StyledDeactivePlace,
  StyledPlace,
  StyledPlaceListContainer,
  StyledPlaces,
} from '@/styles/components/places.styled';
import { theme } from '@/utils/theme.styled';
import { useGetUserPlacesQuery } from '@/redux/features/apiSlice';
import { IPlace } from '@/utils/types/place/place.types';
import { IPlaceApiResponse } from '@/utils/types/place/place.types';
import { AnimatePresence, Variants } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { RiMapPinAddFill } from 'react-icons/ri';
import AddPlaceModal from '../ui/add-place-modal/add-place-modal';
import OutlineButton from '../ui/outline-button/outline-button';

const placeListVariants: Variants = {
  initial: { opacity: 0 },
  animation: {
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.3, delay: 1 },
  },
};

const placeVariants: Variants = {
  initial: { x: -30, y: -30, opacity: 0, scale: 0.5 },
  animation: (isSelected) => {
    return {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,

      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 10,
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    };
  },

  // activeAnimation: (isSelected) => ({
  //   background: isSelected ? theme.colors.primary : theme.colors.darkWhite,
  //   color: isSelected ? theme.colors.white : '#000',

  //   transition: {
  //     delay: 0.2,
  //   },
  // }),
};

// const placeMoreVariants: Variants = {
//   tap: {
//     width: ' 100vw',
//     height: '100vh',
//     position: 'fixed',
//     right: 0,
//     top: 0,
//   },
// };

interface CartPlacesProps {
  selectable?: boolean;
  onAddPlace?: Function;
}

const Places: FC<CartPlacesProps> = ({ selectable, onAddPlace }) => {
  const { status } = useSession();
  const {
    data,
    // : placeList

    isLoading,
    isSuccess,
  } = useGetUserPlacesQuery();
  const [placeList, setPlaceList] = useState<IPlaceApiResponse[] | undefined>(
    data
  );
  let temporaryPlaces: IPlaceApiResponse[] = useMemo(() => [], []);

  const [currentSelectedPlace, setCurrentSelectedPlace] = useState<
    string | undefined
  >();
  const [showAddPlaceModal, setShowAddPlaceModal] = useState(false);
  const [initialModalPlace, setInitialModalPlace] = useState<
    IPlaceApiResponse | undefined
  >();
  const [mapEditMode, setMapEditMode] = useState(false);

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
    // setPlaceList((prevList) => prevList && [place, ...prevList]);
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
    // Prevent body to scroll when the modal is opened.
    if (document) {
      showAddPlaceModal
        ? (document.body.style.overflow = 'hidden')
        : (document.body.style.overflow = 'auto');
    }

    if (!showAddPlaceModal) {
      setMapEditMode(false);
      setInitialModalPlace(undefined);
    }

    // !showAddPlaceModal && setMapViewMode(false);
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

  const selectHandler = (name: string) => {
    // if ()
  };

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
        style={
          {
            // background: isSelected ? theme.colors.primary : theme.colors.darkWhite,
          }
        }
        // initial="initial"
        // animate="animation"
        custom={isSelected}
        onClick={onPlaceHandler.bind(null, placeName)}
        // layout
        // layoutId="activePlace"
      >
        <span>{placeName}</span>

        {/* {isSelected && <PlaceActiveStyle layout layoutId="activePlace" />} */}
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

const placeMoreVariants: Variants = {
  initial: { fontSize: '0.7rem' },
  // animate: { fontSize: '0.7rem' },
  hover: { fontSize: '0.9rem' },
  tap: { scale: 0.2 },
};

export default Places;
