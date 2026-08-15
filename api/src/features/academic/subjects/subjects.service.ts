import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateSubjectDto,
  SubjectQueryDto,
  UpdateSubjectDto,
} from './dtos/request';
import { SubjectResponseDto } from './dtos/response';
import { PaginationMetaDto } from '@common/dtos/response';
import { ServiceResponse } from '@common/interfaces';
import slugify from 'slugify';
import { SubjectsRepository } from './subjects.repository';
import { Prisma } from '@app-prisma/client';

@Injectable()
export class SubjectsService {
  constructor(private readonly repository: SubjectsRepository) {}

  async create(
    dto: CreateSubjectDto,
  ): Promise<ServiceResponse<SubjectResponseDto>> {
    const { name, abbreviation, mediumOfInstructionId } = dto;

    const slug = slugify(name, {
      lower: true,
      strict: true,
    });

    const subject = await this.repository.create({
      name,
      abbreviation,
      slug,
      mediumOfInstruction: {
        connect: {
          id: mediumOfInstructionId,
        },
      },
    });

    const data = new SubjectResponseDto(subject, subject.mediumOfInstruction);

    return { data };
  }

  async findAll(
    query: SubjectQueryDto,
  ): Promise<ServiceResponse<SubjectResponseDto[]>> {
    const { page, limit, sortBy, sortOrder } = query;

    const skip = (page - 1) * limit;

    const sortByKey = sortBy ?? 'name';
    const sortByOrder = sortOrder ?? 'asc';

    const { subjects, total } = await this.repository.findAll({
      skip,
      take: limit,
      sortBy: sortByKey,
      sortOrder: sortByOrder,
    });

    const data = subjects.map(
      (subject) => new SubjectResponseDto(subject, subject.mediumOfInstruction),
    );

    const meta = new PaginationMetaDto(page, limit, total);

    return { data, meta };
  }

  async findOne(id: string): Promise<ServiceResponse<SubjectResponseDto>> {
    const subject = await this.repository.findOne(id);

    if (!subject) {
      throw new NotFoundException('Subject not found');
    }

    const data = new SubjectResponseDto(subject, subject.mediumOfInstruction);

    return { data };
  }

  async update(id: string, dto: UpdateSubjectDto) {
    const { name, abbreviation, mediumOfInstructionId } = dto;

    const updateData: Prisma.SubjectUpdateInput = {
      ...(name !== undefined && {
        name,
        slug: slugify(name, {
          lower: true,
          strict: true,
        }),
      }),

      ...(abbreviation !== undefined && { abbreviation }),

      ...(mediumOfInstructionId !== undefined && {
        mediumOfInstruction: {
          connect: {
            id: mediumOfInstructionId,
          },
        },
      }),
    };

    const subject = await this.repository.update(id, updateData);

    const data = new SubjectResponseDto(subject, subject.mediumOfInstruction);

    return { data };
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }
}
