import { KeywordDto } from '../dtos/keyword.dto';
import { KeywordEntity } from '../entities/keyword.entity';
import { PageOptionDTO } from '../dtos/page.options.dto';
import { PageDTO } from '../dtos/page.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBy } from '../enums/order-by.enum';
import { PageMetadataDTO } from '../dtos/page.metadata.dto';

@Injectable()
export class KeywordService {
  constructor(
    @InjectRepository(KeywordEntity)
    private readonly _keywordRepository: Repository<KeywordEntity>,
  ) {}

  async findAll(pageOptions: PageOptionDTO): Promise<PageDTO<KeywordEntity>> {
    const queryBuilder = this._keywordRepository.createQueryBuilder('keyword');

    if (pageOptions.orderBy == OrderBy.NAME) {
      queryBuilder.orderBy('keyword.name', pageOptions.orderDirection);
    } else {
      queryBuilder.orderBy('keyword.id', pageOptions.orderDirection);
    }

    queryBuilder.skip(pageOptions.skip).take(pageOptions.page_size);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetadata = new PageMetadataDTO(itemCount, pageOptions);
    return new PageDTO(entities, pageMetadata);
  }

  async findOne(id: number): Promise<KeywordEntity> {
    const keyword = await this._keywordRepository.findOne(id);
    if (!keyword) {
      throw new NotFoundException(
        `The requested keyword with id ${id} does not exists. This error was found in method findOne from service keyword.service `,
      );
    }
    return keyword;
  }

  async create(newEntity: KeywordDto): Promise<KeywordEntity> {
    const keyword = new KeywordEntity();

    keyword.name = newEntity.name;

    return this._keywordRepository.save(keyword);
  }

  async update(id: number, updateEntity: KeywordDto): Promise<KeywordEntity> {
    const keyword = await this.findOne(id);

    keyword.name = updateEntity.name;

    return this._keywordRepository.save(keyword);
  }

  async delete(id: number): Promise<any> {
    return await this._keywordRepository.delete(id);
  }
}
