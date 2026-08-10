import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, PrismaService } from '@prisma';
import { CreateSubjectDto, SubjectQueryDto } from './dtos/request';
import { SubjectResponseDto } from './dtos/response';
import { PaginationMetaDto } from '@common/dtos/response';
import { ServiceResponse } from '@common/interfaces';
import slugify from 'slugify';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateSubjectDto,
  ): Promise<ServiceResponse<SubjectResponseDto>> {
    const { name, abbreviation, mediumOfInstructionId } = dto;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    try {
      const subject = await this.prisma.subject.create({
        data: {
          name,
          abbreviation,
          mediumOfInstructionId,
          slug,
        },
        include: {
          mediumOfInstruction: true,
        },
      });

      const data = new SubjectResponseDto(subject, subject.mediumOfInstruction);

      return { data };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'A subject with the provided value already exists',
          );
        }
      }

      throw error;
    }
  }

  async findAll(
    query: SubjectQueryDto,
  ): Promise<ServiceResponse<SubjectResponseDto[]>> {
    const { page, limit, sortBy, order } = query;

    const skip = (page - 1) * limit;

    const [subjects, total] = await this.prisma.$transaction([
      this.prisma.subject.findMany({
        skip,
        take: limit,
        orderBy: {
          [sortBy]: order,
        },
        include: {
          mediumOfInstruction: true,
        },
      }),

      this.prisma.subject.count(),
    ]);

    const data = subjects.map(
      (subject) => new SubjectResponseDto(subject, subject.mediumOfInstruction),
    );
    const meta = new PaginationMetaDto(page, limit, total);

    return { data, meta };
  }

  async findOne(id: string): Promise<ServiceResponse<SubjectResponseDto>> {
    try {
      const subject = await this.prisma.subject.findUniqueOrThrow({
        where: { id },
        include: {
          mediumOfInstruction: true,
        },
      });

      return {
        data: new SubjectResponseDto(subject, subject.mediumOfInstruction),
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Subject not found');
      }

      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.subject.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException('Subject not found');
        }
      }

      throw error;
    }
  }
}
