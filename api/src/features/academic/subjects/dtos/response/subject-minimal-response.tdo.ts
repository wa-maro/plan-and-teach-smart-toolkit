import { Subject } from '@prisma';

export class SubjectMinimalResponseDto {
  id: string;
  name: string;

  constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
  }
}
