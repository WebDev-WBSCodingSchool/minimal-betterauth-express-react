// File required for auto generated db tables

import { betterAuth } from 'better-auth';
import { Pool } from 'pg';

const connectionString = process.env.PG_URI;
if (!connectionString) {
  console.warn('Postgre Connection String missing');
  process.exit(1);
}

export const auth = betterAuth({
  database: new Pool({ connectionString }),
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
