import mongoose from "mongoose";
import envs from "./env.config.js";

export const connectMongoDB = async () => {
  try {
    mongoose.connect(envs.NODE_ENV);
    console.log("Mongo connected");
  } catch (error) {
    console.log(`${error}`);
  }
};
