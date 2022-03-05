import { AuthorUpdateDto } from '../dtos/author-update.dto';
import { AuthorCreateDto } from '../dtos/author-create.dto';
import { PageOptionDTO } from '../dtos/page.options.dto';
import { PageDTO } from '../dtos/page.dto';
import { AuthorEntity } from '../entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBy } from '../enums/order-by.enum';
import { PageMetadataDTO } from '../dtos/page.metadata.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly _authorRepository: Repository<AuthorEntity>,
  ) {}

  async findAll(pageOptions: PageOptionDTO): Promise<PageDTO<AuthorEntity>> {
    const queryBuilder = this._authorRepository.createQueryBuilder('author');

    if (
      pageOptions.orderBy == OrderBy.NAME ||
      pageOptions.orderBy == OrderBy.LAST_NAME ||
      pageOptions.orderBy == OrderBy.SECOND_LAST_NAME
    ) {
      queryBuilder.orderBy(
        'author.' + pageOptions.orderBy,
        pageOptions.orderDirection,
      );
    } else {
      queryBuilder.orderBy('author.id', pageOptions.orderDirection);
    }

    queryBuilder.skip(pageOptions.skip).take(pageOptions.page_size);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetadata = new PageMetadataDTO(itemCount, pageOptions);
    return new PageDTO(entities, pageMetadata);
  }

  async findOne(id: number): Promise<AuthorEntity> {
    const author = await this._authorRepository.findOne(id);
    if (!author) {
      throw new NotFoundException(
        `The requested author with id ${id} does not exists. This error was found in method findOne from service author.service `,
      );
    }
    return author;
  }

  async create(newEntity: AuthorCreateDto): Promise<AuthorEntity> {
    const author = new AuthorEntity();

    author.name = newEntity.name;
    author.lastName = newEntity.lastName;
    author.secondLastName = newEntity.secondLastName;
    author.biography = newEntity.biography;
    author.photoPath = newEntity.photoPath;

    return this._authorRepository.save(author);
  }

  async update(
    id: number,
    updateEntity: AuthorUpdateDto,
  ): Promise<AuthorEntity> {
    const author = await this.findOne(id);

    if (updateEntity.hasOwnProperty('name')) {
      author.name = updateEntity.name;
    }
    if (updateEntity.hasOwnProperty('lastName')) {
      author.lastName = updateEntity.lastName;
    }
    if (updateEntity.hasOwnProperty('secondLastName')) {
      author.secondLastName = updateEntity.secondLastName;
    }
    if (updateEntity.hasOwnProperty('biography')) {
      author.biography = updateEntity.biography;
    }
    if (updateEntity.hasOwnProperty('photoPath')) {
      author.photoPath = updateEntity.photoPath;
    }

    return this._authorRepository.save(author);
  }

  async delete(id: number): Promise<any> {
    return await this._authorRepository.delete(id);
  }
}
