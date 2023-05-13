import { motion } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';

enum BooleanEnum {
  TRUE = 'true',
  FALSE = 'false',
}

export const CategoryItemContainer = styled(motion.div)`
  display: flex;
  border-radius: 60px;
  width: fit-content;
  gap: 0.1rem;
  align-items: center;
  padding: 0 0.5rem;

  & > h6 {
    margin: 0;
    padding: 0.3rem 0.5rem;
    background: ${({ theme }) => theme.backgroundColors.white};
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;

export const CategoryItemBorder = styled.div<{ leftborder?: BooleanEnum }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border-radius: 1.5rem;
  height: 3rem;
  cursor: pointer;
  position: relative;

  padding: ${({ leftborder }) =>
    leftborder === BooleanEnum.TRUE ? '0 0 0 0.5rem' : '0 0.5rem'};

  border: 1px solid ${({ theme }) => theme.backgroundColors.dark};

  border-right: ${({ leftborder, theme }) =>
    leftborder === BooleanEnum.TRUE
      ? '0'
      : `1px solid ${theme.backgroundColors.dark}`};
`;

export const StyledImage = styled(Image)<{ borderradius: BooleanEnum }>`
  border-radius: ${({ borderradius }) =>
    borderradius === BooleanEnum.TRUE ? '50%' : '0'};
`;

export const StyledActiveDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 1.5rem;
  z-index: -1;
`;
