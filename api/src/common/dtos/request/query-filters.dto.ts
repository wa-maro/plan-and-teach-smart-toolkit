import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryFiltersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsIn(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';
}
