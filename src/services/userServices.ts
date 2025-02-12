import * as dotenv from "dotenv";
import { verifyPassword, hashPassword } from "../utils/hashing";
import { userRepository } from "../repository/userRepository";
import {
  ICreateUsersPhoto,
  IEditUserById,
  IUserDataForLogin,
} from "../lib/types";
import { CustomError } from "../utils/errorHandler";
import { ratingRepository } from "../repository/bookRepository";
import { UserEntity } from "../db/entities/user.entity";

dotenv.config();

const createUser = async (userData: Partial<UserEntity>) => {
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

const loginUser = async (userData: IUserDataForLogin) => {
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

const uploadingPhoto = async (userData: ICreateUsersPhoto) => {
  const user = await userRepository.findOne({ where: { id: userData.userId } });
  user.photo = userData.photo;
  return userRepository.save(user);
};

const getUserById = async (id: number) => {
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

const editUserById = async (userInfo: IEditUserById) => {
  const { id, userData } = userInfo;
  const user = await userRepository.findOneBy({ id });
  return userRepository.save({ ...user, ...userData });
};

const editPassword = async (userInfo: IEditUserById) => {
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

export default {
  createUser,
  loginUser,
  uploadingPhoto,
  getUserById,
  editUserById,
  editPassword,
};
