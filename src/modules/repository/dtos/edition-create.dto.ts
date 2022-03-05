import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsInt } from 'class-validator';

export class EditionCreateDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  number: number;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  publicationDate: Date;

  @ApiProperty()
  printedEditionPath: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  publicationId: number;
}
