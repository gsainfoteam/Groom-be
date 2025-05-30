// src/chat/dto/join-leave.dto.ts
import { IsString, IsNumberString } from 'class-validator';

export class JoinLeaveDto {
  @IsNumberString()
  to: string;

  @IsString()
  nickname: string;

  @IsString()
  message: string;

  @IsString()
  timestamp: string;
}
