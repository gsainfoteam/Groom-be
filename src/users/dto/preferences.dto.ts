import { IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class PreferencesDto {
  @IsNumber()
  @Min(0)
  @Max(23)
  sleepTime: number;

  @IsNumber()
  @Min(0)
  @Max(23)
  wakeUpTime: number;

  @IsBoolean()
  isSnoring: boolean;

  @IsBoolean()
  isSmoking: boolean;

  @IsNumber()
  @Min(1)
  @Max(7)
  cleanupFrequency: number;

  @IsBoolean()
  isColdSensitive: boolean;

  @IsBoolean()
  isHotSensitive: boolean;
} 