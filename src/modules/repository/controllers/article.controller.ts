import { ArticleUpdateDto } from '../dtos/article-update.dto';
import { ArticleCreateDto } from '../dtos/article-create.dto';
import { ArticleEntity } from '../entities/article.entity';
import { ArticleService } from '../services/article.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PageOptionDTO } from '../dtos/page.options.dto';
import { OrderBy } from '../enums/order-by.enum';
import { OrderDirection } from '../enums/order-direction.enum';
import { PageDTO } from '../dtos/page.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly _articleService: ArticleService) {}

  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  @Get()
  getAllRecords(
    @Query()
    {
      orderBy = OrderBy.ID,
      orderDirection = OrderDirection.ASC,
      page = 1,
      page_size = 5,
    }: PageOptionDTO,
  ): Promise<PageDTO<ArticleEntity>> {
    const pageOptions = new PageOptionDTO(
      orderBy,
      orderDirection,
      page,
      page_size,
    );
    return this._articleService.findAll(pageOptions);
  }

  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  @Get(':id')
  getRecordById(@Param('id', ParseIntPipe) id: number): Promise<ArticleEntity> {
    return this._articleService.findOne(id);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  createRecord(@Body() newEntity: ArticleCreateDto): Promise<ArticleEntity> {
    return this._articleService.create(newEntity);
  }

  @Put(':id')
  updateRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntity: ArticleUpdateDto,
  ): Promise<ArticleEntity> {
    return this._articleService.update(id, updateEntity);
  }

  @Delete(':id')
  deleteRecord(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._articleService.delete(id);
  }
}
