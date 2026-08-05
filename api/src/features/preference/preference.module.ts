import { Module } from '@nestjs/common';
import { MediumOfInstructionsModule } from './medium-of-instructions';

@Module({
  imports: [MediumOfInstructionsModule],
})
export class PreferenceModule {}
