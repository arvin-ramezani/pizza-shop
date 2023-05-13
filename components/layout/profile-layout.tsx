import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styled from 'styled-components';
import ProfileNav from '../profile-nav/profile-nav';
import Layout from './layout';
import {
  StyledContent,
  StyledProfilePageLayout,
} from '@/styles/components/profile-layout.styled';

interface LayoutProps {
  children: React.ReactNode;
}

const ProfilePageLayout: FC<LayoutProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    router.replace('/');
    return <></>;
  }

  return (
    <Layout>
      <StyledProfilePageLayout>
        <ProfileNav />

        <StyledContent>{children}</StyledContent>
      </StyledProfilePageLayout>
    </Layout>
  );
};

export default ProfilePageLayout;
