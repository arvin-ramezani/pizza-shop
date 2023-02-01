import Link from 'next/dist/client/link';
import React from 'react';
import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
import { MdOutlineChecklistRtl } from 'react-icons/md';

const ProfileNav = () => {
  return (
    <StyledNav>
      <ul>
        <li>
          <FaUserEdit size="1.4rem" />
          <span>حساب کاربری</span>
        </li>
        <li>
          <MdOutlineChecklistRtl size="1.4rem" />
          <span>لیست سفارشات</span>
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
    }
  }

  & ul > li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;

    :first-child {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
`;

export default ProfileNav;
