import { IsString, IsNumber, IsBoolean, IsObject, Min, Max, IsEmail, IsEnum, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { PreferencesDto } from './preferences.dto';
import { Gender } from '../enums/gender.enum';
import { MBTI } from '../enums/mbti.enum';

// 사용자 생성을 위한 DTO
export class CreateUserDto {
  @IsString()
  nickname: string;

  @IsString()
  studentId: string;

  @IsString()
  major: string;

  @IsNumber()
  @Min(17)
  @Max(40)
  age: number;

  @IsEnum(Gender, { message: '성별은 1(남성) 또는 2(여성)이어야 합니다.' })
  gender: Gender;

  @IsEnum(MBTI, { message: '올바른 MBTI 유형이 아닙니다.' })
  mbti: MBTI;

  @IsString()
  nationality: string;

  @ValidateNested()
  @Type(() => PreferencesDto)
  preferences: PreferencesDto;

  @IsString({ each: true })
  @ArrayMinSize(1, { message: '최소 1개 이상의 이미지가 필요합니다.' })
  imageUrls: string[];
} 