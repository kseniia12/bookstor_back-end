import * as dotenv from "dotenv";

import { bookObject } from "../lib/componets";
import { bookRepository } from "../repository/bookRepository";

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
  const page = req.query.page;
  const booksArray = await bookRepository.find({
    skip: limit * (page - 1),
    take: limit,
  });
  const booksObject = booksArray.reduce((acc, book) => {
    acc[book.id] = book;
    return acc;
  }, {});
  return booksObject;
};

// const page = parseInt(req.query.page as string) || 1;
// const limit = 12;
// const skip = (page - 1) * limit;

// const [books, total] = await bookRepository.findAndCount({
//   skip,
//   take: limit,
// });

// res.json({
//   books,
//   total,
//   page,
//   pages: Math.ceil(total / limit),
// });
