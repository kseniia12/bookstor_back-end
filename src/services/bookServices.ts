import * as dotenv from "dotenv";

import {
  authorAndBookObject,
  bookObject,
  genreAndBookObject,
  genreObject,
} from "../lib/componets";
import {
  authorRepository,
  bookRepository,
  cartRepository,
  genreRepository,
  ratingRepository,
  сonnectionBookAndGenresRepository,
} from "../repository/bookRepository";
import { userRepository } from "../repository/userRepository";
import { In, Not } from "typeorm";

dotenv.config();

export const createBookServices = async (bookData: bookObject) => {
  return bookRepository.save({
    name: bookData.name,
    priceSoft: bookData.priceSoft,
    priceHard: bookData.priceHard,
    description: bookData.description,
    countHard: bookData.countHard,
    countSoft: bookData.countSoft,
    cover: bookData.cover,
  });
};

export const createBookPhoto = async (photo: string) => {
  const book = await bookRepository.findOne({ where: { id: 42 } });
  book.cover = photo;
  return bookRepository.save(book);
};

export const getPriceBooks = async () => {
  const price = await bookRepository
    .createQueryBuilder("price")
    .select("MAX(price.priceHard)", "maxValue")
    .addSelect("MIN(price.priceHard)", "minValue")
    .getRawOne();
  return price;
};

export const paginationBookService = async (req, price) => {
  const limit = 12;
  const page = req.query.page || 1;
  const filters = req.query.filter;
  const sort = req.query.sort;
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
    case "2":
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      field = "book.name";
      break;
    case "3":
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      field = "author.name";
      break;
  }
  const minPrice =
    req.query.maxPrice == undefined ? price.minValue : req.query.minPrice;

  const maxPrice =
    req.query.maxPrice == undefined ? price.maxValue : req.query.maxPrice;

  const min = minPrice.toString();
  const max = maxPrice.toString();

  const booksArray = await queryBuilder
    .orderBy(field, "ASC")
    .andWhere("book.priceHard > :minPrice", {
      minPrice: min,
    })
    .andWhere("book.priceHard < :maxPrice", {
      maxPrice: max,
    })
    .skip(limit * (page - 1))
    .take(limit)
    .getMany();
  return booksArray;
};

export const getFilterServices = async () => {
  return genreRepository.find();
};

export const createGenresServices = async (bookData: genreObject) => {
  const newGenres = genreRepository.create({
    name: bookData.name,
  });
  return genreRepository.save(newGenres);
};

export const connectingGenresBooksServices = async (
  bookData: genreAndBookObject,
) => {
  const book = await bookRepository.findOne({ where: { id: bookData.bookId } });
  const genre = await genreRepository.findOne({
    where: { id: bookData.genreId },
  });
  if (!book || !genre) {
    throw new Error("Book or Genre not found");
  }
  return сonnectionBookAndGenresRepository.save({
    book: book,
    genre: genre,
  });
};

export const createAuthorServices = async (bookData: genreObject) => {
  const author = authorRepository.create({
    name: bookData.name,
  });
  return authorRepository.save(author);
};

export const connectingAuthorBooksServices = async (
  bookData: authorAndBookObject,
) => {
  const book = await bookRepository.findOne({ where: { id: bookData.bookId } });
  const author = await authorRepository.findOne({
    where: { id: bookData.authorId },
  });
  if (!book || !author) {
    throw new Error("Book or Genre not found");
  }
  return bookRepository.save({
    ...book,
    author: author,
  });
};

export const addToCartServices = async (userId, bookData) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  const bookId = await bookRepository.findOne({
    where: { id: bookData.bookId },
  });
  await cartRepository.save({
    user: user,
    book: bookId,
    count: bookData.count || 1,
  });
  const books = await cartRepository.find({
    where: { user: userId },
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
    const { book } = k;
    return book;
  });
  return { book, totalPrice };
};

export const getBookFromCartServices = async (userId) => {
  const books = await cartRepository.find({
    where: { user: userId },
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
    const { book } = k;
    return book;
  });
  return { book, totalPrice };
};

export const getReccomendationsBookServices = async (bookId) => {
  const genres = await сonnectionBookAndGenresRepository.find({
    where: { book: { id: bookId } },
    relations: {
      genre: true,
    },
  });

  const genreIds = genres.map((genre) => genre.genre.id);

  const recommendations = await сonnectionBookAndGenresRepository.find({
    take: 4,
    where: {
      genre: { id: In(genreIds) },
      book: { id: Not(bookId) },
    },
    relations: {
      book: {
        author: true,
      },
    },
  });
  const book = recommendations.map((book) => book.book);
  return book;
};

export const rateBookServices = async (userId, bookData) => {
  const rate = await ratingRepository.findOne({
    where: { user: { id: userId }, book: { id: bookData.bookId } },
  });
  if (rate !== null) {
    rate.rate = bookData.rate;
    await ratingRepository.save(rate);
  } else {
    await ratingRepository.save({
      user: userId,
      book: bookData.bookId,
      rate: bookData.rate,
    });
  }
};
