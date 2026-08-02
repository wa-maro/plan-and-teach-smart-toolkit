import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MediumOfInstructionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  async findAll() {}

  async findOne(id: string) {}

  async update(id: string) {}

  async remove(id: string) {}
}
