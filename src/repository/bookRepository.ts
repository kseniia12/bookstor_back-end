import { BookEntity } from "../db/entities/book.entity";
import { AppDataSource } from "../db/dataSource";
import { GenresEntity } from "../db/entities/genres.entity";
import { ConnectionBookAndGenres } from "../db/entities/connectionBookAndGenres.entity";

export const bookRepository = AppDataSource.getRepository(BookEntity);
export const genreRepository = AppDataSource.getRepository(GenresEntity);
export const сonnectionBookAndGenresRepository = AppDataSource.getRepository(
  ConnectionBookAndGenres,
);
