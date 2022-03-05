import { EditionEntity } from './edition.entity';
import { AuthorEntity } from './author.entity';
import { BaseEntity } from './base.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { KeywordEntity } from './keyword.entity';

@Entity({ schema: 'repository_schema', name: 'article' })
export class ArticleEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  body: string;

  @Column()
  pageOnPublication: number;

  @ManyToMany(() => AuthorEntity, { eager: true })
  @JoinTable()
  authors: AuthorEntity[];

  @ManyToOne(() => EditionEntity, { eager: true })
  edition: EditionEntity;

  @ManyToMany(() => KeywordEntity, { eager: true })
  @JoinTable()
  keywords: KeywordEntity[];
}
