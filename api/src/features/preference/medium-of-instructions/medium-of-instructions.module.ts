import { Module } from '@nestjs/common';
import { MediumOfInstructionsService } from './medium-of-instructions.service';
import { AdminMediumOfInstructionsController } from './controllers/admin-medium-of-instructions.controller';

@Module({
  providers: [MediumOfInstructionsService],
  controllers: [AdminMediumOfInstructionsController],
})
export class MediumOfInstructionsModule {}
