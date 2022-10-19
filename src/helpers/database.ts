import * as mongoDB from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import config from '../../config';

export const collections: { users?: mongoDB.Collection } = {};
let mongoServer: MongoMemoryServer;

export async function connectToDabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(config.DB_URL);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(config.USERS_COLLECTION_NAME);

  collections.users = usersCollection;
}

export async function connectToTestDabase() {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(mongoUri);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(config.USERS_COLLECTION_NAME);

  collections.users = usersCollection;
}

export async function closeTestDB() {
  await mongoServer.stop();
}
