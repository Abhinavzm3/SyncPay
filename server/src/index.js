import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import tripRoutes from './routes/tripRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', tripRoutes);
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`SyncPay API running on port ${port}`);
});
