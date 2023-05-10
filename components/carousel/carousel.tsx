import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import Slider, { Settings, CustomArrowProps } from 'react-slick';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { IFood } from '@/utils/types/foods/food.interface';
import FoodItem from '../foods/food-section/food-item';
import { theme } from '@/utils/theme.styled';
import IconButton from '../ui/icon-button/icon-button';
import { useAnimationControls, Variants } from 'framer-motion';
import {
  CarouselTitle,
  StyledCarousel,
  StyledSlider,
} from '@/styles/components/carousel.styled';

interface CarouselProps {
  foods: IFood[];
  title?: string;
}

const carouselVariants: Variants = {
  initialTitle: { opacity: 0, x: -300 },
  titleAnimation: {
    // position: 'absolute',
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 400, damping: 10, delay: 1.5 },
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

const Carousel: FC<CarouselProps> = ({ foods, title }) => {
  const [sliderRef, setSliderRef] = useState<Slider | null>();
  const { ref, inView } = useInView({ threshold: 0.2 });

  const animation = useAnimationControls();
  const titleAnimation = useAnimationControls();

  const sliderSettings: Settings = {
    slidesToShow: 5,
    // slidesToScroll: 1,
    infinite: false,
    vertical: false,
    // rtl: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
    // children: foods as ReactNode,
    // onInit: sliderRef?.slickGoTo.bind(null, 0),
    // onInit:
  };

  useEffect(() => {
    // console.log(sliderRef?.state);

    if (inView) {
      animation.start(foodItemVariants.animation);
      titleAnimation.start(carouselVariants.titleAnimation);
    } else {
      animation.start(foodItemVariants.initial);
      titleAnimation.start(carouselVariants.initialTitle);
    }
  }, [inView, animation]);

  // useEffect(() => {
  //   console.log('slick');
  //   sliderRef?.componentDidMount && sliderRef?.slickGoTo(0);
  //   // inView && sliderRef?.slickGoTo(0);
  // }, []);

  return (
    <StyledCarousel animate={animation} ref={ref}>
      <CarouselTitle
        variants={carouselVariants}
        initial="initialTitle"
        animate={titleAnimation}
      >
        {title}
      </CarouselTitle>
      <StyledSlider ref={setSliderRef} {...sliderSettings}>
        {foods.map((food, index) => {
          return <FoodItem key={food.name + index} {...food} />;
        })}
      </StyledSlider>
    </StyledCarousel>
  );
};

function NextArrow(props?: CustomArrowProps) {
  const { className, onClick } = props!;

  return (
    <IconButton
      style={{ width: '36px', height: '36px' }}
      className={className}
      ariaLabel="next slide"
      onClick={onClick as () => void}
      disabled={!onClick}
    >
      <AiFillLeftCircle color={theme.colors.blue} size={'2rem'} />
    </IconButton>
  );
}

function PrevArrow(props?: CustomArrowProps) {
  const { className, onClick } = props!;

  return (
    <IconButton
      style={{ width: '36px', height: '36px' }}
      className={className}
      ariaLabel="previous slide"
      onClick={onClick as () => void}
      disabled={!onClick}
    >
      <AiFillRightCircle color={theme.colors.blue} size={'2rem'} />
    </IconButton>
  );
}

export default Carousel;
