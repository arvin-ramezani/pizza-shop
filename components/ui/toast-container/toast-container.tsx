import React from 'react';

import { ToastContainer as DefaultToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import CloseIcon from '../close-icon/close-icon';
import IconButton from '../icon-button/icon-button';

const ToastContainer = () => {
  return (
    <Container
      rtl
      position="bottom-right"
      limit={2}
      closeButton={
        <IconButton tapEffect toastBtn>
          <CloseIcon size="1.5rem" />
        </IconButton>
      }
    />
  );
};

const Container = styled(DefaultToastContainer)`
  & .Toastify__toast-body {
    align-items: flex-start;
  }

  & .Toastify__toast-icon {
    margin-top: 0.4rem;
  }

  & .Toastify__toast-body > div:last-child {
    font-family: 'Vazir';
  }
`;

export default ToastContainer;
