import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ schema: 'repository_schema', name: 'publication' })
export class PublicationEntity extends BaseEntity {
  @Column()
  name: string;
}
