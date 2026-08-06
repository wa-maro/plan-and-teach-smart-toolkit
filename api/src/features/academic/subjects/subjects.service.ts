import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, PrismaService } from '@prisma';
import { SubjectQueryDto } from './dtos/request/subject-query.dto';
import { SubjectResponseDto } from './dtos/response/subject-response.dto';
import { PaginationMetaDto, SuccessResponseDto } from '@common/dtos/response';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    query: SubjectQueryDto,
  ): Promise<SuccessResponseDto<SubjectResponseDto[]>> {
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

    return new SuccessResponseDto(data, meta);
  }

  async remove(id: string) {
    try {
      return await this.prisma.subject.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025':
            throw new NotFoundException(`Subject with ID ${id} not found`);

          default:
            throw error;
        }
      }
    }
  }
}
