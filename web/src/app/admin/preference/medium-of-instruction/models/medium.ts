export interface MediumOfInstructionMinimal {
  id: string;
  name: string;
}

export interface MediumOfInstruction extends MediumOfInstructionMinimal {
  code: string;
  createdAt: Date;
  updatedAt: Date;
}
