import { motion } from 'framer-motion';
import Slider from 'react-slick';
import styled from 'styled-components';

export const StyledCarousel = styled(motion.div)`
  margin: 0 auto 6.5rem;
  position: relative;

  & .slick-list {
    height: 500px;
  }
`;

export const CarouselTitle = styled(motion.h4)`
  font-size: 1.4rem;
  position: absolute;
  z-index: 1;
`;

export const StyledSlider = styled(Slider)`
  & .slick-slide {
    direction: rtl;
  }

  & .slick-arrow {
    position: absolute;
    bottom: 0;
    top: 105%;
    width: auto;
  }

  & .slick-next {
    right: 70px;
    left: auto;
    &::before {
      content: '';
    }
  }

  & .slick-prev {
    right: 20px;
    left: auto;
    &::before {
      content: '';
    }
  }
`;
