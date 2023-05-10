import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

interface BackdropProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Backdrop: FC<BackdropProps> = ({ onClick }) => {
  if (!document.getElementById('backdrop')) {
    const backdropDiv = document.createElement('motion.div');
    backdropDiv.setAttribute('id', 'backdrop');
    backdropDiv.style.position = 'relative';
    backdropDiv.style.zIndex = '2';

    document.body.appendChild(backdropDiv);
  }

  return ReactDOM.createPortal(
    <StyledBackdrop onClick={onClick} />,
    document.getElementById('backdrop')!
  );
};

export default Backdrop;
