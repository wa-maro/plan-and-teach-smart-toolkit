import { Prisma } from '@prisma';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryFiltersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(['asc', 'desc'])
  sortOrder?: Prisma.SortOrder = 'asc';
}
