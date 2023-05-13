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
import {
  foodImagesCarouselVariants,
  foodImageVariants,
} from './food-images-carousel.variants';

interface FoodImagesCarouselProps {
  name: IFood['name'];
  images: string[];
}

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
