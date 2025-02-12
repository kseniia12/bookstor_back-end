import { Router } from "express";

import {
  addBookInFavorites,
  getBookInFavorites,
} from "../controllers/favoritesController";
import { authenticateToken } from "../middlewares/authMiddleware";

export const favoritesRouter = Router();

favoritesRouter.post("/add", authenticateToken, addBookInFavorites);
favoritesRouter.get("/add", authenticateToken, getBookInFavorites);
