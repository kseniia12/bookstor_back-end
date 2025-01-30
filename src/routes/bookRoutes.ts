import { Router } from "express";
import {
  connectingAuthorBooksController,
  connectingGenresBooksController,
  createAuthorController,
  createBookController,
  createGenresController,
  getFilter,
  getPaginationBook,
  uploadingPhotoBook,
} from "../controllers/bookController";

export const bookRouter = Router();

bookRouter.post("/create", createBookController);
bookRouter.post("/createGenres", createGenresController);
bookRouter.post("/connectingGenresBooks", connectingGenresBooksController);
bookRouter.post("/upload", uploadingPhotoBook);
bookRouter.get("/pagination", getPaginationBook);
bookRouter.get("/filter", getFilter);
bookRouter.post("/author", createAuthorController);
bookRouter.post("/connectingAuthorBooks", connectingAuthorBooksController);
