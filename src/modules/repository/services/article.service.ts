import { EditionEntity } from '../entities/edition.entity';
import { KeywordEntity } from '../entities/keyword.entity';
import { AuthorEntity } from '../entities/author.entity';
import { ArticleEntity } from '../entities/article.entity';
import { PageOptionDTO } from '../dtos/page.options.dto';
import { PageDTO } from '../dtos/page.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderBy } from '../enums/order-by.enum';
import { PageMetadataDTO } from '../dtos/page.metadata.dto';
import { ArticleCreateDto } from '../dtos/article-create.dto';
import { ArticleUpdateDto } from '../dtos/article-update.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly _articleRepository: Repository<ArticleEntity>,
    @InjectRepository(EditionEntity)
    private readonly _editionRepository: Repository<EditionEntity>,
    @InjectRepository(AuthorEntity)
    private readonly _authorRepository: Repository<AuthorEntity>,
    @InjectRepository(KeywordEntity)
    private readonly _keywordRepository: Repository<KeywordEntity>,
  ) {}

  async findAll(pageOptions: PageOptionDTO): Promise<PageDTO<ArticleEntity>> {
    const queryBuilder = this._articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.edition', 'edition')
      .leftJoinAndSelect('article.authors', 'authors')
      .leftJoinAndSelect('article.keywords', 'keywords');

    if (pageOptions.orderBy == OrderBy.TITLE) {
      queryBuilder.orderBy('article.title', pageOptions.orderDirection);
    } else {
      queryBuilder.orderBy('article.id', pageOptions.orderDirection);
    }

    queryBuilder.skip(pageOptions.skip).take(pageOptions.page_size);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetadata = new PageMetadataDTO(itemCount, pageOptions);
    return new PageDTO(entities, pageMetadata);
  }

  async findOne(id: number): Promise<ArticleEntity> {
    const article = await this._articleRepository.findOne(id);
    if (!article) {
      throw new NotFoundException(
        `The requested article with id ${id} does not exists. This error was found in method findOne from service article.service `,
      );
    }
    return article;
  }

  async create(newEntity: ArticleCreateDto): Promise<ArticleEntity> {
    const article = new ArticleEntity();

    article.title = newEntity.title;
    article.summary = newEntity.summary;
    article.body = newEntity.body;
    article.pageOnPublication = newEntity.pageOnPublication;

    const edition = await this._editionRepository.findOne(newEntity.editionId);
    if (!edition) {
      throw new NotFoundException(
        `The requested edition with id ${newEntity.editionId} does not exists. This error was found in method create from service article.service `,
      );
    }
    article.edition = edition;

    article.authors = [];
    for (const authorId of newEntity.authorIds) {
      const author = await this._authorRepository.findOne(authorId);
      if (!author) {
        throw new NotFoundException(
          `The requested author with id ${authorId} does not exists. This error was found in method create from service article.service `,
        );
      }
      article.authors.push(author);
    }

    article.keywords = [];
    for (const wordName of newEntity.keywords) {
      const keywordList = await this._keywordRepository.find({
        where: { name: wordName },
      });
      if (keywordList.length === 0) {
        const keyword = new KeywordEntity();
        keyword.name = wordName;
        await this._keywordRepository.save(keyword);
        article.keywords.push(keyword);
      } else {
        article.keywords.push(keywordList[0]);
      }
    }

    return this._articleRepository.save(article);
  }

  async update(
    id: number,
    updateEntity: ArticleUpdateDto,
  ): Promise<ArticleEntity> {
    const article = await this.findOne(id);

    if (updateEntity.hasOwnProperty('title')) {
      article.title = updateEntity.title;
    }
    if (updateEntity.hasOwnProperty('summary')) {
      article.summary = updateEntity.summary;
    }
    if (updateEntity.hasOwnProperty('body')) {
      article.body = updateEntity.body;
    }
    if (updateEntity.hasOwnProperty('pageOnPublication')) {
      article.pageOnPublication = updateEntity.pageOnPublication;
    }
    if (updateEntity.hasOwnProperty('editionId')) {
      const edition = await this._editionRepository.findOne(
        updateEntity.editionId,
      );
      if (!edition) {
        throw new NotFoundException(
          `The requested edition with id ${updateEntity.editionId} does not exists. This error was found in method update from service article.service `,
        );
      }
      article.edition = edition;
    }
    if (updateEntity.hasOwnProperty('authorIds')) {
      article.authors = [];
      for (const authorId of updateEntity.authorIds) {
        const author = await this._authorRepository.findOne(authorId);
        if (!author) {
          throw new NotFoundException(
            `The requested author with id ${authorId} does not exists. This error was found in method create from service article.service `,
          );
        }
        article.authors.push(author);
      }
    }
    if (updateEntity.hasOwnProperty('keywords')) {
      article.keywords = [];
      for (const wordName of updateEntity.keywords) {
        const keywordList = await this._keywordRepository.find({
          where: { name: wordName },
        });
        if (keywordList.length === 0) {
          const keyword = new KeywordEntity();
          keyword.name = wordName;
          await this._keywordRepository.save(keyword);
          article.keywords.push(keyword);
        } else {
          article.keywords.push(keywordList[0]);
        }
      }
    }

    return this._articleRepository.save(article);
  }

  async delete(id: number): Promise<any> {
    return await this._articleRepository.delete(id);
  }
}
