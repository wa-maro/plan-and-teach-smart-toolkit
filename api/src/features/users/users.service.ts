import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordService } from '@security/password';
import { UsersRepository } from './users.repository';
import { UserQueryDto } from './dto/request';
import { ServiceResponse } from '@common/interfaces';
import { UserDetailResponseDto, UserResponseDto } from './dto/response';
import { PaginationMetaDto } from '@common/dtos/response';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly repository: UsersRepository,
  ) {}

  async findAll(
    query: UserQueryDto,
  ): Promise<ServiceResponse<UserResponseDto[]>> {
    const { page, limit, sortBy, sortOrder } = query;

    const skip = (page - 1) * limit;

    const sortByKey = sortBy ?? 'createdAt';
    const sortByOrder = sortOrder ?? 'asc';

    const { users, total } = await this.repository.findAll({
      skip,
      take: limit,
      sortBy: sortByKey,
      sortOrder: sortByOrder,
    });

    const data = users.map((user) => new UserResponseDto(user));

    const meta = new PaginationMetaDto(page, limit, total);

    return { data, meta };
  }

  async findOne(id: string): Promise<ServiceResponse<UserDetailResponseDto>> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const data = new UserDetailResponseDto(user);

    return { data };
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }
}
