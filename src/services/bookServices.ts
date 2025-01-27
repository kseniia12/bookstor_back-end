import * as dotenv from "dotenv";

import { bookObject, genreAndBookObject, genreObject } from "../lib/componets";
import {
  bookRepository,
  genreRepository,
  сonnectionBookAndGenresRepository,
} from "../repository/bookRepository";
import { In } from "typeorm";

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

  let booksArray;

  if (filters && filters.length > 0) {
    const bookPromises = filters.map(async (filter) => {
      return await сonnectionBookAndGenresRepository.find({
        where: { genre: { id: filter } },
        relations: ["book", "genre"],
      });
    });

    const filteredBooks = await Promise.all(bookPromises);
    const filteredBookIds = filteredBooks
      .flat()
      .map((connection) => connection.book.id);

    booksArray = await bookRepository.find({
      where: { id: In(filteredBookIds) },
      skip: limit * (page - 1),
      take: limit,
    });
  } else {
    booksArray = await bookRepository.find({
      skip: limit * (page - 1),
      take: limit,
    });
  }
  const booksObject = booksArray.reduce((acc, book) => {
    acc[book.id] = book;
    return acc;
  }, {});
  return booksObject;
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
