import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { SubjectQueryDto } from './dtos/request/subject-query.dto';
import { SubjectResponseDto } from './dtos/response/subject-response.dto';
import { SuccessResponseDto } from '@common/dtos/response';

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

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
