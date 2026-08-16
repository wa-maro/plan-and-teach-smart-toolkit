import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SecurityModule } from '@security';
import { UsersModule } from '@users';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [SecurityModule, PassportModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
