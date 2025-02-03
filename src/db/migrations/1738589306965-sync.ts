import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartItems1738589306965 implements MigrationInterface {
    name = 'CreateCartItems1738589306965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cart_item" (
                "id" SERIAL NOT NULL,
                "count" integer NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_bd94725aa84f8cf37632bcde997" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item"
            ADD CONSTRAINT "FK_228cd21c0af322f67cfc0e8013d" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_228cd21c0af322f67cfc0e8013d"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart_item" DROP CONSTRAINT "FK_158f0325ccf7f68a5b395fa2f6a"
        `);
        await queryRunner.query(`
            DROP TABLE "cart_item"
        `);
    }

}
