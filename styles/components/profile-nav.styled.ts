import { theme } from '@/utils/theme.styled';
import styled from 'styled-components';

export const StyledNav = styled.nav`
  background-color: ${({ theme }) => theme.backgroundColors.white};
  height: 70px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  box-shadow: 0px -1px 4px 1px ${({ theme }) => theme.backgroundColors.white};

  @media (min-width: ${theme.breakpoints.md}) {
    flex-direction: column;
    position: static;
    flex: 1;
    height: auto;
    box-shadow: none;
    border-left: 1px solid ${({ theme }) => theme.colors.darkWhite};
  }

  & ul {
    display: flex;
    gap: 1.5rem;
    padding: 0.5rem 1rem;
    height: 100%;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      flex-direction: column;
      margin-top: 2rem;
      padding: 0.5rem 0;
    }
  }

  & ul > li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
  }

  font-size: 1rem;

  .profile-page__link--default {
    font-size: 0.9rem;
    font-weight: normal;
    color: #000;
  }

  .profile-page__link--active-class {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;
