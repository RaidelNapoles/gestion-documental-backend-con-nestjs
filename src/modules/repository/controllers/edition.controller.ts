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
import { EditionService } from '../services/edition.service';
import { EditionEntity } from '../entities/edition.entity';
import { EditionCreateDto } from '../dtos/edition-create.dto';
import { EditionUpdateDto } from '../dtos/edition-update.dto';

@Controller('edition')
export class EditionController {
  constructor(private readonly _editionService: EditionService) {}

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
  ): Promise<PageDTO<EditionEntity>> {
    const pageOptions = new PageOptionDTO(
      orderBy,
      orderDirection,
      page,
      page_size,
    );
    return this._editionService.findAll(pageOptions);
  }

  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  @Get(':id')
  getRecordById(@Param('id', ParseIntPipe) id: number): Promise<EditionEntity> {
    return this._editionService.findOne(id);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  createRecord(@Body() newEntity: EditionCreateDto): Promise<EditionEntity> {
    return this._editionService.create(newEntity);
  }

  @Put(':id')
  updateRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntity: EditionUpdateDto,
  ): Promise<EditionEntity> {
    return this._editionService.update(id, updateEntity);
  }

  @Delete(':id')
  deleteRecord(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._editionService.delete(id);
  }
}
