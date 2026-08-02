import { MediumOfInstruction } from '../../../../../generated/prisma/client';

export class MediumOfInstructionMinimalResponseDto {
  readonly id: string;
  readonly name: string;

  constructor(medium: MediumOfInstruction) {
    this.id = medium.id;
    this.name = medium.name;
  }
}
