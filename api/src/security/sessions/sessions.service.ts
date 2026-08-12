import { Injectable } from '@nestjs/common';
import { Prisma, PrismaService } from '@prisma';

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  private db(tx?: Prisma.TransactionClient) {
    return tx ?? this.prisma;
  }

  async insertOne(
    data: Prisma.SessionCreateInput,
    tx?: Prisma.TransactionClient,
  ) {
    return this.db(tx).session.create({ data });
  }

  async findById(id: string) {
    return this.prisma.session.findUnique({ where: { id } });
  }

  async findByIdWithUser(id: string, tx?: Prisma.TransactionClient) {
    return this.db(tx).session.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  async updateOne(
    id: string,
    data: Prisma.SessionUpdateInput,
    tx?: Prisma.TransactionClient,
  ) {
    return this.db(tx).session.update({
      where: { id },
      data,
    });
  }
}
