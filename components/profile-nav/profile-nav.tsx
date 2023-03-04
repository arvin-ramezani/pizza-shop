import Link from 'next/dist/client/link';
import React from 'react';
import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineChecklistRtl } from 'react-icons/md';
import { getSession, useSession } from 'next-auth/react';
import ActiveLink from '../ui/active-link/active-link';

const ProfileNav = () => {
  const { data: userData } = useSession();

  return (
    <StyledNav>
      <ul>
        <li>
          <FaUserEdit size="1.4rem" />
          <ActiveLink
            activeClassName="profile-page__link--active-class"
            className="profile-page__link--default"
            href={'/profile'}
          >
            حساب کاربری
          </ActiveLink>
        </li>
        <li>
          <MdOutlineChecklistRtl size="1.4rem" />
          <ActiveLink
            activeClassName="profile-page__link--active-class"
            className="profile-page__link--default"
            href={`/profile/${encodeURIComponent(userData?.user?.id!)}/orders`}
          >
            لیست سفارشات
          </ActiveLink>
        </li>
      </ul>
    </StyledNav>
  );
};

export const StyledNav = styled.nav`
  background-color: #fff;
  height: 70px;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  box-shadow: 0px -1px 4px 1px #f5f5f5;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
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

export default ProfileNav;
