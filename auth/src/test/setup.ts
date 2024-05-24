import mongoose from 'mongoose';
import { app } from '../app';

beforeAll(async () => {
  process.env.JWT_KEY = 'secret';
  const mongoUri = 'mongodb://0.0.0.0:27017/test-auth';
  try {
    await mongoose.connect(mongoUri, {});
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}); 

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});
