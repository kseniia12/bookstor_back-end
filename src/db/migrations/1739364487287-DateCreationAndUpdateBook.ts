import { MigrationInterface, QueryRunner } from "typeorm";

export class DateCreationAndUpdateBook1739364487287 implements MigrationInterface {
    name = 'DateCreationAndUpdateBook1739364487287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "updated_at"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "created_at"
        `);
    }

}
