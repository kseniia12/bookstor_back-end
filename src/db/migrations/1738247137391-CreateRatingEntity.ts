import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRatingEntity1738247137391 implements MigrationInterface {
    name = 'CreateRatingEntity1738247137391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "rating" (
                "id" SERIAL NOT NULL,
                "rate" integer NOT NULL,
                "userId" integer,
                "bookId" integer,
                CONSTRAINT "PK_ecda8ad32645327e4765b43649e" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "rating"
            ADD CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_2ab7f7fc5b63b0147591ba69032"
        `);
        await queryRunner.query(`
            ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"
        `);
        await queryRunner.query(`
            DROP TABLE "rating"
        `);
    }

}
