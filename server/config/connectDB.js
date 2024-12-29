import mongoose from "mongoose";
import "dotenv/config"

if (!process.env.MONGODB_URI) {
    throw new Error( "Please provide mongodb_uri in the .env file")
}

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected")
    } catch (error) {
        console.log("DB connection failed")
        process.exit(1)//1 means end the process with some failure.
    }
}
export default connectDB