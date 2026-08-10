import { MediumOfInstructionMinimal } from '@preference/medium-of-instruction/models';

export interface SubjectMinimal {
  id: string;
  name: string;
}

export interface Subject extends SubjectMinimal {
  slug: string;
  abbreviation: string;
  mediumOfInstruction?: MediumOfInstructionMinimal;
  createdAt: Date;
  updatedAt: Date;
}
