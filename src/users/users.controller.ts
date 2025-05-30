import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, RoommateFilterDto, LoginDto } from './dto';

// 사용자 관련 HTTP 엔드포인트를 처리하는 컨트롤러
// 기본 경로: /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 로그인 및 프로필 생성
  @Post('login')
  async loginAndCreateProfile(
    @Body('login') loginData: LoginDto,
    @Body('profile') userData: CreateUserDto,
  ) {
    return await this.usersService.loginAndCreateProfile(loginData, userData);
  }

  // 새로운 사용자 프로필 생성
  @Post()
  async createProfile(@Body() userData: CreateUserDto) {
    return await this.usersService.createProfile(userData);
  }

  // 기존 사용자 프로필 업데이트
  @Put(':uuid')
  async updateProfile(
    @Param('uuid') uuid: number,
    @Body() userData: UpdateUserDto,
  ) {
    return await this.usersService.updateProfile(uuid, userData);
  }

  // 특정 사용자의 프로필 조회
  @Get(':uuid')
  async getProfile(@Param('uuid') uuid: number) {
    return await this.usersService.getProfile(uuid);
  }

  // 잠재적인 룸메이트 목록 조회
  @Get(':uuid/matches')
  async getPotentialRoommates(@Param('uuid') uuid: number) {
    return await this.usersService.findPotentialRoommates(uuid);
  }

  // 필터링된 룸메이트 목록 조회
  @Get(':uuid/filtered-matches')
  async getFilteredRoommates(
    @Param('uuid') uuid: number,
    @Query() filters: RoommateFilterDto,
  ) {
    return await this.usersService.findRoommatesByFilters(uuid, filters);
  }
} 