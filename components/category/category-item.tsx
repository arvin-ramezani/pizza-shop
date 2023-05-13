import { useAppDispatch } from '@/redux/hooks';
import { motion } from 'framer-motion';
import React, { FC } from 'react';

import { Category } from '@/utils/types/categories/category.enum';
import { ICategoryItem } from 'utils/types/categories/category.interface';
import { setCategory } from '@/redux/features/foodsSlice';
import { categoryItemVariant } from './category.variants';
import {
  CategoryItemBorder,
  CategoryItemContainer,
  StyledActiveDiv,
  StyledImage,
} from '@/styles/components/category-item.styled';
import { BooleanEnum } from '@/utils/types/common/common.types';

const CategoryItem: FC<ICategoryItem> = ({ category, active }) => {
  const dispatch = useAppDispatch();

  const onCategory = (category: Category) => {
    dispatch(setCategory(category));
  };

  return (
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
  );
};

export default CategoryItem;
