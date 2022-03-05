import { ArticleEntity } from './entities/article.entity';
import { EditionEntity } from './entities/edition.entity';
import { KeywordEntity } from './entities/keyword.entity';
import { PublicationEntity } from './entities/publication.entity';
import { AuthorEntity } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './services/article.service';
import { EditionService } from './services/edition.service';
import { KeywordService } from './services/keyword.service';
import { PublicationService } from './services/publication.service';
import { AuthorService } from './services/author.service';
import { ArticleController } from './controllers/article.controller';
import { EditionController } from './controllers/edition.controller';
import { KeywordController } from './controllers/keyword.controller';
import { PublicationController } from './controllers/publication.controller';
import { AuthorController } from './controllers/author.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuthorEntity,
      PublicationEntity,
      KeywordEntity,
      EditionEntity,
      ArticleEntity,
    ]),
  ],
  controllers: [
    AuthorController,
    PublicationController,
    KeywordController,
    EditionController,
    ArticleController,
  ],
  providers: [
    AuthorService,
    PublicationService,
    KeywordService,
    EditionService,
    ArticleService,
  ],
})
export class RepositoryModule {}
