import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediumOfInstructionQueryDto } from './dtos/request/medium-of-instruction-query.dto';
import { MediumOfInstructionResponseDto } from './dtos/response/medium-response.dto';
import { Prisma, PrismaService } from '@prisma';
import { ServiceResponse } from '@common/interfaces';

@Injectable()
export class MediumOfInstructionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create() {}

  async findAll(
    query: MediumOfInstructionQueryDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto[]>> {
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

    return { data };
  }

  async findOne(id: string) {}

  async update(id: string) {}

  async remove(id: string): Promise<{ data: null }> {
    try {
      await this.prisma.mediumOfInstruction.delete({
        where: { id },
      });
      return { data: null };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException(
              `Medium of instruction with ID ${id} not found`,
            );

          case 'P2003':
            throw new ConflictException(
              'Cannot delete medium of instruction because it is being used by one or more subjects.',
            );

          default:
            throw error;
        }
      }

      throw error;
    }
  }
}
