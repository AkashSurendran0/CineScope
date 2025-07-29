import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async (): Promise<void> => {
  try {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
      throw new Error('MONGO_URL is not defined in environment variables');
    }

    await mongoose.connect(mongoUrl);
    console.log('✅ Review DB connected successfully');
  } catch (error) {
    console.error('❌ Review DB connection failed:', error);
  }
};

export default connectDb;
