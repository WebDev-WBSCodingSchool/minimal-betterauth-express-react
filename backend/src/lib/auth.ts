// File required for auto generated db tables

import { betterAuth } from 'better-auth';
// import { Pool } from 'pg';

import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

// const connectionString = process.env.PG_URI;
const connectionString = process.env.MONGO_URI;
if (!connectionString) {
  console.warn('Database Connection String missing');
  process.exit(1);
}

const client = new MongoClient(connectionString);
const db = client.db('betterauth');

export const auth = betterAuth({
  // database: new Pool({ connectionString }),
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    },
  },
  trustedOrigins: ['http://localhost:5173'],
});
