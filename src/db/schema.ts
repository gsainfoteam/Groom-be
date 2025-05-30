import { pgTable, text, integer, boolean, jsonb, serial, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  uuid: integer('uuid').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
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
}); 

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  roomId: varchar("room_id", { length: 255 }),
  sender: varchar("sender", { length: 255 }),
  message: text("message"),
  image: text("image"), // base64 사용?
  sentAt: timestamp("sent_at").defaultNow(),
});