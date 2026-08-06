import { Injectable } from '@nestjs/common';
import { MediumOfInstructionQueryDto } from './dtos/request/medium-of-instruction-query.dto';
import { MediumOfInstructionResponseDto } from './dtos/response/medium-response.dto';
import { SuccessResponseDto } from '@common/dtos/response';
import { PrismaService } from '@prisma';

@Injectable()
export class MediumOfInstructionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  async findAll(
    query: MediumOfInstructionQueryDto,
  ): Promise<SuccessResponseDto<MediumOfInstructionResponseDto[]>> {
    const { sortBy, order } = query;

    const sortByKey = sortBy ? sortBy : 'name';

    const mediums = await this.prisma.mediumOfInstruction.findMany({
      orderBy: {
        [sortByKey]: order,
      },
    });

    const data = mediums.map(
      (medium) => new MediumOfInstructionResponseDto(medium),
    );

    return new SuccessResponseDto(data);
  }

  async findOne(id: string) {}

  async update(id: string) {}

  async remove(id: string) {}
}
