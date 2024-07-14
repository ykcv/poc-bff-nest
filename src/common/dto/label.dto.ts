import { ApiProperty } from '@nestjs/swagger';

export class LabelDto {
  @ApiProperty({
    description: 'english name',
    type: String,
    isArray: false,
    name: 'en_name',
  })
  enName: string;

  @ApiProperty({
    description: 'spanish name',
    type: String,
    isArray: false,
    name: 'es_name',
  })
  esName: string;
}
