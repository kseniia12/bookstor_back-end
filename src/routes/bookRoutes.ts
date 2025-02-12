import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  addBookToCart,
  addComment,
  createAuthor,
  createBook,
  createGenres,
  getBookFromCart,
  getBookRating,
  getBookRecommendation,
  getBooks,
  getComment,
  getGenresBooks,
  rateBook,
  uploadingPhotoBook,
} from "../controllers/bookController";

export const bookRouter = Router();

bookRouter.post("/create", createBook);
bookRouter.post("/createGenres", createGenres);
bookRouter.post("/upload", uploadingPhotoBook);
bookRouter.get("/pagination", getBooks);
bookRouter.get("/filter", getGenresBooks);
bookRouter.post("/author", createAuthor);
bookRouter.post("/cart", authenticateToken, addBookToCart);
bookRouter.get("/cart", authenticateToken, getBookFromCart);
bookRouter.delete("/cart", authenticateToken, getBookFromCart);
bookRouter.get("/recommendations", getBookRecommendation);
bookRouter.patch("/rating", authenticateToken, rateBook);
bookRouter.get("/rating", getBookRating);
bookRouter.post("/comment", authenticateToken, addComment);
bookRouter.get("/comment", getComment);
