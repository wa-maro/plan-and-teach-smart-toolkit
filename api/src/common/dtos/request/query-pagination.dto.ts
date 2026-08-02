import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';

export class QueryPaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;
}
