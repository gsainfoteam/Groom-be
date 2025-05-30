// src/chat/dto/send-message.dto.ts
import { IsString, IsOptional, IsDateString, Matches } from 'class-validator';

export class SendMessageDto {
  @IsString()
  roomId: string;

  @IsString()
  nickname: string;

  @IsString()
  message: string;

  @IsDateString()
  @IsString()
  timestamp: string;

  @IsOptional()
  @IsString()
  @Matches(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/, { 
   message: '올바른 base64 이미지 형식이 아닙니다' 
  })
  image?: string;

  @IsOptional()
  @IsString()
  from?: string;
}
