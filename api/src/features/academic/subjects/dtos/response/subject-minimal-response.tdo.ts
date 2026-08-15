import { Subject } from '@app-prisma/client';

export class SubjectMinimalResponseDto {
  id: string;
  name: string;

  constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
  }
}
