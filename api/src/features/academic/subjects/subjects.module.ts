import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { AdminSubjectsController } from './controllers/admin-subjects.controller';

@Module({
  providers: [SubjectsService],
  controllers: [AdminSubjectsController],
})
export class SubjectsModule {}
