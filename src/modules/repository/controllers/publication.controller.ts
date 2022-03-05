import { PublicationDto } from '../dtos/publication.dto';
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
import { PublicationService } from '../services/publication.service';
import { PublicationEntity } from '../entities/publication.entity';

@Controller('publication')
export class PublicationController {
  constructor(private readonly _publicationService: PublicationService) {}

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
  ): Promise<PageDTO<PublicationEntity>> {
    const pageOptions = new PageOptionDTO(
      orderBy,
      orderDirection,
      page,
      page_size,
    );
    return this._publicationService.findAll(pageOptions);
  }

  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  @Get(':id')
  getRecordById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PublicationEntity> {
    return this._publicationService.findOne(id);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  createRecord(@Body() newEntity: PublicationDto): Promise<PublicationEntity> {
    return this._publicationService.create(newEntity);
  }

  @Put(':id')
  updateRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntity: PublicationDto,
  ): Promise<PublicationEntity> {
    return this._publicationService.update(id, updateEntity);
  }

  @Delete(':id')
  deleteRecord(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._publicationService.delete(id);
  }
}
