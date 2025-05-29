import { Injectable } from '@nestjs/common';
import { users } from '../db/schema';
import { UsersRepository } from './users.repository';

// 사용자 관련 비즈니스 로직을 처리하는 서비스
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // 새로운 사용자 프로필 생성
  async createProfile(userData: Omit<typeof users.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.usersRepository.create(userData);
  }

  // 기존 사용자 프로필 업데이트
  async updateProfile(id: number, userData: Partial<typeof users.$inferInsert>) {
    return await this.usersRepository.update(id, userData);
  }

  // 잠재적인 룸메이트 찾기
  async findPotentialRoommates(userId: number) {
    // 현재 사용자 정보 조회
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    // 매칭 조건에 맞는 사용자 목록 조회
    const potentialMatches = await this.usersRepository.findPotentialMatches(
      userId,
      user.gender,
      user.age
    );

    // 매칭 점수 계산 및 결과 반환
    return potentialMatches.map(match => {
      let score = 0;
      const matchPrefs = match.preferences;
      const userPrefs = user.preferences;

      // 수면 시간 유사도 (총 40점)
      // 취침/기상 시간이 1시간 이내 차이나면 각각 20점
      if (Math.abs(matchPrefs.sleepTime - userPrefs.sleepTime) <= 1) score += 20;
      if (Math.abs(matchPrefs.wakeUpTime - userPrefs.wakeUpTime) <= 1) score += 20;

      // 생활 습관 유사도 (총 40점)
      // - 코골이 여부: 10점
      // - 흡연 여부: 15점
      // - 청소 빈도: 15점
      if (matchPrefs.isSnoring === userPrefs.isSnoring) score += 10;
      if (matchPrefs.isSmoking === userPrefs.isSmoking) score += 15;
      if (matchPrefs.cleanupFrequency === userPrefs.cleanupFrequency) score += 15;
      
      // 온도 민감도 (총 20점)
      // - 추위 민감도: 10점
      // - 더위 민감도: 10점
      if (matchPrefs.isColdSensitive === userPrefs.isColdSensitive) score += 10;
      if (matchPrefs.isHotSensitive === userPrefs.isHotSensitive) score += 10;

      // 매칭 결과에 점수를 포함하여 반환
      return {
        ...match,
        matchScore: score,
      };
    }).sort((a, b) => b.matchScore - a.matchScore); // 점수가 높은 순으로 정렬
  }

  // 특정 사용자의 프로필 조회
  async getProfile(id: number) {
    return await this.usersRepository.findById(id);
  }
} 