import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from '../dto/request';
import { SuccessMessage } from '@common/decorators';
import { ServiceResponse } from '@common/interfaces';
import { UserDetailResponseDto, UserResponseDto } from '../dto/response';

@Controller('admin/users')
export class AdminUsersControllerController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @SuccessMessage('User created successfully')
  async create(
    @Body() createDto: CreateUserDto,
  ): Promise<ServiceResponse<UserResponseDto>> {
    return this.usersService.create(createDto);
  }

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

  @Patch(':id')
  @SuccessMessage('User updated successfully')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<ServiceResponse<UserResponseDto>> {
    return this.usersService.update(id, updateDto);
  }

  @Delete(':id')
  @SuccessMessage('User deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
