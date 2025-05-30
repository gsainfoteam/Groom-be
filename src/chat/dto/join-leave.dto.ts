// src/chat/dto/join-leave.dto.ts
import { IsString } from 'class-validator';

export class JoinLeaveDto {
  @IsString()
  to: string;

  @IsString()
  nickname: string;

  @IsString()
  message: string;

  @IsString()
  timestamp: string;
}
