import { Router } from "express";
import {
  addCommentController,
  addToCartController,
  connectingAuthorBooksController,
  connectingGenresBooksController,
  createAuthorController,
  createBookController,
  createGenresController,
  getBookFromCartController,
  getFilter,
  getPaginationBook,
  getrateBookController,
  getReccomendationsBookController,
  rateBookController,
  uploadingPhotoBook,
} from "../controllers/bookController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const bookRouter = Router();

bookRouter.post("/create", createBookController);
bookRouter.post("/createGenres", createGenresController);
bookRouter.post("/connectingGenresBooks", connectingGenresBooksController);
bookRouter.post("/upload", uploadingPhotoBook);
bookRouter.get("/pagination", getPaginationBook);
bookRouter.get("/filter", getFilter);
bookRouter.post("/author", createAuthorController);
bookRouter.post("/connectingAuthorBooks", connectingAuthorBooksController);
bookRouter.post("/cart", authenticateToken, addToCartController);
bookRouter.get("/cart", authenticateToken, getBookFromCartController);
bookRouter.delete("/cart", authenticateToken, getBookFromCartController);
bookRouter.get(
  "/recommendations",
  authenticateToken,
  getReccomendationsBookController,
);
bookRouter.patch("/rating", authenticateToken, rateBookController);
bookRouter.get("/rating", getrateBookController);
bookRouter.post("/comment", authenticateToken, addCommentController);
