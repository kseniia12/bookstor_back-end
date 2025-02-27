import * as jwt from "jsonwebtoken";
import { UserEntity } from "src/db/entities/user.entity";

export const generateTokens = async (
  user: Partial<UserEntity>,
  time: string,
  secret: string,
) => {
  return new Promise<string>((res, rej) => {
    jwt.sign({ ...user }, secret, { expiresIn: time }, (err, token) => {
      if (err) {
        return rej(err);
      }
      res(token);
    });
  });
};

export const jwtVerifyToken = async (
  token: string,
  secret: string,
): Promise<Partial<UserEntity>> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, token) => {
      if (err) {
        return reject(err);
      }
      resolve(token as Partial<UserEntity>);
    });
  });
};
