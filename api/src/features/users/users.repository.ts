import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/service/prisma.service';

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

    return { users: users, total };
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
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
