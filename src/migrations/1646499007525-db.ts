import { MigrationInterface, QueryRunner } from 'typeorm';

export class db1646499007525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA repository_schema`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA repository_schema`);
  }
}
