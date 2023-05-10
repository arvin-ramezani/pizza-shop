import { foodsSelector } from '@/redux/features/foodsSlice';
import { useAppSelector } from '@/redux/hooks';
import React, { FC } from 'react';
import styled from 'styled-components';

import { ICategoryList } from 'utils/types/categories/category.interface';
import CategoryItem from './category-item';

const CategoryList: FC<ICategoryList> = ({ categories }) => {
  const { activeCategory } = useAppSelector(foodsSelector);

  return (
    <Container>
      {categories.map((category) => (
        <CategoryItem
          key={category.name}
          category={category}
          active={activeCategory === category.name}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  overflow: auto hidden;
  padding: 1.4rem 0 1.8rem 0;
  gap: 0.3rem;
  z-index: 1;
  position: relative;
  /* 
  & > div:first-child > img {
    width: 150px !important;
    height: 150px;
  } */

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 20px;
  }
`;

export default CategoryList;
