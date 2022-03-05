import { ApiProperty } from '@nestjs/swagger';

export class KeywordDto {
  @ApiProperty()
  name: string;
}
