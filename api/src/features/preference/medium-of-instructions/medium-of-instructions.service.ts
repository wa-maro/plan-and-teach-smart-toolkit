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

  async findOne(id: string) {
    try {
      const medium = await this.prisma.mediumOfInstruction.findUniqueOrThrow({
        where: { id },
        include: {
          subjects: true,
        },
      });

      return {
        data: new MediumOfInstructionResponseDto(medium, medium.subjects),
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Medium of instruction not found');
      }

      throw error;
    }
  }

  async update(id: string) {}

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.mediumOfInstruction.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException('Medium of instruction not found');

          case 'P2003':
          case 'P2039':
            throw new ConflictException(
              'Cannot delete medium of instruction because it is used by subjects.',
            );
        }
      }

      throw error;
    }
  }
}
