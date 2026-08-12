import { Module } from '@nestjs/common';
import { PasswordModule } from './password';
import { JwtTokenModule } from './jwt-token';
import { SessionsModule } from './sessions';

@Module({
  imports: [PasswordModule, JwtTokenModule, SessionsModule],
  exports: [PasswordModule, JwtTokenModule, SessionsModule],
})
export class SecurityModule {}
