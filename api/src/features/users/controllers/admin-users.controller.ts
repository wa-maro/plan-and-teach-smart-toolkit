import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { UserQueryDto } from '../dto/request';
import { SuccessMessage } from '@common/decorators';
import { ServiceResponse } from '@common/interfaces';
import { UserDetailResponseDto, UserResponseDto } from '../dto/response';

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

  @Get(':id')
  @SuccessMessage('User fetched successfully')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ServiceResponse<UserDetailResponseDto>> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @SuccessMessage('User deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
