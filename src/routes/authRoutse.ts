import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController";

export const authRouter = Router();

authRouter.post("/sign-up", createUser);
authRouter.post("/sign-in", loginUser);
