import { UserEntity } from "src/db/entities/user.entity";
import config from "../config/config";
import { IResToken } from "../lib/types";

export const formDataUser = (user: UserEntity): Partial<UserEntity> => {
  user.photo = `${config.server.baseUrl}/upload/${user.photo}`;
  delete user.password;
  return { ...user };
};

export const formDataUserForToken = (user: IResToken) => {
  delete user.iat;
  delete user.exp;
  return { ...user };
};
