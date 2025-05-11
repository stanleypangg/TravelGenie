import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI!;
let client: MongoClient;
let db: Db;

export async function connectToDatabase() {
  if (db) return db;              // reuse existing connection
  client = new MongoClient(uri);
  await client.connect();         // establish connection
  db = client.db('travelgenie');
  console.log('✅ MongoDB connected (native driver)');
  return db;
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}