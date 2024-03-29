import { yupResolver } from '@hookform/resolvers/yup';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/redux/hooks';
import { motion, useAnimationControls, Variants } from 'framer-motion';
import { MdDelete } from 'react-icons/md';

import Input from '../ui/input/input';
import {
  FormButtonsContainer,
  InputWrapper,
  ProfileImageWrapper,
  StyledEditBtnWrapper,
  StyledForm,
} from '@/styles/components/profile-form.styled';
import { useEditUserMutation, useGetMeQuery } from '@/redux/features/apiSlice';
import PrimaryButton from '../ui/primary-button/primary-button';
import { theme } from '@/utils/theme.styled';
import { setLoader } from '@/redux/features/loadingBarSlice';
import { IGetMeApiResponse } from '@/utils/types/user/user.types';
import IconButton from '../ui/icon-button/icon-button';
import { meSchema } from '@/utils/yup-schema/me.schema';
import { editButtonVariant } from './profile-form.variants';
import { useSession } from 'next-auth/react';

export interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const ProfileForm = () => {
  const { status } = useSession();
  const {
    data: userData,
    isLoading,
    error,
  } = useGetMeQuery(undefined, { skip: status !== 'authenticated' });

  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm<IFormInputs>({
    resolver: yupResolver(meSchema),
  });
  const [editMode, setEditMode] = useState(false);
  const [editUserMutation] = useEditUserMutation();
  const filePickerRef = useRef<HTMLInputElement>(null);
  const editButtonAnimController = useAnimationControls();
  const dispatch = useAppDispatch();

  const [selectedImage, setSelectedImage] = useState<
    File | undefined | 'DELETE'
  >(undefined);

  const [selectedImgPreviewUrl, setSelectedImgPreviewUrl] = useState<
    string | undefined
  >(userData?.user.image);

  const filePickerHandler = () => {
    if (!editMode) return;

    filePickerRef.current?.click();
  };

  const pickedFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length === 1) {
      setSelectedImage(e.target.files[0]);
      console.log(e.target.files[0], 'selected');
    }
  };

  const submitHandler: SubmitHandler<IFormInputs> = async (formStates) => {
    const formData = new FormData();

    formData.append('firstName', formStates.firstName);
    formData.append('lastName', formStates.lastName);
    formData.append('email', formStates.email);
    formData.append('phone', formStates.phone);

    selectedImage && formData.append('image', selectedImage);

    dispatch(setLoader(80));

    await editUserMutation(formData);

    dispatch(setLoader(100));
    setSelectedImage(undefined);
    setSelectedImgPreviewUrl(userData?.user.image);
    setEditMode(false);
  };

  const onCancelEdit = () => {
    setEditMode((prev) => !prev);

    userData && setDefaultInputsValues(userData.user);

    if (editMode) {
      setSelectedImage(undefined);
      setSelectedImgPreviewUrl(userData?.user.image);
    }
  };

  const onDeleteImage = () => {
    if (!editMode) {
      editButtonAnimController.start(editButtonVariant.animation);
      return;
    }

    setSelectedImage('DELETE');
    setSelectedImgPreviewUrl(undefined);
  };

  const setDefaultInputsValues = (user: IGetMeApiResponse['user']) => {
    const { firstName, lastName, email, phone } = user;

    clearErrors();

    setValue('firstName', firstName);
    setValue('lastName', lastName || '');
    setValue('email', email);
    setValue('phone', phone);

    if (user.image) {
      setSelectedImgPreviewUrl(user.image);
    } else {
      setSelectedImgPreviewUrl('/images/profile-images/default.png');
    }
  };

  useEffect(() => {
    if (!userData || !userData.user) return;
    setDefaultInputsValues(userData.user);
  }, [userData]);

  useEffect(() => {
    if (!selectedImage || selectedImage === 'DELETE') return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setSelectedImgPreviewUrl(fileReader.result as string);
    };
    fileReader.readAsDataURL(selectedImage);
  }, [selectedImage]);

  if (isLoading) {
    return <p>بارگذاری...</p>;
  }

  return (
    <StyledForm
      onClick={editButtonAnimController.start.bind(
        null,
        editButtonVariant.animation
      )}
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2>اطلاعات فردی</h2>
      <ProfileImageWrapper>
        <img
          src={selectedImgPreviewUrl || '/images/profile-images/default.png'}
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
          disabled={!editMode}
        />

        {(selectedImage || userData?.user.image) && (
          <span>
            <IconButton tapEffect onClick={onDeleteImage}>
              <MdDelete color={theme.colors.primary} size="1.6rem" />
            </IconButton>
          </span>
        )}
      </ProfileImageWrapper>
      <InputWrapper>
        <Input
          name="firstName"
          label="نام"
          register={register}
          invalid={!!errors.firstName}
          errorMessage={errors.firstName?.message}
          disabled={!editMode}
        />
        <Input
          name="lastName"
          label="نام خانوادگی"
          height="60px"
          register={register}
          invalid={!!errors.lastName}
          errorMessage={errors.lastName?.message}
          disabled={!editMode}
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          name="email"
          label="ایمیل"
          register={register}
          invalid={!!errors.email}
          errorMessage={errors.email?.message}
          disabled={!editMode}
        />
        <Input
          name="phone"
          label="شماره تماس"
          register={register}
          invalid={!!errors.phone}
          errorMessage={errors.phone?.message}
          disabled={!editMode}
        />
      </InputWrapper>

      <FormButtonsContainer>
        {editMode && <PrimaryButton text="ذخیره" />}

        <StyledEditBtnWrapper
          as={motion.div}
          variants={editButtonVariant}
          animate={editButtonAnimController}
          custom={editMode}
        >
          <PrimaryButton
            text={editMode ? 'لغو' : 'ویرایش'}
            type="button"
            color={editMode ? theme.colors.secondary : theme.colors.primary}
            style={{ color: `${editMode ? 'black' : 'white'}` }}
            onClick={onCancelEdit}
          />
        </StyledEditBtnWrapper>
      </FormButtonsContainer>
    </StyledForm>
  );
};

export default ProfileForm;
