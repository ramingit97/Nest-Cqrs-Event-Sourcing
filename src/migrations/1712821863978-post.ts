import { MigrationInterface, QueryRunner } from "typeorm";

export class Post1712821863978 implements MigrationInterface {
    name = 'Post1712821863978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "is_published" boolean NOT NULL, "author_id" character varying NOT NULL, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "is_published"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "is_published" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "author_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "event_type" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "event_data" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "event_data"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "event_type"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "author_id"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "is_published"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "author_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "is_published" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
