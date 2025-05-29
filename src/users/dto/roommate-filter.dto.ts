import { IsOptional, IsNumber, IsBoolean, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class RoommateFilterDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  minAge?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  maxAge?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(11)
  @Transform(({ value }) => Number(value))
  sleepTimeStart?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(11)
  @Transform(({ value }) => Number(value))
  sleepTimeEnd?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(11)
  @Transform(({ value }) => Number(value))
  wakeUpTimeStart?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(11)
  @Transform(({ value }) => Number(value))
  wakeUpTimeEnd?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isSnoring?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  isSmoking?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasRefrigerator?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(7)
  @Transform(({ value }) => Number(value))
  minCleanupFrequency?: number;
} 