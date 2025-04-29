import mongoose from "mongoose";

// ✅ Ensure global caching for Next.js hot reloading
if (!global.mongooseGlobal) {
  global.mongooseGlobal = { conn: null, promise: null };
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI environment variable in .env");
}

async function connectDb() {
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
