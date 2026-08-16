import { UserRole } from '@app-prisma/client';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  @Length(4, 30, {
    message: 'Username must be between 4 and 30 characters.',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Username may only contain lowercase letters, numbers, and single hyphens between words.',
  })
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password!: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @IsString()
  fullName!: string;

  @IsNotEmpty()
  @IsMobilePhone('en-TZ')
  phoneNumber!: string;

  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  isActive?: boolean;
}
