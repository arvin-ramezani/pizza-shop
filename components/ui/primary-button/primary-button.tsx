import React, { FC, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { motion, MotionStyle } from 'framer-motion';

import { primaryBtnVariants } from './primary-button-variants';

interface PrimaryButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  style?: MotionStyle | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
}

enum BooleanEnum {
  TRUE = 'true',
  FALSE = 'false',
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClick,
  text,
  type,
  color,
  style,
  disabled,
  fullWidth,
}) => {
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <Wrapper
      fullwidth={fullWidth ? BooleanEnum.TRUE : BooleanEnum.FALSE}
      onClick={onClickHandler}
      style={style}
    >
      <Button
        variants={primaryBtnVariants}
        disabled={disabled}
        style={style}
        as={motion.button}
        whileTap={disabled ? undefined : 'tap'}
        whileHover={disabled ? undefined : 'hover'}
        type={type}
        color={color}
        initial="initial"
        animate={disabled ? 'disabled' : 'animation'}
        exit="exit"
        fullwidth={BooleanEnum ? BooleanEnum.TRUE : BooleanEnum.FALSE}
      >
        {text}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)<{ fullwidth?: BooleanEnum }>`
  width: ${({ fullwidth }) =>
    fullwidth === BooleanEnum.TRUE ? '100%' : 'fit-content'};
`;

const Button = styled(motion.button)<{ fullwidth: BooleanEnum }>`
  border: none;
  border-radius: 20px;
  color: #f5f5f5;
  padding: 0.2rem 0.6rem;
  font-family: 'Vazir';
  font-weight: bold;
  font-size: 1rem;
  margin: 0 auto;
  display: block;

  box-shadow: ${({ theme, color }) =>
    color
      ? `-2px 1px 3px 1px ${color}`
      : `-2px 1px 3px 1px ${theme.colors.primary}`};
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.primary};
  width: ${({ fullwidth }) =>
    fullwidth === BooleanEnum.TRUE ? '100%' : 'fit-content'};

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:focus {
    outline: 1px solid #000;
  }

  &:disabled {
    opacity: 0.5;
    color: #7c7c7c;
  }
`;

export default PrimaryButton;
