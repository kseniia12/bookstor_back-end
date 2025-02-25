import { BookEntity } from "../db/entities/book.entity";
import { appDataSource } from "../db/dataSource";
import { GenresEntity } from "../db/entities/genres.entity";
import { GenresToBookEntity } from "../db/entities/genres_to_book.entity";
import { AuthorEntity } from "../db/entities/author.entity";
import { CartItemEntity } from "../db/entities/cart_item.entity";
import { RatingEntity } from "../db/entities/rating.entity";
import { FavoritesEntity } from "../db/entities/favorites.entity";
import { CommentsEntity } from "../db/entities/comments.entity";

export const bookRepository = appDataSource.getRepository(BookEntity);
export const genreRepository = appDataSource.getRepository(GenresEntity);
export const genresForBookRepository =
  appDataSource.getRepository(GenresToBookEntity);
export const authorRepository = appDataSource.getRepository(AuthorEntity);
export const cartRepository = appDataSource.getRepository(CartItemEntity);
export const ratingRepository = appDataSource.getRepository(RatingEntity);
export const favoritesRepository = appDataSource.getRepository(FavoritesEntity);
export const commentsRepository = appDataSource.getRepository(CommentsEntity);
