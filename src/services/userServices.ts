import * as dotenv from "dotenv";
import { verifyPassword, hashPassword } from "../utils/hashing";
import { userRepository } from "../repository/userRepository";
import {
  ICreateUsersPhoto,
  IEditUserById,
  IUserDataForLogin,
  userObject,
} from "../lib/componets";
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

export const loginUsersServices = async (userData: IUserDataForLogin) => {
  const { email, password } = userData;
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

export const createUsersPhoto = async (userData: ICreateUsersPhoto) => {
  const user = await userRepository.findOne({ where: { id: userData.userId } });
  if (!user) {
    throw new CustomError("Not fot found", 400);
  }
  user.photo = userData.photo;
  return userRepository.save(user);
};

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

export const editUsersByIdServices = async (userInfo: IEditUserById) => {
  const { id, userData } = userInfo;
  const user = await userRepository.findOneBy({ id });
  return userRepository.save({ ...user, ...userData });
};

export const editPasswordServices = async (userInfo: IEditUserById) => {
  const { id, userData } = userInfo;
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
