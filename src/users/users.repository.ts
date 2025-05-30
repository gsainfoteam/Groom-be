// 데이터베이스 접근을 위한 Repository 클래스
import { Injectable } from '@nestjs/common';
import { db } from '../index';
import { users } from '../db/schema';
import { and, eq, gt, lt, ne, or, between, lte, gte, SQL } from 'drizzle-orm';
import { CreateUserDto, UpdateUserDto, RoommateFilterDto } from './dto';

@Injectable()
export class UsersRepository {
  // 새로운 사용자 생성
  async create(userData: CreateUserDto) {
    return await db.insert(users).values({
      ...userData,
    }).returning();
  }

  // 사용자 정보 업데이트
  async update(uuid: number, userData: UpdateUserDto) {
    return await db
      .update(users)
      .set({ ...userData })
      .where(eq(users.uuid, uuid))
      .returning();
  }

  // UUID로 사용자 찾기
  async findByUuid(uuid: number) {
    return await db
      .select()
      .from(users)
      .where(eq(users.uuid, uuid))
      .then(rows => rows[0]);
  }

  // 매칭 가능한 사용자 목록 찾기
  async findPotentialMatches(userUuid: number, userIsMale: boolean, userAge: number) {
    return await db
      .select()
      .from(users)
      .where(
        and(
          eq(users.isMale, userIsMale),
          or(
            gt(users.age, userAge - 4),
            lt(users.age, userAge + 4)
          ),
          ne(users.uuid, userUuid)
        )
      );
  }

  // 필터 조건으로 룸메이트 검색
  async findByFilters(userUuid: number, userIsMale: boolean, filters: RoommateFilterDto) {
    const conditions: SQL[] = [
      eq(users.isMale, userIsMale), // 같은 성별만
      ne(users.uuid, userUuid), // 자기 자신 제외
    ];

    // 나이 필터
    if (filters.minAge) {
      conditions.push(gte(users.age, filters.minAge));
    }
    if (filters.maxAge) {
      conditions.push(lte(users.age, filters.maxAge));
    }

    // 취침 시간 필터
    if (filters.sleepTimeStart !== undefined && filters.sleepTimeEnd !== undefined) {
      conditions.push(
        between(
          users.preferences['sleepTime'], 
          filters.sleepTimeStart, 
          filters.sleepTimeEnd
        )
      );
    }

    // 기상 시간 필터
    if (filters.wakeUpTimeStart !== undefined && filters.wakeUpTimeEnd !== undefined) {
      conditions.push(
        between(
          users.preferences['wakeUpTime'],
          filters.wakeUpTimeStart,
          filters.wakeUpTimeEnd
        )
      );
    }

    // 코골이 여부
    if (filters.isSnoring !== undefined) {
      conditions.push(eq(users.preferences['isSnoring'], filters.isSnoring));
    }

    // 흡연 여부
    if (filters.isSmoking !== undefined) {
      conditions.push(eq(users.preferences['isSmoking'], filters.isSmoking));
    }

    // 냉장고 보유 여부
    if (filters.hasRefrigerator !== undefined) {
      conditions.push(eq(users.preferences['hasRefrigerator'], filters.hasRefrigerator));
    }

    // 청소 빈도
    if (filters.minCleanupFrequency) {
      conditions.push(gte(users.preferences['cleanupFrequency'], filters.minCleanupFrequency));
    }

    return await db
      .select()
      .from(users)
      .where(and(...conditions));
  }

  // 이메일로 사용자 찾기
  async findByEmail(email: string) {
    return await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then(rows => rows[0]);
  }
} 