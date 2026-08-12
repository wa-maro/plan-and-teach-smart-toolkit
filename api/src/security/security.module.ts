import { Module } from '@nestjs/common';
import { PasswordModule } from './password';
import { JwtTokenModule } from './jwt-token';

@Module({
  imports: [PasswordModule, JwtTokenModule],
  exports: [PasswordModule, JwtTokenModule],
})
export class SecurityModule {}
