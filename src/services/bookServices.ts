import * as dotenv from "dotenv";
import config from "../config/config";
import { IDataForFilteringBooks, IRateBook } from "../lib/types";
import {
  authorRepository,
  bookRepository,
  cartRepository,
  commentsRepository,
  genreRepository,
  ratingRepository,
  сonnectionBookAndGenresRepository,
} from "../repository/bookRepository";
import { userRepository } from "../repository/userRepository";
import { In, Not } from "typeorm";
import { BookEntity } from "../db/entities/book.entity";

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
  await сonnectionBookAndGenresRepository.save(connections);
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
  const filters = filter.filter;
  const sort = filter.sort;
  let field = "book.priceHard";
  const queryBuilder = bookRepository
    .createQueryBuilder("book")
    .leftJoinAndSelect("book.author", "author");
  if (filters && filters.length > 0) {
    const subQuery = сonnectionBookAndGenresRepository
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
    case "1":
      field = "book.priceHard";
      break;
    case "2":
      field = "book.name";
      break;
    case "3":
      field = "author.name";
      break;
    case "5":
      field = "book.createdAt";
      break;
  }
  const minPrice =
    filter.minPrice == undefined ? price.minValue : filter.minPrice;
  const maxPrice =
    filter.maxPrice == undefined ? price.maxValue : filter.maxPrice;

  const booksArray = await queryBuilder
    .orderBy(field, "ASC")
    .andWhere("book.priceHard > :minPrice", { minPrice })
    .andWhere("book.priceHard < :maxPrice", { maxPrice })
    .skip(limit * (Number(page) - 1))
    .take(limit)
    .getMany();
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
    const ratingSum = ratingSums[book.id];
    const averageRating = ratingSum
      ? Math.ceil(ratingSum.sum / ratingSum.count)
      : 0;
    return { ...book, averageRating };
  });

  if (sort === "4") {
    booksWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);
  }

  return booksWithAverageRating;
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

const addBookToCart = async (
  userId: number,
  bookData: {
    bookId: number;
    count: number;
  },
) => {
  await cartRepository.save({
    user: { id: userId },
    book: { id: bookData.bookId },
    count: bookData.count || 1,
  });
  const books = await cartRepository.find({
    where: { user: { id: userId } },
    relations: {
      book: {
        author: true,
      },
    },
  });
  const totalPrice = books.reduce((acc, cartItem) => {
    return acc + cartItem.book.priceHard * cartItem.count;
  }, 0);
  const book = books.map((k) => {
    const { book, count } = k;
    return { ...book, count };
  });
  return { book, totalPrice };
};

const getBookFromCart = async (userId: number) => {
  const books = await cartRepository.find({
    where: { user: { id: userId } },
    relations: {
      book: {
        author: true,
      },
    },
  });
  const totalPrice = books.reduce((acc, cartItem) => {
    return acc + cartItem.book.priceHard * cartItem.count;
  }, 0);
  const book = books.map((k) => {
    const { book, count } = k;
    return { ...book, count };
  });
  return { book, totalPrice };
};

const getBookRecommendation = async (bookId: string) => {
  const genres = await сonnectionBookAndGenresRepository.find({
    where: { book: { id: Number(bookId) } },
    relations: {
      genre: true,
    },
  });
  const genreIds = genres.map((genre) => genre.genre.id);
  const recommendations = await сonnectionBookAndGenresRepository.find({
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
    const ratingSum = ratingSums[book.id];
    const averageRating = ratingSum
      ? Math.ceil(ratingSum.sum / ratingSum.count)
      : 0;
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
  const ratingBook = bookIds.map((rating) => {
    return { bookId: rating.book.id, rate: rating.rate };
  });
  const user = await userRepository.findOneBy({ id: userId });
  return { user, ratingBook };
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
      ? Math.ceil(ratingSum.sum / ratingSum.count)
      : 0;
    return { averageRating };
  });

  return booksWithAverageRating;
};

const addComment = async (
  data: {
    comment: string;
    bookId: number;
  },
  userId: number,
) => {
  await commentsRepository.save({
    user: { id: userId },
    book: { id: data.bookId },
    text: data.comment,
  });
  const user = await userRepository.findOne({ where: { id: userId } });
  const { fullName, photo } = user;
  return { fullName, photo };
};

const getComment = async (bookId: string) => {
  const comments = await commentsRepository.find({
    where: { book: { id: Number(bookId) } },
    relations: {
      user: true,
    },
    order: {
      createdAt: "ASC",
    },
  });
  return comments.map(({ text, createdAt, user }) => {
    const { fullName, photo } = user;
    return {
      comment: text,
      date: createdAt,
      user: {
        fullName: fullName,
        photo: `${config.server.baseUrl}/upload/${photo}`,
      },
    };
  });
};

export default {
  getPriceBooks,
  createAuthor,
  getBookFromCart,
  addBookToCart,
  getGenresBooks,
  getBooks,
  uploadingPhotoBook,
  createBook,
  createGenres,
  getBookRecommendation,
  rateBook,
  getBookRating,
  addComment,
  getComment,
};
