import app from './app.js';
import { connectDB } from './config/db.js';
import env from './config/env.js';

async function startServer(): Promise<void> {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
    console.log(`Environment: ${env.nodeEnv}`);
  });
}

void startServer();
