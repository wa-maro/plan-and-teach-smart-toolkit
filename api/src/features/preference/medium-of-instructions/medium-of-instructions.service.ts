import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { MediumOfInstructionQueryDto } from './dtos/request/medium-of-instruction-query.dto';

@Injectable()
export class MediumOfInstructionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  async findAll(query: MediumOfInstructionQueryDto) {}

  async findOne(id: string) {}

  async update(id: string) {}

  async remove(id: string) {}
}
