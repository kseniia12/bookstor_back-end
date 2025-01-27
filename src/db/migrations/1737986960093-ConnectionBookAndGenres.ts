import { MigrationInterface, QueryRunner } from "typeorm";

export class ConnectionBookAndGenres1737986960093 implements MigrationInterface {
    name = 'ConnectionBookAndGenres1737986960093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "connectionBookAndGenres" (
                "id" SERIAL NOT NULL,
                "bookId" integer,
                "genreId" integer,
                CONSTRAINT "PK_382ea242613150feac26a764a91" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres"
            ADD CONSTRAINT "FK_6473270aa4980259825ae9505d8" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres"
            ADD CONSTRAINT "FK_1d237340019325daec484b9bb4a" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres" DROP CONSTRAINT "FK_1d237340019325daec484b9bb4a"
        `);
        await queryRunner.query(`
            ALTER TABLE "connectionBookAndGenres" DROP CONSTRAINT "FK_6473270aa4980259825ae9505d8"
        `);
        await queryRunner.query(`
            DROP TABLE "connectionBookAndGenres"
        `);
    }

}
