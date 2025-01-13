import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingFullName1736760491011 implements MigrationInterface {
    name = 'AddingFullName1736760491011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "fullName" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "fullName"
        `);
    }

}
