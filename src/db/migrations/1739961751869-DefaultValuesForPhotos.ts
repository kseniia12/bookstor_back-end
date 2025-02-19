import { MigrationInterface, QueryRunner } from "typeorm";

export class DefaultValuesForPhotos1739961751869 implements MigrationInterface {
    name = 'DefaultValuesForPhotos1739961751869'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "photo"
            SET DEFAULT '1739961561390-99'
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user"
            ALTER COLUMN "photo" DROP DEFAULT
        `);
    }

}
