import { AuthorUpdateDto } from '../dtos/author-update.dto';
import { AuthorCreateDto } from '../dtos/author-create.dto';
import { AuthorService } from '../services/author.service';
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
import { AuthorEntity } from '../entities/author.entity';

@Controller('author')
export class AuthorController {
  constructor(private readonly _authorService: AuthorService) {}

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
  ): Promise<PageDTO<AuthorEntity>> {
    const pageOptions = new PageOptionDTO(
      orderBy,
      orderDirection,
      page,
      page_size,
    );
    return this._authorService.findAll(pageOptions);
  }

  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  @Get(':id')
  getRecordById(@Param('id', ParseIntPipe) id: number): Promise<AuthorEntity> {
    return this._authorService.findOne(id);
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Petición incorrecta' })
  @ApiNotFoundResponse({ description: 'No se encontró el recurso' })
  @ApiOkResponse({ description: 'Información obtenida satisfactoriamente.' })
  @ApiInternalServerErrorResponse({ description: 'Error inesperado.' })
  createRecord(@Body() newEntity: AuthorCreateDto): Promise<AuthorEntity> {
    return this._authorService.create(newEntity);
  }

  @Put(':id')
  updateRecord(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEntity: AuthorUpdateDto,
  ): Promise<AuthorEntity> {
    return this._authorService.update(id, updateEntity);
  }

  @Delete(':id')
  deleteRecord(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this._authorService.delete(id);
  }
}
