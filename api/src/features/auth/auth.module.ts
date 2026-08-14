import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SecurityModule } from '@security';
import { UsersModule } from '@users';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SecurityModule, PassportModule, UsersModule],
  providers: [AuthService],
})
export class AuthModule {}
