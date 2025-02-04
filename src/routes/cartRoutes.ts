import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  deleteBookFromCartController,
  patchCountBookController,
} from "../controllers/cartController";

export const cartRouter = Router();

cartRouter.delete("/delete", authenticateToken, deleteBookFromCartController);
cartRouter.patch("/delete", authenticateToken, patchCountBookController);
