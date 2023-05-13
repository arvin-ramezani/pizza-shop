import mongoose from 'mongoose';

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
  createdAt: Date;
  updatedAt: Date;
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
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__V;
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
