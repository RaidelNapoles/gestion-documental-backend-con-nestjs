import { PublicationEntity } from '../entities/publication.entity';
import { PageOptionDTO } from '../dtos/page.options.dto';
import { PageDTO } from '../dtos/page.dto';
import { EditionEntity } from '../entities/edition.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBy } from '../enums/order-by.enum';
import { PageMetadataDTO } from '../dtos/page.metadata.dto';
import { EditionCreateDto } from '../dtos/edition-create.dto';
import { EditionUpdateDto } from '../dtos/edition-update.dto';

@Injectable()
export class EditionService {
  constructor(
    @InjectRepository(EditionEntity)
    private readonly _editionRepository: Repository<EditionEntity>,
    @InjectRepository(PublicationEntity)
    private readonly _publicationRepository: Repository<PublicationEntity>,
  ) {}

  async findAll(pageOptions: PageOptionDTO): Promise<PageDTO<EditionEntity>> {
    const queryBuilder = this._editionRepository
      .createQueryBuilder('edition')
      .leftJoinAndSelect('edition.publication', 'publication');

    if (
      pageOptions.orderBy == OrderBy.NUMBER ||
      pageOptions.orderBy == OrderBy.PUBLICATION_DATE
    ) {
      queryBuilder.orderBy(
        'edition.' + pageOptions.orderBy,
        pageOptions.orderDirection,
      );
    } else if (pageOptions.orderBy == OrderBy.PUBLICATION) {
      queryBuilder.orderBy('publication.name');
    } else {
      queryBuilder.orderBy('edition.id', pageOptions.orderDirection);
    }

    queryBuilder.skip(pageOptions.skip).take(pageOptions.page_size);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetadata = new PageMetadataDTO(itemCount, pageOptions);
    return new PageDTO(entities, pageMetadata);
  }

  async findOne(id: number): Promise<EditionEntity> {
    const edition = await this._editionRepository.findOne(id);
    if (!edition) {
      throw new NotFoundException(
        `The requested edition with id ${id} does not exists. This error was found in method findOne from service edition.service `,
      );
    }
    return edition;
  }

  async create(newEntity: EditionCreateDto): Promise<EditionEntity> {
    const edition = new EditionEntity();

    edition.number = newEntity.number;
    edition.publicationDate = newEntity.publicationDate;
    edition.printedEditionPath = newEntity.printedEditionPath;
    const publication = await this._publicationRepository.findOne(
      newEntity.publicationId,
    );
    if (!publication) {
      throw new NotFoundException(
        `The requested publication with id ${newEntity.publicationId} does not exists. This error was found in method create from service edition.service `,
      );
    }
    edition.publication = publication;

    return this._editionRepository.save(edition);
  }

  async update(
    id: number,
    updateEntity: EditionUpdateDto,
  ): Promise<EditionEntity> {
    const edition = await this.findOne(id);

    if (updateEntity.hasOwnProperty('number')) {
      edition.number = updateEntity.number;
    }
    if (updateEntity.hasOwnProperty('publicationDate')) {
      edition.publicationDate = updateEntity.publicationDate;
    }
    if (updateEntity.hasOwnProperty('printedEditionPath')) {
      edition.printedEditionPath = updateEntity.printedEditionPath;
    }
    if (updateEntity.hasOwnProperty('publicationId')) {
      const publication = await this._publicationRepository.findOne(
        updateEntity.publicationId,
      );
      if (!publication) {
        throw new NotFoundException(
          `The requested publication with id ${updateEntity.publicationId} does not exists. This error was found in method update from service edition.service `,
        );
      }
      edition.publication = publication;
    }

    return this._editionRepository.save(edition);
  }

  async delete(id: number): Promise<any> {
    return await this._editionRepository.delete(id);
  }
}
