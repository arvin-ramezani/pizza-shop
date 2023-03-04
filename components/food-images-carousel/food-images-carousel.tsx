import { motion, PanInfo, Variants } from 'framer-motion';
import React, { FC, useState } from 'react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

import { IFood } from '@/utils/types/foods/food.interface';
import IconButton from '../ui/icon-button/icon-button';
import { theme } from '@/utils/theme.styled';
import {
  ButtonsContainer,
  Container,
  Slide,
  SlidesContainer,
  StyledImage,
} from '@/styles/components/food-images-carousel.styled';

interface FoodImagesCarouselProps {
  name: IFood['name'];
  images: string[];
}

const foodImagesCarouselVariants: Variants = {
  initial: { scale: 0, rotate: -200 },
  animation: { scale: 1, rotate: 0 },
  slideAnimation: ({ position, index }) => ({
    zIndex: index === position ? 1 : -1,
    scale: index === position ? 1 : 0.8,
    rotate: 0,
    opacity: [0, 1],
    borderRadius: '0.6rem',
    // right: `${(index - position) * 60 - 40}vw`,
    right: `${(index - position) * 50 - 40}vw`,
    transition: { type: 'spring', stiffness: 200, damping: 15 },
  }),
};

const foodImageVariants: Variants = {
  initial: { boxShadow: '0px 0px 0px 0px transparent' },
  animation: ({ position, index }) => ({
    boxShadow:
      index === position
        ? '-6px 4px 20px 4px rgb(181 178 178)'
        : '0px 0px 0px 0px transparent',
  }),
};

const FoodImagesCarousel: FC<FoodImagesCarouselProps> = ({ images, name }) => {
  const [position, setPosition] = useState(0);

  const onLeft = () => {
    if (position < images.length - 1) {
      setPosition(position + 1);
    }
  };

  const onRight = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  const onDragHandler: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void = (e, info) => {
    console.log(info, 'info');
    if (!info.offset.x) return;

    if (info.offset.x > 1) {
      onLeft();
      return;
    }
    if (info.offset.x < -1) {
      onRight();
      return;
    }
  };

  return (
    <Container>
      <SlidesContainer as={motion.div}>
        {images.map((item, index) => {
          if (item.length < 1) {
            <h5>no image found</h5>;
          }

          return (
            <Slide
              as={motion.div}
              key={item}
              variants={foodImagesCarouselVariants}
              initial="initial"
              animate="slideAnimation"
              custom={{ position, index }}
            >
              <StyledImage
                variants={foodImageVariants}
                animate="animation"
                custom={{ position, index }}
                src={item}
                alt={`عکس ${name}`}
                width={300}
                height={150}
                drag="x"
                dragConstraints={{ left: 1, right: 1 }}
                onDragStart={onDragHandler}
              />
            </Slide>
          );
        })}
        <ButtonsContainer
          as={motion.div}
          variants={foodImagesCarouselVariants}
          initial="initial"
          animate="animation"
          transition={{ delay: 0.3 }}
        >
          <IconButton
            ariaLabel="previous slide"
            onClick={onRight}
            tapEffect
            disabled={position === 0}
          >
            <AiFillRightCircle color={theme.colors.blue} size={'2rem'} />
          </IconButton>
          <IconButton
            ariaLabel="next slide"
            onClick={onLeft}
            tapEffect
            disabled={position === images.length - 1}
          >
            <AiFillLeftCircle color={theme.colors.blue} size={'2rem'} />
          </IconButton>
        </ButtonsContainer>
      </SlidesContainer>
    </Container>
  );
};

export default FoodImagesCarousel;
