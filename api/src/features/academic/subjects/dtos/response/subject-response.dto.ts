import {
  MediumOfInstruction,
  Subject,
} from '../../../../../generated/prisma/client';
import { MediumOfInstructionMinimalResponseDto } from '../../../../preference/medium-of-instructions/dtos/response/medium-minimal-response.dto';

export class SubjectResponseDto {
  id: string;
  name: string;
  slug: string;
  updatedAt: string;

  mediumOfInstruction: MediumOfInstructionMinimalResponseDto;

  constructor(subject: Subject, medium: MediumOfInstruction) {
    this.id = subject.id;
    this.name = subject.name;
    this.slug = subject.slug;
    this.mediumOfInstruction = new MediumOfInstructionMinimalResponseDto(
      medium,
    );
    this.updatedAt = subject.updatedAt.toISOString();
  }
}
