import { Category } from '../categories/category.enum';
import { ICategory } from '../categories/category.interface';

export interface IFood {
  name: string;
  integredients: string;
  likes: string[];
  commentsLength?: number;
  details: string;
  coverImage: string;
  images?: string[];
  price: number;
  category: Category;
  slug: string;
}

export interface IFoodSection {
  categories: ICategory[];
  foods: IFood[];
}
