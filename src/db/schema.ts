import { pgTable, serial, text, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  profileImage: text('profile_image'),
  nickname: text('nickname').notNull(),
  studentNumber: integer('student_number').notNull(),
  major: text('major').notNull(),
  age: integer('age').notNull(),
  gender: integer('gender').notNull(),
  nationality: text('nationality'),
  mbti: integer('mbti').notNull(),
  preferences: jsonb('preferences').notNull().$type<{
    isSnoring: boolean;
    isSmoking: boolean;
    sleepTime: number;
    wakeUpTime: number;
    hasRefrigerator: boolean;
    isColdSensitive: boolean;
    isHotSensitive: boolean;
    cleanupFrequency: number;
  }>(),
  introduction: text('introduction'),
  createdAt: text('created_at').default(new Date().toISOString()),
  updatedAt: text('updated_at').default(new Date().toISOString()),
}); 