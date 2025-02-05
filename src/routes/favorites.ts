import { Router } from "express";

import {
  addToFavoritesController,
  getBookFromFavoritesController,
} from "../controllers/favoritesController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const favoritesRouter = Router();

favoritesRouter.post("/add", authenticateToken, addToFavoritesController);
favoritesRouter.get("/add", authenticateToken, getBookFromFavoritesController);
