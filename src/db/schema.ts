import { pgTable, text, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  uuid: integer('uuid').primaryKey(),
  profileImage: text('profile_image').notNull(),
  isMale: boolean('is_male').notNull(),
  nickname: text('nickname').notNull(),
  studentNumber: integer('student_number').notNull(),
  major: text('major').notNull(),
  age: integer('age').notNull(),
  gender: text('gender').notNull(),
  nationality: text('nationality').notNull(),
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
  introduction: text('introduction').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}); 