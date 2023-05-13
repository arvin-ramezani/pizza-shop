import { useSession } from 'next-auth/react';
import React from 'react';
import styled from 'styled-components';

import Places from '../places/places';
import { StyledProfilePlaces } from './profile-places.variants';

const ProfilePlaces = () => {
  const { status } = useSession();

  if (status !== 'authenticated') {
    return <></>;
  }

  return (
    <StyledProfilePlaces>
      <h3>لیست مکان ها</h3>

      <Places key={'profilePlaces'} />
    </StyledProfilePlaces>
  );
};

export default ProfilePlaces;
