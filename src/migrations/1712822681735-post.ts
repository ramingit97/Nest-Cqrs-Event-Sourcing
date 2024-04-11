import { MigrationInterface, QueryRunner } from "typeorm";

export class Post1712822681735 implements MigrationInterface {
    name = 'Post1712822681735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "event_type" character varying NOT NULL, "event_data" jsonb NOT NULL DEFAULT '{}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "event_type"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "event_data"`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "post" ADD "event_data" jsonb NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "post" ADD "event_type" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "events"`);
    }

}
