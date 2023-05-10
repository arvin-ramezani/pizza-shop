import { Category as categoryEnum } from './category.enum';

export interface ICategory {
  name: categoryEnum;
  title: string;
  image: string;
}

export interface ICategoryList {
  categories: ICategory[];
}

export interface ICategoryItem {
  category: ICategory;
  active: boolean;
}
