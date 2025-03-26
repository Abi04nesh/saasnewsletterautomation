import mongoose, { Mongoose } from "mongoose";


declare global {
  var mongooseGlobal: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

// ✅ Ensure global caching for Next.js hot reloading
global.mongooseGlobal = global.mongooseGlobal || { conn: null, promise: null };

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env");
}

async function connectDb(): Promise<Mongoose> {
  if (global.mongooseGlobal.conn) {
    return global.mongooseGlobal.conn;
  }

  if (!global.mongooseGlobal.promise) {
    global.mongooseGlobal.promise = (async () => {
      try {
        const conn = await mongoose.connect(MONGODB_URI, {
          bufferCommands: false,
        });
        console.log("✅ Connected to MongoDB");
        return conn;
      } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
      }
    })();
  }

  global.mongooseGlobal.conn = await global.mongooseGlobal.promise;
  return global.mongooseGlobal.conn;
}

export default connectDb;
