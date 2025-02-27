import { cartRepository } from "../repository/bookRepository";
import config from "../config/config";

const deleteBookFromCart = async (bookIds: number[], userId: number) => {
  for (const bookId of bookIds) {
    await cartRepository.delete({ book: { id: bookId }, user: { id: userId } });
  }
};

const changeCountBooksInCart = async (
  userId: number,
  data: {
    bookId: number;
    count: number;
  },
) => {
  const cartItem = await cartRepository.findOne({
    where: {
      user: { id: userId },
      book: { id: data.bookId },
    },
  });
  cartItem.count = data.count;
  await cartRepository.save(cartItem);
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
  const book = books.map((boookData) => {
    const { book, count } = boookData;
    book.cover = `${config.server.baseUrl}/upload/${book.cover}`;
    return { ...book, count };
  });
  return { book, totalPrice };
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
    book.cover = `${config.server.baseUrl}/upload/${book.cover}`;
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
    book.cover = `${config.server.baseUrl}/upload/${book.cover}`;
    return { ...book, count };
  });
  return { book, totalPrice };
};

export default {
  deleteBookFromCart,
  changeCountBooksInCart,
  addBookToCart,
  getBookFromCart,
};
