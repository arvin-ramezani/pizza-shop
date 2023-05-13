import styled from 'styled-components';

export const StyledProfilePlaces = styled.div`
  width: 80%;
  margin: 3rem auto 0;

  & h3 {
    font-size: 1.6rem;
    font-weight: 700;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 70%;
  }
`;
