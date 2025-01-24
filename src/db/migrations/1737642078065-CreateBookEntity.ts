import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookEntity1737642078065 implements MigrationInterface {
    name = 'CreateBookEntity1737642078065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "book" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "priceSoft" double precision NOT NULL,
                "priceHard" double precision NOT NULL,
                "description" character varying NOT NULL,
                "cover" character varying NOT NULL,
                "countHard" integer NOT NULL,
                "countSoft" integer NOT NULL,
                "bestseller" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "book"
        `);
    }

}
