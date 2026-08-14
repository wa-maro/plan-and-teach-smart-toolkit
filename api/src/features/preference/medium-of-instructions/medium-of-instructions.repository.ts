import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/service';

@Injectable()
export class MediumOfInstructionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MediumOfInstructionCreateInput) {
    return this.prisma.mediumOfInstruction.create({ data });
  }

  async findAll(queryFilter: {
    sortKey: Prisma.MediumOfInstructionScalarFieldEnum;
    sortOrder: Prisma.SortOrder;
  }) {
    const { sortKey, sortOrder } = queryFilter;

    return this.prisma.mediumOfInstruction.findMany({
      orderBy: {
        [sortKey]: sortOrder,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.mediumOfInstruction.findUnique({
      where: { id },
      include: {
        subjects: true,
      },
    });
  }

  async update(id: string, data: Prisma.MediumOfInstructionUpdateInput) {
    return this.prisma.mediumOfInstruction.update({
      where: { id },
      data,
      include: {
        subjects: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.mediumOfInstruction.delete({
      where: { id },
    });
  }
}
