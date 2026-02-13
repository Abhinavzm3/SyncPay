import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb+srv://SeparateAdminDataBase:Kg3Fv3PG696YOP39@cluster0.u0geaag.mongodb.net/syncpay?retryWrites=true&w=majority&appName=Cluster0';

let hasMongoConnection = false;

export const connectDB = async () => {
  if (hasMongoConnection) return true;

  const mongoUri = process.env.MONGO_URI || DEFAULT_URI;

  try {
    await mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB_NAME || 'syncpay',
      serverSelectionTimeoutMS: 5000,
    });
    hasMongoConnection = true;
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    hasMongoConnection = false;
    console.warn('MongoDB unavailable, running in local fallback mode:', error.message);
    return false;
  }
};

export const isMongoConnected = () => hasMongoConnection;
