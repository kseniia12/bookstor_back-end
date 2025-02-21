import { Router } from "express";
import { authenticateToken } from "../middlewares/authMiddleware";
import {
  createAuthor,
  createBook,
  createGenres,
  getBookById,
  getBookRating,
  getBookRecommendation,
  getBooks,
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
bookRouter.get("/recommendations", getBookRecommendation);
bookRouter.patch("/rating", authenticateToken, rateBook);
bookRouter.get("/rating", getBookRating);
bookRouter.get("/id", getBookById);
