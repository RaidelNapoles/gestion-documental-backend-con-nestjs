import { ApiPropertyOptional } from '@nestjs/swagger';
import { OrderDirection } from '../enums/order-direction.enum';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderBy } from '../enums/order-by.enum';

export class PageOptionDTO {
  @ApiPropertyOptional({ enum: OrderBy, default: OrderBy.ID })
  @IsOptional()
  @IsEnum(OrderBy)
  readonly orderBy?: OrderBy;

  @ApiPropertyOptional({ enum: OrderDirection, default: OrderDirection.ASC })
  @IsOptional()
  @IsEnum(OrderDirection)
  readonly orderDirection: OrderDirection;

  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page: number;

  @ApiPropertyOptional({ minimum: 5, maximum: 50, default: 5 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(5)
  @Max(30)
  readonly page_size: number;

  get skip(): number {
    return (this.page - 1) * this.page_size;
  }

  constructor(
    orderBy: OrderBy,
    orderDirection: OrderDirection,
    page: number,
    page_size: number,
  ) {
    this.orderBy = orderBy;
    this.orderDirection = orderDirection;
    this.page = page;
    this.page_size = page_size;
  }
}
