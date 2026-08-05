import { Module } from '@nestjs/common';
import { SubjectsModule } from './subjects';

@Module({
  imports: [SubjectsModule],
})
export class AcademicModule {}
