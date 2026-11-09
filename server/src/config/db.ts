import mongoose from 'mongoose';
import env from './env.js';

export async function connectDB(): Promise<void> {
  try {
    const connection = await mongoose.connect(env.mongoUri);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown connection error';
    console.error('MongoDB connection error:', message);
    process.exit(1);
  }
}
