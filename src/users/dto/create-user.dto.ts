import { IsString, IsNumber, IsBoolean, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PreferencesDto } from './preferences.dto';

// 사용자 생성을 위한 DTO
export class CreateUserDto {
  @IsString()
  profileImage: string;

  @IsNumber()
  uuid: number;

  @IsBoolean()
  isMale: boolean;

  @IsString()
  nickname: string;

  @IsNumber()
  studentNumber: number;

  @IsString()
  major: string;

  @IsNumber()
  @Min(17)
  @Max(40)
  age: number;

  @IsString()
  gender: string;

  @IsString()
  nationality: string;

  @IsNumber()
  mbti: number;

  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences: PreferencesDto;

  @IsString()
  introduction: string;
} 