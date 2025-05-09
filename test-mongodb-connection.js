import { MongoClient } from 'mongodb';
import 'dotenv/config';

async function testConnection() {
  const uri = process.env.DATABASE_URL;
  console.log('Testing connection with URI:', uri.replace(/\/.+@/, '/*****@')); // Mask password
  
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Successfully connected to MongoDB');
    
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log('📂 Collections:', collections.map(c => c.name));
    
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  } finally {
    await client.close();
  }
}

testConnection();
