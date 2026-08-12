import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateMediumDto,
  MediumOfInstructionQueryDto,
  UpdateMediumDto,
} from './dtos/request';
import { MediumOfInstructionResponseDto } from './dtos/response';
import { ServiceResponse } from '@common/interfaces';
import { MediumOfInstructionsRepository } from './medium-of-instructions.repository';

@Injectable()
export class MediumOfInstructionsService {
  constructor(private readonly repository: MediumOfInstructionsRepository) {}

  async create(
    dto: CreateMediumDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    const medium = await this.repository.create(dto);

    const data = new MediumOfInstructionResponseDto(medium);

    return { data };
  }

  async findAll(
    query: MediumOfInstructionQueryDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto[]>> {
    const { sortBy, sortOrder } = query;

    const sortByKey = sortBy ?? 'name';
    const sortByOrder = sortOrder ?? 'asc';

    const mediums = await this.repository.findAll({
      sortKey: sortByKey,
      sortOrder: sortByOrder,
    });

    const data = mediums.map(
      (medium) => new MediumOfInstructionResponseDto(medium),
    );

    return { data };
  }

  async findOne(
    id: string,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    const medium = await this.repository.findOne(id);

    if (!medium) {
      throw new NotFoundException('Medium of instruction not found');
    }

    const data = new MediumOfInstructionResponseDto(medium, medium.subjects);

    return { data };
  }

  async update(
    id: string,
    dto: UpdateMediumDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    const medium = await this.repository.update(id, dto);

    const data = new MediumOfInstructionResponseDto(medium, medium.subjects);

    return { data };
  }

  async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }
}
