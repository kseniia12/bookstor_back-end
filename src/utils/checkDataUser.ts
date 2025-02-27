import { UserEntity } from "src/db/entities/user.entity";
import config from "../config/config";

export const formDataUser = (user: UserEntity): Partial<UserEntity> => {
  user.photo = `${config.server.baseUrl}/upload/${user.photo}`;
  delete user.password;
  return { ...user };
};
