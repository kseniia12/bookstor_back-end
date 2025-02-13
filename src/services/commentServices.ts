import { commentsRepository } from "../repository/bookRepository";
import config from "../config/config";
import { userRepository } from "../repository/userRepository";

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
  addComment,
  getComment,
};
