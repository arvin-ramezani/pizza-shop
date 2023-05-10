import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { motion, Variant, Variants } from 'framer-motion';
import Image from 'next/image';
import styled from 'styled-components';
import React, { FC, useEffect, useState } from 'react';

import { Category } from '@/utils/types/categories/category.enum';
import { ICategoryItem } from 'utils/types/categories/category.interface';
import { foodsSelector, setCategory } from '@/redux/features/foodsSlice';
import { theme } from '@/utils/theme.styled';

const categoryItemVariant: Variants = {
  animation: (active) => ({
    color: active ? theme.colors.white : theme.colors.dark,
    fontSize: active ? '1.2rem' : '1rem',
  }),
};

const CategoryItem: FC<ICategoryItem> = ({ category, active }) => {
  // const { activeCategory } = useAppSelector(foodsSelector);
  const dispatch = useAppDispatch();
  // const [active, setActive] = useState(category.name === activeCategory);

  const onCategory = (category: Category) => {
    dispatch(setCategory(category));
  };

  // useEffect(() => {
  //   setActive(category.name === activeCategory);
  // }, [activeCategory]);

  return (
    // <StyledLink>
    <CategoryItemContainer
      variants={categoryItemVariant}
      animate="animation"
      as={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      onClick={onCategory.bind(null, category.name)}
      custom={active}
    >
      <CategoryItemBorder
        leftborder={
          category.name === Category.ALL ? BooleanEnum.TRUE : undefined
        }
      >
        <StyledImage
          src={category.image}
          alt={category.name + 'image'}
          width={category.name === Category.ALL ? 100 : 36}
          height={category.name === Category.ALL ? 100 : 36}
          borderradius={
            category.name === Category.ALL
              ? BooleanEnum.FALSE
              : BooleanEnum.TRUE
          }
        />
        <h6>{category.title}</h6>

        {active && <StyledActiveDiv layout layoutId="activeCategory" />}
      </CategoryItemBorder>
    </CategoryItemContainer>
    // </StyledLink>
  );
};

enum BooleanEnum {
  TRUE = 'true',
  FALSE = 'false',
}

const CategoryItemContainer = styled(motion.div)`
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

const CategoryItemBorder = styled.div<{ leftborder?: BooleanEnum }>`
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

const StyledImage = styled(Image)<{ borderradius: BooleanEnum }>`
  border-radius: ${({ borderradius }) =>
    borderradius === BooleanEnum.TRUE ? '50%' : '0'};
`;

const StyledActiveDiv = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 1.5rem;
  z-index: -1;
`;

export default CategoryItem;
