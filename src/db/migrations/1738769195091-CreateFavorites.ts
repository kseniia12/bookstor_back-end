import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFavorites1738769195091 implements MigrationInterface {
    name = 'CreateFavorites1738769195091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "favorites" (
                "id" SERIAL NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_890818d27523748dd36a4d1bdc8" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites"
            ADD CONSTRAINT "FK_e747534006c6e3c2f09939da60f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites"
            ADD CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "favorites" DROP CONSTRAINT "FK_5de72faa7fa33dcf03c769238dd"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorites" DROP CONSTRAINT "FK_e747534006c6e3c2f09939da60f"
        `);
        await queryRunner.query(`
            DROP TABLE "favorites"
        `);
    }

}
