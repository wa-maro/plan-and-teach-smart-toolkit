import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MediumOfInstructionQueryDto } from './dtos/request/medium-of-instruction-query.dto';
import { MediumOfInstructionResponseDto } from './dtos/response/medium-response.dto';
import { SuccessResponseDto } from '@common/dtos/response';
import { Prisma, PrismaService } from '@prisma';

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

  async remove(id: string) {
    try {
      return await this.prisma.mediumOfInstruction.delete({
        where: { id },
      });
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
