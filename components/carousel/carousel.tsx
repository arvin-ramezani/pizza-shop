import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { useAnimationControls, Variants } from 'framer-motion';

import { IFood } from '@/utils/types/foods/food.interface';
import FoodItem from '../food-section/food-item';
import { theme } from '@/utils/theme.styled';
import IconButton from '../ui/icon-button/icon-button';
import {
  CarouselTitle,
  StyledCarousel,
  StyledSlider,
} from '@/styles/components/carousel.styled';
import { carouselVariants, foodItemVariants } from './carousel.variants';

interface CarouselProps {
  foods: IFood[];
  title?: string;
}

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
  };

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
