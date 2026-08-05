import { QueryFiltersDto } from '@common/dtos/request';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const allowedSortFields = ['name', 'createdAt', 'updatedAt'] as const;

export type AllowedSortField = (typeof allowedSortFields)[number];

export class MediumOfInstructionQueryDto extends QueryFiltersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn(allowedSortFields)
  override sortBy: AllowedSortField = 'name';
}
