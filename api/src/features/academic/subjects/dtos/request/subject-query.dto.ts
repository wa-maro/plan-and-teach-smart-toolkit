import { IntersectionType } from '@nestjs/mapped-types';
import { QueryFiltersDto } from '../../../../../common/dtos/request/query-filters.dto';
import { QueryPaginationDto } from '../../../../../common/dtos/request/query-pagination.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';

export const allowedSortFields = ['name', 'createdAt', 'updatedAt'] as const;

export type AllowedSortField = (typeof allowedSortFields)[number];

export class SubjectQueryDto extends IntersectionType(
  QueryPaginationDto,
  QueryFiltersDto,
) {
  @IsOptional()
  @IsString()
  @IsIn(allowedSortFields)
  override sortBy: AllowedSortField = 'name';
}
