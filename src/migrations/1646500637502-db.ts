import { MigrationInterface, QueryRunner } from 'typeorm';

export class db1646500637502 implements MigrationInterface {
  name = 'db1646500637502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "repository_schema"."publication" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_8aea8363d5213896a78d8365fab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repository_schema"."edition" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "number" integer NOT NULL, "publicationDate" TIMESTAMP NOT NULL, "printedEditionPath" character varying NOT NULL, "publicationId" integer, CONSTRAINT "PK_059549460a1473d4477f2f041ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repository_schema"."author" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "lastName" character varying NOT NULL, "secondLastName" character varying NOT NULL, "biography" character varying NOT NULL, "photoPath" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repository_schema"."keyword" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_affdb8c8fa5b442900cb3aa21dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repository_schema"."article" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "summary" character varying NOT NULL, "body" character varying NOT NULL, "pageOnPublication" integer NOT NULL, "editionId" integer, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "repository_schema"."article_authors_author" ("articleId" integer NOT NULL, "authorId" integer NOT NULL, CONSTRAINT "PK_2460e7757c57080e6de0bd128b5" PRIMARY KEY ("articleId", "authorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d6fe54533ce83f5ca4e4c7be79" ON "repository_schema"."article_authors_author" ("articleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_945f91d355b16e783417b6e1f0" ON "repository_schema"."article_authors_author" ("authorId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "repository_schema"."article_keywords_keyword" ("articleId" integer NOT NULL, "keywordId" integer NOT NULL, CONSTRAINT "PK_254d3c5850e455a798343e81bfe" PRIMARY KEY ("articleId", "keywordId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8f0fd18aafdffb4550a8adf4a4" ON "repository_schema"."article_keywords_keyword" ("articleId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fdc02823325d73a51852f997ef" ON "repository_schema"."article_keywords_keyword" ("keywordId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."edition" ADD CONSTRAINT "FK_5e07eee0ce9a96669625dfffd84" FOREIGN KEY ("publicationId") REFERENCES "repository_schema"."publication"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article" ADD CONSTRAINT "FK_ae92582d919dc4f6087061c277b" FOREIGN KEY ("editionId") REFERENCES "repository_schema"."edition"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_authors_author" ADD CONSTRAINT "FK_d6fe54533ce83f5ca4e4c7be797" FOREIGN KEY ("articleId") REFERENCES "repository_schema"."article"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_authors_author" ADD CONSTRAINT "FK_945f91d355b16e783417b6e1f0b" FOREIGN KEY ("authorId") REFERENCES "repository_schema"."author"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_keywords_keyword" ADD CONSTRAINT "FK_8f0fd18aafdffb4550a8adf4a44" FOREIGN KEY ("articleId") REFERENCES "repository_schema"."article"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_keywords_keyword" ADD CONSTRAINT "FK_fdc02823325d73a51852f997ef0" FOREIGN KEY ("keywordId") REFERENCES "repository_schema"."keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_keywords_keyword" DROP CONSTRAINT "FK_fdc02823325d73a51852f997ef0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_keywords_keyword" DROP CONSTRAINT "FK_8f0fd18aafdffb4550a8adf4a44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_authors_author" DROP CONSTRAINT "FK_945f91d355b16e783417b6e1f0b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article_authors_author" DROP CONSTRAINT "FK_d6fe54533ce83f5ca4e4c7be797"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."article" DROP CONSTRAINT "FK_ae92582d919dc4f6087061c277b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "repository_schema"."edition" DROP CONSTRAINT "FK_5e07eee0ce9a96669625dfffd84"`,
    );
    await queryRunner.query(
      `DROP INDEX "repository_schema"."IDX_fdc02823325d73a51852f997ef"`,
    );
    await queryRunner.query(
      `DROP INDEX "repository_schema"."IDX_8f0fd18aafdffb4550a8adf4a4"`,
    );
    await queryRunner.query(
      `DROP TABLE "repository_schema"."article_keywords_keyword"`,
    );
    await queryRunner.query(
      `DROP INDEX "repository_schema"."IDX_945f91d355b16e783417b6e1f0"`,
    );
    await queryRunner.query(
      `DROP INDEX "repository_schema"."IDX_d6fe54533ce83f5ca4e4c7be79"`,
    );
    await queryRunner.query(
      `DROP TABLE "repository_schema"."article_authors_author"`,
    );
    await queryRunner.query(`DROP TABLE "repository_schema"."article"`);
    await queryRunner.query(`DROP TABLE "repository_schema"."keyword"`);
    await queryRunner.query(`DROP TABLE "repository_schema"."author"`);
    await queryRunner.query(`DROP TABLE "repository_schema"."edition"`);
    await queryRunner.query(`DROP TABLE "repository_schema"."publication"`);
  }
}
