import { cartObject } from "src/lib/types";
import { cartRepository } from "../repository/bookRepository";

const deleteBookFromCart = async (bookId: number, userId: number) => {
  await cartRepository.delete({ book: { id: bookId }, user: { id: userId } });
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
  return { totalPrice };
};

const changeCountBooksInCart = async (userId: number, data: cartObject) => {
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
    return { ...book, count };
  });
  return { book, totalPrice };
};

export default {
  deleteBookFromCart,
  changeCountBooksInCart,
};
