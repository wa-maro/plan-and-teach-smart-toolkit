import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { AdminSubjectsController } from './controllers/admin-subjects.controller';
import { SubjectsRepository } from './subjects.repository';

@Module({
  providers: [SubjectsRepository, SubjectsService],
  controllers: [AdminSubjectsController],
})
export class SubjectsModule {}
