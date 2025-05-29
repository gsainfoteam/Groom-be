import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 전역 유효성 검사 파이프 설정
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // DTO에 정의되지 않은 속성 제거
    transform: true, // 요청 데이터를 DTO 클래스의 인스턴스로 자동 변환
    forbidNonWhitelisted: true, // DTO에 정의되지 않은 속성이 있으면 요청 거부
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
