import { IsString, IsOptional, IsDateString, Matches } from 'class-validator';

export class GetMessagesDto {
  @IsString()
  roomId: string;
}