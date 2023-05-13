import Carousel from 'react-multi-carousel';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import IconButton from '@/components/ui/icon-button/icon-button';

export const StyledCarousel = styled(motion.div)`
  margin-top: 2rem;
  padding: 2rem 0;
  border-radius: 0.5rem;
  background: #fff;

  & > h2 {
    margin: 0.5rem;
    padding-right: 1rem;
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

export const StyledReactCarousel = styled(Carousel)`
  padding-bottom: 1.5rem;

  & ul:first-child {
    align-items: center !important;
  }

  & ul:first-child > li {
    cursor: grab;
  }
`;

export const StyledIconBtn = styled(IconButton)`
  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: 0.5rem;

    & svg {
      width: 6px;
      height: 6px;
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-top: 0.5rem;

    & svg {
      width: 14px;
      height: 14px;
    }
  }
`;
