import { motion, MotionStyle, Variants } from 'framer-motion';
import Image from 'next/image';
import React, { FC, MouseEvent, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { buttonSmVariants } from './button-sm-variants';

interface PrimaryButtonProps {
  onClick?: MouseEventHandler<HTMLDivElement>;
  text: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  style?: MotionStyle;
  loading?: boolean;
}

const loadingImageVariants: Variants = {
  initial: {
    rotate: 0,
  },
  animation: {
    rotate: -360,
    transition: { repeat: Infinity, duration: 0.6, ease: 'linear' },
  },
};

const ButtonSm: FC<PrimaryButtonProps> = ({
  onClick,
  text,
  type,
  color,
  textColor,
  disabled,
  style,
  loading,
}) => {
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
    if (disabled) return;

    onClick && onClick(e);
  };

  return (
    <Wrapper onClick={onClickHandler} style={style}>
      <Button
        as={motion.button}
        variants={buttonSmVariants}
        whileTap={!disabled ? 'tap' : 'disabled'}
        whileHover={!disabled ? 'hover' : 'disabled'}
        type={type}
        color={color}
        textcolor={textColor}
        disabled={disabled}
        animate={disabled ? 'disabled' : 'animation'}
        initial="initial"
        style={style}
      >
        {loading ? (
          <StyleLoadingImage
            as={motion.img}
            variants={loadingImageVariants}
            initial="initial"
            animate="animation"
            src="/images/button/loading.png"
            alt="loading"
            width={18}
            height={18}
            style={{ borderRadius: '50%' }}
          />
        ) : (
          text
        )}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  cursor: pointer;
  width: fit-content;
`;

enum BooleanEnum {
  TRUE = 'true',
  FALSE = 'false',
}

const Button = styled(motion.button)<{ textcolor?: string }>`
  min-width: 100px;
  border: none;
  border-radius: 20px;
  font-family: 'Vazir';
  font-size: 0.7rem;
  font-weight: bold;
  letter-spacing: 1px;
  align-self: center;
  padding: 0.2rem 0.8rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: ${({ theme, color }) =>
    color
      ? `-2px 1px 3px 1px ${color}`
      : `-2px 1px 3px 1px ${theme.colors.primary}`};
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.primary};
  color: ${({ theme, textcolor }) =>
    textcolor ? textcolor : theme.colors.white};
`;

const StyleLoadingImage = styled(motion.img)`
  width: 18px;
  height: 18px;
  border-radius: 50%;
`;

export default ButtonSm;
