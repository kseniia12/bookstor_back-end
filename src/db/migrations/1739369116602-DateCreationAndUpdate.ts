import { MigrationInterface, QueryRunner } from "typeorm";

export class DateCreationAndUpdate1739369116602 implements MigrationInterface {
    name = 'DateCreationAndUpdate1739369116602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "data"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD "data" TIMESTAMP
        `);
    }

}
