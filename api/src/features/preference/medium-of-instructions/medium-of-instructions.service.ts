import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateMediumDto,
  MediumOfInstructionQueryDto,
  UpdateMediumDto,
} from './dtos/request';
import { MediumOfInstructionResponseDto } from './dtos/response';
import { Prisma, PrismaService } from '@prisma';
import { ServiceResponse } from '@common/interfaces';

@Injectable()
export class MediumOfInstructionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateMediumDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    try {
      const medium = await this.prisma.mediumOfInstruction.create({
        data: dto,
      });

      const data = new MediumOfInstructionResponseDto(medium);

      return { data };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'A medium with the provided value already exists',
          );
        }
      }

      throw error;
    }
  }

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

  async findOne(
    id: string,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    try {
      const medium = await this.prisma.mediumOfInstruction.findUniqueOrThrow({
        where: { id },
        include: {
          subjects: true,
        },
      });

      const data = new MediumOfInstructionResponseDto(medium, medium.subjects);

      return { data };
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

  async update(
    id: string,
    dto: UpdateMediumDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    try {
      const medium = await this.prisma.mediumOfInstruction.update({
        where: { id },
        data: dto,
      });

      const data = new MediumOfInstructionResponseDto(medium);

      return { data };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException('Medium of instruction not found');

          case 'P2002':
            throw new ConflictException(
              'A medium with the provided value already exists',
            );
        }
      }

      throw error;
    }
  }

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
