import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfilePhoto1736866124247 implements MigrationInterface {
    name = 'ProfilePhoto1736866124247'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "photo" character varying
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "photo"
        `);
    }

}
