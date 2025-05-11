import express from 'express';
import { connectToDatabase } from './db';
import testRoutes from './routes/test';

async function bootstrap() {
  await connectToDatabase();
  const app = express();

  app.use(express.json());
//   app.use('/api/auth', authRoutes);
	app.use('/api/hello', testRoutes);


  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});