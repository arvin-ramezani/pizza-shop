import React from 'react';
import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineChecklistRtl } from 'react-icons/md';
import { useSession } from 'next-auth/react';

import ActiveLink from '../ui/active-link/active-link';
import { StyledNav } from '../../styles/components/profile-nav.styled';

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

export default ProfileNav;
