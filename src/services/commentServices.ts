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
  let updatedPhoto = "";
  const user = await userRepository.findOne({ where: { id: userId } });
  const { fullName, photo } = user;
  if (photo !== null) {
    updatedPhoto = `${config.server.baseUrl}/upload/${photo}`;
  }
  return { fullName, photo: updatedPhoto };
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
  return comments.map(({ id, text, createdAt, user }) => {
    const { fullName, photo } = user;
    let updatedPhoto = "";
    if (photo !== null) {
      updatedPhoto = `${config.server.baseUrl}/upload/${photo}`;
    }
    return {
      id: id,
      comment: text,
      date: createdAt,
      user: {
        fullName: fullName,
        photo: updatedPhoto,
      },
    };
  });
};

export default {
  addComment,
  getComment,
};
