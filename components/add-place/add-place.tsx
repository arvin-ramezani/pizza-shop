import {
  AnimatePresence,
  motion,
  useAnimationControls,
  Variants,
} from 'framer-motion';
import React, { Dispatch, FC, useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { MdOutlineFileDownloadDone } from 'react-icons/md';
import { RiMapPinAddFill } from 'react-icons/ri';

import {
  AddLocationWrapper,
  AuthMapWrapper,
  StyledAddPlaceBlock,
} from '@/styles/components/add-place.styled';
import { ICoordinates } from '@/utils/types/map/map.types';
import MapModal from '../ui/map-modal/map-modal';
import OutlineButton from '../ui/outline-button/outline-button';
import Input from '../ui/input/input';
import { AuthInputWrapper } from '@/styles/components/auth-modal.styled';
import { theme } from '@/utils/theme.styled';
import { IPlaceInputs, IPlace } from '@/utils/types/place/place.types';
import PrimaryButton from '../ui/primary-button/primary-button';
import PlaceList from '../place-list/place-list';
import { addCoordinatesVariant } from './add-place.variants';

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
      <h4>افزودن آدرس</h4>

      <PlaceList placeList={placeList} onDelete={onDeletePlace} />

      <AuthInputWrapper>
        <AuthMapWrapper>
          <Input
            label="نام مکان"
            type="text"
            placeholder="منزل، اداره، ..."
            name="placeName"
            register={register}
            invalid={!!inputErrors?.placeName}
            errorMessage={inputErrors?.placeName || undefined}
            errorTextMargin={'.3rem 0 0 0'}
          />
          <AddLocationWrapper>
            <OutlineButton
              small
              type="button"
              icon={<RiMapPinAddFill color={'red'} size="1.6rem" />}
              text={coordinates?.lng ? 'ویرایش' : 'افزودن موقعیت روی نقشه'}
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
                  title="پاک کردن موقعیت"
                >
                  <MdOutlineFileDownloadDone
                    color={theme.colors.blue}
                    size="1.4rem"
                  />
                  ذخیره شد
                </motion.span>
              )}
            </AnimatePresence>
          </AddLocationWrapper>
        </AuthMapWrapper>

        <div style={{ width: '100%' }}>
          <Input
            label="آدرس مکان"
            type="text"
            placeholder="بابلسر - باغ فلاحت - کوچه ی حبیبی 7 - ساختمان بهاران2 - پلاک 198"
            name="placeAddress"
            textarea
            register={register}
            invalid={!!inputErrors?.placeAddress}
            errorMessage={inputErrors?.placeAddress}
            errorTextMargin={'0.2rem 0 1rem'}
          />
        </div>
      </AuthInputWrapper>
      <div>
        <PrimaryButton
          text="ذخیره آدرس"
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
