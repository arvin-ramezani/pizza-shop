import { useGetUserPlacesQuery } from '@/redux/features/apiSlice';
import React from 'react';
import styled from 'styled-components';
import Places from '../places/places';

const ProfilePlaces = () => {
  // const {data: places} = useGetUserPlacesQuery()

  return (
    <StyledProfilePlaces>
      <h3>لیست مکان ها</h3>
      <Places key={'profilePlaces'} />
    </StyledProfilePlaces>
  );
};

export const StyledProfilePlaces = styled.div`
  width: 80%;
  margin: 3rem auto 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 70%;
  }
`;

export default ProfilePlaces;
