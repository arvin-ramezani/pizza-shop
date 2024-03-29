import React, { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';

import ProfilePageLayout from '@/components/layout/profile-layout';
import { NextPageWithLayout } from '../_app';
import { StyledProfilePage } from '@/styles/pages/profile.styled';
import ProfileForm from '@/components/profile-form/profile-form';
import ProfilePlaces from '@/components/profile-places/profile-places';
import { useSession } from 'next-auth/react';

const ProfilePage: NextPageWithLayout = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/');
    }
  }, [status]);

  return (
    <StyledProfilePage>
      <ProfileForm />

      <ProfilePlaces />
    </StyledProfilePage>
  );
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
  return <ProfilePageLayout>{page}</ProfilePageLayout>;
};

export default ProfilePage;
