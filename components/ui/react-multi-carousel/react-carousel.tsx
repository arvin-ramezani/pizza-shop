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

interface CustomRightArrowProps extends ArrowProps {
  previous?: () => void;
}

interface CustomLeftArrowProps extends ArrowProps {
  next?: () => void;
}

interface CarouselButtonGroupProps extends ButtonGroupProps {
  className?: string;
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
}

const carouselVariants: Variants = {
  initialTitle: { opacity: 0, x: -300 },
  titleAnimation: {
    // position: 'absolute',
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

const ReactCarousel: FC<ReactCarouselProps> = ({ foods, title }) => {
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
        ssr={true} // means to render carousel on server-side.
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
        customButtonGroup={<CarouselButtonGroup />}
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

  & > h2 {
    margin: 0;
  }
`;

export const StyledReactCarousel = styled(Carousel)`
  padding-bottom: 1rem;

  & ul:first-child {
    align-items: center !important;
  }
`;

const CustomLeftArrow = ({ next }: CustomLeftArrowProps) => {
  return (
    <IconButton ariaLabel="go to next slide" onClick={next && next}>
      <AiFillLeftCircle color={theme.colors.blue} size={'2rem'} />
    </IconButton>
  );
};

const CustomRightArrow = ({ previous }: CustomRightArrowProps) => {
  return (
    <IconButton
      style={{ width: '36px', height: '36px' }}
      ariaLabel="go to previous slide"
      onClick={previous && previous}
    >
      <AiFillRightCircle color={theme.colors.blue} size={'2rem'} />
    </IconButton>
  );
};

const CarouselButtonGroup = ({ next, previous }: CarouselButtonGroupProps) => {
  return (
    <div>
      <CustomRightArrow previous={previous} />
      <CustomLeftArrow next={next} />
    </div>
  );
};

const CustomDot = ({ onClick, ...rest }: DotProps) => {
  const { active } = rest;

  return (
    <IconButton
      style={{ width: '100%', padding: '0 .1rem', outline: 'none' }}
      onClick={onClick && onClick}
    >
      {active ? (
        <FaCircle color={theme.colors.blue} size=".4rem" />
      ) : (
        <FiCircle color={theme.colors.blue} size=".4rem" />
      )}
    </IconButton>
  );
};

export default ReactCarousel;
