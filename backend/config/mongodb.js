import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) {
        throw new Error('Missing required env var MONGODB_URI');
    }

    mongoose.connection.on('connected', () => {
        console.log("DB Connected");
    });

    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        throw error;
    }
};

export default connectDB;