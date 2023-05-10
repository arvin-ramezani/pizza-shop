import { motion, MotionStyle, Variants } from 'framer-motion';
import React, { FC, MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

interface OutlineButtonProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  icon?: ReactNode;
  text: string;
  color?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  style?: MotionStyle | undefined;
  disabled?: boolean;
  fullWidth?: boolean;
  small?: boolean;
}

enum BooleanEnum {
  TRUE = 'true',
  FALSE = 'false',
}

const outlineBtnVariants: Variants = {
  initial: { y: -30, opacity: 0, scale: 0.6 },
  animation: {
    y: 0,
    opacity: 1,
    scale: 1,
    cursor: 'pointer',
    transition: { duration: 0.4 },
  },
  // exit: { x: -50, opacity: 0, scale: 1 },
  disabled: {
    opacity: 0.8,
    x: 0,
    transition: { duration: 0.4 },
    cursor: 'no-drop',
  },
  hover: { scale: 1.1 },
  tap: { scale: 0.6 },
};

const OutlineButton: FC<OutlineButtonProps> = ({
  onClick,
  text,
  color,
  type,
  style,
  disabled,
  fullWidth,
  small,
  icon,
}) => {
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    if (disabled) return;
    e.stopPropagation();
    onClick && onClick(e);
  };

  return (
    <Wrapper
      style={style}
      fullwidth={fullWidth ? BooleanEnum.TRUE : BooleanEnum.FALSE}
      onClick={onClickHandler}
    >
      <Button
        as={motion.button}
        style={style}
        whileTap={!disabled ? { scale: 0.6 } : undefined}
        whileHover={!disabled ? { scale: 1.1, cursor: 'pointer' } : undefined}
        type={type}
        color={color}
        disabled={disabled}
        variants={outlineBtnVariants}
        initial="initial"
        animate={disabled ? undefined : 'animation'}
        exit="exit"
        fullwidth={fullWidth ? BooleanEnum.TRUE : BooleanEnum.FALSE}
        small={small ? BooleanEnum.TRUE : BooleanEnum.FALSE}
      >
        <StyledIcon>{icon}</StyledIcon>
        {text}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)<{ fullwidth?: BooleanEnum }>`
  width: ${({ fullwidth }) =>
    fullwidth === BooleanEnum.TRUE ? '100%' : 'fit-content'};
`;

const Button = styled(motion.button)<{
  fullwidth?: BooleanEnum;
  small?: BooleanEnum;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Vazir';
  font-weight: bold;
  letter-spacing: 0.5px;
  opacity: 1;
  margin: 0 auto;
  border-radius: 20px;
  width: 100%;
  padding: 0.2rem 1.2rem;
  background-color: transparent !important;

  box-shadow: ${({ theme, color }) =>
    color
      ? `0px 0px 3px 0px ${color}`
      : `0px 0px 3px 0px ${theme.colors.primary}`};

  border: 2px solid
    ${({ theme, color }) => (color ? color : theme.colors.primary)};

  color: ${({ theme, color }) => (color ? color : theme.colors.primary)};

  font-size: ${({ theme, small }) =>
    small === BooleanEnum.TRUE ? '.6rem' : '.8rem'};

  width: ${({ fullwidth }) =>
    fullwidth === BooleanEnum.TRUE ? '95%' : 'fit-content'};

  &:focus {
    outline: 2px solid #000;
  }
`;

const StyledIcon = styled(motion.div)`
  display: flex;
  margin-left: 0.2rem;
`;

export default OutlineButton;
