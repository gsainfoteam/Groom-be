// 필요한 NestJS 모듈과 컴포넌트들을 import
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

// 애플리케이션의 루트 모듈
// 전체 앱의 설정과 다른 모듈들을 통합
@Module({
  imports: [
    // 환경 변수 설정 모듈
    // isGlobal: true로 설정하여 전역에서 사용 가능
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 사용자 관련 기능을 처리하는 모듈
    UsersModule,
  ],
})
export class AppModule {}
