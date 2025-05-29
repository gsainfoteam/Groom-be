// 데이터베이스 접근을 위한 Repository 클래스
import { Injectable } from '@nestjs/common';
import { db } from '../index';
import { users } from '../db/schema';
import { and, eq, gt, lt, ne, or } from 'drizzle-orm';
import { CreateUserDto, UpdateUserDto } from '../users/dto';

@Injectable()
export class UsersRepository {
  // 새로운 사용자 생성
  async create(userData: CreateUserDto) {
    return await db.insert(users).values({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    }).returning();
  }

  // 사용자 정보 업데이트
  async update(id: number, userData: UpdateUserDto) {
    return await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
  }

  // ID로 사용자 찾기
  async findById(id: number) {
    return await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .then(rows => rows[0]);
  }

  // 매칭 가능한 사용자 목록 찾기
  async findPotentialMatches(userId: number, userGender: number, userAge: number) {
    return await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.gender, userGender),
          or(
            gt(users.age, userAge - 4),
            lt(users.age, userAge + 4)
          ),
          ne(users.id, userId)
        )
      );
  }
} 