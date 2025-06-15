import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const URI = process.env.MONGODB_URI;

export const connectDB = () => {
    try {
        mongoose.connect(URI);
    } catch (error) {
        console.log(error);
    }
}
