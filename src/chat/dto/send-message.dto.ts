// src/chat/dto/send-message.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class SendMessageDto {
  @IsString()
  roomId: string;

  @IsString()
  nickname: string;

  @IsString()
  message: string;

  @IsString()
  timestamp: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  from?: string;
}
