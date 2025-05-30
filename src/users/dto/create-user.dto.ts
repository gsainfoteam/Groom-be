import { IsString, IsNumber, IsBoolean, ValidateNested, IsEmail, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { PreferencesDto } from './preferences.dto';

// 사용자 생성을 위한 DTO
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

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