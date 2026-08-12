import { Module } from '@nestjs/common';
import { PasswordModule } from '@security/password';
import { UsersService } from './users.service';

@Module({
  imports: [PasswordModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
