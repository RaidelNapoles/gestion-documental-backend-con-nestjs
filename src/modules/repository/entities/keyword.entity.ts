import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ schema: 'repository_schema', name: 'keyword' })
export class KeywordEntity extends BaseEntity {
  @Column()
  name: string;
}
