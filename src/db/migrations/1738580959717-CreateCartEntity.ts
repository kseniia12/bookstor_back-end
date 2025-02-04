import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCartEntity1738580959717 implements MigrationInterface {
    name = 'CreateCartEntity1738580959717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "cart" (
                "id" SERIAL NOT NULL,
                "count" integer NOT NULL,
                "userId" integer,
                CONSTRAINT "REL_756f53ab9466eb52a52619ee01" UNIQUE ("userId"),
                CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD "cartId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "cart"
            ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_3ee2da97738e60afee908f9f0ce" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_3ee2da97738e60afee908f9f0ce"
        `);
        await queryRunner.query(`
            ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP COLUMN "cartId"
        `);
        await queryRunner.query(`
            DROP TABLE "cart"
        `);
    }

}
