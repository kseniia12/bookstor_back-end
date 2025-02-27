import { UserEntity } from "src/db/entities/user.entity";
import { userRepository } from "../repository/userRepository";
import { jwtVerifyToken } from "../utils/utilsToken";
import { CustomError } from "../utils/errorHandler";
import config from "../config/config";
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    const userDataToken = await jwtVerifyToken(token, config.token.access);
    const id = userDataToken.id;
    const userData = await userRepository.findOneBy({ id });
    if (!userData) {
      throw new CustomError("Email already exists", 404);
    }
    req.user = userData as Partial<UserEntity>;
    next();
  } catch (err) {
    res.status(403).json({ err: err.message });
  }
};
