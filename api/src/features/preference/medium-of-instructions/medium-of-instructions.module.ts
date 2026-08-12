import { Module } from '@nestjs/common';
import { MediumOfInstructionsService } from './medium-of-instructions.service';
import { AdminMediumOfInstructionsController } from './controllers/admin-medium-of-instructions.controller';
import { MediumOfInstructionsRepository } from './medium-of-instructions.repository';

@Module({
  providers: [MediumOfInstructionsRepository, MediumOfInstructionsService],
  controllers: [AdminMediumOfInstructionsController],
})
export class MediumOfInstructionsModule {}
