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
    
    // Log collections and documents
    await listCollectionsAndDocuments();

  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

async function listCollectionsAndDocuments() {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(col => col.name));

    for (const collection of collections) {
      const col = mongoose.connection.db.collection(collection.name);
      const docs = await col.find({}).toArray();
      console.log(`Documents in ${collection.name}:`, docs);
    }
  } catch (error) {
    console.error('Error listing collections and documents:', error);
  }
}
