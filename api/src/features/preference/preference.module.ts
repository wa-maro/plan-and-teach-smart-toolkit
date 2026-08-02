import { Module } from '@nestjs/common';
import { MediumOfInstructionsModule } from './medium-of-instructions/medium-of-instructions.module';

@Module({
  imports: [MediumOfInstructionsModule],
})
export class PreferenceModule {}
