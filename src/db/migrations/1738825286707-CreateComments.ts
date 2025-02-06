import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComments1738825286707 implements MigrationInterface {
    name = 'CreateComments1738825286707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_3ee2da97738e60afee908f9f0ce"
        `);
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" SERIAL NOT NULL,
                "text" character varying NOT NULL,
                "data" TIMESTAMP NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "cartId"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comments"
            ADD CONSTRAINT "FK_fe496134857bf079aa6b55d68df" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_fe496134857bf079aa6b55d68df"
        `);
        await queryRunner.query(`
            ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "cartId" integer
        `);
        await queryRunner.query(`
            DROP TABLE "comments"
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_3ee2da97738e60afee908f9f0ce" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
