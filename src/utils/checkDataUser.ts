import { UserEntity } from "src/db/entities/user.entity";

export const formDataUser = (user: UserEntity): Partial<UserEntity> => {
  user.photo = `http://localhost:4000/upload/${user.photo}`;
  delete user.password;
  return { ...user };
};
