import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { IFood } from '@/utils/types/foods/food.interface';
import { Category } from '@/utils/types/categories/category.enum';

export interface cartState {
  allFoods: IFood[];
  foods: IFood[];
  activeCategory: Category;
}

const initialState: cartState = {
  allFoods: [],
  foods: [],
  activeCategory: Category.ALL,
};

export const foodsSlice = createSlice({
  name: 'foods',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.activeCategory = action.payload;

      if (action.payload === Category.ALL) {
        state.foods = state.allFoods;
        return;
      }

      state.foods = state.allFoods.filter(
        (food) => food.category === action.payload
      );
    },

    setFoods: (state, action: PayloadAction<IFood[]>) => {
      state.allFoods = action.payload;
      state.foods = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCategory, setFoods } = foodsSlice.actions;

export const foodsSelector = (state: RootState) => state.foods;
export const foodsFriesSelector = (state: RootState) =>
  state.foods.allFoods.filter((food) => food.category === Category.FRIES);
export const foodsSaladsSelector = (state: RootState) =>
  state.foods.allFoods.filter((food) => food.category === Category.SALAD);
export const mainFoodsSelector = (state: RootState) =>
  state.foods.allFoods.filter(
    (food) =>
      food.category === Category.PIZZA ||
      food.category === Category.BURGER ||
      food.category === Category.SANDWICH
  );

export default foodsSlice.reducer;
