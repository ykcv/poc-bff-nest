import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { ResponsePaginatorDto } from './response-paginator.dto';
import { LabelDto } from './label.dto';

export class ResponseMessageDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  statusCode: number = 200;

  @ApiProperty()
  @IsOptional()
  data: object;

  @ApiProperty()
  @IsOptional()
  @Type(() => LabelDto)
  message: LabelDto;

  @ApiProperty()
  @IsOptional()
  @Type(() => ResponsePaginatorDto)
  paginator?: ResponsePaginatorDto;
}
