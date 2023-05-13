import React from 'react';
import { ToastContainer as DefaultToastContainer } from 'react-toastify';
import styled from 'styled-components';

import CloseIcon from '../close-icon/close-icon';
import IconButton from '../icon-button/icon-button';
import 'react-toastify/dist/ReactToastify.css';

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

const Container = styled(DefaultToastContainer)``;

export default ToastContainer;
