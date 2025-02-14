import { BookEntity } from "../db/entities/book.entity";
import { AppDataSource } from "../db/dataSource";
import { GenresEntity } from "../db/entities/genres.entity";
import { ConnectionBookAndGenres } from "../db/entities/connectionBookAndGenres.entity";
import { AuthorEntity } from "../db/entities/author.entity";
import { CartItemEntity } from "../db/entities/cart.entity";
import { RatingEntity } from "../db/entities/rating.entity";
import { FavoritesEntity } from "../db/entities/favorites.entity";
import { CommentsEntity } from "../db/entities/comments.entity";

export const bookRepository = AppDataSource.getRepository(BookEntity);
export const genreRepository = AppDataSource.getRepository(GenresEntity);
export const сonnectionBookAndGenresRepository = AppDataSource.getRepository(
  ConnectionBookAndGenres,
);
export const authorRepository = AppDataSource.getRepository(AuthorEntity);
export const cartRepository = AppDataSource.getRepository(CartItemEntity);
export const ratingRepository = AppDataSource.getRepository(RatingEntity);
export const favoritesRepository = AppDataSource.getRepository(FavoritesEntity);
export const commentsRepository = AppDataSource.getRepository(CommentsEntity);
