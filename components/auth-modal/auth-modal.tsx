import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion, Variants } from 'framer-motion';
import axios from 'axios';
import { signIn, SignInResponse } from 'next-auth/react';

import CloseIcon from '../ui/close-icon/close-icon';
import Input from '../ui/input/input';
import PrimaryButton from '../ui/primary-button/primary-button';
import SecondaryButton from '../ui/secondary-button/secondary-button';
import signupSchema from '../../utils/yup-schema/signup.schema';
import { AuthModalProps, IFormInputs } from '../../utils/types/auth.types';
import signinSchema from '../../utils/yup-schema/signin.schema';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  loadingBarSelector,
  setLoader,
} from '@/redux/features/loadingBarSlice';
import {
  AuthInputWrapper,
  ButtonsContainer,
  ModalHeader,
  ProfileImageWrapper,
  StyledCloseButton,
  StyledForm,
  StyledModal,
  Wrapper,
} from '@/styles/components/auth-modal.styled';
import LoadingBar from 'react-top-loading-bar';
import { theme } from '@/utils/theme.styled';
import OutlineButton from '../ui/outline-button/outline-button';
import { Coordinates } from '@/utils/types/map/map.types';
import addPlaceFormSchema from '@/utils/yup-schema/add-place.schema';
import { IPlaceInputs, IPlace } from '@/utils/types/place/place.types';
import { validatePlaceInputs } from '@/utils/validation/add-place.validation';
import { toast } from 'react-toastify';
import AddPlace from '../add-place/add-place';
import Image from 'next/image';

const authModalVariants: Variants = {
  initial: { y: '100vh', x: '0', opacity: 0, scale: 0.5 },
  exit: { y: '-100vh', x: '0', opacity: 0, scale: 0.5 },
  animation: {
    y: '0%',
    x: '0',
    opacity: 1,
    scale: 1,
  },
};

const AuthModal: FC<AuthModalProps> = ({ onClose }) => {
  const [isSingup, setIsSingup] = useState(false);
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(isSingup ? signupSchema : signinSchema),
  });
  const {
    register: placeRegister,
    getValues: getPlaceValues,
    reset: placeFormReset,
  } = useForm<IPlaceInputs>({
    resolver: yupResolver(addPlaceFormSchema),
  });
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );
  const [selectedImgPreviewUrl, setSelectedImgPreviewUrl] = useState<
    string | undefined
  >(undefined);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const filePickerHandler = () => {
    filePickerRef.current?.click();
  };

  const pickedFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      setSelectedImage(e.target.files[0]);
      // console.log(e.target.files[0], 'selected');
    }
  };

  const [coordinates, setCoordinates] = useState<Coordinates | undefined>(
    undefined
  );
  const [placeInputsErrors, setPlaceInputsErrors] = useState<{
    placeName: string | undefined;
    placeAddress: string | undefined;
  }>();
  const [placeList, setPlaceList] = useState<IPlace[]>([]);

  const { progress } = useAppSelector(loadingBarSelector);
  const dispatch = useAppDispatch();

  const addPlaceHandler = () => {
    const { placeAddress, placeName } = getPlaceValues();

    const { errors, isValid } = validatePlaceInputs({
      placeName,
      placeAddress,
    });
    setPlaceInputsErrors(errors);
    if (!isValid) {
      return;
    }

    const existPlace = !!placeList.find(
      (place) => place.placeName === placeName
    );

    if (existPlace) {
      toast(<p>آدرس با این نام وجود دارد!</p>, { type: 'error' });
      return;
    }

    const newPlace: IPlace = {
      placeName,
      placeAddress,
      placeLocation: coordinates,
    };

    setPlaceList((prev) => [...prev, newPlace]);
    setCoordinates(undefined);
    placeFormReset({ placeName: '', placeAddress: '' });
  };

  const onDeletePlace = (placeName: IPlaceInputs['placeName']) => {
    const newPlaceList = placeList.filter(
      (place) => place.placeName !== placeName
    );

    setPlaceList(newPlaceList);
  };

  const onFormSubmit: SubmitHandler<IFormInputs> = async (formStates) => {
    dispatch(setLoader(80));

    interface SignUpReqBody extends IFormInputs {
      placeList: IPlace[];
    }

    try {
      let authResult: SignInResponse | undefined;
      if (isSingup) {
        const enteredPassword = formStates.password;
        let signupReqBody;

        const formData = new FormData();
        formData.append('firstName', formStates.firstName);
        formData.append('lastName', formStates.lastName);
        formData.append('email', formStates.email);
        formData.append('phone', formStates.phone);
        formData.append('password', formStates.password);
        formData.append('placeList', JSON.stringify(placeList));
        selectedImage && formData.append('image', selectedImage);

        signupReqBody = {
          formData,
          placeList,
        };
        // console.log(signupReqBody, 'lkjl');
        const { data: createdUser } = await axios.post(
          'http://localhost:3000/api/auth/signup',
          // signupReqBody
          formData
          // placeList
          // { headers: { 'Content-Type': 'multipart/form-data' } }
          // {
          //   // ...signupReqBody,
          // }
        );

        authResult = await signIn('credentials', {
          redirect: false,
          email: createdUser.email,
          password: enteredPassword,
        });
      } else {
        authResult = await signIn('credentials', {
          redirect: false,
          email: formStates.email,
          password: formStates.password,
        });
      }

      if (!authResult?.error) {
        dispatch(setLoader(100));
        onClose();
        return;
      }

      if (authResult.error) {
        toast(<p>{authResult.error}</p>, {
          type: 'error',
          position: 'top-center',
          autoClose: false,
          style: { direction: 'ltr' },
        });
      }
      console.log(authResult, 'auth result');
    } catch (err) {
      console.log('error', err);
    }
  };

  useEffect(() => {
    if (!selectedImage) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setSelectedImgPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(selectedImage);
  }, [selectedImage]);

  let titleContent;
  if (isSingup) {
    titleContent = 'ثبت نام کنید.';
  } else {
    titleContent = 'وارد شوید.';
  }

  return (
    <Wrapper onClick={onClose}>
      <LoadingBar
        progress={progress}
        onLoaderFinished={() => dispatch(setLoader(0))}
        color={theme.colors.primary}
        height={4}
      />

      <StyledModal
        as={motion.div}
        variants={authModalVariants}
        initial="initial"
        animate="animation"
        transition={{ type: 'tween', duration: 0.5 }}
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <StyledCloseButton>
            <CloseIcon size={'1.6rem'} onClick={onClose} />
          </StyledCloseButton>
          <h3>{titleContent}</h3>
          <OutlineButton
            onClick={() => setIsSingup((prev) => !prev)}
            text={isSingup ? 'یا وارد شوید' : 'یا ثبت نام کنید'}
            style={{
              display: 'inline',
              marginRight: '.4rem',
            }}
            small
          />
        </ModalHeader>
        <StyledForm onSubmit={handleSubmit(onFormSubmit)}>
          {isSingup ? (
            <>
              <ProfileImageWrapper>
                <Image
                  // src="/images/profile-images/default.png"
                  src={
                    selectedImgPreviewUrl ||
                    '/images/profile-images/default.png'
                  }
                  width="100"
                  height="100"
                  alt="Profile Image"
                  onClick={filePickerHandler}
                />
                <input
                  name="image"
                  id="image"
                  type="file"
                  accept=".jpg,.png,.jpeg,.webgp"
                  onChange={pickedFileHandler}
                  ref={filePickerRef}
                />
              </ProfileImageWrapper>
              <AuthInputWrapper>
                <Input
                  label="نام"
                  type="text"
                  name="firstName"
                  required
                  register={register}
                  invalid={!!errors.firstName}
                  errorMessage={errors.firstName?.message}
                />

                <Input
                  label="نام خانوادگی"
                  type="text"
                  name="lastName"
                  register={register}
                  invalid={!!errors.lastName}
                  errorMessage={errors.lastName?.message}
                />
              </AuthInputWrapper>

              <AuthInputWrapper>
                <Input
                  label="ایمیل"
                  type="text"
                  placeholder="arvin@gmail.test.com"
                  name="email"
                  register={register}
                  invalid={!!errors.email}
                  errorMessage={errors.email?.message}
                />

                <Input
                  label="شماره همراه"
                  type="phone"
                  placeholder="09123456789"
                  name="phone"
                  register={register}
                  invalid={!!errors.phone}
                  errorMessage={errors.phone?.message}
                />
              </AuthInputWrapper>

              <AuthInputWrapper>
                <Input
                  // label="رمز عبور"
                  label="رمز عبور"
                  type="password"
                  placeholder="رمز عبور"
                  name="password"
                  register={register}
                  invalid={!!errors.password}
                  errorMessage={errors.password?.message}
                />

                <Input
                  label="تکرار رمز عبور"
                  type="password"
                  placeholder="تکرار رمز عبور"
                  name="confirmPassword"
                  register={register}
                  invalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message}
                />
              </AuthInputWrapper>

              <hr />
              <AddPlace
                coordinates={coordinates}
                setCoordinates={setCoordinates}
                placeList={placeList}
                onAddPlace={addPlaceHandler}
                onDeletePlace={onDeletePlace}
                inputErrors={placeInputsErrors}
                register={placeRegister}
              />
            </>
          ) : (
            <AuthInputWrapper>
              <Input
                label="ایمیل"
                type="text"
                placeholder="arvin@gmail.test.com"
                name="email"
                register={register}
                invalid={!!errors.email}
                errorMessage={errors.email?.message}
              />

              <Input
                label="رمز عبور"
                type="password"
                placeholder="رمز عبور"
                name="password"
                register={register}
                invalid={!!errors.password}
                errorMessage={errors.password?.message}
              />
            </AuthInputWrapper>
          )}

          <ButtonsContainer>
            <PrimaryButton
              disabled={Object.keys(errors).length > 0}
              type="submit"
              text={isSingup ? 'ثبت نام' : 'ورود'}
            />
            <SecondaryButton text={'لغو'} onClick={onClose} />
          </ButtonsContainer>
        </StyledForm>
      </StyledModal>
    </Wrapper>
  );
};

export default AuthModal;
