import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@prisma';

@Injectable()
export class SubjectsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.SubjectCreateInput) {
    return this.prisma.subject.create({
      data,
      include: {
        mediumOfInstruction: true,
      },
    });
  }

  async findAll(queryFilter: {
    skip: number;
    take: number;
    sortBy: Prisma.SubjectScalarFieldEnum;
    sortOrder: Prisma.SortOrder;
  }) {
    const { skip, take, sortBy, sortOrder } = queryFilter;

    const [subjects, total] = await this.prisma.$transaction([
      this.prisma.subject.findMany({
        skip,
        take,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          mediumOfInstruction: true,
        },
      }),

      this.prisma.subject.count(),
    ]);

    return { subjects, total };
  }

  async findOne(id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: {
        mediumOfInstruction: true,
      },
    });
  }

  async update(id: string, data: Prisma.SubjectUpdateInput) {
    return this.prisma.subject.update({
      where: { id },
      data,
      include: {
        mediumOfInstruction: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.subject.delete({
      where: { id },
    });
  }
}
