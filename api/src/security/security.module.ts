import { Module } from '@nestjs/common';
import { PasswordModule } from './password';

@Module({
  imports: [PasswordModule],
  exports: [PasswordModule],
})
export class SecurityModule {}
