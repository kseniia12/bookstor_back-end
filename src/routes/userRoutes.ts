import { Router } from "express";
import {
  editPassword,
  getUserById,
  uploadingPhoto,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  // getAllUsers,
  // getUserById,
  editUserById,
  // deleteUserById,
} from "../controllers/userController";
// import { userEditSchema, validate } from "../utils/validation";
// import { authenticateToken } from "../middlewares/authMiddleware";
export const userRouter = Router();
userRouter.post("/upload", authenticateToken, uploadingPhoto);
userRouter.patch("/password", authenticateToken, editPassword);
userRouter.get("/g", authenticateToken, getUserById);
// userRouter.get("", authenticateToken, getAllUsers);
// userRouter.get("/me", authenticateToken, getUserById);
userRouter.patch("/me", authenticateToken, editUserById);
// userRouter.delete("/me", authenticateToken, deleteUserById);
