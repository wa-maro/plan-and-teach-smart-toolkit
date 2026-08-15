import { Module } from '@nestjs/common';
import { PasswordModule } from '@security/password';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { AdminUsersControllerController } from './controllers/admin-users.controller';

@Module({
  imports: [PasswordModule],
  providers: [UsersRepository, UsersService],
  exports: [UsersService],
  controllers: [AdminUsersControllerController],
})
export class UsersModule {}
