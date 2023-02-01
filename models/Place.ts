import mongoose from 'mongoose';
import { UserDoc } from './User';

export interface PlaceAttrs {
  user: UserDoc;
  name: string;
  address: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

// Address collection properties and methods.
// Address model interface
interface PlaceModel extends mongoose.Model<PlaceDoc> {
  build(attrs: PlaceAttrs): PlaceDoc;
}

// What properties a single Address has.
// Address DOC interface
export interface PlaceDoc extends mongoose.Document {
  user: UserDoc;
  name: string;
  address: string;
  location?: {
    type: string;
    coordinates: [number, number];
  };
}

const PlaceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        // required: true,
      },
      coordinates: {
        type: [Number],
        // required: true,
      },
      required: false,
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

PlaceSchema.statics.build = (attrs: PlaceAttrs) => {
  return new Place(attrs);
};

const Place =
  (mongoose.models.Place as PlaceModel) ||
  mongoose.model<PlaceDoc, PlaceModel>('Place', PlaceSchema);

export { Place };
