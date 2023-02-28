import React, {
  CSSProperties,
  Dispatch,
  FC,
  ForwardRefExoticComponent,
  MouseEventHandler,
  Ref,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import {
  motion,
  AnimatePresence,
  Variants,
  useAnimationControls,
} from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ImSpinner } from 'react-icons/im';

import {
  AddPlaceModalBackdrop,
  AddPlaceModalForm,
  FormBody,
  FormBodyInputsWrapper,
  FormFooter,
  StyledEditBtnWrapper,
  StyledSpinner,
} from '@/styles/components/add-place-modal.styled';
import Input from '../input/input';
import Map from '../map/map';
import PrimaryButton from '../primary-button/primary-button';
import { theme } from '@/utils/theme.styled';
import CloseIcon from '../close-icon/close-icon';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import {
  IPlaceInputs,
  IPlace,
  IPlaceApiResponse,
  IPlaceToEditBody,
} from '@/utils/types/place/place.types';
import addAddressSchema from '@/utils/yup-schema/add-place.schema';
import { ICoordinates } from '@/utils/types/map/map.types';
import {
  useAddUserPlacesMutation,
  useDeleteUserPlacesMutation,
  useEditUserPlacesMutation,
} from '@/redux/features/apiSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import SecondaryButton from '../secondary-button/secondary-button';
import LoadingBar, { IProps, LoadingBarRef } from 'react-top-loading-bar';
import ConfirmModal from '../confirm-modal/confirm-modal';

interface AddPlaceModalProps {
  toggleModal: Dispatch<SetStateAction<boolean>>;
  onAddTemporaryPlace?: Function;
  onDeleteTemporaryPlace?: Function;
  existPlacesNames?: string[];
  initialPlace?: IPlaceApiResponse;
  editMode?: boolean;
}

const modalBackdropVariants: Variants = {
  hidden: {
    height: '0',
    transition: {
      when: 'afterChildren',
    },
  },
  visible: {
    height: '100%',

    transition: {
      when: 'beforeChildren',
    },
  },
};

const modalFormVariants: Variants = {
  hidden: { opacity: 0 },
  // visible: { opacity: 1 },
  visible: (isEditing) => ({
    opacity: isEditing ? 0.4 : 1,
  }),
};

const spinnerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  spinnerInitial: { rotate: 0 },
  // visible: { opacity: 1 },
  spinnerAnimation: {
    // opacity: 1,
    rotate: 360,

    transition: { repeat: Infinity, duration: 0.5 },
  },
};

const editButtonVariants: Variants = {
  animation: { x: [-10, 10, -5, 4, -2, 1, 0], transition: { duration: 0.3 } },
};

const AddPlaceModal: FC<AddPlaceModalProps> = ({
  toggleModal,
  onAddTemporaryPlace,
  onDeleteTemporaryPlace,
  existPlacesNames,
  initialPlace,
  editMode,
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const {
    formState: { errors },
    register: placeRegister,
    handleSubmit: placeHandleSubmit,
    getValues: getPlaceValues,
    setValue: setPlaceValues,
    reset: placeFormReset,
    watch,
  } = useForm<IPlaceInputs>({
    resolver: yupResolver(addAddressSchema),
  });
  const [coordinates, setCoordinates] = useState<ICoordinates | undefined>(
    initialPlace?.placeLocation
  );
  const [savePlaceToDb, setSavePlaceToDb] = useState<boolean>(false);
  const [showDeletePlaceConfirmModal, setShowDeletePlaceConfirmModal] =
    useState(false);
  const [addUserPlaces, { isLoading: isSending, isSuccess }] =
    useAddUserPlacesMutation();
  const [editUserPlace, { isLoading: isEditing }] = useEditUserPlacesMutation();
  const [deleteUserPlace, { isLoading: isDeleting }] =
    useDeleteUserPlacesMutation();
  const [submitEditBtn, setSubmitEditBtn] = useState(false);
  const loadingBarRef = useRef<LoadingBarRef>(null);
  const editButtonAnimController = useAnimationControls();
  const router = useRouter();

  useEffect(() => {
    if (!document.getElementById('addPlaceModal')) {
      const addPlaceModalDiv = document.createElement('div');
      addPlaceModalDiv.setAttribute('id', 'addPlaceModal');
      addPlaceModalDiv.style.position = 'fixed';
      addPlaceModalDiv.style.top = '0';
      addPlaceModalDiv.style.right = '0';
      addPlaceModalDiv.style.width = '100%';
      addPlaceModalDiv.style.zIndex = '3';

      document.body.appendChild(addPlaceModalDiv);
    }
  }, []);

  const addPlaceHandler: SubmitHandler<IPlaceInputs> = async (formState) => {
    const newPlace: IPlaceToEditBody = {
      placeName: formState.placeName,
      placeAddress: formState.placeAddress,
      placeLocation: coordinates,
    };

    if (editMode) {
      setSubmitEditBtn(false);

      const placeToEdit = {
        ...newPlace,
        id: initialPlace?.id,
      };

      loadingBarRef.current?.continuousStart();

      await editUserPlace(placeToEdit);

      loadingBarRef.current?.complete();
      toggleModal(false);
      return;
    }

    if (existPlacesNames) {
      const placeAlreadyExist = existPlacesNames?.find(
        (placeName) => formState.placeName === placeName
      );
      if (placeAlreadyExist) {
        toast(
          <p>
            نام مکان نمیتواند <strong>تکراری</strong> باشد.
          </p>,
          {
            type: 'error',
          }
        );
        return;
      }
    }

    if (savePlaceToDb) {
      loadingBarRef.current?.continuousStart();
      await addUserPlaces(newPlace).unwrap();
      loadingBarRef.current?.complete();

      toggleModal(false);
      return;
    }

    toggleModal(false);
    onAddTemporaryPlace && onAddTemporaryPlace(newPlace);
  };

  const onDeletePlace = async () => {
    if (initialPlace?.id) {
      loadingBarRef.current?.continuousStart();

      await deleteUserPlace({ id: initialPlace.id });
      loadingBarRef.current?.complete();
      toggleModal(false);
      return;
    }

    onDeleteTemporaryPlace && onDeleteTemporaryPlace(initialPlace?.placeName);
    toggleModal(false);
    return;
  };

  const runEditButtonAnimation = () => {
    if (submitEditBtn) return;

    editButtonAnimController.start(editButtonVariants.animation);
  };

  let dynamicMapHeight: CSSProperties['height'];
  if (windowWidth) {
    dynamicMapHeight = windowWidth > 768 ? '300px' : '200px';
  } else {
    dynamicMapHeight = '200px';
  }

  useEffect(() => {
    if (initialPlace) {
      setPlaceValues('placeName', initialPlace.placeName);
      setPlaceValues('placeAddress', initialPlace.placeAddress);
    }
  }, [initialPlace]);

  const content = (
    <>
      <ConfirmModal
        buttonText="حذف مکان"
        modalBody={<p>مکان خذف شود ؟</p>}
        onConfirm={onDeletePlace}
        onCancel={setShowDeletePlaceConfirmModal.bind(null, false)}
        show={showDeletePlaceConfirmModal}
      />

      <AddPlaceModalBackdrop
        variants={modalBackdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={toggleModal.bind(null, false)}
      >
        <AddPlaceModalForm
          as={motion.form}
          variants={modalFormVariants}
          // custom={{ isEditing, isSending }}
          // custom={isEditing}
          // style={isEditing || isSending ? { opacity: 0.4 } : { opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          onSubmit={placeHandleSubmit(addPlaceHandler)}
        >
          <CloseIcon size="1.6rem" onClick={toggleModal.bind(null, false)} />

          <FormBody>
            <LoadingBar
              ref={loadingBarRef}
              color={theme.colors.primary}
              height={4}
              containerStyle={{ position: 'absolute' }}
              shadow={false}
              // shadowStyle={{ right: '0px' }}
            />
            <FormBodyInputsWrapper onClick={runEditButtonAnimation}>
              <Input
                name="placeName"
                label="نام مکان"
                placeholder="خانه، اداره، ..."
                register={placeRegister}
                invalid={!!errors.placeName}
                errorMessage={errors.placeName?.message}
                // disabled={isSending || editMode}
                disabled={
                  isSending || isEditing || (editMode && !submitEditBtn)
                }
              />
              <Input
                textarea
                name="placeAddress"
                label="آدرس مکان"
                placeholder="بابلسر - باغ فلاحت - کوچه ی حبیبی 7 - ساختمان بهاران2 - پلاک 198"
                register={placeRegister}
                invalid={!!errors.placeAddress}
                errorMessage={errors.placeAddress?.message}
                // disabled={isSending || editMode}
                disabled={
                  isSending || isEditing || (editMode && !submitEditBtn)
                }
              />
            </FormBodyInputsWrapper>
            {/* {!coordinates && ( */}
            <div onClick={runEditButtonAnimation}>
              <Map
                style={{
                  width: '100%',
                  margin: '.3rem',
                  height: dynamicMapHeight,
                  opacity: isSending ? 0.3 : 1,
                }}
                zoom={13}
                initialCoordinates={coordinates}
                onAddCoordinates={setCoordinates}
                stableMarker={editMode && !submitEditBtn}

                // onClick={runEditButtonAnimation}
              />
            </div>
            {/* )} */}
          </FormBody>
          <FormFooter>
            {editMode ? (
              <>
                {initialPlace?.id &&
                  (submitEditBtn ? (
                    <PrimaryButton
                      text="ارسال"
                      type="submit"
                      color={theme.colors.primary}
                      disabled={isEditing}
                    />
                  ) : (
                    <StyledEditBtnWrapper
                      as={motion.div}
                      variants={editButtonVariants}
                      animate={editButtonAnimController}
                    >
                      <PrimaryButton
                        text="ویرایش"
                        type="button"
                        color={theme.colors.primary}
                        onClick={
                          setSubmitEditBtn.bind(
                            null,
                            true
                          ) as MouseEventHandler<HTMLDivElement>
                        }
                        disabled={isEditing}
                      />
                    </StyledEditBtnWrapper>
                  ))}

                <PrimaryButton
                  text="خذف مکان"
                  type="button"
                  onClick={setShowDeletePlaceConfirmModal.bind(null, true)}
                  color={theme.colors.blue}
                  disabled={isEditing}
                  style={{ width: 'fit-content' }}
                />

                <SecondaryButton
                  text={submitEditBtn ? 'لغو' : 'بستن'}
                  type="button"
                  onClick={
                    submitEditBtn
                      ? setSubmitEditBtn.bind(null, false)
                      : toggleModal.bind(null, false)
                  }
                />
              </>
            ) : (
              <>
                <PrimaryButton
                  type="submit"
                  text="ذخیره مکان"
                  onClick={setSavePlaceToDb.bind(null, true)}
                  disabled={isSending}
                />

                {router.pathname === '/cart' && (
                  <PrimaryButton
                    text="فقط برای این سفارش"
                    color={theme.colors.blue}
                    onClick={setSavePlaceToDb.bind(null, false)}
                    disabled={isSending}
                  />
                )}
              </>
            )}
          </FormFooter>
        </AddPlaceModalForm>
      </AddPlaceModalBackdrop>
    </>
  );

  return mounted
    ? ReactDOM.createPortal(content, document?.getElementById('addPlaceModal')!)
    : null;
};

export default AddPlaceModal;
