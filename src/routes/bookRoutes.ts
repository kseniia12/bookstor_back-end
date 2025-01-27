import { Router } from "express";
import {
  connectingGenresBooksController,
  createBookController,
  createGenresController,
  getPaginationBook,
  uploadingPhotoBook,
} from "../controllers/bookController";

export const bookRouter = Router();

bookRouter.post("/create", createBookController);
bookRouter.post("/createGenres", createGenresController);
bookRouter.post("/connectingGenresBooks", connectingGenresBooksController);
bookRouter.post("/upload", uploadingPhotoBook);
bookRouter.get("/pagination", getPaginationBook);
