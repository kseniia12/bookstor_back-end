import { cartRepository } from "../repository/bookRepository";

export const deleteBookFromCartServices = async (bookId, userId) => {
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

export const patchBookFromCartServices = async (userId, data) => {
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
  const book = books.map((k) => {
    const { book, count } = k;
    return { ...book, count };
  });
  return { book, totalPrice };
};
