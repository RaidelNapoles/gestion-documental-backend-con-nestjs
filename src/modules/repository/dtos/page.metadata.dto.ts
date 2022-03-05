import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { PageOptionDTO } from './page.options.dto';

export class PageMetadataDTO {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly page_size: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly total: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly pages: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly prev_page: number;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  readonly next_page: number;

  constructor(total: number, pageOptionsDTO: PageOptionDTO) {
    this.page = pageOptionsDTO.page;
    this.page_size = pageOptionsDTO.page_size;
    this.total = total;
    this.pages = Math.ceil(this.total / this.page_size);
    this.prev_page = null;
    if (this.page > 1) this.prev_page = this.page - 1;
    this.next_page = null;
    if (this.page < this.pages) this.next_page = this.page + 1;
  }
}
