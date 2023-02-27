import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import styled from 'styled-components';
import ProfileNav from '../profile-nav/profile-nav';
import Layout from './layout';

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

export const StyledProfilePageLayout = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-top: 70px;
  min-height: 100vh;
  margin-bottom: 4rem;
  overflow: hidden !important;

  & > nav {
    z-index: 1;
  }

  & > div {
    z-index: 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-top: 100px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    max-width: 90%;
    margin: 0 auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 80%;
    margin: 0 auto;
  }
`;

export const StyledContent = styled.div`
  flex: 3;
`;

export default ProfilePageLayout;
