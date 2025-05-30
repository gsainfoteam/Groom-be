// src/db/drizzle.ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // .env에 DATABASE_URL 추가
});
export const db = drizzle(pool);
