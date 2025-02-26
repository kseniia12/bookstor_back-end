import { Router } from "express";
import {
  createUser,
  loginUser,
  refreshToken,
} from "../controllers/userController";

export const authRouter = Router();

authRouter.post("/sign-up", createUser);
authRouter.post("/sign-in", loginUser);
authRouter.post("/refresh-token", refreshToken);
