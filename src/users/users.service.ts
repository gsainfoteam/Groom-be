import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto, RoommateFilterDto } from './dto';

// 사용자 관련 비즈니스 로직을 처리하는 서비스
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  // 새로운 사용자 프로필 생성
  async createProfile(userData: CreateUserDto) {
    return await this.usersRepository.create(userData);
  }

  // 기존 사용자 프로필 업데이트
  async updateProfile(uuid: number, userData: UpdateUserDto) {
    return await this.usersRepository.update(uuid, userData);
  }

  // 잠재적인 룸메이트 찾기
  async findPotentialRoommates(uuid: number) {
    // 현재 사용자 정보 조회
    const user = await this.usersRepository.findByUuid(uuid);

    if (!user) {
      throw new Error('User not found');
    }

    // 매칭 조건에 맞는 사용자 목록 조회
    const potentialMatches = await this.usersRepository.findPotentialMatches(
      uuid,
      user.isMale,
      user.age
    );

    // 매칭 점수 계산 및 결과 반환
    const matches = potentialMatches.map(match => {
      let score = 0;
      const matchPrefs = match.preferences;
      const userPrefs = user.preferences;

      // 수면 시간 유사도 (총 40점)
      if (Math.abs(matchPrefs.sleepTime - userPrefs.sleepTime) <= 1) score += 20;
      if (Math.abs(matchPrefs.wakeUpTime - userPrefs.wakeUpTime) <= 1) score += 20;

      // 생활 습관 유사도 (총 40점)
      if (matchPrefs.isSnoring === userPrefs.isSnoring) score += 10;
      if (matchPrefs.isSmoking === userPrefs.isSmoking) score += 15;
      if (matchPrefs.cleanupFrequency === userPrefs.cleanupFrequency) score += 15;
      
      // 온도 민감도 (총 20점)
      if (matchPrefs.isColdSensitive === userPrefs.isColdSensitive) score += 10;
      if (matchPrefs.isHotSensitive === userPrefs.isHotSensitive) score += 10;

      return {
        ...match,
        matchScore: score,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    return {
      total: matches.length,
      matches
    };
  }

  // 특정 사용자의 프로필 조회
  async getProfile(uuid: number) {
    return await this.usersRepository.findByUuid(uuid);
  }

  // 필터 조건으로 룸메이트 찾기
  async findRoommatesByFilters(uuid: number, filters: RoommateFilterDto) {
    const user = await this.usersRepository.findByUuid(uuid);
    
    if (!user) {
      throw new Error('User not found');
    }

    const filteredMatches = await this.usersRepository.findByFilters(
      uuid,
      user.isMale,
      filters
    );

    // 매칭 점수 계산
    const matches = filteredMatches.map(match => {
      let score = 0;
      const matchPrefs = match.preferences;
      const userPrefs = user.preferences;

      // 수면 시간 유사도 (40점)
      if (Math.abs(matchPrefs.sleepTime - userPrefs.sleepTime) <= 1) score += 20;
      if (Math.abs(matchPrefs.wakeUpTime - userPrefs.wakeUpTime) <= 1) score += 20;

      // 생활 습관 유사도 (40점)
      if (matchPrefs.isSnoring === userPrefs.isSnoring) score += 10;
      if (matchPrefs.isSmoking === userPrefs.isSmoking) score += 15;
      if (matchPrefs.cleanupFrequency === userPrefs.cleanupFrequency) score += 15;
      
      // 온도 민감도 (20점)
      if (matchPrefs.isColdSensitive === userPrefs.isColdSensitive) score += 10;
      if (matchPrefs.isHotSensitive === userPrefs.isHotSensitive) score += 10;

      return {
        ...match,
        matchScore: score,
      };
    }).sort((a, b) => b.matchScore - a.matchScore);

    return {
      total: matches.length,
      matches
    };
  }
} 