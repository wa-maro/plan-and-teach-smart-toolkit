import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  mediumOfInstructionId!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(8)
  abbreviation!: string;
}
