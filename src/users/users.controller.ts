import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';

// 사용자 관련 HTTP 엔드포인트를 처리하는 컨트롤러
// 기본 경로: /users
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 새로운 프로필 생성
  // POST /users
  @Post()
  async createProfile(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createProfile(createUserDto);
  }

  // 기존 프로필 업데이트
  // PUT /users/:id
  @Put(':id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateProfile(id, updateUserDto);
  }

  // 특정 프로필 조회
  // GET /users/:id
  @Get(':id')
  async getProfile(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getProfile(id);
  }

  // 잠재적인 룸메이트 목록 조회
  // GET /users/:id/matches
  @Get(':id/matches')
  async findMatches(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findPotentialRoommates(id);
  }
} 