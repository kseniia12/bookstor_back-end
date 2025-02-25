import { MigrationInterface, QueryRunner } from "typeorm";

export class RenamingTableGenresAndBooks1740488691902 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("connectionBookAndGenres", "genres_to_book");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.renameTable("genres_to_book", "connectionBookAndGenres");
    }

}
