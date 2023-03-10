import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion';
import React, {
  createRef,
  Dispatch,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseFormRegister } from 'react-hook-form';

import {
  AddLocationWrapper,
  AuthMapWrapper,
  StyledAddPlaceBlock,
} from '@/styles/components/add-place.styled';
import { ICoordinates } from '@/utils/types/map/map.types';
import MapModal from '../ui/map-modal/map-modal';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import OutlineButton from '../ui/outline-button/outline-button';
import { RiMapPinAddFill } from 'react-icons/ri';
import Input from '../ui/input/input';
import { AuthInputWrapper } from '@/styles/components/auth-modal.styled';
import { theme } from '@/utils/theme.styled';
import { IPlaceInputs, IPlace } from '@/utils/types/place/place.types';
import PrimaryButton from '../ui/primary-button/primary-button';
import PlaceList from '../place-list/place-list';

const addCoordinatesVariant: Variants = {
  hidden: { y: -20, opacity: 0, scale: 0 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 10, delay: 0.4 },
  },
};

interface AddPlaceProps {
  placeList: IPlace[];
  onAddPlace: () => void;
  onDeletePlace: (placeName: IPlace['placeName']) => void;
  coordinates: ICoordinates | undefined;
  inputErrors:
    | {
        placeName: string | undefined;
        placeAddress: string | undefined;
      }
    | undefined;
  setCoordinates: Dispatch<React.SetStateAction<ICoordinates | undefined>>;
  register: UseFormRegister<IPlaceInputs>;
}

const AddPlace: FC<AddPlaceProps> = ({
  placeList,
  onAddPlace,
  onDeletePlace,
  coordinates,
  inputErrors,
  setCoordinates,
  register,
}) => {
  const [showMapModal, setShowMapModal] = useState(false);

  const addCoordinatesAnimeController = useAnimationControls();

  useEffect(() => {
    if (typeof coordinates === 'undefined') return;
    addCoordinatesAnimeController.set(addCoordinatesVariant.hidden);
    addCoordinatesAnimeController.start(addCoordinatesVariant.visible);
  }, [coordinates?.lat, coordinates?.lng]);

  return (
    <StyledAddPlaceBlock as={motion.div}>
      <h4>???????????? ????????</h4>

      <PlaceList placeList={placeList} onDelete={onDeletePlace} />

      <AuthInputWrapper>
        <AuthMapWrapper>
          <Input
            label="?????? ????????"
            type="text"
            placeholder="?????????? ???????????? ..."
            name="placeName"
            register={register}
            invalid={!!inputErrors?.placeName}
            errorMessage={inputErrors?.placeName || undefined}
          />
          <AddLocationWrapper>
            <OutlineButton
              small
              type="button"
              icon={<RiMapPinAddFill color={'red'} size="1.6rem" />}
              text={coordinates?.lng ? '????????????' : '???????????? ???????????? ?????? ????????'}
              onClick={() => setShowMapModal(true)}
              style={{ padding: '0 .8rem' }}
            />
            <AnimatePresence>
              {coordinates?.lat && coordinates?.lng && (
                <motion.span
                  variants={addCoordinatesVariant}
                  initial="hidden"
                  animate={addCoordinatesAnimeController}
                  exit="hidden"
                  style={{ cursor: 'pointer' }}
                  onClick={setCoordinates.bind(null, undefined)}
                  title="?????? ???????? ????????????"
                >
                  <MdOutlineFileDownloadDone
                    color={theme.colors.blue}
                    size="1.4rem"
                  />
                  ?????????? ????
                </motion.span>
              )}
            </AnimatePresence>
          </AddLocationWrapper>
        </AuthMapWrapper>

        <div style={{ width: '100%' }}>
          <Input
            label="???????? ????????"
            type="text"
            placeholder="???????????? - ?????? ?????????? - ???????? ?? ?????????? 7 - ?????????????? ????????????2 - ???????? 198"
            name="placeAddress"
            textarea
            register={register}
            invalid={!!inputErrors?.placeAddress}
            errorMessage={inputErrors?.placeAddress}
            errorTextMargin={'-0.3rem 0 1rem'}
          />
        </div>
      </AuthInputWrapper>
      <div>
        <PrimaryButton
          text="?????????? ????????"
          type="button"
          onClick={onAddPlace}
          color={theme.colors.blue}
          style={{ marginRight: '1rem' }}
        />
      </div>

      <MapModal
        show={showMapModal}
        onAddCoordinates={(coord: ICoordinates) => setCoordinates(coord)}
        onClose={() => setShowMapModal(false)}
      />
    </StyledAddPlaceBlock>
  );
};

export default AddPlace;
