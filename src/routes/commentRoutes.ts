import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import { addComment, getComment } from "../controllers/commentController";

export const commentRouter = Router();

commentRouter.post("/", authenticateToken, addComment);
commentRouter.get("/", getComment);
