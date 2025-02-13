import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  deleteBookFromCart,
  changeCountBooksInCart,
  addBookToCart,
  getBookFromCart,
} from "../controllers/cartController";

export const cartRouter = Router();

cartRouter.use(authenticateToken);

cartRouter.delete("/", deleteBookFromCart);
cartRouter.patch("/", changeCountBooksInCart);
cartRouter.post("/", addBookToCart);
cartRouter.get("/", getBookFromCart);
