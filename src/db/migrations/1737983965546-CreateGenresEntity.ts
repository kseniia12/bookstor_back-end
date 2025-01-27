import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGenresEntity1737983965546 implements MigrationInterface {
    name = 'CreateGenresEntity1737983965546'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "genres" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "genres"
        `);
    }

}
