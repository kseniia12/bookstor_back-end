import { IDataForAddFavoritesBook } from "../lib/types";
import { favoritesRepository } from "../repository/bookRepository";
import config from "../config/config";

const addBookInFavorites = async (
  dataForAddFavoritesBook: IDataForAddFavoritesBook,
) => {
  const { userId, bookData } = dataForAddFavoritesBook;
  const favorites = await favoritesRepository.find({
    where: {
      user: { id: userId },
    },
    relations: {
      book: true,
    },
  });
  const genreIds = favorites.map((favorit) => favorit.book.id);
  if (genreIds.includes(bookData.bookId)) {
    const favoriteToRemove = favorites.find(
      (favorit) => favorit.book.id === bookData.bookId,
    );
    if (favoriteToRemove) {
      await favoritesRepository.remove(favoriteToRemove);
    }
  } else {
    await favoritesRepository.save({
      user: { id: userId },
      book: { id: bookData.bookId },
    });
  }
  const favoritesBooks = await favoritesRepository.find({
    where: { user: { id: userId } },
    relations: {
      book: {
        author: true,
      },
    },
  });
  const book = favoritesBooks.map((favorite) => {
    const { book } = favorite;
    book.cover = `${config.server.baseUrl}/upload/${book.cover}`;
    return book;
  });
  return { book };
};

const getBookInFavorites = async (userId: number) => {
  const favoritesBooks = await favoritesRepository.find({
    where: { user: { id: userId } },
    relations: {
      book: {
        author: true,
      },
    },
  });
  const book = favoritesBooks.map((favorite) => {
    const { book } = favorite;
    book.cover = `${config.server.baseUrl}/upload/${book.cover}`;
    return book;
  });
  return { book };
};

export default {
  addBookInFavorites,
  getBookInFavorites,
};
