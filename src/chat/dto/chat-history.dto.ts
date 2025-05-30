// src/chat/dto/chat-history.dto.ts
import { IsString } from 'class-validator';

export class ChatHistoryDto {
  @IsString()
  userA: string;

  @IsString()
  userB: string;
}
