// 필요한 의존성 import
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './db/schema';

// PostgreSQL 연결 풀 생성
// DATABASE_URL 환경변수에서 연결 정보를 가져옴
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Drizzle ORM 인스턴스 생성 및 내보내기
// 이 인스턴스를 통해 데이터베이스 작업을 수행
export const db = drizzle(pool, { schema: { users } });
