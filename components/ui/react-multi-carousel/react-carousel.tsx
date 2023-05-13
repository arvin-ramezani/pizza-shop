import { FC, JSXElementConstructor, ReactElement, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import {
  ButtonGroupProps,
  ArrowProps,
  DotProps,
} from 'react-multi-carousel/lib/types';

import { IFood } from '@/utils/types/foods/food.interface';
import FoodItem from '@/components/foods/food-section/food-item';
import IconButton from '../icon-button/icon-button';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { theme } from '@/utils/theme.styled';
import styled from 'styled-components';
import { FaCircle } from 'react-icons/fa';
import { FiCircle } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import { useAnimationControls, motion, Variants } from 'framer-motion';
import { BsRecordCircle, BsRecordCircleFill } from 'react-icons/bs';

interface CustomRightArrowProps extends ArrowProps {
  previous?: () => void;
  // slideLength: number;
}

interface CustomLeftArrowProps extends ArrowProps {
  next?: () => void;
  // slideLength: number;
}

interface CarouselButtonGroupProps extends ButtonGroupProps {
  className?: string;
  slideLength: number;
}

const responsive = {
  desktopBg: {
    breakpoint: { max: 3000, min: 1600 },
    items: 6,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktopMd: {
    breakpoint: { max: 1600, min: 1350 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktopSm: {
    breakpoint: { max: 1350, min: 1084 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tabletBg: {
    breakpoint: { max: 1084, min: 820 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },

  tabletSm: {
    breakpoint: { max: 820, min: 576 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 576, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

interface ReactCarouselProps {
  foods: IFood[];
  title: string;
  slideLength: number;
}

const carouselVariants: Variants = {
  initialTitle: { opacity: 0, x: -300 },
  titleAnimation: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 400, damping: 10, delay: 0.5 },
  },
};

const foodItemVariants: Variants = {
  initial: { opacity: 0, x: -40 },
  animation: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, delay: 0.6 },
  },
};

const ReactCarousel: FC<ReactCarouselProps> = ({
  foods,
  title,
  slideLength,
}) => {
  const { ref, inView } = useInView({ threshold: 0.2 });

  const animation = useAnimationControls();
  const titleAnimation = useAnimationControls();

  useEffect(() => {
    if (inView) {
      animation.start(foodItemVariants.animation);
      titleAnimation.start(carouselVariants.titleAnimation);
    } else {
      animation.start(foodItemVariants.initial);
      titleAnimation.start(carouselVariants.initialTitle);
    }
  }, [inView, animation]);

  return (
    <StyledCarousel ref={ref} animate={animation}>
      <motion.h2
        variants={carouselVariants}
        initial="initialTitle"
        animate={titleAnimation}
      >
        {title}
      </motion.h2>
      <StyledReactCarousel
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        //   autoPlay={true}
        //   autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all 0.5s"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        rtl
        arrows={false}
        renderButtonGroupOutside={true}
        customButtonGroup={<CarouselButtonGroup slideLength={slideLength} />}
        customDot={<CustomDot />}
      >
        {foods.map((food, index) => (
          <FoodItem key={food.name + index} {...food} />
        ))}
      </StyledReactCarousel>
    </StyledCarousel>
  );
};

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

const CustomLeftArrow = ({ next }: CustomLeftArrowProps) => {
  return (
    <IconButton
      ariaLabel="go to next slide"
      onClick={next && next}
      tapEffect
      boxShadow
      style={{ outline: 'none' }}
    >
      <AiFillLeftCircle color={theme.colors.dark} size={'2rem'} />
    </IconButton>
  );
};

const CustomRightArrow = ({ previous }: CustomRightArrowProps) => {
  return (
    <IconButton
      ariaLabel="go to previous slide"
      onClick={previous && previous}
      tapEffect
      boxShadow
      style={{ outline: 'none' }}
    >
      <AiFillRightCircle color={theme.colors.dark} size={'2rem'} />
    </IconButton>
  );
};

const CarouselButtonGroup = ({
  next,
  previous,
  slideLength,
}: CarouselButtonGroupProps) => {
  return (
    <div
      style={{
        display: slideLength >= 6 ? 'flex' : 'none',
        alignItems: 'center',
        gap: '1rem',
        paddingRight: '1rem',
      }}
    >
      <CustomRightArrow previous={previous} />
      <CustomLeftArrow next={next} />
    </div>
  );
};

const CustomDot = ({ onClick, ...rest }: DotProps) => {
  const { active } = rest;

  return (
    <StyledIconBtn
      style={{ width: '100%', padding: '0 .1rem', outline: 'none' }}
      onClick={onClick && onClick}
      tapEffect
    >
      {active ? (
        <FaCircle color={theme.colors.dark} size=".4rem" />
      ) : (
        <FiCircle color={theme.colors.dark} size=".4rem" />
      )}
    </StyledIconBtn>
  );
};

const StyledIconBtn = styled(IconButton)`
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

export default ReactCarousel;
