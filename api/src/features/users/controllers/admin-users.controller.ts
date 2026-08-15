import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserQueryDto } from '../dto/request';
import { SuccessMessage } from '@common/decorators';
import { ServiceResponse } from '@common/interfaces';
import { UserResponseDto } from '../dto/response';

@Controller('admin/users')
export class AdminUsersControllerController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @SuccessMessage('Users fetched successfully')
  async findAll(
    @Query() query: UserQueryDto,
  ): Promise<ServiceResponse<UserResponseDto[]>> {
    return this.usersService.findAll(query);
  }
}
