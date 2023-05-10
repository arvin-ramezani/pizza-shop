import { motion, MotionStyle, Variants } from 'framer-motion';
import React, { FC, CSSProperties } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { theme } from '../../../utils/theme.styled';

interface ICloseIcon {
  onClick?: () => void;
  size?: string;
  color?: string;
  style?: CSSProperties;
}

const closeIconVariants: Variants = {
  tap: { scale: 0.6, opacity: 0.6 },
  hover: { scale: 1.1 },
  disabled: { opacity: 0.4, transition: { duration: 0.3 } },
  animation: { opacity: 1, cursor: 'pointer' },
};

const CloseIcon: FC<ICloseIcon> = ({ onClick, size, color, style }) => {
  return (
    <IconWrapper
      // whileHover="hover"
      // whileTap="tap"
      // animate="animation"
      role="close-icon"
      onClick={onClick}
      style={style}
    >
      <motion.span
        variants={closeIconVariants}
        whileHover="hover"
        whileTap="tap"
        animate="animation"
      >
        <AiOutlineCloseCircle
          size={size || '1rem'}
          color={color || theme.colors.primary}
        />
      </motion.span>
    </IconWrapper>
  );
};

const IconWrapper = styled(motion.span)`
  color: ${({ theme }) => theme.colors.primary};
  display: inline-block;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }

  & > span {
    display: flex;
  }
`;

export default CloseIcon;
