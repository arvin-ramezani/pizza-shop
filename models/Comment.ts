import mongoose from 'mongoose';
import { Category } from '@/utils/types/categories/category.enum';
import slugify from '@/utils/slugify/slugify';
import { UserDoc } from './User';

export interface CommentAttrs {
  user: UserDoc;
  text: string;
  foodSlug: string;
}

// Comment collection properties and methods.
// Comment model interface
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

// What properties a single Comment has.
// Comment DOC interface
export interface CommentDoc extends mongoose.Document {
  user: UserDoc;
  text: string;
  foodSlug: string;
}

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
    },
    foodSlug: {
      type: String,
      ref: 'Food',
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

CommentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment =
  (mongoose.models.Comment as CommentModel) ||
  mongoose.model<CommentDoc, CommentModel>('Comment', CommentSchema);

export { Comment };
