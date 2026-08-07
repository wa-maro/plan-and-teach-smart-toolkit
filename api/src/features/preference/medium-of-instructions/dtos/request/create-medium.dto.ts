import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum LanguageCode {
  EN = 'EN',
  SW = 'SW',
  FR = 'FR',
  ZH = 'ZH',
  AR = 'AR',
}

export class CreateMediumDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @IsEnum(LanguageCode)
  code!: string;
}
