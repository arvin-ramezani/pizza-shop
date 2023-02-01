import mongoose from 'mongoose';
import * as bcryptjs from 'bcryptjs';

// Required attributes for creating User
interface UserAttrs {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
}

// User collection properties and methods.
// User model interface
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// What properties a single User has.
// User DOC interface
export interface UserDoc extends mongoose.Document {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  password: string;
  image?: string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = doc._id;
        delete ret._id;

        delete ret.password;
      },
      versionKey: false,
    },
  }
);

// DeprecationWarning for mongoose 7.
mongoose.set('strictQuery', true);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashedPassword = await bcryptjs.hash(this.password, 12);
    this.set('password', hashedPassword);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User =
  (mongoose.models.User as UserModel) ||
  mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
