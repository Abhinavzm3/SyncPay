import { connectDB } from '../config/db.js';
import { Trip } from '../models/Trip.js';

const run = async () => {
  await connectDB();
  const count = await Trip.countDocuments();
  console.log(`Trips in database: ${count}`);
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
