import { MediumOfInstruction } from '../../../../../generated/prisma/client';
import { SubjectMinimalResponseDto } from '../../../../academic/subjects/dtos/response/subject-minima-response.tdo';
import { MediumOfInstructionMinimalResponseDto } from './medium-minimal-response.dto';

export class MediumOfInstructionResponseDto extends MediumOfInstructionMinimalResponseDto {
  readonly code: string;
  readonly subjects?: SubjectMinimalResponseDto[];
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(medium: MediumOfInstruction, subjects?: any[]) {
    super(medium);

    this.code = medium.code;
    this.subjects = subjects?.map(
      (subj) => new SubjectMinimalResponseDto(subj),
    );
    this.createdAt = medium.createdAt.toISOString();
    this.updatedAt = medium.updatedAt.toISOString();
  }
}
