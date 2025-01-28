import * as dotenv from "dotenv";

import { bookObject, genreAndBookObject, genreObject } from "../lib/componets";
import {
  bookRepository,
  genreRepository,
  сonnectionBookAndGenresRepository,
} from "../repository/bookRepository";

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

export const paginationBookService = async (req) => {
  const limit = 12;
  const page = req.query.page || 1;
  const filters = req.query.filter;

  const queryBuilder = bookRepository.createQueryBuilder("book");

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

  const booksArray = await queryBuilder
    .skip(limit * (page - 1))
    .take(limit)
    .getMany();

  const booksObject = booksArray.reduce((acc, book) => {
    acc[book.id] = book;
    return acc;
  }, {});

  return booksObject;
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
