import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber } from 'class-validator';

export class ArticleCreateDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  pageOnPublication: number;

  @ApiProperty({ isArray: true })
  @IsArray()
  @IsNumber({}, { each: true })
  authorIds: number[];

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  editionId: number;

  @ApiProperty()
  @IsArray()
  keywords: string[];
}
