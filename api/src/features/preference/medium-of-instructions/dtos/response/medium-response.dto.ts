import { MediumOfInstruction } from '../../../../../generated/prisma/client';
import { MediumOfInstructionMinimalResponseDto } from './medium-minimal-response.dto';

export class MediumOfInstructionResponseDto extends MediumOfInstructionMinimalResponseDto {
  readonly code: string;
  readonly createdAt: string;
  readonly updatedAt: string;

  constructor(medium: MediumOfInstruction) {
    super(medium);

    this.code = medium.code;
    this.createdAt = medium.createdAt.toISOString();
    this.updatedAt = medium.updatedAt.toISOString();
  }
}
