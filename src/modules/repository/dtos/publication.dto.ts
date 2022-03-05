import { ApiProperty } from '@nestjs/swagger';

export class PublicationDto {
  @ApiProperty()
  name: string;
}
