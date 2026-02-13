import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/db.js';
import tripRoutes from './routes/tripRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', tripRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Something went wrong' });
});

const port = process.env.PORT || 4000;

connectDB().finally(() => {
  app.listen(port, () => {
    console.log(`SyncPay API running on port ${port}`);
  });
});
