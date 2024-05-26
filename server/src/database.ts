import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export default async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://test:test@cluster0.v2nfrdi.mongodb.net/myapp?retryWrites=true&w=majority';

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
    console.log('Database connected');
    

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

