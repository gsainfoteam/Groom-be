import { IsNumber, IsBoolean, Min, Max } from 'class-validator';

export class PreferencesDto {
  @IsBoolean()
  isSnoring: boolean;

  @IsBoolean()
  isSmoking: boolean;

  @IsNumber()
  @Min(0)
  @Max(11)
  sleepTime: number;

  @IsNumber()
  @Min(0)
  @Max(11)
  wakeUpTime: number;

  @IsBoolean()
  hasRefrigerator: boolean;

  @IsBoolean()
  isColdSensitive: boolean;

  @IsBoolean()
  isHotSensitive: boolean;

  @IsNumber()
  @Min(0)
  @Max(7)
  cleanupFrequency: number;
} 