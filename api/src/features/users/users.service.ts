import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PasswordService } from '@security/password';
import { UsersRepository } from './users.repository';
import { CreateUserDto, UpdateUserDto, UserQueryDto } from './dto/request';
import { ServiceResponse } from '@common/interfaces';
import { UserDetailResponseDto, UserResponseDto } from './dto/response';
import { PaginationMetaDto } from '@common/dtos/response';
import { normalizePhoneNumber } from '@common/utils/phone-normalizer.util';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly repository: UsersRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<ServiceResponse<UserResponseDto>> {
    const { username, phoneNumber, fullName, email, role, password, isActive } =
      dto;

    const existingUsername = await this.findByUsername(username);

    if (existingUsername) {
      throw new ConflictException('Username already taken');
    }

    const nomalizedPhone = normalizePhoneNumber(phoneNumber);
    const existingPhone = await this.repository.findByPhone(nomalizedPhone);

    if (existingPhone) {
      throw new ConflictException('Phone number already taken');
    }

    if (email) {
      const existingEmail = await this.repository.findByEmail(email);

      if (existingEmail) {
        throw new ConflictException('Email already taken');
      }
    }

    const passwordHash = await this.passwordService.hash(password);

    const user = await this.repository.create({
      username,
      phoneNumber: nomalizedPhone,
      fullName,
      email,
      passwordHash,
      role,
      isActive,
    });

    const data = new UserResponseDto(user);

    return { data };
  }

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

  async update(
    id: string,
    dto: UpdateUserDto,
  ): Promise<ServiceResponse<UserResponseDto>> {
    const { username, phoneNumber, fullName, email, role, isActive } = dto;

    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (username && username !== user.username) {
      const existingUsername = await this.repository.findByUsername(username);

      if (existingUsername && existingUsername.id !== id) {
        throw new ConflictException('Username already taken');
      }
    }

    const nomalizedPhone = phoneNumber ? normalizePhoneNumber(phoneNumber) : '';
    if (nomalizedPhone !== user.phoneNumber) {
      const existingPhone = await this.repository.findByPhone(nomalizedPhone);

      if (existingPhone && existingPhone.id !== id) {
        throw new ConflictException('Phone number already taken');
      }
    }

    if (email && email !== user.email) {
      const existingEmail = await this.repository.findByEmail(email);

      if (existingEmail && existingEmail.id !== id) {
        throw new ConflictException('Email already taken');
      }
    }

    const updated = await this.repository.update(id, {
      ...(username !== undefined && { username }),
      ...(phoneNumber !== undefined && { phoneNumber: nomalizedPhone }),
      ...(fullName !== undefined && { fullName }),
      ...(email !== undefined && { email }),
      ...(role !== undefined && { role }),
      ...(isActive !== undefined && { isActive }),
    });

    const data = new UserResponseDto(updated);

    return { data };
  }

  async remove(id: string): Promise<void> {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.repository.remove(id);
  }

  async findActiveUserById(id: string) {
    return this.repository.findActiveUserById(id);
  }

  async findByUsername(username: string) {
    return this.repository.findByUsername(username);
  }
}
