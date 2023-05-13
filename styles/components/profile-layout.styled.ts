import styled from 'styled-components';

export const StyledProfilePageLayout = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding-top: 110px;
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
    padding-top: 150px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    max-width: 90%;
    margin: 0 auto;

    & > nav {
      z-index: 0;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 80%;
    margin: 0 auto;
  }
`;

export const StyledContent = styled.div`
  flex: 3;
`;
