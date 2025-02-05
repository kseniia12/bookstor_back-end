import { Router } from "express";
import {
  editPassword,
  getUserById,
  uploadingPhoto,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import { editUserById } from "../controllers/userController";

export const userRouter = Router();

userRouter.post("/upload", authenticateToken, uploadingPhoto);
userRouter.patch("/password", authenticateToken, editPassword);
userRouter.get("/me", authenticateToken, getUserById);
userRouter.patch("/me", authenticateToken, editUserById);
