import dotenv from 'dotenv';

dotenv.config();

export interface EnvConfig {
  port: number;
  mongoUri: string;
  clientUrl: string;
  nodeEnv: 'development' | 'production' | 'test' | string;
}

const env: EnvConfig = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/white-lotus',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV || 'development',
};

export default env;
