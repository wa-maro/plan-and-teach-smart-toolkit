import { Injectable } from '@nestjs/common';
import { Prisma } from '@app-prisma/client';
import { PrismaService } from '@app-prisma/service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data,
    });
  }

  async findAll(queryFilter: {
    skip: number;
    take: number;
    sortBy: Prisma.UserScalarFieldEnum;
    sortOrder: Prisma.SortOrder;
  }) {
    const { skip, take, sortBy, sortOrder } = queryFilter;

    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
      }),

      this.prisma.user.count(),
    ]);

    return { users, total };
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findActiveUserById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        isActive: true,
      },
    });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByPhone(phoneNumber: string) {
    return this.prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
