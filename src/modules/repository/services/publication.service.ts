import { PublicationEntity } from '../entities/publication.entity';
import { PageOptionDTO } from '../dtos/page.options.dto';
import { PageDTO } from '../dtos/page.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBy } from '../enums/order-by.enum';
import { PageMetadataDTO } from '../dtos/page.metadata.dto';
import { PublicationDto } from '../dtos/publication.dto';

@Injectable()
export class PublicationService {
  constructor(
    @InjectRepository(PublicationEntity)
    private readonly _publicationRepository: Repository<PublicationEntity>,
  ) {}

  async findAll(
    pageOptions: PageOptionDTO,
  ): Promise<PageDTO<PublicationEntity>> {
    const queryBuilder =
      this._publicationRepository.createQueryBuilder('publication');

    if (pageOptions.orderBy == OrderBy.NAME) {
      queryBuilder.orderBy('publication.name', pageOptions.orderDirection);
    } else {
      queryBuilder.orderBy('publication.id', pageOptions.orderDirection);
    }

    queryBuilder.skip(pageOptions.skip).take(pageOptions.page_size);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetadata = new PageMetadataDTO(itemCount, pageOptions);
    return new PageDTO(entities, pageMetadata);
  }

  async findOne(id: number): Promise<PublicationEntity> {
    const publication = await this._publicationRepository.findOne(id);
    if (!publication) {
      throw new NotFoundException(
        `The requested publication with id ${id} does not exists. This error was found in method findOne from service publication.service `,
      );
    }
    return publication;
  }

  async create(newEntity: PublicationDto): Promise<PublicationEntity> {
    const publication = new PublicationEntity();

    publication.name = newEntity.name;

    return this._publicationRepository.save(publication);
  }

  async update(
    id: number,
    updateEntity: PublicationDto,
  ): Promise<PublicationEntity> {
    const publication = await this.findOne(id);

    publication.name = updateEntity.name;

    return this._publicationRepository.save(publication);
  }

  async delete(id: number): Promise<any> {
    return await this._publicationRepository.delete(id);
  }
}
