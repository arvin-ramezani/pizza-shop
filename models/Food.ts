import mongoose from 'mongoose';
import { Category } from '@/utils/types/categories/category.enum';
import slugify from '@/utils/slugify/slugify';
import { CommentDoc } from './Comment';

export interface FoodAttrs {
  name: string;
  integredients: string;
  likes: string[];
  details: string;
  coverImage: string;
  images: string[];
  price: number;
  category: Category;
  commentsLength?: number;
}

// Food collection properties and methods.
// Food model interface
export interface FoodModel extends mongoose.Model<FoodDoc> {
  build(attrs: FoodAttrs): FoodDoc;
}

// What properties a single Food has.
// Food DOC interface
export interface FoodDoc extends mongoose.Document {
  name: string;
  integredients: string;
  likes: string[];
  details: string;
  coverImage: string;
  images: string[];
  price: number;
  category: Category;
  slug: string;
  commentsLength?: number;
}

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    integredients: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
    },
    details: {
      type: String,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: String,
      enum: Category,
    },
    commentsLength: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
      },
      versionKey: false,
    },
  }
);

// DeprecationWarning for mongoose 7.
mongoose.set('strictQuery', true);

foodSchema.statics.build = (attrs: FoodAttrs) => {
  return new Food({ ...attrs, slug: slugify(attrs.name) });
};

const Food =
  (mongoose.models.Food as FoodModel) ||
  mongoose.model<FoodDoc, FoodModel>('Food', foodSchema);

export { Food };
