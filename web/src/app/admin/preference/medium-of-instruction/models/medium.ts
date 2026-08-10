import { SubjectMinimal } from '@academic/subject/models';

export interface MediumOfInstructionMinimal {
  id: string;
  name: string;
}

export interface MediumOfInstruction extends MediumOfInstructionMinimal {
  code: string;
  subjects?: SubjectMinimal[];
  createdAt: Date;
  updatedAt: Date;
}
