import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingEntityAuthor1737633634384 implements MigrationInterface {
    name = 'CreatingEntityAuthor1737633634384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "author" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "author"
        `);
    }

}
