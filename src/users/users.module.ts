// 필요한 NestJS 모듈과 컴포넌트들을 import
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

// 사용자 관련 기능을 모듈로 묶어서 관리
@Module({
  controllers: [UsersController], // HTTP 요청을 처리하는 컨트롤러
  providers: [UsersService, UsersRepository], // 비즈니스 로직과 데이터 접근을 처리하는 서비스와 레포지토리
})
export class UsersModule {} 