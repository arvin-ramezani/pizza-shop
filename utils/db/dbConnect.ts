import mongoose from 'mongoose';

// const MONGODB_URI = `${encodeURIComponent(process.env.MONGODB_URI)}`;
// const MONGODB_URI = process.env.LOCAL_MONGODB_URI;

// const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
// const MONGODB_USERNAME = process.env.MONGODB_USERNAME;

// const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${encodeURIComponent(
//   MONGODB_PASSWORD
// )}@cluster0.hdgxplo.mongodb.net/?retryWrites=true&w=majority`;

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI, 'MONGO.....');

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('connected to database');
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
