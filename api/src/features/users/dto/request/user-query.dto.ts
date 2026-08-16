import { QueryFiltersDto, QueryPaginationDto } from '@common/dtos/request';
import { IntersectionType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const allowedSortFields = ['createdAt', 'updatedAt'] as const;

export type AllowedSortField = (typeof allowedSortFields)[number];

export class UserQueryDto extends IntersectionType(
  QueryPaginationDto,
  QueryFiltersDto,
) {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsIn(allowedSortFields)
  override sortBy: AllowedSortField = 'createdAt';
}
