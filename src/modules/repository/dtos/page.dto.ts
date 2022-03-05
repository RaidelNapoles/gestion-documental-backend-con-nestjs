import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { PageMetadataDTO } from './page.metadata.dto';

export class PageDTO<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: () => PageMetadataDTO })
  readonly metadata: PageMetadataDTO;

  constructor(data: T[], metadata: PageMetadataDTO) {
    this.metadata = metadata;
    this.data = data;
  }
}
