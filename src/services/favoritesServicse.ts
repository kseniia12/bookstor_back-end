import { favoritesRepository } from "../repository/bookRepository";

export const addToFavoritesServices = async (userId, bookData) => {
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

  const books = await favoritesRepository.find({
    where: { user: userId },
    relations: {
      book: {
        author: true,
      },
    },
  });

  const book = books.map((k) => {
    const { book } = k;
    return book;
  });
  return { book };
};

export const getBookFromFavoritesServices = async (userId) => {
  const books = await favoritesRepository.find({
    where: { user: userId },
    relations: {
      book: {
        author: true,
      },
    },
  });
  const book = books.map((k) => {
    const { book } = k;
    return book;
  });
  return { book };
};
