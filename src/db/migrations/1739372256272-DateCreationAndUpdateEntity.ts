import { MigrationInterface, QueryRunner } from "typeorm";

export class DateCreationAndUpdateEntity1739372256272 implements MigrationInterface {
    name = 'DateCreationAndUpdateEntity1739372256272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "genres"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "genres"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "author"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "author"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "author" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "author" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "genres" DROP COLUMN "createdAt"
        `);
    }

}
