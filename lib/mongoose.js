import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB.");
    return mongoose.connection.asPromise();
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in the environment variables.");
  }

  console.log("Connecting to MongoDB...");
  return mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB.");
      return mongoose.connection;
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    });
}
