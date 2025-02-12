import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  deleteBookFromCart,
  changeCountBooksInCart,
} from "../controllers/cartController";

export const cartRouter = Router();

cartRouter.delete("/delete", authenticateToken, deleteBookFromCart);
cartRouter.patch("/delete", authenticateToken, changeCountBooksInCart);
