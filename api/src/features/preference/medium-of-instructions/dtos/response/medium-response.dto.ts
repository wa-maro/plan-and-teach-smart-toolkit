import { MediumOfInstruction } from '@app-prisma/client';
import { MediumOfInstructionMinimalResponseDto } from './medium-minimal-response.dto';
import { SubjectMinimalResponseDto } from '@academic/subjects/dtos/response';

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
