import { PublicationEntity } from './publication.entity';
import { BaseEntity } from './base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ schema: 'repository_schema', name: 'edition' })
export class EditionEntity extends BaseEntity {
  @Column()
  number: number;

  @Column()
  publicationDate: Date;

  @Column()
  printedEditionPath: string;

  @ManyToOne(() => PublicationEntity, { eager: true })
  publication: PublicationEntity;
}
