import { cartRepository } from "../repository/bookRepository";

export const deleteBookFromCartServices = async (userId) => {
  await cartRepository.delete({ book: userId });
};

export const patchBookFromCartServices = async ({ count, bookId }) => {
  const book = await cartRepository.findOneBy({ book: bookId });
  book.count = count;
  return cartRepository.save(book);
};
