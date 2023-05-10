import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { secondaryBtnVariants } from './secondary-button-variants';

interface SecondaryButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
}

enum FULLWIDTH {
  TRUE = 'true',
  FALSE = 'false',
}

const SecondaryButton: FC<SecondaryButtonProps> = ({
  onClick,
  text,
  type,
  fullWidth,
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Button
        as={motion.button}
        variants={secondaryBtnVariants}
        initial="initial"
        whileTap="tap"
        animate="animation"
        whileHover="hover"
        type={type}
        fullwidth={fullWidth ? FULLWIDTH.TRUE : FULLWIDTH.FALSE}
      >
        {text}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)<{ fullwidth?: FULLWIDTH }>`
  width: ${({ fullwidth }) =>
    fullwidth === FULLWIDTH.TRUE ? '100%' : 'fit-content'};
`;

const Button = styled(motion.button)<{ fullwidth: FULLWIDTH }>`
  border: none;
  border-radius: 20px;
  color: #202020;
  padding: 0.2rem 0.8rem;
  font-family: 'Vazir';
  font-weight: bold;
  font-size: 1rem;
  opacity: 1;

  box-shadow: ${({ theme }) => `-1px 0px 3px 1px ${theme.colors.secondary}`};
  background-color: ${({ theme }) => theme.colors.secondary};
  width: ${({ fullwidth }) =>
    fullwidth === FULLWIDTH.TRUE ? '95%' : 'fit-content'};

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:focus {
    outline: 1px solid #000;
  }
`;

export default SecondaryButton;
