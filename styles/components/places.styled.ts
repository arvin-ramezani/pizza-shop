import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledPlaces = styled(motion.div)`
  margin: 1rem 0;
`;

export const StyledPlaceListContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 2rem;
  padding: 1rem 0;
  min-height: 100px;
`;

export const StyledPlace = styled(motion.div)<{
  selectable?: 'true' | 'false';
}>`
  border-radius: 0.3rem;
  position: relative;

  background: ${({ theme }) => theme.colors.darkWhite};
  cursor: ${({ selectable }) => (selectable ? 'cursor' : 'default')};
`;

export const AnimateStyledPlace = styled(motion.div)`
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
`;

export const StyledActivePlace = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: -6px;
`;

export const StyledDeactivePlace = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: -6px;
  cursor: pointer;
`;

export const PLaceMoreWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 0.2rem 0;
  border-radius: 0 0 0.3rem 0.3rem;
  cursor: pointer;
`;

export const PlaceMore = styled(motion.span)`
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  text-align: center;
`;
