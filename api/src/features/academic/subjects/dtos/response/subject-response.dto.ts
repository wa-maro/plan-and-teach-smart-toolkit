import { MediumOfInstruction, Subject } from '@app-prisma/client';
import { SubjectMinimalResponseDto } from './subject-minimal-response.tdo';
import { MediumOfInstructionMinimalResponseDto } from '@preference/medium-of-instructions/dtos/response';

export class SubjectResponseDto extends SubjectMinimalResponseDto {
  readonly slug: string;
  readonly abbreviation: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  mediumOfInstruction: MediumOfInstructionMinimalResponseDto;

  constructor(subject: Subject, medium: MediumOfInstruction) {
    super(subject);

    this.abbreviation = subject.abbreviation;
    this.slug = subject.slug;
    this.mediumOfInstruction = new MediumOfInstructionMinimalResponseDto(
      medium,
    );
    this.createdAt = subject.createdAt.toISOString();
    this.updatedAt = subject.updatedAt.toISOString();
  }
}
