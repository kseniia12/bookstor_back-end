import * as dotenv from "dotenv";
import { verifyPassword, hashPassword } from "../utils/hashing";
import { userRepository } from "../repository/userRepository";
import { userObject } from "../lib/componets";
import { CustomError } from "../utils/errorHandler";
import { ratingRepository } from "../repository/bookRepository";

dotenv.config();

export const createUsersServices = async (userData: userObject) => {
  const existingUser = await userRepository.findOne({
    where: { email: userData.email },
  });
  if (existingUser) {
    throw new CustomError("Email already exists", 404);
  }
  const hashedPassword = hashPassword(userData.password);
  const newUser = userRepository.create({
    email: userData.email,
    password: hashedPassword,
  });
  return userRepository.save(newUser);
};

export const loginUsersServices = async (email: string, password: string) => {
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new CustomError("User not found", 404);
  }
  const passwordUser = verifyPassword(password, user.password);
  if (!passwordUser) {
    throw new CustomError("Invalid password", 401);
  }
  return user;
};

export const createUsersPhoto = async (photo: string, userId: number) => {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new CustomError("Not fot found", 400);
  }
  user.photo = photo;
  return userRepository.save(user);
};

// export const getAllUsersServices = async () => {
//   return userRepository.find();
// };

export const getUsersByIdServices = async (id: number) => {
  const bookIds = await ratingRepository.find({
    where: { user: { id: id } },
    relations: {
      book: true,
    },
  });

  const ratingBook = bookIds.map((rating) => {
    return { bookId: rating.book.id, rate: rating.rate };
  });
  const user = await userRepository.findOneBy({ id });
  return { user, ratingBook };
};

export const editUsersByIdServices = async (
  id: number,
  userData: userObject,
) => {
  const user = await userRepository.findOneBy({ id });
  return userRepository.save({ ...user, ...userData });
};

export const editPasswordServices = async (
  id: number,
  userData: userObject,
) => {
  const user = await userRepository.findOneBy({ id });
  const oldPasswordhashedPassword = hashPassword(userData.password);
  const newPasswordhashedPassword = hashPassword(userData.newPassword);
  if (user.password !== oldPasswordhashedPassword) {
    throw new CustomError("Invalid password", 400);
  } else {
    user.password = newPasswordhashedPassword;
    return userRepository.save(user);
  }
};

// export const deleteUserByIdServices = async (id: number) => {
//   await userRepository.delete(id);
// };
