import { BaseEntity } from './base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ schema: 'repository_schema', name: 'author' })
export class AuthorEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  secondLastName: string;

  @Column()
  biography: string;

  @Column()
  photoPath: string;
}
