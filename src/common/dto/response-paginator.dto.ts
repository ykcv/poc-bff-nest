import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class ResponsePaginatorDto {
  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  currentPage: number;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  totalPages: number;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  nextPage: number;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  previousPage: number;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  totalRecords: number;
}
