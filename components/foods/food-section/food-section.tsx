import styled from 'styled-components';
import React, { FC, Suspense, useEffect } from 'react';

import {
  foodsFriesSelector,
  foodsSaladsSelector,
  foodsSelector,
  mainFoodsSelector,
  setFoods,
} from '@/redux/features/foodsSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { IFoodSection } from '@/utils/types/foods/food.interface';
import CategoryList from '../category/category-list';
import { Category } from '@/utils/types/categories/category.enum';
import { useGetFoodsQuery } from '@/redux/features/apiSlice';
import ReactCarousel from '@/components/ui/react-multi-carousel/react-carousel';

const FoodSection: FC<IFoodSection> = ({ foods, categories }) => {
  const { data } = useGetFoodsQuery();
  const { activeCategory, foods: storeFoods } = useAppSelector(foodsSelector);
  const fries = useAppSelector(foodsFriesSelector);
  const salads = useAppSelector(foodsSaladsSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activeCategory === Category.ALL && data) {
      dispatch(setFoods(data));
    }
  }, [data, activeCategory]);

  return (
    <StyledFoodSection>
      <CategoryList categories={categories} />

      <ReactCarousel
        foods={data ? (storeFoods.length < 0 ? foods : storeFoods) : foods}
        title="انواع فست فود"
        slideLength={storeFoods.length}
      />
      <ReactCarousel
        slideLength={fries.length}
        foods={fries}
        title="انواع سیب زمینی سرخ شده"
      />
      <ReactCarousel
        foods={salads}
        title="انواع سالاد"
        slideLength={salads.length}
      />
    </StyledFoodSection>
  );
};

const StyledFoodSection = styled.section`
  padding: 1rem 1rem;
  max-width: 100%;
  margin: 0 auto;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: 90%;
  }
`;

export default FoodSection;
