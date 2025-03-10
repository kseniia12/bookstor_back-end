import * as dotenv from "dotenv";
import { IDataForFilteringBooks, IRateBook } from "../lib/types";
import {
  authorRepository,
  bookRepository,
  genreRepository,
  ratingRepository,
  genresForBookRepository,
} from "../repository/bookRepository";
import { In, Not } from "typeorm";
import { BookEntity } from "../db/entities/book.entity";
import config from "../config/config";
dotenv.config();

const createBook = async (bookData: Partial<BookEntity>) => {
  const book = await bookRepository.save({
    name: bookData.name,
    priceSoft: bookData.priceSoft,
    priceHard: bookData.priceHard,
    description: bookData.description,
    countHard: bookData.countHard,
    countSoft: bookData.countSoft,
    cover: bookData.cover,
    author: bookData.author,
    bestseller: bookData.bestseller,
  });
  const connections = {
    book: book,
    genre: bookData.genres[0],
  };
  await genresForBookRepository.save(connections);
  return book;
};

const uploadingPhotoBook = async (photo: string) => {
  const book = await bookRepository.findOne({ where: { id: 42 } });
  book.cover = photo;
  return bookRepository.save(book);
};

const getPriceBooks = async () => {
  const price = await bookRepository
    .createQueryBuilder("price")
    .select("MAX(price.priceHard)", "maxValue")
    .addSelect("MIN(price.priceHard)", "minValue")
    .getRawOne();
  return price;
};

const getBooks = async (
  filter: IDataForFilteringBooks,
  price: {
    minValue: number;
    maxValue: number;
  },
) => {
  const limit = 12;
  const page = filter.page || 1;
  const filters = filter.genre;
  const sort = filter.sort || "price";
  let field = "book.priceHard";
  const queryBuilder = bookRepository
    .createQueryBuilder("book")
    .leftJoinAndSelect("book.author", "author");

  if (filters && filters.length > 0) {
    const subQuery = genresForBookRepository
      .createQueryBuilder("connection")
      .select("connection.bookId")
      .where("connection.genreId IN (:...filters)", { filters })
      .groupBy("connection.bookId")
      .having("COUNT(connection.genreId) = :filterCount", {
        filterCount: filters.length,
      });
    queryBuilder
      .where("book.id IN (" + subQuery.getQuery() + ")")
      .setParameters(subQuery.getParameters());
  }

  switch (sort) {
    case "price":
      field = "book.priceHard";
      break;
    case "name":
      field = "book.name";
      break;
    case "author":
      field = "author.name";
      break;
    case "date":
      field = "book.createdAt";
      break;
  }

  const minPrice =
    filter.minPrice === undefined ? price.minValue : filter.minPrice;
  const maxPrice =
    filter.maxPrice === undefined ? price.maxValue : filter.maxPrice;

  const booksArray = await queryBuilder
    .orderBy(field, "ASC")
    .andWhere("book.priceHard > :minPrice", { minPrice })
    .andWhere("book.priceHard < :maxPrice", { maxPrice })
    .skip(limit * (Number(page) - 1))
    .take(limit)
    .getMany();

  const totalBooks = await queryBuilder
    .andWhere("book.priceHard > :minPrice", { minPrice })
    .andWhere("book.priceHard < :maxPrice", { maxPrice })
    .getCount();

  const totalPages = Math.ceil(totalBooks / limit);
  const hasNextPage = Number(page) < totalPages;
  const hasPrevPage = Number(page) > 1;

  const ratings = await ratingRepository.find({
    where: { book: In(booksArray.map((book) => book.id)) },
    relations: ["book"],
  });

  const ratingSums: { [bookId: number]: { sum: number; count: number } } = {};
  ratings.forEach((rating) => {
    const bookId = rating.book.id;
    if (!ratingSums[bookId]) {
      ratingSums[bookId] = { sum: 0, count: 0 };
    }
    ratingSums[bookId].sum += rating.rate;
    ratingSums[bookId].count += 1;
  });

  const booksWithAverageRating = booksArray.map((book) => {
    book.cover = `${config.server.baseUrl}/upload/${book.cover}`;
    const ratingSum = ratingSums[book.id];
    const averageRating = ratingSum
      ? (ratingSum.sum / ratingSum.count).toFixed(1)
      : "0.0";
    return {
      ...book,
      averageRating,
    };
  });

  if (sort === "rating") {
    booksWithAverageRating.sort((a, b) => {
      const ratingA =
        typeof a.averageRating === "number"
          ? a.averageRating
          : parseFloat(a.averageRating);
      const ratingB =
        typeof b.averageRating === "number"
          ? b.averageRating
          : parseFloat(b.averageRating);
      return ratingB - ratingA;
    });
  }
  const meta = {
    totalBooks,
    totalPages,
    currentPage: Number(filter.page),
    hasNextPage,
    hasPrevPage,
  };

  return {
    book: booksWithAverageRating,
    meta,
  };
};

const getGenresBooks = async () => {
  return genreRepository.find();
};

const createGenres = async (bookData: { name: string }) => {
  const newGenres = genreRepository.create({
    name: bookData.name,
  });
  return genreRepository.save(newGenres);
};

const createAuthor = async (bookData: { name: string }) => {
  const author = authorRepository.create({
    name: bookData.name,
  });
  return authorRepository.save(author);
};

const getBookRecommendation = async (bookId: string) => {
  const genres = await genresForBookRepository.find({
    where: { book: { id: Number(bookId) } },
    relations: {
      genre: true,
    },
  });
  const genreIds = genres.map((genre) => genre.genre.id);
  const recommendations = await genresForBookRepository.find({
    take: 4,
    where: {
      genre: { id: In(genreIds) },
      book: { id: Not(Number(bookId)) },
    },
    relations: {
      book: {
        author: true,
      },
    },
  });
  const recommendedBooks = recommendations.map(
    (recommendation) => recommendation.book,
  );
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
  const book = recommendedBooks.map((book) => {
    book.cover = `${config.server.baseUrl}/upload/${book.cover}`;
    const ratingSum = ratingSums[book.id];
    const averageRating = ratingSum
      ? (ratingSum.sum / ratingSum.count).toFixed(1)
      : "0.0";
    return { ...book, averageRating };
  });
  return book;
};

const rateBook = async (userId: number, bookData: IRateBook) => {
  const rate = await ratingRepository.findOne({
    where: { user: { id: userId }, book: { id: bookData.bookId } },
  });
  if (rate !== null) {
    rate.rate = bookData.rate;
    await ratingRepository.save(rate);
  } else {
    await ratingRepository.save({
      user: { id: userId },
      book: { id: bookData.bookId },
      rate: bookData.rate,
    });
  }
  const bookIds = await ratingRepository.find({
    where: { user: { id: userId } },
    relations: {
      book: true,
    },
  });
  const bookRatings = bookIds.map((rating) => {
    return { bookId: rating.book.id, rate: rating.rate };
  });

  return bookRatings;
};

const getBookRating = async () => {
  const ratings = await ratingRepository.find({ relations: ["book"] });
  const ratingSums: { [bookId: number]: { sum: number; count: number } } = {};
  ratings.forEach((rating) => {
    const bookId = rating.book.id;
    if (!ratingSums[bookId]) {
      ratingSums[bookId] = { sum: 0, count: 0 };
    }
    ratingSums[bookId].sum += rating.rate;
    ratingSums[bookId].count += 1;
  });
  const books = await bookRepository.find();
  const booksWithAverageRating = books.map((book) => {
    const ratingSum = ratingSums[book.id];
    const averageRating = ratingSum
      ? (ratingSum.sum / ratingSum.count).toFixed(1)
      : "0.0";
    return { averageRating };
  });

  return booksWithAverageRating;
};

const getBookById = async (bookId: string) => {
  const book = await bookRepository.find({
    where: { id: Number(bookId) },
    relations: {
      author: true,
    },
  });
  book[0].cover = `${config.server.baseUrl}/upload/${book[0].cover}`;
  return book;
};

export default {
  getPriceBooks,
  createAuthor,
  getGenresBooks,
  getBooks,
  uploadingPhotoBook,
  createBook,
  createGenres,
  getBookRecommendation,
  rateBook,
  getBookRating,
  getBookById,
};
