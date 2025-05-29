import { pgTable, serial, text, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { Gender } from '../users/enums/gender.enum';
import { MBTI } from '../users/enums/mbti.enum';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  nickname: text('nickname').notNull(),
  studentId: text('student_id').notNull(),
  major: text('major').notNull(),
  age: integer('age').notNull(),
  gender: integer('gender').notNull().$type<Gender>(),
  nationality: text('nationality').notNull(),
  mbti: text('mbti').notNull().$type<MBTI>(),
  preferences: jsonb('preferences').notNull().$type<{
    isSnoring: boolean;
    isSmoking: boolean;
    sleepTime: number;
    wakeUpTime: number;
    isColdSensitive: boolean;
    isHotSensitive: boolean;
    cleanupFrequency: number;
  }>(),
  imageUrls: jsonb('image_urls').notNull().$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}); 