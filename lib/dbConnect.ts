import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const globalCache = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

if (!globalCache.mongoose) {
  globalCache.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (globalCache.mongoose!.conn) {
    return globalCache.mongoose!.conn;
  }

  if (!globalCache.mongoose!.promise) {
    const opts = {
      bufferCommands: false,
    };

    globalCache.mongoose!.promise = mongoose.connect(MONGODB_URI, opts);
  }

  globalCache.mongoose!.conn = await globalCache.mongoose!.promise;
  return globalCache.mongoose!.conn;
}

export default dbConnect;
