import {
  MediumOfInstruction,
  Subject,
} from '../../../../../generated/prisma/client';
import { SubjectMinimalResponseDto } from './subject-minima-response.tdo';
import { MediumOfInstructionMinimalResponseDto } from '../../../../preference/medium-of-instructions/dtos/response/medium-minimal-response.dto';

export class SubjectResponseDto extends SubjectMinimalResponseDto {
  readonly slug: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  mediumOfInstruction: MediumOfInstructionMinimalResponseDto;

  constructor(subject: Subject, medium: MediumOfInstruction) {
    super(subject);

    this.slug = subject.slug;
    this.mediumOfInstruction = new MediumOfInstructionMinimalResponseDto(
      medium,
    );
    this.createdAt = subject.createdAt.toISOString();
    this.updatedAt = subject.updatedAt.toISOString();
  }
}
