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
import { KeywordService } from '../services/keyword.service';
import { KeywordEntity } from '../entities/keyword.entity';
import { KeywordDto } from '../dtos/keyword.dto';

@Controller('keyword')
export class KeywordController {
  constructor(private readonly _keywordService: KeywordService) {}

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
  ): Promise<PageDTO<KeywordEntity>> {
    const pageOptions = new PageOptionDTO(
      orderBy,
      orderDirection,
      page,
      page_size,
    );
    return this._keywordService.findAll(pageOptions);
  }

  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  @Get(':id')
  getRecordById(@Param('id', ParseIntPipe) id: number): Promise<KeywordEntity> {
    return this._keywordService.findOne(id);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  createRecord(@Body() newEntity: KeywordDto): Promise<KeywordEntity> {
    return this._keywordService.create(newEntity);
  }

  @Put(':id')
  updateRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntity: KeywordDto,
  ): Promise<KeywordEntity> {
    return this._keywordService.update(id, updateEntity);
  }

  @Delete(':id')
  deleteRecord(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._keywordService.delete(id);
  }
}
