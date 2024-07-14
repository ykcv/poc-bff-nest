import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  MinLength,
} from 'class-validator';

export class QueryParamsDto {
  @ApiProperty({required: false })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit: number = 10;

  @ApiProperty({required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  offset: number = 0;

  @ApiProperty({required: false })
  @IsOptional()
  @MinLength(1)
  search: string;

  @ApiProperty({required: false })
  @IsOptional()
  @Transform(n => Number(n))
  id: number;

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  businessUnit: number[];

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  userInCharge: number[];

  @ApiProperty({ type: [Number], required: false })
  @IsOptional()
  status: number[];

}
