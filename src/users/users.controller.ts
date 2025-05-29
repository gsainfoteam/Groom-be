import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

// 사용자 관련 HTTP 엔드포인트를 처리하는 컨트롤러
// 기본 경로: /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 새로운 프로필 생성
  // POST /users/profile
  @Post('profile')
  async createProfile(@Body() userData: any) {
    return await this.usersService.createProfile(userData);
  }

  // 기존 프로필 업데이트
  // PUT /users/profile/:id
  @Put('profile/:id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: any,
  ) {
    return await this.usersService.updateProfile(id, userData);
  }

  // 특정 프로필 조회
  // GET /users/profile/:id
  @Get('profile/:id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getProfile(id);
  }

  // 잠재적인 룸메이트 목록 조회
  // GET /users/roommates/:userId
  @Get('roommates/:userId')
  async findPotentialRoommates(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.findPotentialRoommates(userId);
  }
} 