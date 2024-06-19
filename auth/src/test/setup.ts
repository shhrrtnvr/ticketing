import mongoose from 'mongoose';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../app';

declare global {
  var signup: () => Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_KEY = 'secret';
  try {
    const mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = await mongoServer.getUri();
    await mongoose
      .connect(mongoUri, {})
      .then(() => console.log('MongoDB successfully connected'))
      .catch((err) => console.error('MongoDB connection error:', err));
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
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

global.signup = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie')!;

  return cookie;
};
