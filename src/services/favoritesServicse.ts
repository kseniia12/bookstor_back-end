import {
  favoritesRepository,
  ratingRepository,
} from "../repository/bookRepository";

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
  const favorites = await favoritesRepository.find({
    where: { user: userId },
    relations: {
      book: {
        author: true,
      },
    },
  });

  const favoriteBooks = favorites.map((favorite) => favorite.book);

  // Fetch ratings for all books
  const ratings = await ratingRepository.find({ relations: ["book"] });
  const ratingSums = {};

  ratings.forEach((rating) => {
    const bookId = rating.book.id;
    if (!ratingSums[bookId]) {
      ratingSums[bookId] = { sum: 0, count: 0 };
    }
    ratingSums[bookId].sum += rating.rate;
    ratingSums[bookId].count += 1;
  });

  // Attach average ratings to favorite books
  const book = favoriteBooks.map((book) => {
    const ratingSum = ratingSums[book.id];
    const averageRating = ratingSum
      ? Math.ceil(ratingSum.sum / ratingSum.count)
      : 0;
    return { ...book, averageRating };
  });
  return { book };
};
