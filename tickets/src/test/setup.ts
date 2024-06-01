import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Jwt from 'jsonwebtoken';


declare global {
    var signin: () => string[];
}


beforeAll(async () => {
  process.env.JWT_KEY = 'secret';
  const mongoUri = 'mongodb://0.0.0.0:27017/test-auth';
  try {
    const mongoServer = new MongoMemoryServer();
    await mongoServer.start();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, { })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.error("MongoDB connection error:", err));;
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

global.signin = () => {
  const payload = {
    id: '1',
    email: 'test@test.com'
  }

  const token = Jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${base64}`];
};
